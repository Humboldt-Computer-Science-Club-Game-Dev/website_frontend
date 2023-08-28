export default function buildMapToLocation(rawS) {
   return {
      name: rawS._type,
      props: {
         title: rawS.title,
         latitude: rawS.latitude ? rawS.latitude : '33.924753',
         longitude: rawS.longitude ? rawS.longitude : '-118.365446',
         description: rawS.description ? rawS.description : null,
      },
   };
}
