import { Container } from '@material-ui/core';
import Card from 'components/Card';
import createMarginPaddingStyles from 'utilities/createMarginPaddingObject';
import React from 'react';
export default function MultipleCardsDisplay({ cards, lightMode, marginAndPadding }) {
	return (
		<div
			className={`multiple-cards-display-container ${lightMode ? 'light-mode' : ''}`}
			style={createMarginPaddingStyles(marginAndPadding)}
		>
			<Container className='inner-container' maxWidth='md'>
				{cards ? (
					cards.map((card, i) => {
						return (
							<div className='card-outer-container'>
								<Card key={i} {...card} />
							</div>
						);
					})
				) : (
					<></>
				)}
			</Container>
		</div>
	);
}
