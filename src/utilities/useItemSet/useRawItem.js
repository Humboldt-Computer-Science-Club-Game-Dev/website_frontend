import { useState, useEffect } from 'react';
import client from 'config/sanityClient';
import { initialQueryGenerator } from 'utilities/useItemSet';
import dependenciesProptotype from './dependenciesProptotype';

export default function useRawItems(dependenciesRef = dependenciesProptotype) {
	//TODO: Refactore this file and useRawMenuItems togather. the difference between these files is the reference that they start with in the array below. (Also another difference is how the data is quired. its only a small difference)
	const [menuReferences, setMenuReferences] = useState([dependenciesRef.current.initialRef]);
	const [items, setItems] = useState([]);

	useEffect(() => {
		const initialQuery = initialQueryGenerator(dependenciesRef.current.queryType, menuReferences[0]);
		const query =
			menuReferences.length === 1
				? initialQuery
				: `*[_id == "${menuReferences[menuReferences.length - 1]}"][0]{..., menuItems[]->}`;

		client
			.fetch(query)
			.then(data => {
				if (dependenciesRef.current.queryType === 'footer') {
				}
				setItems(data);
			})
			.catch(err => {
				console.log(err);
			});
	}, [menuReferences, dependenciesRef]);

	return {
		items,
		popMenuReference: () => {
			const bufferMenuReferences = JSON.parse(JSON.stringify(menuReferences));
			bufferMenuReferences.pop();
			setMenuReferences(bufferMenuReferences);
		},
		pushMenuReference: ref => setMenuReferences([...menuReferences, ref]),
		menuReferences,
	};
}
