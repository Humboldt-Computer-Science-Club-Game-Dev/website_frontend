import helpers from './helpers';
import buildRichText from './buildRichText';

let { getImgUrlFromFileName } = helpers;

export default function buildFeaturedVideo(rawS, i) {
	let image = getImgUrlFromFileName(rawS.thumbnail.asset._ref);
	let richText = buildRichText(rawS.richText);

	let newSection = {
		name: rawS._type,
		props: {
			title: rawS.title,
			leadSpeaker: rawS.leadSpeaker,
			date: rawS.date,
			thumbnail: image,
			url: rawS.url,
			subtitle: rawS.subtitle,
			texts: rawS.texts,
			richText: richText,
			videoType: rawS.videoType,
			apiKey: rawS.apiKey,
			channelID: rawS.channelID,
			includePlayIcon: rawS.includePlayIcon,
		},
	};

	return newSection;
}
