import { useState } from 'react';
import './style.scss';

export default function FluidYoutubeVideo({ thumbnail, id, includePlayIcon }) {
	let [hideThumbnail, setHideThumbnail] = useState(false);

	let Thumbnail = function () {
		let onClick = { onClick: clickedOnThumbnail };

		return (
			<>
				{includePlayIcon ? (
					<div className='play-icon-container' {...onClick}>
						<img className='play-icon' src='/icons/play.png' alt='play' />
					</div>
				) : (
					''
				)}
				<img
					className='content thumbnail-image-for-fluid-iframe'
					src={thumbnail}
					{...onClick}
					alt='video thumbnail'
				/>
			</>
		);
	};

	let Video = function () {
		return (
			<iframe
				className='content fluid-youtube-video-iframe'
				src={`https://www.youtube.com/embed/${id}`}
				title='YouTube Video Player'
				frameBorder='0'
				autoPlay
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
				width='100%'
				height='20rem'
				allowFullScreen
				style={{ height: '20rem' }}
			></iframe>
		);
	};

	let Content;

	if (hideThumbnail) Content = Video;
	else Content = Thumbnail;

	function clickedOnThumbnail() {
		setHideThumbnail(true);
	}

	return (
		<div className='fluid-youtube-video-container'>
			<Content />
		</div>
	);
}
