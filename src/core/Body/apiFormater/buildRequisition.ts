export default async function buildRequisition(rawS: any) {
  let marginAndPadding = rawS.marginAndPadding;

  return {
    name: rawS._type,
    props: {
      title: rawS.title,
      marginAndPadding,
    },
  };
}
