import useRawItems from 'utilities/useItemSet/useRawItem';
import useFormatItems from 'utilities/useItemSet/useFormatItems';

export default function useMenuItems(dependencyRef) {
	/* grab tools from `useRawMenuItems()` API. */

	dependencyRef.current.queryType = 'navMenu';
	dependencyRef.current.initialRef = 'e5b6a4ab-43d2-4b7d-b950-7beb0a7a113c';

	const { items, menuReferences, popMenuReference, pushMenuReference } = useRawItems(dependencyRef);

	dependencyRef.current.onBack = popMenuReference;
	dependencyRef.current.menuReferences = menuReferences;
	dependencyRef.current.pushMenuReference = pushMenuReference;

	return useFormatItems(items, dependencyRef);
}
