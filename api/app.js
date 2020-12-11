const express = require("express");
const app = express();
const port = 3000;
const error_handler = require("./middlewares/error_handler");

const logger = require("./middlewares/logger");
app.use(logger);//must be placed before all routes

const index_routes = require("./routes/index");
app.use('/',index_routes);

const todos_routes = require("./routes/todos");
app.use('/todos',todos_routes);

app.use(error_handler);//must be placed after all routes

app.listen(port, () => {
  console.log(`TP Todo List API listening at http://localhost:${port}`);
})
