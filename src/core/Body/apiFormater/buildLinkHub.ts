import helpers from "./helpers";
import client from "config/sanityClient";

let {
  getFormatedActionButtonComponents,
  createStandardClickData,
  getImgUrlFromFileName,
  createOnclick,
} = helpers;

export default async function buildLinkHub(rawS: any) {
  console.log("Link Hub rawS:", rawS);

  const linkItem1 = await createLinkItem(rawS.link1);
  const linkItem2 = await createLinkItem(rawS.link2);
  const linkItem3 = await createLinkItem(rawS.link3);
  const linkItem4 = await createLinkItem(rawS.link4);

  const social1 = await createLinkItem(rawS.socialLink1, { type: "social" });
  const social2 = await createLinkItem(rawS.socialLink2, { type: "social" });
  const social3 = await createLinkItem(rawS.socialLink3, { type: "social" });

  const footer = await createLinkItem(rawS.footer, { type: "footer" });

  return {
    name: rawS._type,
    props: {
      title: rawS.title,
      footer,
      linkItem1,
      linkItem2,
      linkItem3,
      linkItem4,
      social1,
      social2,
      social3,
    },
  };
}

async function createLinkItem(linkItem: any, options?: any) {
  if (options?.type === "social")
    return (() => {
      const onClick = () => {
        window.location = linkItem.link;
      };
      const thumbnail = getImgUrlFromFileName(linkItem.icon.asset._ref);
      const href = linkItem.link;
      return { thumbnail, onClick, href };
    })();

  const rawActionButton =
    options?.type === "footer" ? linkItem : linkItem.onClick;

  const formatedActionButton = await getFormatedActionButtonComponents(
    rawActionButton
  );

  const standardClick = await createStandardClickData(
    rawActionButton,
    formatedActionButton.changePageToName
  );
  console.log(rawActionButton);

  const onClick = createOnclick(standardClick);

  const thumbnail =
    options?.type === "footer"
      ? null
      : getImgUrlFromFileName(linkItem?.Thumbnail?.asset?._ref);

  return {
    title: rawActionButton?.title,
    onClick,
    thumbnail,
  };
}
