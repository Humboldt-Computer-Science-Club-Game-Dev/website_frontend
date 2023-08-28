import StlButton from 'components/StlButton';
import Label from 'components/StlInputs/Label';
import { useState } from 'react';
import Slide from 'react-reveal/Slide';
import createPaymentIntent from './createPaymentIntent';

export default function Amount({ amount, setAmount, setMessage, message, clientSecret, setStage, setClientSecret }) {
	const [toggleAnim, setToggleAnim] = useState(true);
	const [localAmount, setLocalAmount] = useState(amount);
	const [localMessage, setLocalMessage] = useState('Thank you so much for all you have done!');
	return (
		<Slide right opposite when={toggleAnim}>
			<Label htmlFor='amount-input'>Amount To Give</Label>
			<input
				id='amount-input'
				className='inner-ele input-ele'
				placeholder={amount}
				onChange={e => {
					setLocalAmount(e.target.value);
				}}
				type='number'
			/>
			<Label htmlFor='message-input'>Tagalong Message</Label>
			<textarea
				id='message-input'
				className='inner-ele input-ele'
				placeholder={message}
				defaultValue={message}
				onChange={e => {
					setLocalMessage(e.target.value);
				}}
			></textarea>
			<StlButton
				id='submit'
				className='action-button'
				lightMode='false'
				type='submit'
				onClick={() => {
					setToggleAnim(false);
					setTimeout(() => {
						document.querySelector('#submit').classList.add('hidden');
					}, 250);
					createPaymentIntent(localAmount, localMessage).then(data => {
						setTimeout(() => {
							setAmount(localAmount);
							setMessage(localMessage);
							setClientSecret(data.clientSecret);
							setStage('pay');
						}, 350);
					});
				}}
			>
				Give&nbsp;${localAmount}
			</StlButton>
		</Slide>
	);
}
