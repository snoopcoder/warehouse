/*import Koa from 'koa';
import config from  'config';
import err from './middleware/error';
import {routes, allowedMethods} from './middleware/routes';
*/

const Koa = require("koa");
const cors = require("@koa/cors");
var bodyParser = require("koa-bodyparser");
var config = require("config");
const routes = require("./middleware/routes");
const Err = require("./middleware/error");
const serve = require("koa-static-server");

const app = new Koa();
app.use(bodyParser());
//var router = new Router();
app.use(cors());
app.use(serve({ rootDir: __dirname + "\\public", rootPath: "/public" }));
app.use(routes());
app.use(routes.allowedMethods());
app.use(Err);

//app.use(allowedMethods());

app.listen(config.server.port, function() {
  console.log("%s listening at port %d", config.app.name, config.server.port);
});
