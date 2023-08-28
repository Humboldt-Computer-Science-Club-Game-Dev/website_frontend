import UniversalPlayer from "../../UniversalPlayer";
import paacnaSelectionPage1 from "./schemaChunks/paacnaSelectionPage1.json";
import paacnaSelectionPage2 from "./schemaChunks/paacnaSelectionPage2.json";
import paacnaStrengths from "./schemaChunks/paacnaStrengths.json";
import paacnaGoals from "./schemaChunks/paacnaGoals.json";
import useLoadedChunks from "../useLoadedChunks";
import onlineIntakeContext from "sections/OnlineIntake/OnlineIntakeContext";
import { useContext } from "react";

function PreventionAndAfterCareNeedsAssessmentMobile() {
  const { chunks } = useContext(onlineIntakeContext);
  const loadedChunk = useLoadedChunks(
    [paacnaStrengths, paacnaGoals, paacnaSelectionPage1, paacnaSelectionPage2],
    chunks
  );

  return (
    <UniversalPlayer initialLoadedComponents={loadedChunk} isMobile={true} />
  );
}

export default PreventionAndAfterCareNeedsAssessmentMobile;
