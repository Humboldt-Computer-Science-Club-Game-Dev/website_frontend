import { useState, useEffect } from 'react';
import StlButton from 'components/StlButton';
import { Box, Container, Typography } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import userStore, { authRouteStore } from 'api/auth/userStore';
import useGetComments from './useGetComments';
import './style.scss';

//update
export default function Comments({ sanityID, lightModeComment = false }) {
	const [user, setUser] = useState(userStore.getState());
	const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
	const [textBoxContent, setTextBoxContent] = useState('');

	useEffect(() => {
		//TODO Check to see if below code is correct
		const unsub = userStore.subscribe(() => {
			setUser(userStore.getState());
		});
		return () => {
			unsub();
		};
	}, [user]);

	const { comments, refresh } = useGetComments(sanityID);

	return (
		<div>
			<Box className={`comments-container ${lightModeComment ? 'light-mode' : ''}`}>
				<Container maxWidth='md' className='comments-inner-container'>
					<div className='comments-header'>
						<Typography variant='h4' className='gallery-title'>
							{comments?.length ? comments.length : 0} Comment
							{comments?.length > 1 || !comments?.length ? 's' : ''}
						</Typography>
						{user ? (
							<StlButton
								onClick={() => {
									userStore.dispatch({ type: 'signOut' });
								}}
								lightMode={lightModeComment}
							>
								Sign Out
							</StlButton>
						) : (
							<StlButton
								onClick={() => {
									window.location.href = '/signin';
								}}
								lightMode={lightModeComment}
							>
								Sign In
							</StlButton>
						)}
					</div>
					{user ? (
						<>
							<textarea
								id={`${sanityID}-comment`}
								className='standard-text-area comment-text-area'
								placeholder='Add a comment'
								onChange={e => setTextBoxContent(e.target.value)}
							></textarea>
							<StlButton
								className={`post-button`}
								lightMode={lightModeComment}
								onClick={() => {
									fetch(`${authRouteStore.getState()}/comments`, {
										method: 'post',
										headers: {
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({
											sectionID: sanityID,
											comment: {
												user,
												message: textBoxContent,
												date: new Date().toString(),
											},
										}),
									})
										.then(res => res.json())
										.then(res => {
											refresh();
										})
										.catch(console.error);
								}}
							>
								Post
							</StlButton>
						</>
					) : null}
					{comments ? (
						comments.map((comment, i) => {
							const { user, message, date } = comment;
							const dateObj = new Date(date);
							const { email } = user;
							return (
								<div className='single-comment' key={i}>
									<span className='user-icon'>
										<p>{email.charAt(0).toUpperCase()}</p>
									</span>
									<section className='comment-text'>
										<Typography align='left' className='subtitle' variant={isMobile ? 'h6' : 'h5'}>
											{email}
										</Typography>
										<p>{message}</p>
										<div className='comment-date'>
											<Typography align='left' className='date' paragraph={true}>
												{dateObj.toDateString()}
											</Typography>
										</div>
									</section>
								</div>
							);
						})
					) : (
						<></>
					)}
				</Container>
			</Box>
		</div>
	);
}
