import formatTypeBlock from './formatTypeBlock';
import helpers from '../helpers';

let { getImgUrlFromFileName } = helpers;

export default function buildRichText(rawR) {
	/* raw rich text */

	if (!rawR) return null;

	let formatedRichTextArray = [];
	let newRichTextBlock;
	let settings = {};
	let settingsBlock = (rawR => {
		if (rawR[0]._type === 'settings') {
			try {
				let returnBlock = rawR[0];
				rawR.splice(0, 1);
				return returnBlock;
			} catch {}
		}
		return {
			alignment: 'center',
		};
	})(rawR);
	settings.alignment = settingsBlock.alignment;

	/* Preformat to make working with lists easier */
	let preformatedRichText = preformatRichText(rawR);

	for (let i = 0; i < preformatedRichText.length; i++) {
		newRichTextBlock = null;
		let block = preformatedRichText[i];
		newRichTextBlock = buildRichBlock(block);

		if (newRichTextBlock) formatedRichTextArray.push(newRichTextBlock);
	}

	let formatedRichText = {
		formatedRichTextArray: formatedRichTextArray,
		settings: settings,
	};

	return formatedRichText;
}

function preformatRichText(rawR) {
	let preformatedRichText = [];
	let groupedList = createGroupedList(rawR);

	for (let i = 0; i < groupedList.length; i++) {
		let currentBlock = groupedList[i];
		let currentNewBlock = currentBlock;
		if (isPsudoBlockList(currentNewBlock)) {
			currentNewBlock = {
				...currentBlock,
				isList: true,
				children: null,
				isArtificial: true,
				listChildren: createListStructure(currentBlock.children, 1, currentBlock.listItem),
			};
		}

		preformatedRichText.push(currentNewBlock);
	}

	return preformatedRichText;
}

function createListStructure(a, c, listItem) {
	let i = 0;
	let returnArray = [];
	while (i < a.length) {
		if (a[i].level > c) {
			let newA = [];
			let oldI = i;

			while (i < a.length && a[i].level > c) {
				++i;
			}
			for (let j = oldI; j < i; j++) {
				newA.push(a[j]);
			}
			let heigherC = c + 1;
			/* returnArray.pop(); */
			returnArray.push({
				isList: true,
				children: null,
				isArtificial: true,
				listItem: listItem,
				listChildren: createListStructure(newA, heigherC, listItem),
			});
		} else if (a[i].level === c) {
			returnArray.push({ ...a[i], listChildren: null });
			++i;
		} else {
			++i;
		}
	}

	return returnArray;
}

function isPsudoBlockList(psudo) {
	return psudo.listItem;
}

function isBlockList(rawB) {
	let type = getTypeFromRawBlock(rawB);
	let switchType = getSwitchTypeFromType(type);
	return switchType === 'list';
}

function createGroupedList(rawR) {
	let newBlock = [];
	let currentList = [];
	let previousListType;
	for (let i = 0; i < rawR.length; i++) {
		let currentBlock = rawR[i];
		if (!isBlockList(currentBlock)) {
			/* not list item*/
			if (currentList.length > 0) {
				newBlock.push({
					listItem: currentList[0].listItem,
					children: currentList,
				});
				currentList = [];
			}

			newBlock.push(currentBlock);
		} else {
			/* is list item */
			if (!currentList[0] && !previousListType) {
				currentList.push(currentBlock);
			} else if (!currentList[0] && previousListType) {
				/* back to list from spans */
				currentList.push(currentBlock);
			} else if (previousListType === currentBlock.listItem) {
				currentList.push(currentBlock);
			} else {
				/* is a diffrent kind of list */
				newBlock.push({
					listItem: currentList[0].listItem,
					children: currentList,
				});
				currentList = [];
				currentList.push(currentBlock);
			}
			previousListType = rawR[i].listItem;
		}
	}
	if (currentList.length > 0) {
		newBlock.push({
			listItem: currentList[0].listItem,
			children: currentList,
		});
	}
	return newBlock;
}

function buildRichBlock(rawB /* raw block data */) {
	let type = getTypeFromRawBlock(rawB);
	let switchType = getSwitchTypeFromType(type);

	let block = null;
	switch (switchType) {
		case 'type':
			block = formatTypeBlock(rawB);
			break;
		case 'list':
			block = formatListBlock(rawB);
			break;
		case 'image':
			block = formatImageBlock(rawB);
			break;
		case 'newLine':
			block = {
				type: 'newLine',
			};
			break;
		default:
			break;
	}

	/* Do a little bit of list formating here then add full functionality to the rich text
   component */

	return block;
}

function formatImageBlock(rawB) {
	let image = getImgUrlFromFileName(rawB.asset._ref);
	return {
		type: 'image',
		src: image,
	};
}

function formatListBlock(rawB) {
	let listType = (rawType => {
		if (rawType === 'bullet') return 'ul';
		else return 'ol';
	})(rawB.listItem);

	let listEle;
	if (rawB.isArtificial) {
		let eleArray = [];
		for (let i = 0; i < rawB.listChildren.length; i++) {
			let currentListBlock = rawB.listChildren[i];
			let newListEle = buildRichBlock(currentListBlock);
			eleArray.push(newListEle);
		}
		listEle = { type: listType, listElements: eleArray };
	} else {
		listEle = formatTypeBlock(rawB);
	}

	return listEle;
}

function getSwitchTypeFromType(type) {
	const LIST = 'list';
	const TYPE = 'type'; /* type as in typography */
	switch (type) {
		case 'ul':
			return LIST;
		case 'ol':
			return LIST;
		case 'paragraph':
			return TYPE;
		case 'h1':
			return TYPE;
		case 'h2':
			return TYPE;
		case 'h3':
			return TYPE;
		case 'h4':
			return TYPE;
		case 'h5':
			return TYPE;
		case 'h6':
			return TYPE;
		default:
			return type;
	}
}

function getTypeFromRawBlock(rawB) {
	if (rawB._type && rawB._type.toString() !== 'richTextBlock') return rawB._type;
	if (rawB.listItem) {
		if (rawB.listItem === 'bullet') {
			return 'ul';
		} else if (rawB.listItem === 'number') {
			return 'ol';
		} else {
			return 'error';
		}
	}
	//#region  Determining if rawB is a new line
	else if (
		rawB.children &&
		rawB.children.length === 1 &&
		rawB.children[0].text === ''
		/* These checks define what a new line block looks like */
	) {
		return 'newLine';
	}
	//#endregion
	else if (rawB.style === 'normal') {
		return 'paragraph';
	} else {
		return rawB.style;
	}
}
