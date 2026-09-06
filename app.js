import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { randomUUID } from "node:crypto";
const root = path.dirname(fileURLToPath(import.meta.url));
export const app = express();
app.use(cors());
app.use(express.json({ limit: "32kb" }));
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, app: "ArmaZenNFT=ZenWeaponNFT" }),
);
app.get("/api/feed", (_req, res) =>
  res.json({
    ok: true,
    demo: true,
    pulse: ["Lâmina Sussurro #014", "Kunai Flor", "Coleção Serenidade"],
  }),
);
app.post("/api/biscuit", (req, res) => {
  const amount = req.body?.amount ?? 1;
  if (!Number.isInteger(amount) || amount < 1 || amount > 100)
    return res
      .status(400)
      .json({
        ok: false,
        error: "amount must be an integer between 1 and 100",
      });
  res.json({ ok: true, demo: true, received: amount });
});
for (const action of ["offer", "exchange"])
  app.post("/api/" + action, (req, res) => {
    if (
      typeof req.body?.artwork !== "string" ||
      !req.body.artwork.trim() ||
      req.body.artwork.length > 200
    )
      return res
        .status(400)
        .json({ ok: false, error: "artwork is required (max 200 characters)" });
    res.json({
      ok: true,
      demo: true,
      id: randomUUID(),
      status: "simulated",
      artwork: req.body.artwork,
    });
  });
for (const provider of ["google", "flow"])
  app.post("/api/auth/" + provider, (_req, res) =>
    res
      .status(501)
      .json({ ok: false, demo: true, error: "AUTH_NOT_CONFIGURED", provider }),
  );
app.use("/api", (_req, res) =>
  res.status(404).json({ ok: false, error: "API not found" }),
);
for (const folder of ["frontend/dist", "dist"]) {
  const dir = path.join(root, folder);
  if (fs.existsSync(dir))
    app.use(
      express.static(dir, {
        setHeaders(res, file) {
          if (file.endsWith(".html") || file.endsWith("sw.js"))
            res.setHeader("Cache-Control", "no-cache");
        },
      }),
    );
}
app.get("*", (req, res) => {
  if (path.extname(req.path)) return res.status(404).send("Not found");
  for (const name of [
    "frontend/dist/index.html",
    "dist/index.html",
    "frontend/index.html",
  ]) {
    const file = path.join(root, name);
    if (fs.existsSync(file)) return res.sendFile(file);
  }
  res.status(200).send("ArmaZenNFT build pending - rode npm run build");
});
app.use((error, _req, res, _next) =>
  res
    .status(error.status || 500)
    .json({
      ok: false,
      error: error.status === 400 ? "Invalid JSON" : "Request failed",
    }),
);
