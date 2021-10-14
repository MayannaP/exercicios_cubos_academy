const express = require("express");
const { errorHandler } = require("./Middlewares/error");
const route = require("./routes");

const app = express();

app.use(express.json());
app.use(route);

route.use(errorHandler);

module.exports = app;
