import { useState, useEffect } from 'react';
import client from 'config/sanityClient';

export default function useGetSiteSettings() {
	const [siteSettings, setSiteSettings] = useState({});

	useEffect(() => {
		const query = `*[_type == "siteSettings"][0]{...}`;

		client
			.fetch(query)
			.then(data => {
				setSiteSettings(data);
			})
			.catch(console.error);
	}, []);

	return siteSettings;
}
