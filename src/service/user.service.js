const User = require("../model/user");

class UserService {
  async createUser(user_name, password) {
    // 插入数据
    const result = await User.create({
      user_name,
      password,
    });
    console.log(result);
    // TODO 写入数据库
    return result;
  }
}

module.exports = new UserService();
