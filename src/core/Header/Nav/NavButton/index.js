import { Button, Grid, Typography } from '@material-ui/core';
import './NavButton.scss';

export default function NavButtton({ title, icon, onClick, className, ...rest }) {
	return (
		<Grid item className={`${className} navbar-button-container`} {...rest}>
			<Button className='navbar-button' onClick={onClick}>
				{icon && icon.left ? <icon.src style={{ marginRight: '0.5rem' }} /> : <></>}
				<Typography className='nav-button-text' paragraph color='primary'>
					{title}
				</Typography>
				{icon && !icon.left ? <icon.src style={{ marginLeft: '0.5rem' }} /> : <></>}
			</Button>
		</Grid>
	);
}
