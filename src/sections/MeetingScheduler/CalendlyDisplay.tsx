import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

function CalendlyDisplay({
  className,
  calendyRouteID,
  fixedCalendyHeightDesktop,
  fixedCalendyHeightMobile,
}: any) {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  useEffect(() => {
    (async () => {
      await fetchJsFromCDN(
        "https://assets.calendly.com/assets/external/widget.js"
      );
    })();
  }, [isMobile]);

  useEffect(() => {
    const intervalID = setInterval(() => {
      console.log(
        "here (",
        //@ts-ignore
        document.querySelector(".calendly-inline-widget iframe")?.style,
        ")"
      );
      //@ts-ignore
      if (!document.querySelector(".calendly-inline-widget iframe")?.style)
        return;
      console.log("here 2");
      //@ts-ignore
      document.querySelector(".calendly-inline-widget iframe").style.height =
        isMobile
          ? `${fixedCalendyHeightMobile}px`
          : `${fixedCalendyHeightDesktop}px`;
      clearInterval(intervalID);
    }, 50);
  }, []);

  return (
    <div
      className={`calendly-inline-widget ${className}`}
      data-url={`https://calendly.com/${calendyRouteID}`}
      style={{
        width: "100%",
        height: isMobile
          ? `${fixedCalendyHeightMobile}px`
          : `${fixedCalendyHeightDesktop}px`,
      }}
    ></div>
  );
}

export default CalendlyDisplay;

function fetchJsFromCDN(src: any, externals: any = []) {
  new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.setAttribute("src", src);
    script.setAttribute("asyc", true + "");
    script.addEventListener("load", () => {
      resolve(
        externals.map((key: any) => {
          const ext = window[key];
          typeof ext === "undefined" &&
            console.warn(`No external named '${key}' in window`);
          return ext;
        })
      );
    });
    script.addEventListener("error", reject);
    document.body.appendChild(script);
  });
}
