export default class SchemaSaves {
  chunks: any[];
  constructor(chunks?: any) {
    this.chunks = chunks;
  }

  pushSchemaChunk = (chunk: any) => {
    if (!this.chunks) this.chunks = [];
    this.chunks.push(chunk);
  };

  iterateChunks = (callback: any) => {
    let realThis = this;
    // Allows callback to break out of loop
    for (let i = 0; i < this.chunks.length; i++) {
      //@ts-ignore
      function setChunkLocal(chunk: any) {
        realThis.chunks[i] = chunk;
      }
      if (callback(this.chunks[i], i, setChunkLocal)) {
        break;
      }
    }
  };

  updateChunk = (
    chunk: { ID: string; [prop: string]: any },
    settings?: { addIfNotFound: boolean }
  ) => {
    settings = settings || { addIfNotFound: true };
    let found = false;
    const ID = chunk?.ID;
    this.iterateChunks(
      (iterateChunk: any, i: number, setChunkLocal: Function) => {
        if (iterateChunk?.ID === ID) {
          setChunkLocal(chunk);
          found = true;
          return true;
        }
      }
    );
    if (!found && settings.addIfNotFound && chunk) this.pushSchemaChunk(chunk);
  };

  getChunks = () => {
    return this.chunks;
  };
}
