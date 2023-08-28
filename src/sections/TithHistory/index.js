import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import utils from 'utilities';
import { authRouteStore } from 'api/auth/userStore';
import userStore from 'api/auth/userStore';
import './style.scss';
import TitheCardContainer from './TitheCardContainer';
import Flash from 'components/Flash';

export default function TithHistory({ noTopPadding = true, lightMode = true, pt = 2, pb = 2 }) {
	const [titheData, setTitheData] = useState([]);
	const [initedTith, setInitedTith] = useState(false);
	const [user, setUser] = useState(userStore.getState());
	const [flashMessage, setFlashMessage] = useState(false);
	const [flashStatus, setFlashStatus] = useState(false);
	const [flashTitle, setFlashTitle] = useState(false);

	useEffect(() => {
		if (flashMessage || flashTitle) return;

		const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');
		const status = new URLSearchParams(window.location.search).get('redirect_status');
		const amount = new URLSearchParams(window.location.search).get('amount');

		if (!clientSecret || !status) {
			return;
		}

		switch (status) {
			case 'succeeded':
				setFlashStatus('successful');
				setFlashTitle('Tithe Received Successfully');
				setFlashMessage(
					`You have successfuly donated $${amount}. Your donation will appear in the tithe history section below. If your donation is not visible, wait a little and then reload the page. If its still not visable, please contact us at delairebaptist@gmail.com and we will get back to you ASAP.`
				);
				break;
			case 'processing':
				setFlashStatus('warning');
				setFlashTitle('Your Tithe is Still Processing');
				setFlashMessage(
					'Your payment is still processing. Please refresh the page in a few moments to see it in this tithe history section. If this warning continues to persist, contact us at delairebaptist@gmail.com and we will get back to you ASAP.'
				);
				break;
			case 'requires_payment_method':
				setFlashStatus('failed');
				setFlashTitle('Your Tithe Payment Failed');
				setFlashMessage(
					'Your payment was not successful because there was an issue with your payment method. No money has changed hands.'
				);
				break;
			default:
				setFlashStatus('failed');
				setFlashTitle('Your Tithe Payment Failed');
				setFlashMessage(
					'An internal error happeond on our end. Please contact us about this error at delairebaptist@gmail.com and we will get back to you ASAP.'
				);
				break;
		}
	}, [flashMessage, flashStatus, flashTitle]);

	useEffect(() => {
		let unsub = userStore.subscribe(() => {
			setUser(userStore.getState());
		});

		return () => {
			unsub();
		};
	}, [user, setUser]);

	useEffect(() => {
		if (titheData.length > 0 || !user || initedTith) return;
		fetch(`${authRouteStore.getState()}/payment/get-donations`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				authToken: utils.getAuthToken(),
			}),
		})
			.then(res => res.json())
			.then(res => {
				setTitheData(res);
			})
			.catch(console.error);
		setInitedTith(true);
	}, [titheData, user, initedTith]);

	const Tithes = () => {
		const Tithes = [];
		for (let i = 0; i < titheData.length; i++) {
			let tithe = titheData[i];
			let isLeft = i % 2 === 0;
			let paddingStyle = isLeft ? 'left-card' : 'right-card';

			if (tithe.status !== 'successful') continue;
			else Tithes.push(<TitheCardContainer key={i} tithe={tithe} className={paddingStyle} />);
		}
		return Tithes;
	};

	return (
		<Box
			className={`tithe-history-container ${lightMode ? 'light-mode' : ''}`}
			mt={noTopPadding ? 0 : 2}
			pb={pb}
			pt={noTopPadding ? 0 : pt}
		>
			<Container maxWidth='md'>
				{flashMessage ? (
					<Flash title={flashTitle} message={flashMessage} duration={6000} status={flashStatus}></Flash>
				) : (
					<></>
				)}
				<Typography align='center' variant='h2'>
					Tithe History
				</Typography>
				<Box className={`tithe-cards-container`} display='flex' flexWrap='wrap'>
					{user ? titheData.length <= 0 ? <EmptyTitheDisplay /> : <Tithes /> : <NoUserMenu />}
				</Box>
			</Container>
		</Box>
	);

	function NoUserMenu() {
		return <div>No account currently signed in on this webpage instance.</div>;
	}

	function EmptyTitheDisplay() {
		return (
			<TitheCardContainer
				tithe={{
					amount: 0,
					header: 'No Donations Yet',
					message:
						'When you donate via the direct giving from, Your donation will be tracked and saved in this section of your account menu. Click here to give directly.',
				}}
				className={'mx-auto pt-4'}
			/>
		);
	}
}
