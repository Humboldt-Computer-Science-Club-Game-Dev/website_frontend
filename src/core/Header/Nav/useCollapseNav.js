import { useState, useEffect } from 'react';
import sizeStore, { getDefault } from 'utilities/size';

export default function useCollapseNav() {
	let [collapseNav, setCollapseNav] = useState(shouldNavCollapse(getDefault()));
	useEffect(() => {
		let unsubscribeSizeStore = sizeStore.subscribe(() => {
			setCollapseNav(shouldNavCollapse(sizeStore.getState()));
		});

		return () => {
			unsubscribeSizeStore();
		};
	}, [collapseNav]);

	return collapseNav;
}

function shouldNavCollapse(size) {
	if (size === 'xs' || size === 'sm') return true;
	else return false;
}
