import buildStandaloneText from "./buildStandaloneText";
import buildDecisionSection from "./buildDecision";
import buildFeaturedVideo from "./buildFeaturedVideo";
import buildThematicDisplay from "./buildThematicDisplay";
import buildFormatedSectionTitleObject from "./buildFormatedSectionTitleObject";
import buildPivitalDisplayScreen from "./buildPivitalDisplayScreen";
import buildLandingScreen from "./buildLandingScreen";
import buildHorizontalRule from "./buildHorizontalRule";
import buildEmailUsScreen from "./buildEmailUsScreen";
import buildEventDisplay from "./buildEventDisplay";
import buildGallery from "./buildGallery";
import buildMapToLocation from "./buildMapToLocation";
import buildSignUp from "./buildSignUp";
import buildSignIn from "./buildSignIn";
import buildAccountHeader from "./buildAccountHeader";
import buildTitheHistory from "./buildTitheHistory";
import buildGivePayment from "./buildGivePayment";
import buildStylishDisplay from "./buildStylishDisplay";
import buildMeetingScheduler from "./buildMeetingScheduler";
import buildCardDisplay from "./buildCardDisplay";
import buildSubsplashGiving from "./buildSubsplashGiving";
import buildLinkHub from "./buildLinkHub";
import buildOnlineIntake from "./buildOnlineIntake";
import buildQueryIntake from "./buildQueryIntake";
import buildReimbursement from "./buildReimbursement";
import buildRequisition from "./buildRequisition";
import buildDiscordInvite from "./buildDiscordInvite";

export default async function apiFormater(raw) {
  raw = raw[0];
  if (!raw.sections) return null;
  let sections = await buildSectionsData(raw.sections);
  let locDat = {
    name: raw.slug.current,
    useParallax: raw.useParallax,
    useLocomotiveScroll: raw.useLocomotiveScroll,
    sections: sections,
  };

  return locDat;
}

async function buildSectionsData(rawSs /* raw sections */) {
  let sections = [];

  let newSection;

  for (let i = 0; i < rawSs.length; i++) {
    let rawS = rawSs[i];
    newSection = null;
    let sectionWasBuilt = true; // gets set to false if default is block is called.

    switch (rawS._type) {
      case "landingScreen":
        newSection = await buildLandingScreen(rawS);
        break;
      case "pivotalDisplay":
        newSection = await buildPivitalDisplayScreen(rawS, i);
        break;
      case "sectionTitle":
        newSection = await buildFormatedSectionTitleObject(rawS, i);
        break;
      case "featuredVideo":
        newSection = buildFeaturedVideo(rawS, i);
        break;
      case "decision":
        newSection = await buildDecisionSection(rawS, i);
        break;
      case "thematicDisplay":
        newSection = buildThematicDisplay(rawS);
        break;
      case "standaloneText":
        newSection = buildStandaloneText(rawS);
        break;
      case "horizontalRule":
        newSection = buildHorizontalRule(rawS);
        break;
      case "emailUsForm":
        newSection = buildEmailUsScreen(rawS);
        break;
      case "eventDisplay":
        newSection = await buildEventDisplay(rawS);
        break;
      case "gallery":
        newSection = await buildGallery(rawS);
        break;
      case "mapAtLocation":
        newSection = buildMapToLocation(rawS);
        break;
      case "signUp":
        newSection = buildSignUp(rawS);
        break;
      case "signIn":
        newSection = buildSignIn(rawS);
        break;
      case "accountHeader":
        newSection = buildAccountHeader(rawS);
        break;
      case "titheHistory":
        newSection = buildTitheHistory(rawS);
        break;
      case "givePayment":
        newSection = buildGivePayment(rawS);
        break;
      case "stylishDisplay":
        newSection = buildStylishDisplay(rawS);
        break;
      case "meetingScheduler":
        newSection = buildMeetingScheduler(rawS);
        break;
      case "temporaryFaithLifeGiving":
        newSection = {
          name: "temporaryFaithLifeGiving",
          props: {
            title: "Give Via Faithlife",
          },
        };
        break;
      case "cardDisplay":
        newSection = await buildCardDisplay(rawS);
        break;
      case "subsplashGiving":
        newSection = await buildSubsplashGiving(rawS);
        break;
      case "linkHub":
        newSection = await buildLinkHub(rawS);
        break;
      case "onlineIntake":
        newSection = await buildOnlineIntake(rawS);
        break;
      case "queryIntake":
        newSection = await buildQueryIntake(rawS);
      case "reimbursement":
        newSection = await buildReimbursement(rawS);
      case "requisition":
        newSection = await buildRequisition(rawS);
      case "discordInvite":
        newSection = await buildDiscordInvite(rawS);
      default:
        console.error(`${rawS._type} is not a supported section type`);
        sectionWasBuilt = false;
        break;
    }

    //Apply standard section settings here
    if (sectionWasBuilt && newSection?.props) {
      newSection.props.sanityID = rawS?._key;
      newSection.props.allowComments = rawS?.allowComments;
      newSection.props.lightModeComment = rawS?.lightModeComment;
    }

    if (newSection) sections.push(newSection);
  }

  return await sections;
}
