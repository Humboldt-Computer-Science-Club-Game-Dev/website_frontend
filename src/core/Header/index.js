import { AppBar } from '@material-ui/core';
import NavMenu from './Nav';
import './style.scss';

export default function Header() {
	return (
		<AppBar className='header-container' position='fixed' top={0}>
			<NavMenu />
		</AppBar>
	);
}
