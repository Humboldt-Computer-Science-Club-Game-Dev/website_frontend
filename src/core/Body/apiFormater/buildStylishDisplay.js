import helpers from './helpers';

let { getImgUrlFromFileName } = helpers;

export default function buildStandaloneText(rawS) {
	let newSection = {
		name: rawS._type,
		props: {
			lightMode: rawS.lightMode,
			title: rawS?.title,
			subtitle: rawS?.subtitle,
			BGImageDesktop: getImgUrlFromFileName(rawS?.BGImageDesktop?.asset?._ref),
			BGImageMobile: getImgUrlFromFileName(rawS?.BGImageMobile?.asset?._ref),
			forgroundImage: getImgUrlFromFileName(rawS?.forgroundImage?.asset?._ref),
			displayImage: getImgUrlFromFileName(rawS?.displayImage?.asset?._ref),
			orientation: rawS?.orientation,
			marginAndPadding: rawS?.marginAndPadding,
		},
	};

	return newSection;
}
