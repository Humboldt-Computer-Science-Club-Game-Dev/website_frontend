import { useContext, useState } from "react";
import "./reciveDocuments.scss";
import onlineIntakeContext from "sections/OnlineIntake/OnlineIntakeContext";
import LoadingScreen from "components/LoadingScreen";
import { authRouteStore } from "api/auth/userStore";

function StartMobile({}: any) {
  const { ticketID } = useContext(onlineIntakeContext);
  const [loading, setLoading] = useState(false);
  let authRoute = authRouteStore.getState();
  return (
    <div className="mobile_up_container receive_document_mobile">
      <h1>Ticket</h1>
      <h2>Screenshot This Page</h2>
      <h2>Your ticket ID is: {ticketID}</h2>
      <p>
        Its time to come in person to sign your intake paperwork. Before we have
        you come in, please print out a few documents on your end
      </p>
      {!loading ? (
        <button
          onClick={() => {
            setLoading(true);
            console.log(
              "Getting download. Auth route:",
              `${authRoute}/onlineIntake/download`
            );
            fetch(`${authRoute}/onlineIntake/download`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ticketID,
              }),
            })
              .then(async (response) => {
                if (!response.ok) {
                  return Promise.reject(await response.text());
                }
                return response.blob(); // Return the response as a Blob
              })
              .then((blob: any) => {
                // Create a URL for the blob
                const url = window.URL.createObjectURL(blob);

                // Create a temporary anchor element
                const a = document.createElement("a");
                a.href = url;
                a.download = "intake.pdf"; // You can name the file whatever you want

                // Append the anchor to the document and click it to start the download
                document.body.appendChild(a);
                a.click();
                console.log("Should have download");
                setLoading(false);

                setTimeout(() => {
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                }, 0);
              })
              .catch((err) => {
                console.error(err);
                alert("Failed to correctly generate intake document");
                setLoading(false);
              });
          }}
        >
          Download Intake
        </button>
      ) : (
        <LoadingScreen
          className="receive_document_loading"
          message={"Loading intake document"}
        />
      )}
      {/* <button>Download Ticket</button> */}
    </div>
  );
}

export default StartMobile;
