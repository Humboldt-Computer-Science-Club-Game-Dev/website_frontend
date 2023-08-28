import helpers from './helpers';
import buildRichText from './buildRichText';

let { buildTitleSubtitleTextComboFromRaw } = helpers;

export default function buildStandaloneText(rawS) {
   let titleSubtitleTextCombo = buildTitleSubtitleTextComboFromRaw(rawS);
   let richText = rawS.richText ? buildRichText(rawS.richText) : null;
   let newSection = {
      name: rawS._type,
      props: {
         lightMode: rawS.lightMode,
         richText: richText,
         ...titleSubtitleTextCombo,
      },
   };

   return newSection;
}
