import { useState, useRef, useEffect } from 'react';
import { Grid, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core';
import NavButtton from './NavButton';
import useMenuItems from './useMenuItems';
import handleNavShadow from './navShadow';
//TODO: fix the file structure in the file below
import useNavItems from './useNavItems';
import './style.scss';
import { useMediaQuery } from 'react-responsive';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import routeStore from 'utilities/routeStore';

export default function NavMenu() {
	const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
	let [expandMenu, setExpandMenu] = useState(false);
	const menuItemsRef = useRef({ setExpandMenu });
	const menuItems = useMenuItems(menuItemsRef);
	const navItems = useNavItems(menuItemsRef);

	useEffect(() => {
		handleNavShadow.init();

		return () => {
			handleNavShadow.exit();
		};
	}, []);

	const NavItems = navItems.map((navItem, i) => {
		const title = navItem.pageDisplayName ? navItem.pageDisplayName : navItem.title;
		return <NavButtton className={'nav-item'} key={i} title={title} onClick={navItem.onClick} />;
	});

	const MenuItems = menuItems.map((navItem, i) => {
		const title = navItem.pageDisplayName ? navItem.pageDisplayName : navItem.title;
		const type = navItem.type;

		return (
			<div onClick={navItem.onClick} key={i} className='nav-menu-button-container'>
				<NavButtton title={title} />
				{type === 'navMenu' ? <img src='/icons/white-next.svg' alt='next' /> : <></>}
			</div>
		);
	});

	return (
		<nav className='nav-container'>
			<Toolbar className='nav-toolbar-container'>
				<Grid container align='center' justifyContent='center' alignItems='center' spacing={isMobile ? 0 : 2}>
					<NavButtton
						title={isMobile ? '' : 'Home'}
						icon={{ left: true, src: HomeIcon }}
						onClick={() => {
							routeStore.dispatch({
								type: 'updateCurrentLocation',
								currentLocation: `/`,
							});
						}}
					/>
					{NavItems}
					<SwipeableDrawer
						open={expandMenu}
						anchor='right'
						onClose={() => {
							setExpandMenu(false);
						}}
						onOpen={() => {}}
					>
						<div
							className='nav-back-title-container'
							onClick={
								menuItemsRef.current.menuReferences.length > 1
									? menuItemsRef.current.onBack
									: () => {
											console.log('dose not have back');
									  }
							}
						>
							{menuItemsRef.current.menuReferences.length > 1 ? (
								<button
									style={{
										backgroundImage: 'url(/nav/back.svg)',
									}}
									className='nav-back-button'
								></button>
							) : (
								<></>
							)}

							<Typography variant='h6' className='nav-title'>
								{menuItemsRef.current.menuName}
							</Typography>
						</div>
						{MenuItems.slice(0, MenuItems.length)}
					</SwipeableDrawer>
					<NavButtton
						title={isMobile ? '' : 'Menu'}
						icon={{ left: false, src: MenuIcon }}
						onClick={() => {
							setExpandMenu(true);
						}}
					/>
				</Grid>
			</Toolbar>
		</nav>
	);
}
