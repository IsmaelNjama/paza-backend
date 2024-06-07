require("dotenv").config();
require("./utils/mongodb").run();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

//Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  console.log("Middleware working...");
  next();
});

//routes

app.use("/auth", require("./routes/auth.routes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
