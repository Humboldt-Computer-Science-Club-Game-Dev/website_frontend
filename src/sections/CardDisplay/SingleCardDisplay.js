import Card from 'components/Card';
import { Container } from '@material-ui/core';
import './style.scss';
export default function TemporaryContainer(props) {
	return (
		<div className='single-card-container'>
			<Container maxWidth='md' className='temporary-card-inner-container'>
				<Card {...props.cards[0]} />
			</Container>
		</div>
	);
}
