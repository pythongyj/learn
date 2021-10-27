const koa = require("koa");

const KoaBody = require('koa-body');

const userRouter = require('../routers/user')

const app = new koa();

app.use(KoaBody()); // 在路由之前注册 koaBody 中间件

app.use(userRouter.routes()); // 注册路由中间件

module.exports = app