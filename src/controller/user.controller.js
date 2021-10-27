const { createUser } = require("../service/user.service");

const { userRegisterError } = require('../constants/errors.type')

class UserController {
  async register(ctx, next) {
    // 获取数据
    const { user_name, password } = ctx.request.body;
    try {
      // 操作数据库
      const res = await createUser(user_name, password);
      // 返回结果
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        resutl: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }
  async login(ctx, next) {
    ctx.body = ctx.request.body;
  }
}

module.exports = new UserController();
