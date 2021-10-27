const { getUserInfo } = require("../../service/user.service");
const bcrypt = require("bcryptjs");

const {
  userAlreadyExisted,
  userFormateError,
  userRegisterError,
} = require("../../constants/errors.type");

const userValidata = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormateError, ctx);
    return ctx.body;
  }
  await next();
};

const userIsNullValidata = async (ctx, next) => {
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
  userIsNullValidata,
  cryptjsPassword,
};
