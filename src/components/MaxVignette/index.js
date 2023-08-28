export default function MaxVignette({ CustomZIndex, opacity = '100%' }) {
	return (
		<div
			style={{
				position: 'absolute',
				width: '100%',
				height: '101%',
				zIndex: CustomZIndex,
				opacity: opacity,
			}}
			/* className='vignette' */
			alt='Vignette for site contrast'
		>
			<div className='vignette-top'></div>
			<div className='vignette-bottom'></div>
		</div>
	);
}
