const Router = require("koa-router");

const router = new Router({ prefix: "/user" }); // { prefix: "/user" } 添加路由前缀   eg：{ prefix: "/user" }  ==> /user/word

const { register, login ,passwordModify} = require("../controller/user.controller");

const { auth } = require('../middleware/auth')

const {
  userValidata,
  verifyUser,
  cryptjsPassword,
  verifyLogin
} = require("../middleware/errors/user");


// 注册接口
router.post(
  "/register",
  userValidata,
  verifyUser,
  cryptjsPassword,
  register
);
// 登陆接口
router.post("/login",userValidata, login);

// 修改密码接口
router.patch('/modify',auth,cryptjsPassword,passwordModify)

module.exports = router;
