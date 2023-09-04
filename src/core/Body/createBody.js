import formatAPIData from "./apiFormater";
import LandingScreen from "sections/LandingSection.js";
import PivotalDisplay from "sections/PivotalDisplay";
import TitleSection from "sections/Title";
import { ParallaxProvider } from "react-scroll-parallax";
import FeaturedVideo from "sections/FeaturedVideo";
import DecisionSection from "sections/DecisionSection";
import ThematicDisplay from "sections/ThematicDisplay";
import StandaloneText from "sections/StandaloneText";
import HorizontalRule from "sections/HorizontalRule";
import EmailForm from "sections/EmailForm";
import EventCards from "sections/EventsCards";
import Gallery from "sections/Gallery";
import MapToLocation from "sections/MapToLocation";
import SignUp from "sections/SignUp";
import SignIn from "sections/SignIn";
import AccountHeader from "sections/AccountHeader";
import TitheHistory from "sections/TithHistory";
import GivePayment from "sections/GivePayment";
import StylishDisplay from "sections/StylishDisplay";
import MeetingScheduler from "sections/MeetingScheduler";
import Comments from "sections/Comments";
import CardDisplay from "sections/CardDisplay";
import SubspashGiving from "sections/SubsplashGiving";
import LinkHub from "sections/LinkHub";
import OnlineIntake from "sections/OnlineIntake";
import QueryIntake from "sections/QueryIntake/QueryIntake";
import Reimbursement from "sections/Reimbursement/Reimbursement";
import Requisition from "sections/Requisition";
import DiscordInvite from "sections/DiscordInvite";

export default async function CreateBody(rawSanityData) {
  let locationData = await formatAPIData(rawSanityData);
  let Body = buildJSX(locationData);

  return { JSX: Body, formatedData: locationData };
}

export { buildJSX };
function buildJSX(locationData) {
  let Body;
  let SectionContent = [];
  //#region Create Sections
  locationData.sections.forEach((section, i) => {
    let newSection;
    if (section.name === "landingScreen") {
      newSection = <LandingScreen key={i} {...section.props} />;
    } else if (section.name === "sectionTitle") {
      newSection = <TitleSection key={i} {...section.props} />;
    } else if (section.name === "pivotalDisplay") {
      newSection = <PivotalDisplay key={i} {...section.props} />;
    } else if (section.name === "featuredVideo") {
      newSection = <FeaturedVideo key={i} {...section.props} />;
    } else if (section.name === "decision") {
      newSection = <DecisionSection key={i} {...section.props} />;
    } else if (section.name === "thematicDisplay") {
      newSection = <ThematicDisplay key={i} {...section.props} />;
    } else if (section.name === "standaloneText") {
      newSection = <StandaloneText key={i} {...section.props} />;
    } else if (section.name === "horizontalRule") {
      newSection = <HorizontalRule key={i} {...section.props} />;
    } else if (section.name === "emailUsForm") {
      newSection = <EmailForm key={i} {...section.props} />;
    } else if (section.name === "eventDisplay") {
      newSection = <EventCards key={i} {...section.props} />;
    } else if (section.name === "gallery") {
      newSection = <Gallery key={i} {...section.props} />;
    } else if (section.name === "mapAtLocation") {
      newSection = <MapToLocation key={i} {...section.props} />;
    } else if (section.name === "signUp") {
      newSection = <SignUp key={i} {...section.props} />;
    } else if (section.name === "signIn") {
      newSection = <SignIn key={i} {...section.props} />;
    } else if (section.name === "accountHeader") {
      newSection = <AccountHeader key={i} {...section.props} />;
    } else if (section.name === "titheHistory") {
      newSection = <TitheHistory key={i} {...section.props} />;
    } else if (section.name === "givePayment") {
      newSection = <GivePayment key={i} {...section.props} />;
    } else if (section.name === "stylishDisplay") {
      newSection = <StylishDisplay key={i} {...section.props} />;
    } else if (section.name === "meetingScheduler") {
      newSection = <MeetingScheduler key={i} {...section.props} />;
    } else if (section.name === "cardDisplay") {
      newSection = <CardDisplay key={i} {...section.props} />;
    } else if (section.name === "subsplashGiving") {
      newSection = <SubspashGiving key={i} {...section.props} />;
    } else if (section.name === "linkHub") {
      newSection = <LinkHub key={i} {...section.props} />;
    } else if (section.name === "onlineIntake") {
      newSection = <OnlineIntake key={i} {...section.props} />;
    } else if (section.name === "queryIntake") {
      newSection = <QueryIntake key={i} {...section.props} />;
    } else if (section.name === "reimbursement") {
      newSection = <Reimbursement key={i} {...section.props} />;
    } else if (section.name === "requisition") {
      newSection = <Requisition key={i} {...section.props} />;
    } else if (section.name === "discordInvite") {
      newSection = <DiscordInvite key={i} {...section.props} />;
    }
    if (newSection) {
      SectionContent.push(newSection);
      if (section?.props?.allowComments) {
        SectionContent.push(<Comments key={i + 2000} {...section.props} />);
      }
    }
  });

  /* SectionContent.push(<TestSubspashGiving />); */
  //#endregion

  //#region Create Wrapers. Not Dynamic
  if (locationData.useParallax) {
    Body = <ParallaxProvider>{SectionContent}</ParallaxProvider>;
  } else {
    Body = <>{SectionContent}</>;
  }
  //#endregion

  return Body;
}
