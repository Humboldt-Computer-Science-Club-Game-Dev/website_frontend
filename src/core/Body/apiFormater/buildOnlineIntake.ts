import helpers from "./helpers";

let { getImgUrlFromFileName } = helpers;

export default function buildOnlineIntake(rawS: any) {
  console.log("rawS", rawS);
  const newSection = {
    name: rawS._type,
    props: {
      title: rawS?.title,
      BG: getImgUrlFromFileName(rawS?.backgroundImage?.asset?._ref),
      calendyRouteID: rawS?.calendyRouteID,
      fixedCalendyHeightDesktop: rawS?.fixedCalendyHeightDesktop,
      fixedCalendyHeightMobile: rawS?.fixedCalendyHeightMobile,
    },
  };

  return newSection;
}
