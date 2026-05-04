const { startConsumer } = require("./infrastructure/kafka");

startConsumer(async (event) => {
  console.log("Consumer received event:", event);
}).catch((err) => {
  console.error("Fatal consumer failed", err);
  process.exit(1);
});
