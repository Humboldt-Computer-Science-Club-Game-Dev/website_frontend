export default function buildHorizontalRule(rawS) {
   return {
      name: 'horizontalRule',
      props: {
         enable: true,
         lightMode: rawS.lightMode,
      },
   };
}
