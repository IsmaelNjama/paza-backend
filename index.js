require("dotenv").config();
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

//test route
app.use("/", (req, res, next) => {
  res.send("Hello World");
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
