import helpers from "./helpers";
import getSanityImageDataFromRefs from "api/getSanityImageDataFromRefs";

let { getImageFromRaw, getFormatedPaddingsFromCustomPadding } = helpers;

export default async function buildGallery(rawS) {
  let imageRefs = [];
  rawS.imageVal.forEach((image) => {
    imageRefs.push(image._ref);
  });

  let rawImages = await getSanityImageDataFromRefs(imageRefs);
  let images = formatImages(rawImages, imageRefs);
  let { paddingTop, paddingBottom } =
    getFormatedPaddingsFromCustomPadding(rawS.customPadding) || {};

  return {
    name: rawS._type,
    props: {
      title: rawS.title,
      description: rawS.description ? rawS.description : null,
      images: images,
      customPaddingTop: paddingTop,
      customPaddingBottom: paddingBottom,
      lightMode: rawS.lightMode ? rawS.lightMode : null,
    },
  };
}

function formatImages(rawI, reffArray) {
  //raw Images
  let partialformatedImages = [];
  let formatedImages = [];
  let newImage;

  for (let i = 0; i < rawI.length; i++) {
    let currentRawImage = rawI[i];
    newImage = null;

    newImage = formatImage(currentRawImage);

    if (newImage)
      partialformatedImages.push({
        img: newImage,
        _ref: currentRawImage._id,
      });
  }

  for (let i = 0; i < reffArray.length; i++) {
    let currentRef = reffArray[i];
    let currentImage = partialformatedImages.find((element) => {
      return element._ref === currentRef;
    });

    if (currentImage) formatedImages.push(currentImage.img);
  }

  return formatedImages;
}

function formatImage(rawI) {
  let src = getImageFromRaw(rawI, "image");

  return {
    src: src,
    title: rawI.imageName ? rawI.imageName : null,
    description: rawI.description ? rawI.description : null,
    isTall: rawI.isWide ? false : true,
    isWide: rawI.isWide,
  };
}
