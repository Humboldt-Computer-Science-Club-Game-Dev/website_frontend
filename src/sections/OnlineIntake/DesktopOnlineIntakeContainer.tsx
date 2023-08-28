import { useContext } from "react";
import onlineIntakeContext from "./OnlineIntakeContext";
import DesktopProgression from "./DesktopProgression";

function DesktopOnlineIntake({ children, BG }: any) {
  const { step } = useContext(onlineIntakeContext);

  return (
    <div className={`online_intake_container online_intake_container_desktop`}>
      <img
        className="online_intake_startlike_background"
        src={BG}
        alt="background"
      />
      <section className="content_container">{children}</section>
      <DesktopProgression className="progression_container"></DesktopProgression>
    </div>
  );
}

export default DesktopOnlineIntake;
