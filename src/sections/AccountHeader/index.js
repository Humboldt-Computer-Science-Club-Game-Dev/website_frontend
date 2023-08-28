import { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import ThematicDisplay from 'sections/ThematicDisplay';
import userStore from 'api/auth/userStore';

export default function AccountHeader() {
	let [user, setUser] = useState(userStore.getState());

	useEffect(() => {
		let unsub = userStore.subscribe(() => {
			setUser(userStore.getState());
		});

		return () => {
			unsub();
		};
	}, [user]);

	if (!user) return <Box>You must be signed in to see Account Dashbord</Box>;
	return (
		<Box>
			<ThematicDisplay
				title='Account Dashbord'
				subtitle={`Welcome ${user.name ? user.name : user.email}`}
				lightMode={true}
			/>
		</Box>
	);
}
