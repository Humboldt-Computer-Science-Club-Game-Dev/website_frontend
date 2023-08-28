import { useState } from 'react';

import Box from '@material-ui/core/Box';
import { Typography, Container } from '@material-ui/core';
import './PivotalDisplay.scss';

import StlParagraph from 'components/StlParagraph';
import StlButton from 'components/StlButton';
import RichText from 'components/RichText';
import sizeStore from 'utilities/size';
import Fade from 'react-reveal/Fade';

export default function PivotalDisplay({
	title,
	text,
	actionButtonTitle,
	orientation = 'ltr',
	imgSrc,
	pt = null,
	richText,
	standardClick,
	lightMode = false,
}) {
	let [isMobile, setIsMobile] = useState(getIsMobileBool());

	sizeStore.subscribe(() => {
		setisMobileState();
	});

	return (
		<Box
			display='flex'
			flexDirection='column'
			width='100%'
			height='110vh'
			bgcolor='black'
			className={`pivotal-display-container ${lightMode ? 'light-mode' : ''}`}
			pt={pt ? pt : ''}
		>
			<Container maxWidth='md' className='landing-material-container'>
				<Box className='horizontal-centerer' width='100%' height='auto'>
					<Box display='flex' flexDirection='column' height='auto' className='side left-side'>
						{orientation === 'ltr' ? <TextSide /> : <ImgSide />}
					</Box>
					<Box display='flex' flexDirection='column' height='auto' className='side right-side'>
						{orientation === 'ltr' ? <ImgSide /> : <TextSide />}
					</Box>
				</Box>
			</Container>
		</Box>
	);

	function TextSide() {
		return (
			<InnerSideContainer>
				<Fade bottom cascade>
					<Typography
						className='title'
						variant='h4'
						style={{
							marginTop: isMobile && orientation === 'rtl' ? '1rem' : '0rem',
							textAlign: 'center',
						}}
					>
						{title}
					</Typography>
					{text ? (
						<StlParagraph
							paragraph
							style={{
								marginTop: title ? '1rem' : '0rem',
								textAlign: 'center',
							}}
							className={`pivital-text`}
						>
							{text}
						</StlParagraph>
					) : (
						<></>
					)}
					{richText ? (
						<Box mt={title ? '1rem' : '0rem'}>
							<RichText richText={richText} />{' '}
						</Box>
					) : (
						<></>
					)}
					{actionButtonTitle ? (
						<StlButton
							className='action-button'
							style={{
								marginTop: title || text ? '1rem' : '0rem',
								marginLeft: 'auto',
								marginRight: 'auto',
							}}
							standardClick={standardClick}
							lightMode={lightMode}
						>
							{actionButtonTitle}
						</StlButton>
					) : (
						<></>
					)}
				</Fade>
			</InnerSideContainer>
		);
	}

	function ImgSide() {
		return (
			<InnerSideContainer>
				<Fade bottom>
					<img
						className=''
						src={imgSrc}
						style={{
							marginTop: isMobile && orientation === 'ltr' ? '1rem' : '0rem',
						}}
						alt='this is related to the pivital display'
					/>
				</Fade>
			</InnerSideContainer>
		);
	}

	function InnerSideContainer({ children }) {
		return (
			<Box width='100%' height='auto' className='inner-side-container'>
				{children}
			</Box>
		);
	}

	function getIsMobileBool() {
		let size = sizeStore.getState();
		let newIsMobile = false;
		if (size === 'xs' || size === 'sm' || size === 'md') newIsMobile = true;
		return newIsMobile;
	}
	function setisMobileState() {
		let newIsMobile = getIsMobileBool();

		setIsMobile(newIsMobile);
	}
}
