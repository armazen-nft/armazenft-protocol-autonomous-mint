import { app } from "./app.js";
const server = app.listen(process.env.PORT || 3000, () =>
  console.log("ArmaZenNFT listening on", server.address().port),
);
for (const signal of ["SIGTERM", "SIGINT"])
  process.on(signal, () => server.close(() => process.exit(0)));
