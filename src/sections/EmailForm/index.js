import { useState } from 'react';
import StlButton from 'components/StlButton';
import './style.scss';
import sendEmail from 'api/sendEmail';
import StlFormContainer from 'components/StlFormContainer';
import Label from 'components/StlInputs/Label';

export default function EmailForm({ title, actionButtonName }) {
	let [name, setName] = useState(null);
	let [email, setEmail] = useState(null);
	let [message, setMessage] = useState(null);

	return (
		<StlFormContainer className='email-form-container' title={title ? title : 'Email Us'}>
			<Label htmlFor='name-input'>name</Label>
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
			<Label htmlFor='message-input'>message</Label>
			<textarea
				id='message-input'
				className='inner-ele input-ele'
				placeholder='Can you tell me more about...'
				onChange={e => {
					setMessage(e.target.value);
				}}
			></textarea>
			<StlButton className='action-button' onClick={presedSend} lightMode={true}>
				{actionButtonName ? actionButtonName : 'send'}
			</StlButton>
		</StlFormContainer>
	);

	function presedSend() {
		if (!message || !email) {
			alert('Both the message and email input must be compleated inorder to send message');
			return;
		}
		if (!isEmailValid(email)) {
			alert('The email you enterd is invalid');
			return;
		}

		sendEmail({ name: name, email: email, message: message })
			.then(() => {
				alert('Email sent successfully');
			})
			.catch(err => {
				alert('Email failed to send');
			});
	}
}

function isEmailValid(email) {
	if (email.indexOf('@') < 0) return false;
	let emailSideNames = email.split('@');
	if (!emailSideNames) return false;
	for (let i = 0; i < emailSideNames.length; i++) {
		let currentEmailSide = emailSideNames[i];
		if (currentEmailSide === '') {
			return false;
		}
	}

	return true;
}
