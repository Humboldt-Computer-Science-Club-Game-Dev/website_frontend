import { useContext, useState, useEffect, useRef } from "react";
import onlineIntakeContext from "../OnlineIntakeContext";
function useLoadedChunks(schemaChunk: any, loadedChunks: any = []) {
  const [lChunk, setLChunk] = useState<any>(null);
  const prevSchemaChunk = usePrevious(schemaChunk);
  const isDifferent =
    JSON.stringify(schemaChunk) !== JSON.stringify(prevSchemaChunk);

  useEffect(() => {
    const newLChunk = schemaChunk.map((sChunk: any, i: number) => {
      for (let j = 0; j < loadedChunks.length; j++) {
        if (sChunk.ID === loadedChunks[j]?.ID) return loadedChunks[j];
      }
      return sChunk;
    });

    setLChunk(newLChunk);
  }, [isDifferent, loadedChunks]);

  return lChunk;
}

function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default useLoadedChunks;
