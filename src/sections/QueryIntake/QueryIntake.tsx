import { useState } from "react";
import StlFormContainer from "components/StlFormContainer";
import "./queryIntake.scss";
import LoadingScreen from "components/LoadingScreen";
import { authRouteStore } from "api/auth/userStore";

function QueryIntake({ title }: any) {
  const [step, setStep] = useState("query");
  const steps: any = {
    query: {
      view: Query,
    },
    loading: {
      view: () => {
        return (
          <LoadingScreen
            message="Fetching online intake information"
            className={`loading_style`}
          />
        );
      },
    },
    success: {
      view: Success,
    },
    failure: {
      view: Failure,
    },
  };

  const [intakes, setIntakes] = useState([]);

  let authRoute = authRouteStore.getState();

  const StepView: any = steps[step].view;
  return (
    //@ts-ignore
    <StlFormContainer
      className="query_intake_container"
      innerClassName="query_intake_inner_container"
      title={title ? title : "Intake Query"}
    >
      <div className="query_intake_inner_inner_container">
        <StepView />
      </div>
    </StlFormContainer>
  );

  function Query() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [ticketID, setTicketID] = useState("");
    const [password, setPassword] = useState("");
    return (
      <>
        <label htmlFor="intake_id" className="mt-4">
          Ticked ID
          <input
            type="text"
            name="intake_id"
            id="intake_id"
            defaultValue={ticketID}
            onChange={(e) => setTicketID(e.target.value)}
          />
        </label>

        <label htmlFor="first_name">
          First Name
          <input
            type="text"
            name="first_name"
            id="first_name"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>

        <label htmlFor="last_name">
          Last Name
          <input
            type="text"
            name="last_name"
            id="last_name"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit" onClick={onQueryIntake}>
          Query Intake
        </button>
      </>
    );
    function onQueryIntake() {
      setStep("loading");
      const body = JSON.stringify({
        ticketID,
        firstName,
        lastName,
        password,
      });

      fetch(`${authRoute}/onlineIntake/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then(async (res) => {
          if (!res.ok) {
            return Promise.reject(await res.json());
          }
          return res.json();
        })
        .then((intakes) => {
          console.log("intakes:", intakes);
          setIntakes(intakes);
          setStep("success");
        })
        .catch((err) => {
          console.log("err:", err);
          let { message } = err;
          message = message ? message : "An error occurred";
          setStep("failure");
          alert(message);
        });
    }
  }

  function Success() {
    return (
      <>
        <BackButton />
        <h2 className="status">
          Query: <span className="success">Successful</span>
        </h2>
        {intakes ? intakes.map((intake) => <Intake intake={intake} />) : <></>}
      </>
    );

    function Intake({ intake }: any) {
      const [loading, setLoading] = useState(false);
      return (
        <div className={`intake ${loading ? `is_loading` : ``}`}>
          <h3>
            Intake:
            <br />
            {intake.ticketID}
          </h3>
          <p>{`${intake.applicant.firstName} ${
            intake.applicant?.firstName ? intake.applicant.firstName : ""
          }`}</p>
          {!loading ? (
            <button onClick={onDownloadPaperwork}>Download paperwork</button>
          ) : (
            <LoadingScreen
              message="Generating paperwork"
              className={`loading_style`}
            />
          )}
        </div>
      );

      function onDownloadPaperwork() {
        setLoading(true);
        fetch(`${authRoute}/onlineIntake/download`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticketID: intake.ticketID,
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

            setTimeout(() => {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
            }, 0);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
            alert("Failed to properly generate intake document");
          });
      }
    }
  }

  function Failure() {
    return (
      <>
        <BackButton />
        <h2 className="status">
          Query: <span className="failure">Failed</span>
        </h2>
        <p>
          Either an error occurred on our end or your query produced no results
        </p>
      </>
    );
  }

  function BackButton() {
    return (
      <button className="back_button" onClick={() => setStep("query")}>
        <img src="/icons/back.svg" alt="back button" />
      </button>
    );
  }
}

export default QueryIntake;
