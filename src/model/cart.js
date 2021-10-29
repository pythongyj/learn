const { DataTypes } = require("sequelize");

const sequelize = require("../db/index");

const Cart = sequelize.define("cart", {});

// 强制同步数据库 创建数据表
Cart.sync({ force: false });

// `sequelize.define` 会返回模型
// console.log(Goods === sequelize.models.Goods); // true

module.exports = Cart;
