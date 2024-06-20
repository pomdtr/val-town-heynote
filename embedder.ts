import * as embedder from "jsr:@nfnitloop/deno-embedder@1.3.1";

const options = {
  importMeta: import.meta,

  mappings: [
    {
      sourceDir: "static",
      destDir: "embed/static",
    },
  ],
};

if (import.meta.main) {
  await embedder.main({ options });
}
