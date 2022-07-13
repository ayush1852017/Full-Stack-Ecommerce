const app = require("./index");
const dotenv = require("dotenv");
const connect = require("./Config/db");

// Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);
  process.exit(1);
});
// console.log(first);
dotenv.config({ path: "Backend/Config/config.env" });
connect();
const server = app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

// Unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`error: ${err.message}`);
  console.log(`Shutting down server due to: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
