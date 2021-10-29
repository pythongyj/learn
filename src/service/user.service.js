const User = require("../model/user");

class UserService {
  /**
   * 创建（新增）用户
   * @param {*} user_name 用户名
   * @param {*} password 密码
   * @returns 用户名  密码  id
   */
  async createUser({user_name, password,is_admin}) {
    // 插入数据
    const result = await User.create({
      user_name,
      password,
      is_admin
    });
    return result.dataValues;
  }

  /**
   * 获取用户信息
   * @param {*}
   * @returns 用户信息
   */
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    const result = await User.findOne({
      attributes: ["id", "user_name", "password", "is_admin"],
      where: whereOpt,
    });

    return result ? result.dataValues : null;
  }

  /**
   * 修改密码处理
   * @param {*} param0 
   * @returns 
   */
  async updatePasswordById({ id, user_name, password, is_admin }) {
    const whereOpt = { id };
    const newUser = {};
    user_name && Object.assign(newUser, { user_name });
    password && Object.assign(newUser, { password });
    is_admin && Object.assign(newUser, { is_admin });
    const res = await User.update(newUser, { where: whereOpt });

    
    return res[0]
  }
}

module.exports = new UserService();
