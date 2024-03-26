const app = require("./app");
const connectDB = require("./configs/db");

const { serverPort } = require("./secret");
app.listen(serverPort, async () => {
  console.log(`Server is running on port http://localhost:${serverPort}`);
  await connectDB();
});
