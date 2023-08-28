import helpers from './helpers';
import getPageFromRef from 'api/getPageFromRef';
import getRefs from 'api/getRef';

let { getImgUrlFromFileName } = helpers;

export default async function buildLandingScreen(rawS) {
   let iconSrc = getImgUrlFromFileName(rawS.iconSrc.asset._ref);
   let actionButtons = await formatLandingActionButtons(rawS.actionButtons);

   let video = rawS.videoBackground
      ? await getRefs(rawS.videoBackground.asset._ref)
      : {};

   let newSection = {
      name: rawS._type,
      props: {
         title: rawS.title,
         subtitles: rawS.subtitles,
         iconSrc: iconSrc,
         actionButtons: actionButtons,
         videoBG: video.url,
      },
   };

   return newSection;
}

async function formatLandingActionButtons(
   ABOA /* Action button object array */
) {
   let FAB /* Formated action buttons */ = null;
   if (!ABOA) return FAB;
   FAB = [];

   let rawActionButton;
   for (let i = 0; i < ABOA.length; i++) {
      rawActionButton = ABOA[i];

      let href = null;
      let changePageToName = null;
      let type = null;
      if (rawActionButton.onClick === 'pageChange') {
         let ref = rawActionButton.pageChange._ref;
         let pageFromRef = await getPageFromRef(ref);
         href = `/${pageFromRef.slug.current}`;
         type = 'internalLink';
         changePageToName = pageFromRef.slug.current;
      } else {
         type = 'externalLink';
      }
      FAB.push({
         title: rawActionButton.title,
         standardClick: {
            type: type,
            href: href,
         },
         action: rawActionButton.onClick,
         href: href,
         changePageToName: changePageToName,
      });
   }

   return FAB;
}
