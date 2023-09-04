import getSiteSettings from "api/getSiteSettings";

export default async function buildFeaturedVideo(rawS, i) {
  const siteSettings = (await getSiteSettings()) || {};
  let newSection = {
    name: rawS._type,
    props: {
      discordInvite: siteSettings?.discordInvite,
    },
  };

  return newSection;
}
