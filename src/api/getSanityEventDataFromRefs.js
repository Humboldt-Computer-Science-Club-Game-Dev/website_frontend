import client from 'config/sanityClient';

export default function getSanityDataFromRefs(refs) {
	if (!refs || refs.length < 0) {
		return Promise.resolve({
			hasFailed: true,
			message: 'Missing required arguments',
		});
	}

	let formatedRefs = '[';
	for (let i = 0; i < refs.length; i++) {
		formatedRefs += `"${refs[i].ref}"${i !== refs.length - 1 ? ',' : ''} `;
	}
	formatedRefs += ']';

	const query = `*[ _id in ${formatedRefs} ] | order(eventDate) {..., thumbnail->}`;

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
