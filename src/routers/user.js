const Router = require("koa-router");

const router = new Router({ prefix: "/user" }); // { prefix: "/user" } 添加路由前缀   eg：{ prefix: "/user" }  ==> /user/word

const { register, login } = require("../controller/user.controller");

const {
  userValidata,
  userIsNullValidata,
  cryptjsPassword
} = require("../middleware/errors/user");


// 登陆接口
router.get("/", (ctx,next)=>{
    ctx.body ='heihei'
});

// 注册接口
router.post(
  "/register",
  userValidata,
  userIsNullValidata,
  cryptjsPassword,
  register
);
// 登陆接口
router.post("/login", login);

module.exports = router;
