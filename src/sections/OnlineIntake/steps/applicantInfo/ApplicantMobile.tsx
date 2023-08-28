import UniversalPlayer from "../../UniversalPlayer";
import appInfoInputs from "./schemaChunks/appInfoInputs.json";
import appInfoChildren from "./schemaChunks/appInfoChildren.json";
import appInfoSocial from "./schemaChunks/appInfoSocial.json";
import useLoadedChunks from "../useLoadedChunks";
import onlineIntakeContext from "sections/OnlineIntake/OnlineIntakeContext";
import { useContext } from "react";

function StartMobile() {
  const { chunks } = useContext(onlineIntakeContext);
  const loadedChunk = useLoadedChunks(
    [appInfoInputs, appInfoChildren, appInfoSocial],
    chunks
  );

  return (
    <UniversalPlayer initialLoadedComponents={loadedChunk} isMobile={true} />
  );
}

export default StartMobile;
