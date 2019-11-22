"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// var getMessageList = require('../data/getMessage');
const routesInit = {
  init(app, router) {
    app.use(router(_ => {
      _.get('/', (ctx, next) => {
        ctx.render('index');
      });

      _.get('/data/getMessage/', (ctx, next) => {
        ctx.body({
          name: '杨璇'
        });
      }); // _.get('/index/test', indexController.testAction());

    }));
  }

};
exports.default = routesInit;