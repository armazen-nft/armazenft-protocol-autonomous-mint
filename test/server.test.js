import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { app } from "../app.js";
import { readFile } from "node:fs/promises";
let server, base;
before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve);
  });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));
const post = (route, body) =>
  fetch(base + route, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
test("health contract", async () => {
  const res = await fetch(base + "/api/health");
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), {
    ok: true,
    app: "ArmaZenNFT=ZenWeaponNFT",
  });
});
test("compiled SPA and all generated asset references are served", async () => {
  for (const route of ["/", "/garden/deep-link"]) {
    const res = await fetch(base + route);
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.match(html, /id="root"/);
    assert.doesNotMatch(html, /src\/main.jsx/);
    const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)].map(
      (m) => m[1],
    );
    assert.ok(assets.length >= 2);
    for (const asset of assets)
      assert.equal((await fetch(base + asset)).status, 200);
  }
});
test("unknown API and missing assets never become HTML success", async () => {
  assert.equal((await fetch(base + "/api/missing")).status, 404);
  assert.equal((await fetch(base + "/assets/missing.js")).status, 404);
});
test("simulations validate payloads and cannot be promoted to real transactions", async () => {
  assert.equal((await post("/api/biscuit", { amount: -1 })).status, 400);
  assert.equal((await post("/api/biscuit", { amount: 1 })).status, 200);
  for (const route of ["/api/offer", "/api/exchange"]) {
    assert.equal((await post(route, {})).status, 400);
    const res = await post(route, {
      artwork: "Test",
      ok: false,
      demo: false,
      status: "paid",
    });
    const data = await res.json();
    assert.equal(data.demo, true);
    assert.equal(data.status, "simulated");
    assert.equal(data.ok, true);
  }
});
test("authentication does not fabricate an authenticated identity", async () => {
  for (const provider of ["google", "flow"]) {
    const res = await post("/api/auth/" + provider, {});
    assert.equal(res.status, 501);
    assert.equal((await res.json()).error, "AUTH_NOT_CONFIGURED");
  }
});
test("feed, PWA resources, malformed JSON and language coverage", async () => {
  assert.ok((await (await fetch(base + "/api/feed")).json()).pulse.length);
  for (const route of [
    "/manifest.webmanifest",
    "/sw.js",
    "/offline.html",
    "/icon.svg",
  ])
    assert.equal((await fetch(base + route)).status, 200);
  assert.equal(
    (
      await fetch(base + "/api/biscuit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{",
      })
    ).status,
    400,
  );
  const { default: languages } = await import("../frontend/src/i18n.js");
  assert.equal(Object.keys(languages).length, 10);
  for (const row of Object.values(languages)) assert.equal(row.length, 20);
  assert.ok(
    (
      await readFile(
        new URL("../frontend/dist/index.html", import.meta.url),
        "utf8",
      )
    ).length > 0,
  );
});
