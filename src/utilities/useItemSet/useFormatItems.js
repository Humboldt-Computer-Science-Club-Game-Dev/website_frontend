import { useEffect, useState } from 'react';
import routeStore from 'utilities/routeStore';
import userStore from 'api/auth/userStore';
import formatRichText from 'core/Body/apiFormater/buildRichText';
import dependenciesProptotype from './dependenciesProptotype';
import helpers from 'core/Body/apiFormater/helpers';

let { getImgUrlFromFileName } = helpers;

export default function useFormatItems(rawMenuItems, dependencies) {
	const [formatedMenuItems, setFormatedMenuItems] = useState([]);
	const [user, setUser] = useState(userStore.getState());

	useEffect(() => {
		let unsub = userStore.subscribe(() => {
			setUser(userStore.getState());
		});

		return () => {
			unsub();
		};
	}, [user]);

	useEffect(() => {
		formatFooterItems(dependencies, rawMenuItems);
		setFormatedMenuItems(formatMenuItems(rawMenuItems, dependencies));
	}, [rawMenuItems, user, dependencies]);

	return formatedMenuItems;
}

function formatFooterItems(dependencies = dependenciesProptotype, rawMenuItems) {
	try {
		dependencies.current.social = getFormatedSocials(rawMenuItems);
		dependencies.current.subtitle = getFormatSubtitle(rawMenuItems);
	} catch (e) {
		console.error(e);
	}
}

function formatMenuItems(rawMenuItems, dependencies = dependenciesProptotype) {
	//TODO: get type of rawMenuITems and use type to determine how to format
	dependencies.current.menuName = rawMenuItems?.title
		? rawMenuItems.title
		: rawMenuItems?.mainNavMenu?.title
		? rawMenuItems?.mainNavMenu?.title
		: '';

	const rawMenuItemsArry =
		(rawMenuItems?.mainNavMenu?.menuItems
			? rawMenuItems.mainNavMenu.menuItems
			: rawMenuItems?.menuItems
			? rawMenuItems?.menuItems
			: rawMenuItems?.persistantNavItems
			? rawMenuItems?.persistantNavItems
			: rawMenuItems?.footerItems) || [];

	const menuItems = [];

	for (let i = 0; i < rawMenuItemsArry.length; i++) {
		const rawMenuItem = rawMenuItemsArry[i];
		const menuItemTitle = rawMenuItem.title || rawMenuItem.pageDisplayName || null;
		const menuItemOnClick = buildMenuItemOnClick(rawMenuItem, dependencies);
		const type = rawMenuItem._type;
		let menuItem = {
			title: menuItemTitle,
			onClick: menuItemOnClick,
			type,
		};

		if (determineWeatherToShowMenuItem(rawMenuItem)) menuItems.push(menuItem);
	}

	return menuItems;
}

function getFormatSubtitle(rawMenuItems) {
	if (rawMenuItems?.subtitle?.length) {
		return formatRichText(rawMenuItems.subtitle);
	}
	return null;
}

function getFormatedSocials(rawMenuItems) {
	let socials = rawMenuItems.social;
	if (!socials?.length) return null;

	let formatedSocials = [];
	let formatedSocial;
	for (let i = 0; i < socials.length; i++) {
		formatedSocial = null;
		let current = socials[i];

		formatedSocial = formatSocials(current);

		if (formatedSocial) formatedSocials.push(formatedSocial);
	}

	return formatedSocials.length ? formatedSocials : null;

	function formatSocials(rawS) {
		//Raw social data
		let formatedSocial = {
			icon: getImgUrlFromFileName(rawS.icon.asset._ref),
			href: rawS.url,
		};
		return formatedSocial;
	}
}

function determineWeatherToShowMenuItem(rawMenuItem) {
	const hasTitle = rawMenuItem.title || rawMenuItem.pageDisplayName || null;
	const user = userStore.getState();

	if (!hasTitle) return false;
	if (rawMenuItem?.hideIf && rawMenuItem.hideIf === 'noUserPressent' && !user) return false;
	if (rawMenuItem?.hideIf && rawMenuItem.hideIf === 'userPressent' && user) return false;
	return true;
}

function buildMenuItemOnClick(rawMenuItem, dependencies = dependenciesProptotype) {
	const { pushMenuReference } = dependencies.current;
	if (rawMenuItem._type === 'navMenu') {
		return () => {
			pushMenuReference(rawMenuItem._id);
		};
	} else if (rawMenuItem._type === 'page') {
		if (rawMenuItem.onClick === 'link') {
			return () => {
				//change page
				routeStore.dispatch({
					type: 'updateCurrentLocation',
					currentLocation: `/${rawMenuItem.slug.current}`,
				});
				dependencies.current.setExpandMenu(false);
			};
		} else if (rawMenuItem.onClick === 'signOut') {
			return () => {
				userStore.dispatch({ type: 'signOut' });
			};
		}
	}
}
