import { useContext } from "react";
import { CalendlyDisplay } from "sections/MeetingScheduler";
import onlineIntakeContext from "sections/OnlineIntake/OnlineIntakeContext";

function ScheduleIntakeMobile({}: any) {
  const { calendly } = useContext(onlineIntakeContext);
  console.log("calendly:", calendly);
  return (
    <div className="mobile_up_container">
      <h1>Schedule Expedited Intake</h1>
      <p>
        You have created and printed out all the documents needed. Now its time
        to come in person to sign your paperwork and be shown your class.
      </p>
      <CalendlyDisplay
        className="calendly-schedule"
        calendyRouteID={calendly?.calendyRouteID}
        fixedCalendyHeightDesktop={calendly?.fixedCalendyHeightDesktop}
        fixedCalendyHeightMobile={calendly?.fixedCalendyHeightMobile}
      />
    </div>
  );
}

export default ScheduleIntakeMobile;
