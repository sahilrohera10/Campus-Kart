const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {})
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

const Routes = require("./Routes/apiRoutes");
app.use("/", Routes);

app.listen(4000, () => {
  console.log("server started and running on port 4000");
});
