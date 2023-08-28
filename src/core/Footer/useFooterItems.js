import useRawItems from 'utilities/useItemSet/useRawItem';
import useFormatItems from 'utilities/useItemSet/useFormatItems';

import { useRef } from 'react';

export default function useFooterItems(dependencyRef) {
	/* grab tools from `useRawMenuItems()` API. */
	const footerItemsDependencysRef = useRef({ queryType: 'footer', initialRef: 'footer' });
	const { items } = useRawItems(footerItemsDependencysRef);

	return useFormatItems(items, dependencyRef);
}
