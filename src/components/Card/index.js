import { Typography } from '@material-ui/core';
import StlButton from 'components/StlButton';
import Slide from 'react-reveal/Slide';
import './style.scss';
export default function FaithlifeGiving({
	color1 = '#86BA76',
	color2 = 'rgba(2,0,36,0)',
	fixedHeight = '15rem',
	BGImage = '/temporary_delete_me/FaithlifeGiving.png',
	foregroundImage = '/temporary_delete_me/FaithlifeGiving.png',
	title = 'Give Via Faithlife',
	subtitle = 'Thank you for your generous support of our ministry. Your tithes and offerings support our church, community, and missions. We are grateful for your partnership!',
	standardClick = { href: 'https://faithlife.com/del-aire-baptist-church-hawthorne-ca/give', type: 'externalLink' },
	actionButton,
	lightMode = true,
}) {
	//Creates only styles that need interpritation from js
	const cardBGStyle = createBGStyle({ color1, color2, fixedHeight, BGImage });

	return (
		<div className={`card-container ${lightMode ? 'light-mode' : ''}`}>
			<section style={{ height: fixedHeight }} className='card-bg-container'>
				<Slide bottom /* className='slide-container' */>
					<span className='card-bg' style={cardBGStyle}></span>
				</Slide>
				<Slide bottom>
					<img alt='' className='card-forgorund' src={foregroundImage} />
				</Slide>
			</section>
			<section className='content-container'>
				<Slide bottom>
					<Typography variant='h4'>{title}</Typography>
				</Slide>
				<Slide bottom>
					<p>{subtitle}</p>
				</Slide>
				<Slide bottom>
					{actionButton ? (
						<StlButton standardClick={standardClick} lightMode={lightMode}>
							{actionButton}
						</StlButton>
					) : (
						<></>
					)}
				</Slide>
			</section>
		</div>
	);
}

function createBGStyle({ color1, color2, fixedHeight, BGImage }) {
	const situation = (() => {
		if (color1 && color2) {
			return 'dynamicBG';
		} else if (BGImage) {
			return 'fixedBGImage';
		}
	})();
	switch (situation) {
		case 'dynamicBG':
			return {
				height: fixedHeight,
				background: `linear-gradient(0deg, ${color2} 0%, ${color1} 91%)`,
			};
		case 'dynamicBGImage':
			return {
				height: 'auto',
				backgroundImage: `url("${BGImage}")`,
			};
		default:
			console.log(`No handle code is present for ${situation}`);
			return { height: '15rem' };
	}
}
