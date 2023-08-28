import { Box, Typography } from '@material-ui/core';
import utils from 'utilities';
import Fade from 'react-reveal/Fade';

export default function TitheCardContainer({ tithe, className }) {
	const date = tithe.date ? utils.formatDataString(tithe.date) : null;
	return (
		<Box display='flex' flexWrap='wrap' className={`tithe-card-container ${className} flex flex-col`}>
			<Fade bottom cascade>
				<Box className='img-container' position={'relative'} display='flex'>
					<Typography className='tithe-ammout-text' variant='h3'>
						${tithe.amount}
					</Typography>
					<img alt='donation' src='/component_images/donation/donation.png' />
				</Box>
				{tithe.header ? (
					<Typography align='center' className='date-text' paragraph>
						{tithe.header}
					</Typography>
				) : (
					<></>
				)}
				{date ? (
					<Typography align='center' className='date-text' paragraph>
						{date}
					</Typography>
				) : (
					<></>
				)}
				<Typography align='center' className='message-text' paragraph>
					{tithe.message}
				</Typography>
			</Fade>
		</Box>
	);
}
