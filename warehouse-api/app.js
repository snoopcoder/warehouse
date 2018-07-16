/*import Koa from 'koa';
import config from  'config';
import err from './middleware/error';
import {routes, allowedMethods} from './middleware/routes';
*/

const Koa = require("koa");
const cors = require("@koa/cors");
var config = require("config");
//const routes = require("./middleware/routes");
const Err = require("./middleware/error");
var Router = require("koa-router");
body = require("async-busboy");
//const route = require("koa-route");

//var bodyParser = require("koa-bodyparser");
const app = new Koa();
var router = new Router();
//app.use(bodyParser());
app.use(cors());

router.post("/", async ctx => {
  const data = await body(ctx.req);
  console.log("dfdf");
  // req.body contains the text fields
});
app.use(router.routes()).use(router.allowedMethods());
//app.use(routes());
//app.use(Err);

//app.use(allowedMethods());

app.listen(config.server.port, function() {
  console.log("%s listening at port %d", config.app.name, config.server.port);
});
