import Koa from "Koa";
import config from "./config";
import routesInit from "./routes/routesInit.js";
import router from 'koa-simple-router';

const app = new Koa();

routesInit.init(app, router);

app.listen(config.port,()=>{
    console.log(`system listening on ${config.port}`)
})