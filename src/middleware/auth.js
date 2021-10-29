const jwt = require("jsonwebtoken");

const { WEB_TOKEN_KEY } = require("../config/default");

const {
  tokenExpiredError,
  jsonWebTokenError,
  tokenIsNotNull,
  hasNotAdminPermissions
} = require("../constants/errors/token.type");

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
  } catch (error) {
    console.error("user", error.name);
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
  if (!is_admin) {
    return ctx.app.emit("error", hasNotAdminPermissions, ctx);
  }
  await next();
};

module.exports = {
  auth,
  hasAdminPermissions,
};
