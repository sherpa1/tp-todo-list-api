const LOCAL_PORT = process.env.LOCAL_PORT || 3000;
const DIST_PORT = process.env.DIST_PORT || 4000;
const DEV_HOST = process.env.DEV_HOST || "http://localhost";
const PROD_HOST = process.env.PROD_HOST || "https://api.todolist.sherpa.one/v2";
const JWT_KEY = process.env.JWT_KEY;
const NODE_ENV = process.env.NODE_ENV;

let HOST;

(NODE_ENV==="production")? HOST = `${DEV_HOST}:${DIST_PORT}` : PROD_HOST;

module.exports = { LOCAL_PORT, DIST_PORT, HOST, JWT_KEY, NODE_ENV, HOST };