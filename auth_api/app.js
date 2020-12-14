const express = require("express");
const {LOCAL_PORT} = require("./config/env");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);


const logger = require("./middlewares/logger");
app.use(logger);//must be placed before all routes

const auth_routes = require("./routes/auth_routes");
app.use('/auth',auth_routes);

const users_routes = require("./routes/users_routes");
app.use('/users',users_routes);

const error_handler = require("./middlewares/error_handler");
app.use(error_handler);//must be placed after all routes

app.listen(LOCAL_PORT, () => {
  console.log(`Auth API listening at http://localhost:${LOCAL_PORT}`);
})
