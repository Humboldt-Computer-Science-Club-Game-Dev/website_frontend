import { CircularProgress } from '@material-ui/core';
import './style.scss';

export default function LoadingScreen({ message, className, ...rest }) {
	return (
		<div className={`loading-screen-container ${className}`} {...rest}>
			<div className='inner-container'>
				<h1 className='loading-text'>{message}</h1>
				<CircularProgress className='loading-item' />
			</div>
		</div>
	);
}
