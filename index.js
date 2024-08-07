require("dotenv").config();
require("./utils/mongodb").run();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const errorHandlerMiddleware = require("./middlewares/errorHandler.middleware");
const isAuthMiddleware = require("./middlewares/auth.middleware");

//Middlewares
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(isAuthMiddleware);

//routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/users", require("./routes/users.routes"));
app.use("/tasks", require("./routes/tasks.routes"));
app.use("/emails", require("./routes/emails.routes"));

app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
