import { createMarginPaddingObject } from "utilities";
import "./style.scss";

function SubsplashGiving({ subsplashID, marginAndPadding }: any) {
  if (!subsplashID)
    return <div>Error: No Subsplash ID provided from Sanity CMS</div>;
  return (
    <div
      className="subsplash-giving-container"
      style={{ ...createMarginPaddingObject(marginAndPadding) }}
    >
      <iframe
        title={`Subsplash Giving ${Math.floor(Math.random() * 1000)}`}
        src={`https://wallet.subsplash.com/ui/embed/${subsplashID}`}
        width="100%"
        height="100%"
        style={{ border: "none", overflow: "hidden" }}
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </div>
  );
}

export default SubsplashGiving;
