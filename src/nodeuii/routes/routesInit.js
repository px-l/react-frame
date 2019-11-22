// var getMessageList = require('../data/getMessage');
const routesInit = {
    init(app,router) {
        app.use(router(_ => {
            _.get('/', (ctx,next)=>{
                await ctx.render("index",{
                    title:"nodeWeb 首页"
                })
            });
            _.get('/data/getMessage/', (ctx,next)=>{
                ctx.body({name:'杨璇'});
            });
            // _.get('/index/test', indexController.testAction());
        }));
    }
}
export default routesInit;