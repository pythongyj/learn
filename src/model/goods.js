const { DataTypes } = require("sequelize");

const sequelize = require("../db/index");

const Goods = sequelize.define(
  "goods",
  {
    // 在这里定义模型属性
    goods_name: {
      type: DataTypes.STRING,
      allowNull: false,
    //   unique: true,
      comment: "商品名称，必须唯一",
    },
    goods_price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      comment: "商品价格",
      // allowNull 默认为 true
    },
    goods_num: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "商品数量",
    },
    goods_image: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "商品图片",
    },
  },
  {
    // 这是其他模型参数
    // timestamps: false, // 是否创建时间戳字段
    paranoid: true,
    deletedAt: 'destroyTime'
  }
);

// 强制同步数据库 创建数据表
Goods.sync({ force: false });

// `sequelize.define` 会返回模型
// console.log(Goods === sequelize.models.Goods); // true

module.exports = Goods;
