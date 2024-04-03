import { Hono } from "hono";
import { stream, streamSSE, streamText } from "hono/streaming";
import { cors } from "hono/cors";

const app = new Hono();

let id = 0;

app.use(
  "*",
  cors({
    origin: "*",
  })
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/sse", async (c) => {
  return streamSSE(c, async (stream) => {
    while (true) {
      const message = `It is ${new Date().toISOString()}`;
      await stream.writeSSE({
        data: message,
        event: "timeUpdate",
        id: String(id++),
      });
      await stream.sleep(5000);
    }
  });
});

console.log("server started!");

export default app;
