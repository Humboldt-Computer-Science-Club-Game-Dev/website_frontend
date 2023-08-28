const genericQueryComponent01 = '*[_id == "';
const genericQueryComponent02 = '"][0]';
const initialQueryGenerator = {
	persistantNav: function generatePersistantNav(reference = 'd113ef4a-af8d-47e4-bbb6-dfb7b6ac8421') {
		const persistantNavQueryComonent = '{..., mainNavMenu->{menuItems[]->}, persistantNavItems[]->}';
		return `${genericQueryComponent01}${reference}${genericQueryComponent02}${persistantNavQueryComonent}`;
	},
	navMenu: function generateNavMenu(reference = 'e5b6a4ab-43d2-4b7d-b950-7beb0a7a113c') {
		const navMenuQueryComponent = `{..., mainNavMenu->{..., menuItems[]->}}`;
		return `${genericQueryComponent01}${reference}${genericQueryComponent02}${navMenuQueryComponent}`;
	},
	footer: function generateFooter(reference = 'e5b6a4ab-43d2-4b7d-b950-7beb0a7a113c') {
		const footerQueryComponent = `{..., footerItems[]->}`;
		return `${genericQueryComponent01}${reference}${genericQueryComponent02}${footerQueryComponent}`;
	},
};

function generateInitialQuery(queryType, reference) {
	let intitalQuery = '';

	try {
		intitalQuery = initialQueryGenerator[queryType](reference);
	} catch (err) {
		console.error('faild to generate query because of following error', err);
	}

	return intitalQuery;
}
export default generateInitialQuery;
