/*import Koa from 'koa';
import config from  'config';
import err from './middleware/error';
import {routes, allowedMethods} from './middleware/routes';
*/

const Koa = require('koa');
var config = require('config');
const routes  = require('./middleware/routes');
const Err  = require('./middleware/error');
const app = new Koa();

app.use(routes());
app.use(Err);


//app.use(allowedMethods());

app.listen(config.server.port, function () {
    console.log('%s listening at port %d', config.app.name, config.server.port);
});