const express = require("express");
const { port } = require("./config");
const { connectDB } = require("./infrastructure/db");
const { connectProducer } = require("./infrastructure/kafka");
const postRoutes = require("./api/postRoutes");

async function start() {
  await connectDB();
  await connectProducer();

  const app = express();
  app.use(express.json());

  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/posts", postRoutes);

  app.use((err, _req, res, _next) => {
    console.error("error", err.message);
    res.status(err.status || 400).json({ error: err.message });
  });

  app.listen(port, () => console.log(`api listening on port ${port}`));
}

start().catch((err) => {
  console.error("fatal", err);
  process.exit(1);
});
