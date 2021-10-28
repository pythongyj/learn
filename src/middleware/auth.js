const jwt = require("jsonwebtoken");

const { WEB_TOKEN_KEY } = require("../config/default");
const { hasNotAdminPermissions } = require('../constants/errors.type')

const {
  tokenExpiredError,
  jsonWebTokenError,
  tokenIsNotNull,
} = require("../constants/errors.type");

// 验证是否登陆
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header;
  if (!authorization) {
    return ctx.app.emit("error", tokenIsNotNull, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const user = jwt.verify(token, WEB_TOKEN_KEY);
    ctx.state.user = user;
    console.log("user", user);
  } catch (error) {
    console.log("user", error.name);
    switch (error.name) {
      case "TokenExpiredError":
        console.error("Token 已过期");
        return ctx.app.emit("error", tokenExpiredError, ctx);
      case "JsonWebTokenError":
        console.error("无效Token");
        return ctx.app.emit("error", jsonWebTokenError, ctx);
    }
  }

  await next();
};

// 验证是否是管理员权限
const hasAdminPermissions = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
console.log('is_admin',is_admin);
  if (!is_admin) {
     return ctx.app.emit('error',hasNotAdminPermissions,ctx)
  }
  await next();
};

module.exports = {
  auth,
  hasAdminPermissions,
};
