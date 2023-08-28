import utils from 'utilities';
import { authRouteStore } from 'api/auth/userStore';

export default function createPaymentIntent(amount, message) {
	return new Promise(resolve => {
		amount = parseInt(amount);
		if (typeof amount !== 'number') return alert('Invalid amount provided in the form');

		if (!amount) {
			alert(amount === 0 ? 'You must specify an amount greater than $1' : 'An amount must be specified');
			return;
		} else if (amount < 1) {
			alert('Give amount must be greater than $1');
		}
		fetch(`${authRouteStore.getState()}/payment/create-intent`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				amount: amount,
				message: message,
				authToken: utils.getAuthToken(),
			}),
		})
			.then(res => res.json())
			.then(data => {
				resolve(data);
			})
			.catch(err => {
				alert(err.message);
				console.error(err);
			});
	});
}
