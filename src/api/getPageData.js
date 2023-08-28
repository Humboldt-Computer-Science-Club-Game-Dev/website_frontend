import pageQueryArrayFromHref from 'utilities/pageQueryArrayFromHref';
import client from 'config/sanityClient';

function getPageData(href) {
	if (!href) {
		return Promise.reject({
			message: 'Canot run get page data API without specigying a page',
		});
	}

	let queryArray = pageQueryArrayFromHref(href);

	let basePageSLUG = queryArray[0];

	const query = `*[_type == "page" && slug.current == "${basePageSLUG}"]{ ..., sections}`;
	return new Promise((resolve, reject) => {
		client
			.fetch(query)
			.then(pages => {
				resolve(pages);
			})
			.catch(err => {
				reject(err);
			});
	});
}

export default getPageData;
