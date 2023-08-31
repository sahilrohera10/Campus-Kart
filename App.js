const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4002;
const Rollbar = require("rollbar");
const Routes = require("./Routes/apiRoutes");
const ChatRoute = require("./Routes/ChatRoute");
const MessageRoute = require("./Routes/MessageRoute");

const cors = require("cors");

dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_CONNECT, {})
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("./ImgUploads"));

app.use("/", Routes);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);

app.use((err, req, res, next) => {
  rollbar.error(err);
});

app.listen(PORT, () => {
  console.log("server started and running on port 4002");
});
