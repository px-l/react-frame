const routesInit = {
    init(app,router) {
        app.use(router(_ => {
            _.get('/', (ctx,next)=>{
                ctx.body='hello 李璇'
            });
            // _.get('/index.html', indexController.indexAction());
            // _.get('/index/test', indexController.testAction());
        }));
    }
}
export default routesInit;