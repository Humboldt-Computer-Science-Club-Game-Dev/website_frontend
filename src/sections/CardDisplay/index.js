import React from 'react';
import SingleCardDisplay from './SingleCardDisplay';
import MultipleCardsDisplay from './MultipleCardsDisplay';
export default function CardDisplay(props) {
	return props?.cards?.length === 1 ? <SingleCardDisplay {...props} /> : <MultipleCardsDisplay {...props} />;
}
