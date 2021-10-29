const { goodsFormateError } = require("../constants/errors/goods.type");

const validaterGoods = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: { type: "string", requireed: true },
      goods_price: { type: "number", requireed: true },
      goods_num: { type: "number", requireed: true },
      goods_image: { type: "string", requireed: true },
    });
  } catch (error) {
    return ctx.app.emit("error", goodsFormateError(error), ctx);
  }
  await next();
};
module.exports = {
  validaterGoods,
};
