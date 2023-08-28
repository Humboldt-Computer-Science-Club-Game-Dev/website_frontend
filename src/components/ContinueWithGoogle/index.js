import { useState } from 'react';
import StlButton from 'components/StlButton';
import { CircularProgress } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { authRouteStore } from 'api/auth/userStore';

export default function ContinueWithGoogle() {
	let authRoute = authRouteStore.getState();
	const [loading, setLoading] = useState(false);

	return (
		<StlButton
			className='action-button continue-with-google-btn-container'
			onClick={() => {
				setLoading(true);
				continueWithGoogle()
					.then(() => {
						setLoading(false);
					})
					.catch(err => {
						console.log(err);
						setLoading(false);
						alert(err.message);
					});
			}}
			lightMode={true}
		>
			{!loading ? (
				<>
					<Box display='flex' mr={2}>
						<img src='/icons/google.png' alt='sign up with google icon' className='icon' />
					</Box>
					Continue with Google{' '}
				</>
			) : (
				<CircularProgress className='cwg-loading' />
			)}
		</StlButton>
	);

	function continueWithGoogle() {
		return new Promise((resolve, reject) => {
			fetch(`${authRoute}/googleauth/start`)
				.then(res => res.json())
				.then(res => {
					resolve(res);
					window.location = res.redirect;
				})
				.catch(err => {
					reject(err);
					console.error(err);
				});
		});
	}
}
