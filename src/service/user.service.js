const User = require("../model/user");

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    const result = await User.create({
      user_name,
      password,
    });
    return result.dataValues;
  }

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

    return result?result.dataValues:null;
  }
}

module.exports = new UserService();
