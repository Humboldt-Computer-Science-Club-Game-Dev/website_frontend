import { useContext } from "react";
import { useIsMobile } from "utilities";
import onlineIntakeContext from "../OnlineIntakeContext";
import * as stepComps from "./index";

function StepView(props: any) {
  const { step }: any = useContext(onlineIntakeContext);
  const isMobile = true/* useIsMobile(); */
  switch (step) {
    case "start":
      if (isMobile) {
        return <stepComps.StartMobile {...props} />;
      }
      return <>Error. No start view for desktop screens</>;
    case "applicantInfo":
      if (isMobile) {
        return <stepComps.ApplicantMobile {...props} />;
      }
      return <stepComps.ApplicantDesktop {...props} />;
    case "preventionAndAfterCareNeedsAssessment":
      if (isMobile) {
        return (
          <stepComps.PreventionAndAfterCareNeedsAssessmentMobile {...props} />
        );
      }
      return (
        <stepComps.PreventionAndAfterCareNeedsAssessmentDesktop {...props} />
      );
    case "protectiveFactorsSurvey":
      if (isMobile)
        return <stepComps.ProtectiveFactorsSurveyMobile {...props} />;

      return <stepComps.ProtectiveFactorsSurveyDesktop {...props} />;
    case "nurturingSkills":
      if (isMobile) {
        return <stepComps.NurturingSkillsMobile {...props} />;
      }
      return <stepComps.NurturingSkillsDesktop {...props} />;
    case "receiveDocuments":
      if (isMobile) {
        return <stepComps.ReceiveDocumentsMobile {...props} />;
      }
      return <stepComps.ReceiveDocumentsDesktop {...props} />;
    case "scheduleIntake":
      if (isMobile) {
        return <stepComps.ScheduleIntakeMobile {...props} />;
      }
      return <stepComps.ScheduleIntakeDesktop {...props} />;
    case "confirmation":
      if (isMobile) {
        return <stepComps.ConfirmationMobile {...props} />;
      }
      return <stepComps.ConfirmationDesktop {...props} />;
    default:
      return <>Error. No view for step: {step}</>;
  }
}

export default StepView;
