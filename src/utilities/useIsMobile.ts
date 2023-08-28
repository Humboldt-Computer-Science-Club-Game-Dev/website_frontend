import { useState, useEffect } from "react";
import useSize from "./useSize";
export default function useIsMobile() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const size = useSize();
  const [isMobile, setIsMobile] = useState<boolean>(determineMobile(size));

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobile(determineMobile(size));
  }, [size, windowWidth]);

  return isMobile;
}

function determineMobile(size: any) {
  const aspectRatio = window.innerWidth / window.innerHeight;
  return size === "xs" || aspectRatio < 1;
}
