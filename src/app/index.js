const koa = require("koa");

const KoaBody = require('koa-body');

const userRouter = require('../routers/user')

const errorHandler = require('./errorHandler')

const app = new koa();

app.use(KoaBody()); // 在路由之前注册 koaBody 中间件

app.use(userRouter.routes()); // 注册路由中间件

app.on('error',errorHandler) // 统一处理错误信息

module.exports = app