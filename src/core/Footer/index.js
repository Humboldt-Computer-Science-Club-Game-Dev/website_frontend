import React, { useEffect, useState, useRef } from "react";
import { Typography, Container, Box } from "@material-ui/core";
import "./style.scss";
import structuredContentStore from "utilities/structuredContentStore";
import RichText from "components/RichText";
import useFooterItems from "./useFooterItems";
import useSiteIcon from "api/useSiteIcon";

export default function Footer({ title, logo, navButtons, social, subtitle }) {
  let [footerData, setFooterData] = useState({ hasLoaded: false });
  const footerItemsRef = useRef({ social: null, subtitle: null });
  const footerItems = useFooterItems(footerItemsRef);
  const siteIcon = useSiteIcon();

  useEffect(() => {
    let unsub = structuredContentStore.subscribe(() => {
      setFooterData({
        hasLoaded: true,
        ...structuredContentStore.getState().nav,
        ...structuredContentStore.getState().footer,
      });
    });

    return () => {
      unsub();
    };
  }, [footerData]);

  if (!footerData.hasLoaded) {
    return <div>Loading Footer...</div>;
  }

  const FooterButtons = (footerItems || []).map((item, i) => {
    return (
      <button
        onClick={item.onClick}
        className="nav-item-container a-button"
        key={i}
      >
        <Typography className="nav-item" align="center">
          {item.title}
        </Typography>
      </button>
    );
  });

  return (
    <footer className="footer-container">
      <Container maxWidth="md" className="footer-inner-container">
        <Typography variant="h4" align="center">
          Computer Science Club
        </Typography>
        <img className="logo" src={siteIcon} alt="site logo" />
        {footerItemsRef?.current?.subtitle ? (
          <Box mt={4}>
            <RichText richText={footerItemsRef.current.subtitle} />
          </Box>
        ) : (
          <></>
        )}
        <Box display="flex" flexWrap="wrap" width="100%" height="100%" mt={4}>
          {FooterButtons}
        </Box>
        <Box className="singularity-credit" mt={4}>
          <a href="https://www.singularityplanet.com" target="_blank">
            <img src="/Powerd-By-Singularity-Dark.png" />
          </a>
        </Box>
        <Box
          display="flex"
          width="100%"
          height="100%"
          justifyContent="center"
          marginTop={4}
        >
          {footerItemsRef?.current?.social ? (
            footerItemsRef.current.social.map((social, i) => {
              return (
                <a href={social.href} className="social-icon-container" key={i}>
                  <img
                    className="social-icon"
                    src={social.icon}
                    alt="social media icon"
                  />
                </a>
              );
            })
          ) : (
            <></>
          )}
        </Box>
      </Container>
    </footer>
  );
}
