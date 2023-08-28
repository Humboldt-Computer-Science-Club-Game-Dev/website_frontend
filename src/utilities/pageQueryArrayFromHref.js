export default function pageQueryArrayFromHref(href) {
	let paramArray = href.split('/');
	paramArray.splice(0, 1);
	if (paramArray[0] === '') {
		paramArray[0] = 'home';
	}

	paramArray[0].toLowerCase();
	return paramArray;
}
