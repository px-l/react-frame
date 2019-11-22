import Koa from "Koa";
import config from "./config";
import routesInit from "./routes/routesInit.js";
import router from 'koa-simple-router';
import serve from "koa-static";
const views = require('koa-views')
// import co from 'co';
const app = new Koa();

routesInit.init(app, router);
// app.context.render = co.wrap(render({
//     root: config.viewDir,
//     autoescape: true,
//     cache: 'memory', // disable, set to false
//     ext: 'html',
//     writeBody: false
// }));
console.log(config.staticDir,111111)
app.use(serve(config.staticDir));
app.use(views(__dirname + config.staticDir, {
    extension: 'ejs'
  }))
app.listen(config.port,()=>{
    console.log(`system listening on ${config.port}`)
})