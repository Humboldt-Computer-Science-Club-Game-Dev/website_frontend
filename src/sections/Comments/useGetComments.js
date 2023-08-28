import { useState, useEffect } from 'react';
import { authRouteStore } from 'api/auth/userStore';

const DEBUG_COMMENTS = false;

const useGetComments = sectionID => {
	const [refresher, setRefresher] = useState(false);
	const [comments, setComments] = useState(null);
	useEffect(() => {
		try {
			fetch(`${authRouteStore.getState()}/comments?sectionID=${sectionID}`)
				.then(res => res.json())
				.then(res => {
					setComments(res.comments);
				})
				.catch(err => {
					if (DEBUG_COMMENTS) console.error(err);
				});
		} catch (err) {
			if (DEBUG_COMMENTS) console.error(err);
		}
	}, [refresher, sectionID]);

	return {
		comments,
		refresh: () => {
			setRefresher(!refresher);
		},
	};
};

export default useGetComments;
