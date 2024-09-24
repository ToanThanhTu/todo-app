const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const todosRouter = require("./controllers/todos");
const categoriesRouter = require("./controllers/categories");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const mongoURL = config.MONGODB_URI;
logger.info(`Connecting to ${mongoURL}`);

mongoose
  .connect(mongoURL)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error(`error connecting to MongoDB: ${error.message}`);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

app.use(middleware.tokenExtractor);
app.use("/api/todos", todosRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.requestLogger);

app.use(middleware.unknownEndpoint);

module.exports = app;
