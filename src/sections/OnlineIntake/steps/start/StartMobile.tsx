import { useContext } from "react";
import onlineIntakeContext from "../../OnlineIntakeContext";

function StartMobile({}: any) {
  const { next } = useContext(onlineIntakeContext);
  return (
    <div className="start_mobile_step_view_container">
      <h1>Online Intakes</h1>
      <p>Click Start to begin your intake form online</p>
      <button onClick={next}>Start</button>
    </div>
  );
}

export default StartMobile;
