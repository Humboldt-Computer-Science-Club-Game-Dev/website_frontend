import { Box, Container, Typography } from "@material-ui/core";
import FlashMessage from "react-flash-message";
import Slide from "react-reveal/Slide";
import { useMediaQuery } from "react-responsive";
import "./style.scss";

export default function Flash({
  children,
  title,
  message,
  flashRest,
  duration = 10000,
  status,
  className,
  ...rest
}) {
  const isSmall = useMediaQuery({ query: "(max-width: 870px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const textProps = {
    className: `${isSmall && !isMobile ? "font-extrasmall-i" : ""} ${
      isMobile ? "mt-4-i" : "mt-2-i"
    }`,
  };

  const imgSrc = (() => {
    switch (status) {
      case "successful":
        return "/icons/white-circle.svg";
      case "warning":
        return "/icons/white-warning.svg";
      default:
        return "/icons/white-close.svg";
    }
  })();

  return (
    <FlashMessage className={className} duration={duration} {...flashRest}>
      <Box className="flash-container standard-height" {...rest}>
        <Slide top>
          <Container className="inner-container" maxWidth="md">
            <section
              className={`content-container w-full ${
                isMobile ? "flex-col p-8" : "standard-height"
              } ${
                status === "successful"
                  ? "bg-success"
                  : status === "warning"
                  ? "bg-warning"
                  : "bg-failed"
              }`}
            >
              <Box
                className={`icon-square standard-height standard-height-width bg-${status} ${
                  isMobile ? "mx-auto round" : ""
                }`}
              >
                <img alt={`${status} icon`} src={imgSrc} />
              </Box>
              <Box className={`text-container ${isMobile ? "pt-4" : "p-4"}`}>
                <Typography align="center" variant="h5">
                  {title}
                </Typography>
                {isMobile ? <hr className="mt-4-i" /> : <></>}
                <Typography paragraph {...textProps}>
                  <span className="flash_message"></span>
                  {message}
                </Typography>
                {children ? (
                  <Typography mt={2} paragraph {...textProps}>
                    {children}
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>
            </section>
          </Container>
        </Slide>
      </Box>
    </FlashMessage>
  );
}

export { default as SimpleFlash } from "./SimpleFlash";
export { default as showSimpleFlash } from "./showSimpleFlash";
