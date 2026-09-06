import { createHash } from "node:crypto";
// Demonstration only: no upload, pinning, network access or valid IPFS CID.
export async function mockPin(metadata) {
  const digest = createHash("sha256")
    .update(JSON.stringify(metadata))
    .digest("hex");
  return { mock: true, id: `mock-sha256-${digest}`, metadata };
}
console.log(
  JSON.stringify(
    await mockPin({
      name: "Jardim Secreto",
      description: "Valor é artista e arte, não hype.",
    }),
    null,
    2,
  ),
);
