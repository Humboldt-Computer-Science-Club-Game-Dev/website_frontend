import getPageFromRef from "api/getPageFromRef";
import routeStore from "utilities/routeStore";

let helpers = {
  formatDateToLookNice: (rawDate) => {
    if (!rawDate) {
      console.error("You must provide a argument to the date formater");
      return;
    }

    if (rawDate.indexOf("-") < 0) {
      console.error("The input for the date formater has an invalid format");
      return;
    }

    let dateComponents = rawDate.split("-");

    let month = ((dateNumber) => {
      if (typeof dateNumber === "string") parseInt(dateNumber);
      switch (dateNumber) {
        case 1:
          return "January";
        case 2:
          return "February";
        case 3:
          return "March";
        case 4:
          return "April";
        case 5:
          return "May";
        case 6:
          return "June";
        case 7:
          return "July";
        case 8:
          return "August";
        case 9:
          return "September";
        case 10:
          return "October";
        case 11:
          return "November";
        case 12:
          return "December";
        default:
          return "Error";
      }
    })(parseInt(dateComponents[1]));

    return `${month} ${dateComponents[2]}, ${dateComponents[0]}`;
  },
  getImageFromRaw: (raw, imageFeildName) => {
    imageFeildName = imageFeildName || "thumbnail";
    let image = helpers.getImgUrlFromFileName(raw[imageFeildName].asset._ref);
    return image;
  },
  getImgUrlFromFileName: (fileName) => {
    if (!fileName)
      return console.error(
        "You must provide a fileName to getImgUrlFromFileName. Got " + fileName
      );
    fileName = helpers.formatFileName(fileName);
    let url = `https://cdn.sanity.io/images/qco69wat/production/${fileName}`;
    return url;
  },
  formatFileName: (fileName) => {
    let formatFileSlugs = ["png", "jpg", "svg", "webp", "mp4"];

    formatFileSlugs.forEach((SLUG) => {
      if (fileName.indexOf(`-${SLUG}`) >= 0) {
        fileName = fileName.replace(`-${SLUG}`, `.${SLUG}`);
      }
    });

    if (fileName.indexOf("image-") >= 0) {
      fileName = fileName.replace("image-", "");
    }
    if (fileName.indexOf("file-") >= 0) {
      fileName = fileName.replace("file-", "");
    }

    return fileName;
  },
  createStandardClickFromGenericActionButton: async (rawActionButton) => {
    let formatedActionButton = await helpers.getFormatedActionButtonComponents(
      rawActionButton
    );
    let standardClick = await helpers.createStandardClickData(
      rawActionButton,
      formatedActionButton.changePageToName
    );

    return standardClick;
  },
  getActionButton: async (rawActionButton) => {
    let formatedActionButton = await helpers.getFormatedActionButtonComponents(
      rawActionButton
    );
    let standardClick = await helpers.createStandardClickData(
      rawActionButton,
      formatedActionButton.changePageToName
    );
    return {
      title: formatedActionButton.title,
      standardClick: standardClick,
    };
  },
  getFormatedActionButtonComponents: async (rawActionButton) => {
    let href = null;
    let changePageToName = null;
    if (rawActionButton?.onClick === "pageChange") {
      let ref = rawActionButton.pageChange._ref;
      let pageFromRef = await getPageFromRef(ref);
      changePageToName = pageFromRef.slug.current;
    } else {
      /* here, onClick is equal to link or function. 
           For simplicity I assume its alwas a link*/
      href = rawActionButton.link;
    }

    return {
      title: rawActionButton.title,
      action: rawActionButton.onClick,
      onClick: rawActionButton.onClick,
      href: href,
      link: href,
      changePageToName: changePageToName,
    };
  },
  createStandardClickData: async (
    actionButton,
    changePageToName,
    rawActionButton
  ) => {
    let type = `internalLink`;
    let href = null;

    if (!changePageToName && actionButton.onClick !== "link") {
      if (!rawActionButton) {
        console.error(
          "function createStandardClickData must be supplied at least changePageToName or rawActionButton when button type is pageChange"
        );
        return;
      }
      let ref;
      let pageFromRef;
      if (actionButton.onClick === "pageChange") {
        ref = rawActionButton.pageChange._ref;
        pageFromRef = await getPageFromRef(ref);
        changePageToName = pageFromRef.slug.current;
      }
    }

    switch (actionButton.onClick) {
      case "link":
        type = "externalLink";
        href = actionButton.link;
        break;
      case "pageChange":
        type = "internalLink";
        href = `/${changePageToName}`;
        break;
      default:
        type = "internalLink";
        href = `/${changePageToName}`;
        break;
    }

    return { type: type, href: href };
  },
  buildTitleSubtitleTextComboFromRaw: (raw) => {
    let combo = {
      title: raw.title,
      subtitle: raw.subtitle,
      texts: raw.texts,
    };
    return combo;
  },
  calculatePtFromIndex: (i) => {
    let isFirst = false;
    if (i === 0) isFirst = true;
    return isFirst ? "5" : null;
  },
  getFormatedPaddingsFromCustomPadding: (rawCustomPadding) => {
    if (!rawCustomPadding) return null;
    return {
      paddingTop: rawCustomPadding.paddingTop,
      paddingBottom: rawCustomPadding.paddingBottom,
      paddingLeft: rawCustomPadding.paddingLeft,
      paddingRight: rawCustomPadding.paddingRight,
    };
  },
  createOnclick(standardClick) {
    if (!standardClick) return null;
    let newOnClick = null;

    switch (standardClick.type) {
      case "internalLink":
        newOnClick = helpers.buildInternalLinkFunction(standardClick.href);
        break;
      case "externalLink":
        newOnClick = helpers.buildExternalLinkFunction(standardClick.href);
        break;
      default:
        newOnClick = helpers.buildExternalLinkFunction(standardClick.href);
        break;
    }

    return newOnClick;
  },
  buildInternalLinkFunction(href) {
    return () => {
      routeStore.dispatch({
        type: "updateCurrentLocation",
        currentLocation: `${href}`,
      });
    };
  },
  buildExternalLinkFunction(href) {
    return () => {
      window.location = href;
    };
  },
};

export default helpers;
