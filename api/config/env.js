const DOMAIN = process.env.DOMAIN || "localhost";
const LOCAL_PORT = process.env.LOCAL_PORT || 3000;
const DIST_PORT = process.env.DIST_PORT || 3000;
const DEV_HOST = process.env.DEV_HOST || "http://localhost";
const PROD_HOST = process.env.PROD_HOST || "https://api.todolist.sherpa.one/v2";
const JWT_KEY = process.env.JWT_KEY;
const NODE_ENV = process.env.NODE_ENV;
const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_NAME = process.env.SESSION_NAME;
const COOKIE_SESSION = process.env.COOKIE_SESSION;
const DEBUG = process.env.DEBUG;

let HOST;

(NODE_ENV==="production")? HOST = `${DEV_HOST}:${DIST_PORT}` : PROD_HOST;

module.exports = { LOCAL_PORT, DIST_PORT, HOST, JWT_KEY, NODE_ENV, HOST, COOKIE_SESSION, SESSION_NAME, SESSION_SECRET, DOMAIN, DEBUG };