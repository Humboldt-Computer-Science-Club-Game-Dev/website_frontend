import { initSize } from 'utilities/size';
import warningFilter from 'config/warningFilter';
import userStore from 'api/auth/userStore';
import { authRouteStore } from 'api/auth/userStore';

const DEBUG_USER_AUTH = false;

/* These functions can't have dependencies */
export default function appInitFunctions() {
	initSize();
	warningFilter();

	let authToken = window.localStorage.getItem('authToken');
	if (authToken) {
		fetch(`${authRouteStore.getState()}/getUser`, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				authToken: authToken,
			}),
		})
			.then(res => res.json())
			.then(res => {
				if (res.hasFailed) {
					console.log(res.message);
					return;
				}
				userStore.dispatch({ type: 'setUser', user: res.user });
			})
			.catch(err => {
				if (DEBUG_USER_AUTH) {
					console.error(err);
				}
			});
	}

	return () => {};
}
