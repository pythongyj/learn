const { DataTypes } = require("sequelize");

const sequelize = require("../db/index");

const User = sequelize.define(
  "nodekoa_user",
  {
    // 在这里定义模型属性
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "用户名，必须唯一",
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: "密码，必须",
      // allowNull 默认为 true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "是否为管理员，0默认值，不是管理员，1是管理员",
    },
  },
  {
    // 这是其他模型参数
    timestamps:false, // 是否创建时间戳字段
  }
);

// 强制同步数据库 创建数据表
// User.sync({ force: true });

// `sequelize.define` 会返回模型
console.log(User === sequelize.models.User); // true

module.exports = User;
