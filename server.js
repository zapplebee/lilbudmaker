import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { readFileSync } from "fs";
import { serveStatic } from "@hono/node-server/serve-static";
import { logger } from "./logger.js";

const index = readFileSync("./dist/index.html", "utf-8");

const app = new Hono();
app.get("/assets/*", serveStatic({ root: "./dist" }));
app.post("/api/face", async (c) => {
  const body = await c.req.json();
  console.log(body);
  logger.info(body);
  return c.json({ message: "ok" }, 200);
});

app.get("*", (c) => c.html(index));

serve({
  fetch: app.fetch,
  port: 3400,
});
