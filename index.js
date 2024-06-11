require("dotenv").config();
require("./utils/mongodb").run();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const authMiddleware = require("./middlewares/auth.middleware");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");

//Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(authMiddleware);

//routes
app.use("/auth", require("./routes/auth.routes"));

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
