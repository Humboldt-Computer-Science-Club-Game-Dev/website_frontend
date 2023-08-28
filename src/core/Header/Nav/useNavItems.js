import useRawItems from 'utilities/useItemSet/useRawItem';
import { useRef } from 'react';
import useFormatItems from 'utilities/useItemSet/useFormatItems';

export default function useNavItems() {
	/* grab tools from `useRawMenuItems()` API. */
	const navItemsDependencysRef = useRef({
		queryType: 'persistantNav',
		initialRef: 'd113ef4a-af8d-47e4-bbb6-dfb7b6ac8421',
	});
	const rawNavItems = useRawItems(navItemsDependencysRef).items;

	return useFormatItems(rawNavItems);
}
