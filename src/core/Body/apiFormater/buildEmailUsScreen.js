export default function buildEmailUsScreen(rawS) {
   return {
      name: rawS._type,
      props: {
         title: rawS.displayTitle,
         actionButtonName: rawS.actionButtonName,
      },
   };
}
