import { useState, useEffect } from "react";

import getSiteSettings from "./getSiteSettings";

export default function useGetSiteSettings() {
  const [siteSettings, setSiteSettings] = useState({});

  useEffect(() => {
    (() => {
      getSiteSettings().then((data) => {
        setSiteSettings(data);
      });
    })();
  }, []);

  return siteSettings;
}
