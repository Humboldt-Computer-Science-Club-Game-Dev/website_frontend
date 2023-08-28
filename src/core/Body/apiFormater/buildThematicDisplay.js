import helpers from './helpers';
import buildRichBlock from '../apiFormater/buildRichText';

let { buildTitleSubtitleTextComboFromRaw } = helpers;

export default function buildThematicDisplay(rawS) {
   let titleSubtitleTextCombo = buildTitleSubtitleTextComboFromRaw(rawS);
   let richText = rawS.richText ? buildRichBlock(rawS.richText) : null;
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
