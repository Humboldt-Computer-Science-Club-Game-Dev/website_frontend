export default function buildGivePayment(rawS) {
	return {
		name: rawS._type,
		props: {
			title: rawS.title,
		},
	};
}
