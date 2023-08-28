import UniversalPlayer from "../../UniversalPlayer";
import useLoadedChunks from "../useLoadedChunks";
import onlineIntakeContext from "sections/OnlineIntake/OnlineIntakeContext";
import nsQuestions from "./schemaChunks/nsQuestions.json";
import { useContext } from "react";

function NurturingSkillsMobile({}: any) {
  const { chunks } = useContext(onlineIntakeContext);
  const loadedChunk = useLoadedChunks([nsQuestions], chunks);
  return (
    <UniversalPlayer initialLoadedComponents={loadedChunk} isMobile={true} />
  );
}

export default NurturingSkillsMobile;
