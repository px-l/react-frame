"use strict";

var _Koa = require("Koa");

var _Koa2 = _interopRequireDefault(_Koa);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _routesInit = require("./routes/routesInit.js");

var _routesInit2 = _interopRequireDefault(_routesInit);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const views = require('koa-views'); // import co from 'co';


const app = new _Koa2.default();

_routesInit2.default.init(app, _koaSimpleRouter2.default); // app.context.render = co.wrap(render({
//     root: config.viewDir,
//     autoescape: true,
//     cache: 'memory', // disable, set to false
//     ext: 'html',
//     writeBody: false
// }));


console.log(_config2.default.staticDir, 111111);
app.use((0, _koaStatic2.default)(_config2.default.staticDir));
app.use(views(__dirname + _config2.default.staticDir, {
  extension: 'ejs'
}));
app.listen(_config2.default.port, () => {
  console.log(`system listening on ${_config2.default.port}`);
});