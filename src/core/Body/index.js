import { useEffect, useState, useRef } from 'react';
import getPageData from 'api/getPageData.js';
import isAPILoadingStore from 'utilities/isAPILoadingStore.js';
import structuredContentStore from 'utilities/structuredContentStore.js';
import routeStore from 'utilities/routeStore.js';
import CreateBody from './createBody';
import LoadingScreen from 'components/LoadingScreen';
let SmoothScroll = require('smoothscroll-for-websites');

export default function Body() {
	let [body, setBody] = useState({
		building: false,
		JSX: null,
	}); /* its unset */
	let [page, setPage] = useState({
		waitingForSanityAPI: false,
		path: routeStore.getState().currentLocation,
	});
	let hasPathChanged = useHasChanged(page.path);
	const containerRef = useRef(null);

	useEffect(() => {
		if (page.waitingForSanityAPI) {
			setPage({ waitingForSanityAPI: false, path: page.path });
			setBody({ building: true, JSX: body.JSX });
			getPageData(page.path).then(rawSanityData => {
				(async () => {
					let { JSX, formatedData } = await CreateBody(rawSanityData, containerRef);
					setBody({ building: false, JSX: JSX });

					isAPILoadingStore.dispatch({
						type: 'pageDataUpdate',
						isPageLoading: false,
					});
					structuredContentStore.dispatch({
						type: 'updateCurrentPage',
						currentPage: formatedData,
					});
				})();
			});
		}
	}, [body, page]);

	useEffect(() => {
		let pathChangedUnsubscription = routeStore.subscribe(() => {
			setPage({
				path: routeStore.getState().currentLocation,
				waitingForSanityAPI: true,
			});
		});
		if (hasPathChanged) {
			setPage({ path: page.path, waitingForSanityAPI: true });
			isAPILoadingStore.dispatch({
				type: 'pageDataUpdate',
				isPageLoading: true,
			});
		}
		return () => {
			pathChangedUnsubscription();
		};
	}, [page, hasPathChanged]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [body]);

	useEffect(() => {
		SmoothScroll({
			stepSize: 50,
			accelerationDelta: 500,
			animationTime: 1000,
		});
	}, []);

	//#region Custon Hooks
	function useHasChanged(val) {
		const prevVal = usePrevious(val);
		return prevVal !== val;
	}
	function usePrevious(value) {
		const ref = useRef();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	}
	//#endregion

	if (body.building) {
		return <LoadingScreen message={`building`} />;
	} else if (!page.waitingForSanityAPI && !body.building) {
		return body.JSX;
	} else {
		return <LoadingScreen message={`Loading`} />;
	}
}
