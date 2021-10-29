const path = require("path");

const koa = require("koa");

const koaBody = require("koa-body");

const koaStatic = require("koa-static");

const parameter = require('koa-parameter');

const router = require("../routers/index");
const errorHandler = require("./errorHandler");
const app = new koa();

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, "../uploads"),
      keepExtensions: true,
    },
  })
); // 在路由之前注册 koaBody 中间件

app.use(parameter(app))
app.use(router.routes()).use(router.allowedMethods()); // 注册路由中间件
app.use(koaStatic(path.join(__dirname, "../uploads")));

app.on("error", errorHandler); // 统一处理错误信息

module.exports = app;
