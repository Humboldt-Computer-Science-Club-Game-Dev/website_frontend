import { useEffect } from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import './style.scss';

export default function ImageModal({ src, meta, ...rest }) {
	useEffect(() => {
		let containerArea = document.querySelector('.image-modal-container');
		containerArea.addEventListener('click', userClicked);
		function userClicked() {
			rest.setShow(false);
		}
		return () => {
			containerArea.removeEventListener('click', userClicked);
		};
	}, [rest]);

	return (
		<div className='image-modal-container'>
			<img src={src} alt='modal display' />
			<Container maxWidth='md'>
				<Box mt={2}>
					<Typography variant='h3' align='center'>
						{meta.title ? meta.title : 'Unnamed Image'}
					</Typography>
				</Box>
				{meta.description ? (
					<Box mt={2}>
						<Typography align='center' paragraph>
							{meta.description}
						</Typography>
					</Box>
				) : (
					<></>
				)}
			</Container>
		</div>
	);
}
