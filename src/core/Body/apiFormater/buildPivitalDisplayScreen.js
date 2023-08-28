import buildRichText from './buildRichText';
import helpers from './helpers';

let { getImgUrlFromFileName, calculatePtFromIndex, getFormatedActionButtonComponents, createStandardClickData } =
	helpers;

export default async function buildPivitalDisplayScreen(rawS, i) {
	let imgSrc = rawS.imgSrc ? getImgUrlFromFileName(rawS.imgSrc.asset._ref) : null;
	let richText = rawS.richText ? buildRichText(rawS.richText) : null;
	let formatedActionButton = await getFormatedActionButtonComponents(rawS.actionButton);
	let standardClick = await createStandardClickData(formatedActionButton, null, rawS.actionButton);

	let newSection = {
		name: rawS._type,
		props: {
			title: rawS.title,
			text: rawS.text,
			actionButtonTitle: rawS.actionButton.title,
			imgSrc: imgSrc,
			actionButtonLink: rawS.actionButton.onClick === 'link' ? rawS.actionButton.link : '',
			actionButtonFunction: () => {},
			orientation: rawS.orientation,
			pt: calculatePtFromIndex(i),
			richText: richText,
			standardClick: standardClick,
			lightMode: rawS.lightMode ? rawS.lightMode : null,
		},
	};

	return newSection;
}
