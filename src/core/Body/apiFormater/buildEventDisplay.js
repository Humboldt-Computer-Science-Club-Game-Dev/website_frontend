import helpers from './helpers';
import getSanityDataFromRefs from 'api/getSanityEventDataFromRefs';
import getRefs from 'api/getRef';

let { getImgUrlFromFileName, createStandardClickFromGenericActionButton, formatDateToLookNice } = helpers;

export default async function buildEventDisplay(rawS) {
	const rawEvents = await getPreformatedRawEvents(rawS.events);

	let formatedEvents = [];
	let formatedEvent;

	for (let i = 0; i < rawEvents.length; i++) {
		formatedEvent = null;
		formatedEvent = await formatEvent(rawEvents[i]);
		if (formatedEvent) formatedEvents.push(formatedEvent);
	}

	return {
		name: rawS._type,
		props: {
			lightMode: rawS.lightMode,
			events: formatedEvents,
		},
	};
}

async function getPreformatedRawEvents(rawEvents) {
	if (!rawEvents.length && rawEvents.length !== 0) {
		console.error('No events found in rawEvents');
		return [];
	}
	let refArray = [];
	for (let i = 0; i < rawEvents.length; i++) {
		let ref = rawEvents[i]._ref;
		if (ref) refArray.push({ ref, i });
	}

	let rawRefEvents = await getSanityDataFromRefs(refArray);

	let preFormatedRawEvents = (() => {
		let preFormatedRawEvents = [];
		if (rawRefEvents.hasFailed) {
			console.error(rawRefEvents.message);
			return preFormatedRawEvents;
		}
		for (let i = 0; i < rawRefEvents.length; i++) {
			if (rawRefEvents[i]) preFormatedRawEvents.push(rawRefEvents[i]);
			else if (rawEvents[i]) preFormatedRawEvents.push(rawEvents[i]);
		}

		return rawEvents;
	})();

	return preFormatedRawEvents;
}

async function formatEvent(rawE) {
	//Depending on weather or not the event in question is a
	//refrence or a document, this will effect how the image
	//thumbnail is obtained
	let thumbnail =
		rawE.thumbnail && rawE.thumbnail.image && rawE.thumbnail.image.asset
			? getImgUrlFromFileName(rawE.thumbnail.image.asset._ref)
			: rawE.thumbnail && rawE.thumbnail._ref
			? await (async () => {
					let imgRef = await getRefs(rawE.thumbnail._ref);
					if (!imgRef && !imgRef.image && !imgRef.image.asset && !imgRef.image.asset._ref) return null;
					return getImgUrlFromFileName(imgRef.image.asset._ref);
			  })()
			: null;

	let standardClick = null;
	if (rawE.actionButton && rawE.actionButton.title) {
		standardClick = await createStandardClickFromGenericActionButton(rawE.actionButton);
	}

	return {
		title: rawE.eventName,
		thumbnail: thumbnail,
		date: formatDateToLookNice(rawE.eventDate),
		time: rawE.timeRange,
		description: rawE.description,
		standardClick: standardClick,
		actionButtonTitle: rawE.actionButton && rawE.actionButton.title,
	};
}
