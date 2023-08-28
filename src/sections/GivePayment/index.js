import StlFormContainer from 'components/StlFormContainer';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Checkout from './Checkout';
import userStore from 'api/auth/userStore';
import reactIsInDevelomentMode from 'utilities/isInDevelopment';
import SignUp from 'sections/SignUp';
import Slide from 'react-reveal/Slide';
import LoadingScreen from 'components/LoadingScreen';

import './style.scss';
import AmountStage from './AmountStage';

const stripePromise = loadStripe(
	reactIsInDevelomentMode()
		? 'pk_test_51KGpjLLdYdgAEsFCuAnDfjyvv2pwHclQ8TGFD8TdEYzFHd9LaUznbNYmgMTmrM8dTmvpaS7zZyqQPOfIpLkRPR0900bJVkpXId'
		: 'pk_live_51KGpjLLdYdgAEsFCzi67OptGaY88Cz9MCFy5kMgCIqAQg6DrbZB3CDSeFQJCLvFtQlOdVom7n42mdLbFgAgAMU7200HJeyiOM7'
);

export default function GivePayment() {
	const [clientSecret, setClientSecret] = useState('');
	const [amount, setAmount] = useState(100);
	const [stage, setStage] = useState('amount');
	const [message, setMessage] = useState('Thank you so much for all you have done!');

	const appearance = {
		theme: 'none',
		variables: {
			colorPrimary: '#000000',
			colorText: '#000000',
			colorDanger: '#df1b41',
			fontFamily: 'Ideal Sans, system-ui, sans-serif',
			spacingUnit: '2px',
		},
		rules: {
			'.Tab': {
				display: 'flex',
				boxSizing: 'border-box',
				backgroundColor: 'transparent',
				borderBottom: '2px solid black',
				padding: `0.5rem 0.5rem 0.5rem 0.5rem`,
				margin: '0.5rem 0px 1rem 6px',
				borderRadius: '0px',
				width: '100% !important',
			},
			'.Tab:focus': {
				outline: '1px solid rgb(107, 107, 107)',
				outlineOffset: '0.5rem 0rem',
			},
			'.Input': {
				display: 'flex',
				boxSizing: 'border-box',
				backgroundColor: 'transparent',
				borderBottom: '2px solid black',
				padding: `0.5rem 0.5rem 0.5rem 0.5rem`,
				margin: '0.5rem 0rem 1rem 0rem',
				borderRadius: '0px',
				width: '100% !important',
			},
			'.Input:focus': {
				outline: '1px solid rgb(107, 107, 107)',
				outlineOffset: '0.5rem 0rem',
			},
			'.Block': {
				display: 'flex',
				boxSizing: 'border-box',
				backgroundColor: 'transparent',
				borderBottom: '2px solid black',
				padding: `0.5rem 0.5rem 0.5rem 0.5rem`,
				margin: '0.5rem 0rem 1rem 0rem',
				borderRadius: '0px',
				width: '100% !important',
			},
			'.Block:focus': {
				outline: '1px solid rgb(107, 107, 107)',
				outlineOffset: '0.5rem 0rem',
			},
			'.Label': {
				padding: `0.5rem 0.5rem 0.5rem 0rem`,
				margin: '0.5rem 0rem 0.5rem 0rem',
			},
		},
	};
	const options = {
		clientSecret,
		appearance,
	};

	if (!userStore.getState()) {
		return <SignUp title='Sign Up to Give Directly' />;
	}

	function StageContent() {
		switch (stage) {
			case 'amount':
				return (
					<AmountStage
						amount={amount}
						setAmount={setAmount}
						message={message}
						setMessage={setMessage}
						setClientSecret={setClientSecret}
						clientSecret={clientSecret}
						setStage={setStage}
					/>
				);
			case 'pay':
				return (
					<>
						<Slide right className='w-full flex'>
							<LoadingScreen id='spinner-slide' message='Loading payment form' className='h-min-i' />
						</Slide>
						<Elements options={options} stripe={stripePromise}>
							<Checkout
								amount={amount}
								onReady={() => {
									setTimeout(() => {
										let spinner = document.querySelector('#spinner-slide');
										spinner.classList.add('hidden-i');
									}, 1000);
								}}
							/>
						</Elements>
					</>
				);
			default:
				return <div>Error</div>;
		}
	}

	return (
		<StlFormContainer className='give-payment-container' height='auto' title='Give' extraPadding={true}>
			<StageContent amount={amount} setAmount={setAmount} />
		</StlFormContainer>
	);
}
