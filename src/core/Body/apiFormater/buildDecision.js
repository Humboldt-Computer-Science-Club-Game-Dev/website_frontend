import helpers from './helpers';

let { getImageFromRaw, getActionButton } = helpers;

export default async function buildDecisionSection(rawS) {
	let decitions = [];
	let rawDecitions = rawS.decitions;

	for (let i = 0; i < rawDecitions.length && i < 3; i++) {
		let newDecision = await buildDecision(rawDecitions[i]);
		decitions.push(newDecision);
	}

	let newSection = {
		name: rawS._type,
		props: {
			decitions: decitions,
		},
	};

	return newSection;
}

async function buildDecision(rawD) {
	let bgImage = getImageFromRaw(rawD, 'bgImage');
	let actionButton = await getActionButton(rawD.actionButton);

	let newD = {
		title: rawD.title,
		bgImage: bgImage,
		texts: rawD.texts,
		actionButton,
	};

	return newD;
}
