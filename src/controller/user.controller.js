const { createUser, getUserInfo,updatePasswordById } = require("../service/user.service");

const { userRegisterError,userLoginError,updatePasswordError } = require("../constants/errors/user.type");

const jwt = require("jsonwebtoken");

const { WEB_TOKEN_KEY } = require("../config/default");

class UserController {
  /**
   * 用户注册接口
   * @param {*} ctx
   * @param {*} next
   */
  async register(ctx, next) {
    // 获取数据
    const { user_name, password,is_admin } = ctx.request.body;
    try {
      // 操作数据库
      const res = await createUser({user_name, password,is_admin});
      // 返回结果
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }
  /**
   * 用户登陆接口
   * @param {*} ctx
   * @param {*} next
   */
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    try {
      const res = await getUserInfo({ user_name });
      const { password, ...reset } = res;
      const token = jwt.sign(reset, WEB_TOKEN_KEY, { expiresIn: "1d" });
      ctx.body = {
        code: 0,
        message: "登陆成功",
        result: {
          token,
        },
      };
    } catch (error) {
      console.error('user_name111',user_name);
      ctx.app.emit("error", userLoginError, ctx);
    }
  }

  // 修改密码
  async passwordModify(ctx,next){
    // 获取数据
    const { password,user_name,is_admin } = ctx.request.body;
    const id = ctx.state.user.id
    // 操作数据库
    const res = await updatePasswordById({id,user_name, password, is_admin})
    if (res == 1) {
      ctx.body = {
        code:0,
        message:'修改成功' ,
        result:''
      }
    }else{
      ctx.body = updatePasswordError
    }
    

  }
}

module.exports = new UserController();
