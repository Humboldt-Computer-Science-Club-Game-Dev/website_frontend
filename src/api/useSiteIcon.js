import { useEffect, useState } from 'react';
import useGetSiteSettings from 'api/useGetSiteSettings';
import helpers from 'core/Body/apiFormater/helpers';

let { getImgUrlFromFileName } = helpers;

export default function useSiteIcon() {
	const [siteIcon, setSiteIcon] = useState(null);
	const siteSettings = useGetSiteSettings();
	useEffect(() => {
		if (!siteSettings?.siteIcon?.asset?._ref || siteIcon) return;
		setSiteIcon(getImgUrlFromFileName(siteSettings.siteIcon.asset._ref));
	}, [siteSettings, siteIcon]);

	return siteIcon;
}
