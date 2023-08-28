import helpers from './helpers';

let { calculatePtFromIndex, getFormatedPaddingsFromCustomPadding } = helpers;

export default function buildFormatedSectionTitleObject(rawS, i) {
   let { paddingTop, paddingBottom } =
      getFormatedPaddingsFromCustomPadding(rawS.customPadding) || {};
   let newSection = {
      name: rawS._type,
      props: {
         title: rawS.title,
         size: 'h1' /* This property is had coded for now */,
         bgcolor: rawS.backgroundColor,
         color: rawS.textColor,
         pt: calculatePtFromIndex(i) || paddingTop,
         pb: paddingBottom,
      },
   };

   return newSection;
}
