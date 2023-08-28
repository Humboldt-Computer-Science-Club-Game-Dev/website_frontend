import { Container, Typography } from "@material-ui/core";
import CalendlyDisplay from "./CalendlyDisplay";
import STLButton from "components/StlButton";
import "./style.scss";
import { createMarginPaddingObject } from "utilities";

export default function MeetingScheduler({
  calendyTitle,
  calendyRouteID,
  fixedCalendyHeightDesktop,
  fixedCalendyHeightMobile,
  phoneNumberTitle,
  phoneNumber,
  phoneNumberSubtitle,
  phoneNumberInstructions,
}) {
  const formatedNumber = phoneNumber.replace(/[^\d]/g, "");

  return (
    <div
      style={createMarginPaddingObject({
        applyCustomPadding: true,
        paddingTop: "2",
        paddingUnits: "rem",
      })}
      className="meeting-scheduler-container light-mode"
    >
      <Container maxWidth="md" className="meeting-inner-container">
        <div className="side">
          <Typography variant="h4">{calendyTitle}</Typography>
          <CalendlyDisplay
            calendyRouteID={calendyRouteID}
            fixedCalendyHeightDesktop={fixedCalendyHeightDesktop}
            fixedCalendyHeightMobile={fixedCalendyHeightMobile}
          />
        </div>
        <div className="side">
          <Typography variant="h4">{phoneNumberTitle}</Typography>
          <STLButton
            className={"call-button"}
            lightMode={true}
            onClick={() => {
              window.open(`tel:+${formatedNumber}`, "_blank");
            }}
          >
            {phoneNumber}
          </STLButton>
          <Typography className="subtext" variant="p">
            {phoneNumberSubtitle}
          </Typography>
          {phoneNumberInstructions && phoneNumberInstructions.length > 0 ? (
            phoneNumberInstructions.map((instruction) => (
              <>
                <Typography className="mt-1" variant="h4">
                  {instruction.title}
                </Typography>
                <Typography className="subtext" variant="p">
                  {instruction.subtitle}
                </Typography>
              </>
            ))
          ) : (
            <></>
          )}
        </div>
      </Container>
    </div>
  );
}

export { default as CalendlyDisplay } from "./CalendlyDisplay";
