export default function buildQueryIntake(rawS: any) {
  return {
    name: rawS._type,
    props: {
      title: rawS.title,
    },
  };
}
