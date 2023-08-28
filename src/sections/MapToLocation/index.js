/* istanbul ignore file */
import { useEffect } from 'react';
import './style.scss';
import { Container, Typography, Box } from '@material-ui/core';
import StlButton from 'components/StlButton';
/* eslint import/no-webpack-loader-syntax: off */ /* istanbul ignore next */
import mapboxgl from '!mapbox-gl';

export default function MapToLocation({ title, latitude, longitude, description }) {
	let uniqueRandom = Math.ceil(Math.random() * 90);
	let uniqueId = `display-map-${uniqueRandom}`;
	useEffect(() => {
		mapboxgl.accessToken =
			'pk.eyJ1IjoiZGVsYWlyZWJjIiwiYSI6ImNrdzJtYnBydTVrbHQzMG8weXNqcmprOGEifQ.rAItbr9P8_U4JKCrCmMJDA';

		new mapboxgl.Map({
			container: uniqueId,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [longitude, latitude],
			zoom: 18,
		});
	}, [longitude, latitude, uniqueId]);
	//Location address https://www.google.com/maps/place/Del+Aire+Baptist+Church/@33.9247581,-118.3676724,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x505ca208d3c632f5!8m2!3d33.924733!4d-118.3654837
	return (
		<Box mt={4} className='outer-map-container'>
			<Container maxWidth='md'>
				<Typography variant='h4' align='center'>
					{title}
				</Typography>
				{description ? (
					<Typography paragraph className='description' align='center'>
						{description}
					</Typography>
				) : (
					<></>
				)}
				<div className='map-contaier'>
					<div className='map-overlay'>
						<StlButton
							className='directions-button'
							onClick={() => {
								window.location.href =
									'https://www.google.com/maps/place/Del+Aire+Baptist+Church/@33.9247581,-118.3676724,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x505ca208d3c632f5!8m2!3d33.924733!4d-118.3654837';
							}}
						>
							Directions
						</StlButton>
					</div>
					<div className='map' id={uniqueId}></div>
				</div>
			</Container>
		</Box>
	);
}
