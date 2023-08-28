import { Container, Typography } from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import Fade from 'react-reveal/Fade';
import { createMarginPaddingObject } from 'utilities';
import './style.scss';

export default function StylishDisplay({
	orientation = 'ltr',
	title,
	subtitle,
	BGImageDesktop,
	BGImageMobile,
	forgroundImage,
	displayImage,
	lightMode,
	marginAndPadding,
}) {
	const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
	return (
		<div
			style={{ ...createMarginPaddingObject(marginAndPadding) }}
			className={`stylish-display-container ${lightMode ? 'light-mode' : ''}`}
		>
			<Row1Content />
			<DisplayImage isBelow={true} />
		</div>
	);

	function Row1Content() {
		return orientation === 'ltr' ? (
			<RowDisplay>
				<StylishImage />
				<Content />
			</RowDisplay>
		) : (
			<RowDisplay>
				<Content />
				<StylishImage />
			</RowDisplay>
		);

		function RowDisplay({ children }) {
			return <div className={`row-display`}>{children}</div>;
		}
	}

	function StylishImage() {
		return (
			<section className='stylish-image-container'>
				<Fade bottom>
					<img
						alt='background for figure'
						src={isMobile ? BGImageMobile : BGImageDesktop}
						className={`bg-image ${orientation === 'ltr' ? 'left-bg-image' : 'right-bg-image'}`}
					/>
				</Fade>
				<Fade bottom>
					<img
						alt='figure'
						src={forgroundImage}
						className={`forground-image ${
							orientation === 'ltr' ? 'left-forground-image' : 'right-forground-image'
						}`}
					/>
				</Fade>
			</section>
		);
	}

	function Content() {
		return (
			<section className='content-container'>
				<Container maxWidth='md' className='horizontal-center-content'>
					<Title />
					<DisplayImage isBelow={false} />
					<Subtitle />
				</Container>
			</section>
		);
	}

	function Subtitle() {
		return (
			<Fade left={orientation === 'ltr' ? false : true} right={orientation === 'ltr' ? true : false}>
				<p>{subtitle}</p>
			</Fade>
		);
	}

	function Title() {
		return (
			<Fade bottom>
				<Typography className='title' variant={isMobile ? 'h4' : 'h2'} align='left'>
					{title}
				</Typography>
			</Fade>
		);
	}

	function DisplayImage({ isBelow }) {
		return !isMobile && !isBelow ? (
			<DisplayImageWithContainer />
		) : isMobile && !isBelow ? (
			<></>
		) : !isMobile && isBelow ? (
			<></>
		) : isMobile && isBelow ? (
			<DisplayImageWithContainer />
		) : (
			<></>
		);

		function DisplayImageWithContainer() {
			return isBelow ? (
				<Container maxWidth='md' className='horizontal-center-content'>
					<Image />
				</Container>
			) : (
				<Image />
			);
		}

		function Image() {
			return (
				<Fade bottom>
					<img alt='figure 2' src={displayImage} className='display-image' />
				</Fade>
			);
		}
	}
}
