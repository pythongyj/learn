class CartController {
  // 添加一个商品到购物车
  async addCartItem(ctx, next) {
    ctx.body = {
      code: 0,
      message: "添加购物车成功",
      result: "",
    };
  }
  // 获取购物车列表
  async getCartList(ctx, next) {
    ctx.body = {
      code: 0,
      message: "获取购物车列表成功",
      result: "",
    };
  }

  // 删除购物车商品
  async deleteCartItem(ctx, next) {
    ctx.body = {
      code: 0,
      message: "删除购物车成功",
      result: "",
    };
  }

  // 修改购物车商品
  async editCartItem(ctx, next) {
    ctx.body = {
      code: 0,
      message: "修改购物车成功",
      result: "",
    };
  }
  // 选择购物车商品
  async selectCartItem(ctx, next) {
    ctx.body = {
      code: 0,
      message: "选择购物车商品成功",
      result: "",
    };
  }

  // 全选购物车商品
  async selectAllCartItem(ctx, next) {
    ctx.body = {
      code: 0,
      message: "全选购物车商品成功",
      result: "",
    };
  }
}

module.exports = new CartController();
