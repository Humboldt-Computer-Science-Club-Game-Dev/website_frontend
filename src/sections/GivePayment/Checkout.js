import { useEffect, useState } from 'react';
import StlButton from 'components/StlButton';

import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function Checkout({ amount, onReady }) {
	const stripe = useStripe();
	const elements = useElements();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case 'succeeded':
					setMessage('Payment succeeded!');
					break;
				case 'processing':
					setMessage('Your payment is processing.');
					break;
				case 'requires_payment_method':
					setMessage('Your payment was not successful, please try again.');
					break;
				default:
					setMessage('Something went wrong.');
					break;
			}
		});
	}, [stripe]);

	if (!amount) return <div>Error, {amount} is an invalid amount</div>;

	const handleSubmit = async e => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				return_url: `${window.location.origin}/account?amount=${amount}`,
			},
		});

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.
		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message);
		} else {
			setMessage('An unexpected error occured.');
		}

		setIsLoading(false);
	};

	return (
		<div className='w-full'>
			<form id='payment-form' onSubmit={handleSubmit}>
				<PaymentElement id='payment-element' className={`stipe-ele`} onReady={onReady} />
				<StlButton
					disabled={isLoading || !stripe || !elements}
					id='submit'
					className='action-button action-addon'
					lightMode='false'
					type='submit'
				>
					{isLoading ? <div className='spinner' id='spinner'></div> : 'Give'}
				</StlButton>
				{/* Show any error or success messages */}
				{message && <div id='payment-message'>{message}</div>}
			</form>
		</div>
	);
}
