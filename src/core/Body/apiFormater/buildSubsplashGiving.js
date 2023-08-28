import helpers from "./helpers";

export default function buildStandaloneText(rawS) {
  let newSection = {
    name: rawS._type,
    props: {
      subsplashID: rawS?.subsplashID || rawS?.subsplashId,
      marginAndPadding: rawS?.marginAndPadding,
    },
  };

  return newSection;
}
