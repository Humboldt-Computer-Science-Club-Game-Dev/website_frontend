import { useContext, useEffect } from "react";
import { useIsMobile } from "utilities";
import onlineIntakeContext, {
  OnlineIntakeContextProvider,
} from "./OnlineIntakeContext";
import "./onlineIntake.scss";
import { StepView } from "./steps";
import MobileOnlineIntakeContainer from "./MobileOnlineIntakeContainer";
import DesktopOnlineIntakeContainer from "./DesktopOnlineIntakeContainer";

function OnlineIntake(props: any) {
  const { showMobileProgress, setCalendly } = useContext(onlineIntakeContext);
  const isMobile = useIsMobile();
  const {
    calendyRouteID,
    fixedCalendyHeightDesktop,
    fixedCalendyHeightMobile,
  } = props;
  useEffect(() => {
    setCalendly({
      calendyRouteID,
      fixedCalendyHeightDesktop,
      fixedCalendyHeightMobile,
    });
  }, []);
  console.log("props:", props);

  return showMobileProgress ? (
    <MobileOnlineIntakeContainer {...props}>
      <>Mobile progress</>
    </MobileOnlineIntakeContainer>
  ) : StepView ? (
    true ? (
      <MobileOnlineIntakeContainer {...props}>
        <StepView {...props} />
      </MobileOnlineIntakeContainer>
    ) : (
      <DesktopOnlineIntakeContainer {...props}>
        <StepView {...props} />
      </DesktopOnlineIntakeContainer>
    )
  ) : (
    <>Step view has stopped working</>
  );
}

function OnlineIntakeContainer(props: any) {
  return (
    <OnlineIntakeContextProvider>
      <OnlineIntake {...props} />
    </OnlineIntakeContextProvider>
  );
}

export default OnlineIntakeContainer;
