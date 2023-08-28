/* This is not receive documents but its structure is very similar */

import { useContext } from "react";
import onlineIntakeContext from "sections/OnlineIntake/OnlineIntakeContext";

function StartMobile({}: any) {
  const { ticketID } = useContext(onlineIntakeContext);
  return (
    <div className="mobile_up_container receive_document_mobile">
      <h1>Almost Done</h1>
      <h2>Come in person to sign / deliver your paperwork</h2>
      <h2>Your ticket ID is: {ticketID}</h2>
    </div>
  );
}

export default StartMobile;
