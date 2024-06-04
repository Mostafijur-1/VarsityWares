const app = require("./app");
const connectDB = require("./configs/db");

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception`);
});

const { serverPort } = require("./secret");
app.listen(serverPort, async () => {
  console.log(`Server is running on port http://localhost:${serverPort}`);
  await connectDB();
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
