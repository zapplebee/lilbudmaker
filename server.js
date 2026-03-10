import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFileSync, writeFileSync } from "fs";
import { serveStatic } from "@hono/node-server/serve-static";
import { logger } from "./logger.js";

const DB = "./lilbudz.ndjson";
const index = readFileSync("./dist/index.html", "utf-8");

function readFaces() {
  return readFileSync(DB, "utf-8")
    .split("\n")
    .filter(Boolean)
    .map((line, i) => ({ id: i, ...JSON.parse(line).message }));
}

function writeFaces(faces) {
  const lines = faces.map((f) => {
    const { id, ...rest } = f;
    return JSON.stringify({ level: "info", message: rest });
  });
  writeFileSync(DB, lines.join("\n") + "\n");
}

const app = new Hono();

app.get("/lilbudmaker/assets/*", serveStatic({ root: "./dist", rewriteRequestPath: (p) => p.replace("/lilbudmaker", "") }));

// List all faces
app.get("/lilbudmaker/api/faces", (c) => {
  return c.json(readFaces());
});

// Save a new face
app.post("/lilbudmaker/api/face", async (c) => {
  const body = await c.req.json();
  logger.info(body);
  return c.json({ message: "ok" }, 200);
});

// Delete a face by id
app.delete("/lilbudmaker/api/faces/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const faces = readFaces().filter((f) => f.id !== id);
  writeFaces(faces);
  return c.json({ message: "deleted" });
});

app.get("*", (c) => c.html(index));

serve({ fetch: app.fetch, port: 3400 });
