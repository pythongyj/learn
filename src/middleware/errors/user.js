const { getUserInfo } = require("../../service/user.service");
const bcrypt = require("bcryptjs");

const {
  userAlreadyExisted,
  userFormateError,
  userRegisterError,
  userDoesNotExisted,
  userInvalidPassword,
  userLoginError,
} = require("../../constants/errors/user.type");

// 验证账号密码不能为空
const userValidata = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return ctx.body;
  }
  await next();
};

// 验证账号与密码是否正确
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  try {
    const result = await getUserInfo({ user_name });
    if (result) {
      console.error(userAlreadyExisted.message, user_name);
      ctx.app.emit("error", userAlreadyExisted, ctx);
      return;
    }
    await next();
  } catch (error) {
    console.error(userRegisterError, error);
    ctx.app.emit("error", userRegisterError, ctx);
    return;
  }
};

// 登陆验证中间件
const verifyLogin = async (ctx, next) => {
  // 获取用户信息
  const { user_name, password } = ctx.request.body;
  // 读取数据库信息
  try {
    const result = await getUserInfo({ user_name });
    if (result == null) {
      console.error("用户名不正确");
      ctx.app.emit("error", userDoesNotExisted, ctx);
      return;
    }
    if (!bcrypt.compareSync(password, result.password)) {
      console.error("密码不正确", result.password);
      ctx.app.emit("error", userInvalidPassword, ctx);
      return;
    }
    await next();
  } catch (error) {
    console.error(userLoginError, error);
    ctx.app.emit("error", userLoginError, ctx);
    return;
  }
};

// 密码加密中间件
const cryptjsPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  // 加密后的数据
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
  await next();
};

module.exports = {
  userValidata,
  verifyUser,
  cryptjsPassword,
  verifyLogin,
};
