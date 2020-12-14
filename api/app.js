const express = require("express");
const app = express();
const port = 3000;

const {SESSION_NAME,SESSION_SECRET, DOMAIN, COOKIE_SESSION, LOCAL_PORT, HOST} = require("./config/env");

const helmet = require('helmet');
const csrf = require('csurf');

const cors = require('cors');

const cors_options = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(cors_options));

const xp_session = require('express-session');
const parseurl = require('parseurl')
app.set('trust proxy', 1) // trust first proxy
const session = {
  name: SESSION_NAME,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
};
app.use(xp_session(session));

// const c_session = require('cookie-session');
// const expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
// app.use(c_session({
//   name: COOKIE_SESSION,
//   keys: ['key1', 'key2'],
//   cookie: { secure: true,
//             httpOnly: true,
//             domain: DOMAIN,
//             path: 'foo/bar',
//             expires: expiryDate
//           }
//   })
// );


app.use(helmet());

app.disable('x-powered-by');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use((req, res, next) =>{
  if (!req.session.views) {
    req.session.views = {}
  }

  const pathname = parseurl(req).pathname;

  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

  next();
})


const logger = require("./middlewares/logger");
app.use(logger);//must be placed before all routes

const index_routes = require("./routes/index");
app.use('/',index_routes);

const todos_routes = require("./routes/todos");
app.use('/todos',todos_routes);

const error_handler = require("./middlewares/error_handler");
app.use(error_handler);//must be placed after all routes

app.listen(port, () => {
  console.log(`TP Todo List API listening at ${HOST}`);
})
