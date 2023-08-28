import helpers from "./helpers";
import client from "config/sanityClient";

let {
  getFormatedActionButtonComponents,
  createStandardClickData,
  getImgUrlFromFileName,
} = helpers;

export default async function buildCard(rawC, deps) {
  const query = `*[_type == "card" && _id == "${rawC._ref}"]{ ..., sections}`;
  const card = await (async () => {
    if (rawC._type === "card") return rawC;

    return new Promise((resolve, reject) => {
      client
        .fetch(query)
        .then((card) => {
          resolve(card[0]);
        })
        .catch((err) => {
          reject(err);
        });
    });
  })();
  if (!card) return {};

  let formatedActionButton = await getFormatedActionButtonComponents(
    card.actionButton
  );
  let standardClick = await createStandardClickData(
    card.actionButton,
    formatedActionButton.changePageToName
  );

  let newCard = {
    name: card._type,
    title: card?.title,
    subtitle: card?.subtitle,
    color1: card?.color1,
    color2: card?.color2,
    fixedHeight: card?.fixedHeight,
    BGImage: card?.BGImage,
    foregroundImage: getImgUrlFromFileName(card?.forgroundImage?.asset?._ref),
    standardClick,
    lightMode: deps?.lightMode,
    actionButton: card?.actionButton?.title ? card?.actionButton?.title : "",
  };

  return newCard;
}
