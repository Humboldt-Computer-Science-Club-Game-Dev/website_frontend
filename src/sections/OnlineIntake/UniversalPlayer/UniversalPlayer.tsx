import MobileUP from "./MobileUP";
import DesktopUP from "./DesktopUP";

function UniversalPlayer(props: any) {
  if (props.isMobile) return <MobileUP {...props} />;
  return <>Desktop</>;
}

export default UniversalPlayer;
