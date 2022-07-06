// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
// const port = 3000;
const port = process.env.PORT || 3000;
const router = require("./routes/index.js");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`This program is running`, port);
});
