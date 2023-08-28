export default function buildSignUp(rawS) {
   return {
      name: rawS._type,
      props: {
         title: rawS.title,
      },
   };
}
