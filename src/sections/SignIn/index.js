import { useEffect } from 'react';
import userStore from 'api/auth/userStore';
import ContinueWithGoogle from 'components/ContinueWithGoogle';
import StlFormContainer from 'components/StlFormContainer';
import { authRouteStore } from 'api/auth/userStore';

export default function SignIn() {
	let authRoute = authRouteStore.getState();
	useEffect(() => {
		const queryString = window.location.search;
		if (!queryString) return;

		//Grabs a code needed to create a google 0auth user
		const urlParams = new URLSearchParams(queryString);
		let authCode = urlParams.get('code');
		if (authCode) {
			fetch(`${authRoute}/googleauth/compleate`, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					authCode: authCode,
				}),
			})
				.then(res => res.json())
				.then(res => {
					if (res.hasFailed) {
						alert(res.message);
						return;
					}
					let localStorage = window.localStorage;
					if (localStorage) {
						localStorage.setItem('authToken', res.authToken);

						userStore.dispatch({
							type: 'setUser',
							user: {
								name: res.name,
								email: res.email,
								authToken: res.authToken,
							},
						});

						window.location.href = 'giving';
					}
				})
				.catch(console.error);
		} else {
		}
	}, [authRoute]);

	return (
		<StlFormContainer height='auto' title='Sign In' extraPadding={true}>
			{/* <Label htmlFor='name-input'>name</Label>
   <input
      id='name-input'
      className='inner-ele input-ele'
      placeholder='John Doe'
      onChange={e => {
         setName(e.target.value);
      }}
   />
   <Label htmlFor='email-input'>email</Label>
   <input
      id='email-input'
      className='inner-ele input-ele'
      placeholder='johndoe@gmail.com'
      onChange={e => {
         setEmail(e.target.value);
      }}
   />
   <Label htmlFor='password-input'>password</Label>
   <input
      id='password-input'
      className='inner-ele input-ele'
      placeholder='laxyPassw0rd02'
      onChange={e => {
         setPassword(e.target.value);
      }}
   /> */}
			<ContinueWithGoogle />
			{/* <StlButton
      className='action-button'
      onClick={() => {
         signUserUp({
            name: name,
            email: email,
            password: password,
         });
      }}
      lightMode={true}
   >
      Sign Up
   </StlButton> */}
		</StlFormContainer>
	);
}
