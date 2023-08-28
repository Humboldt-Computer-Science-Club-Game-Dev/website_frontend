import buildCard from './buildCard';

export default async function buildCardDisplaySection(rawS) {
	let cards = await (async () => {
		let cards = [];
		let rawCards = rawS.cards;
		for (let i = 0; i < rawCards?.length || 0; i++) {
			let newCard = await buildCard(rawCards[i], {
				lightMode: rawS?.lightMode,
			});
			cards.push(newCard);
		}
		return cards;
	})();

	let newSection = {
		name: rawS._type,
		props: {
			lightMode: rawS?.lightMode,
			cards,
			marginAndPadding: rawS?.marginAndPadding,
		},
	};

	return newSection;
}
