const Goods = require("../model/goods");

class GoodsService {
  // 创建发布商品
  async createGoods(goods) {
    const res = await Goods.create(goods);
    return res.dataValues;
  }

  // 更新商品信息
  async updateGoods(id, goods) {
    const res = await Goods.update(goods, { where: { id } });
    console.log("resres", res[0]);
    return res[0] > 0 ? true : false;
  }

  // 查询商品信息
  async getGoods({ id, goods_name, goods_price, goods_image, goods_num }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    goods_name && Object.assign(whereOpt, { goods_name });
    goods_price && Object.assign(whereOpt, { goods_price });
    goods_image && Object.assign(whereOpt, { goods_image });
    goods_num && Object.assign(whereOpt, { goods_num });
    const result = await Goods.findAll({
      attributes: [
        "id",
        "goods_name",
        "goods_price",
        "goods_image",
        "goods_num",
      ],
      where: whereOpt,
    });
    console.log("result", result);

    return result
  }

  // 删除(下架)商品 软删除 
  async offGoods({id,idDelete=false}){
    const res = await Goods.destroy( { where: { id },force: idDelete });
    console.log("resres", res,id);
    return res;
  }

   // 删除(下架)商品 软删除 
   async onGoods({id,idDelete=true}){
    const res = await Goods.restore( { where: { id } });
    console.log("resres", res,id);
    return res;
  }

  // 查询商品列表 分页查询
  async goodsList({pageSize,pageNumber}){
    const { count, rows } = await Goods.findAndCountAll({
      offset: (pageNumber-1)*pageSize,
      limit: parseInt(pageSize)
    });
    const list = rows.map(e=>{
      const { updatedAt,createdAt,destroyTime,...item } = e.dataValues
      console.log('item',item,e);
      return item
    })
    return {
      count,
      list
    }
  }
}

module.exports = new GoodsService();
