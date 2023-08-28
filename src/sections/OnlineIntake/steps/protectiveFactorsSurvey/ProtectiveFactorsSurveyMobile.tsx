import UniversalPlayer from "../../UniversalPlayer";
import useLoadedChunks from "../useLoadedChunks";
import onlineIntakeContext from "sections/OnlineIntake/OnlineIntakeContext";
import pfsQuestions from "./schemaChunks/pfsQuestions.json";
import { useContext } from "react";

function ProtectiveFactorsSurveyMobile({}: any) {
  const { chunks } = useContext(onlineIntakeContext);
  const loadedChunk = useLoadedChunks([pfsQuestions], chunks);
  return (
    <UniversalPlayer initialLoadedComponents={loadedChunk} isMobile={true} />
  );
}

export default ProtectiveFactorsSurveyMobile;
