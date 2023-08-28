import { useEffect } from "react";
import "./style.scss";
import { Container, Typography, Box } from "@material-ui/core";
import Title from "sections/Title";
import FluidYoutubeVideo from "components/FluidYoutubeVideo.js";
import RichText from "components/RichText";
import useVideoMeta from "./videoMeta";

export default function FeaturedVideo({
  title,
  leadSpeaker,
  thumbnail,
  url,
  subtitle,
  texts,
  richText,
  videoType,
  apiKey,
  channelID,
  includePlayIcon,
}) {
  useEffect(() => {
    const containers = document.querySelectorAll(".featured-video-container");
    // Redundant and inefficient, but it works
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];
      let textContentHeight =
        container.querySelector(".text-container").clientHeight;
      let blueRectangleEle = container.querySelector(".lower-blue-rectange");
      blueRectangleEle.style.height = `${textContentHeight + 16 * 8}px`;
    }
  }, []);
  let videoMeta = useVideoMeta({
    channelID: channelID,
    videoType: videoType,
    apiKey: apiKey,
  });

  return (
    <div className="featured-video-container">
      <Title title={title} pb={0} pt={0} size="h2" />
      <Container maxWidth="md">
        <div className="meta-text-container">
          <div className="left">{leadSpeaker}</div>
        </div>
        <VideoDisplay />
        <div className="text-container">
          <Box mt={2}>
            <Typography align="center" variant="h2">
              {subtitle}
            </Typography>
          </Box>

          {texts ? (
            texts.map((text, i) => {
              return (
                <Box mt={2} key={i}>
                  <Typography>{text}</Typography>
                </Box>
              );
            })
          ) : (
            <></>
          )}

          {richText ? <RichText richText={richText} /> : <></>}
        </div>
      </Container>
      <div className="lower-blue-rectange" style={{ opacity: "12%" }}></div>
    </div>
  );

  function VideoDisplay() {
    if (videoType === "static") {
      return (
        <div className="main-container">
          <FluidYoutubeVideo
            thumbnail={thumbnail}
            id={getIdFromURL(url)}
            includePlayIcon={includePlayIcon}
          />
        </div>
      );
    } else if (videoMeta.loading) {
      //video type must equal live
      return (
        <div className="main-container">
          <Typography paragraph align="center">
            Loading video...
          </Typography>
        </div>
      );
    } else if (videoMeta.hasFailed) {
      return (
        <div className="main-container">
          <Typography paragraph align="center">
            Where sorry, The video failed to load.
          </Typography>
        </div>
      );
    } else if (videoMeta.notLive) {
      return (
        <div className="main-container">
          <Typography paragraph align="center">
            Where currently not live. Please check in later
          </Typography>
        </div>
      );
    } else {
      return (
        <div className="main-container">
          <FluidYoutubeVideo thumbnail={thumbnail} id={videoMeta.id} />
        </div>
      );
    }
  }

  function getIdFromURL(url) {
    let id = url
      .split("?")[1]
      .split("&")
      .filter((param) => param.indexOf("v=") >= 0)[0]
      .split("v=")[1];

    return id;
  }
}
