import collageBG from "Media/Component_Images/FC-01.png";
import { Container, Typography, Box } from "@material-ui/core";
import "./style.scss";

export default function StlFormContainer({
  children,
  className,
  height,
  width,
  title,
  extraPadding,
  innerClassName,
  ...rest
}) {
  return (
    <Box
      className={`stl-form-container ${className}`}
      height={height ? height : "110vh"}
      width={width ? width : "100%"}
      {...rest}
      display="flex"
      flexDirection="column"
    >
      <img src={collageBG} className="img-bg" alt="section background" />
      <div className="blue-film"></div>
      <Container
        className={`outer-material-container  ${
          height === "auto" ? (extraPadding ? "py-heigh" : "py-moderate") : ""
        }`}
        maxWidth="md"
      >
        <Box
          className={`center-container ${innerClassName}`}
          display="flex"
          flexDirection="column"
          margin="auto"
          zIndex={100}
          position="relative"
        >
          <Typography variant="h3" className="inner-ele">
            {title ? title : "Compleate the Form"}
          </Typography>
          {children}
        </Box>
      </Container>
    </Box>
  );
}
