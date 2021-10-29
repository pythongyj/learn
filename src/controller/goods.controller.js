const path = require("path");
const {
  createGoods,
  updateGoods,
  getGoods,
  offGoods,
  onGoods,
  goodsList,
} = require("../service/goods.service");

const {
  uploadImgError,
  fileTypeError,
  publishGoodsError,
  updateGoodsError,
  getGoodsError,
  deleteGoodsError,
  onGoodsError,
  getListGoodsError
} = require("../constants/errors/goods.type");
class GoodsController {
  // 文件上传
  async upload(ctx, next) {
    const { file = "" } = ctx.request.files;
    const fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (file) {
      if (!fileTypes.includes(file.type)) {
        return ctx.app.emit("error", fileTypeError, ctx);
      }
      ctx.body = {
        code: 0,
        message: "图片上传成功",
        result: {
          goods_img: path.basename(file.path),
        },
      };
    } else {
      return ctx.app.emit("errr", uploadImgError, ctx);
    }
    console.log(ctx.request.files.file.path);
  }

  // 发布商品
  async cracteGoods(ctx, next) {
    // 1、获取数据
    try {
      const res = await createGoods(ctx.request.body);
      ctx.body = {
        code: 0,
        message: "商品发布成功",
        result: res,
      };
    } catch (error) {
      console.error(error);
      return ctx.app.emit("error", publishGoodsError, ctx);
    }
  }

  // 修改商品
  async update(ctx, next) {
    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      const result = await getGoods({ id: ctx.params.id });
      if (res == 0) {
        updateGoodsError.message = "商品修改错误";
        updateGoodsError.result = result;
        return ctx.app.emit("error", updateGoodsError, ctx);
      }
      ctx.body = {
        code: 0,
        message: "修改成功",
        result: result,
      };
    } catch (error) {
      console.error(error);
      updateGoodsError.result = {
        fields: error.fields["goods.goods_name"],
        message: error.errors[0].message,
        value: error.fields,
        successId: result[0].id,
        currentId: parseInt(ctx.params.id),
      };
      if (error.fields["goods.goods_name"]) {
        try {
          const result = await getGoods({
            goods_name: ctx.request.body.goods_name,
          });
          updateGoodsError.result.successId = result[0].id;
        } catch (err) {
          console.error("err", err);
          return ctx.app.emit("error", getGoodsError(err), ctx);
        }
      }
      return ctx.app.emit("error", updateGoodsError, ctx);
    }
  }

  // 删除商品 软删除
  async offGoodsItem(ctx, next) {
    const { id } = ctx.params;
    try {
      const res = await offGoods({ id });
      if (res) {
        ctx.body = {
          code: 0,
          message: "商品删除成功",
          result: {
            id,
          },
        };
      } else {
        ctx.body = {
          code: 0,
          message: "商品不存在",
          result: {
            id,
          },
        };
      }
    } catch (error) {
      return ctx.app.emit("error", deleteGoodsError, ctx);
    }
  }

  // 商品上架
  async onGoodsItem(ctx, next) {
    const { id } = ctx.params;
    try {
      const res = await onGoods({ id });
      if (res) {
        ctx.body = {
          code: 0,
          message: "商品上架成功",
          result: {
            id,
          },
        };
      } else {
        ctx.body = {
          code: 0,
          message: "要上架的商品不存在",
          result: {
            id,
          },
        };
      }
    } catch (error) {
      return ctx.app.emit("error", onGoodsError, ctx);
    }
  }

  // 获取商品列表
  async getGoodsList(ctx, next) {
    const { pageSize,pageNumber } = ctx.request.query
    try {
      const res = await goodsList({pageSize,pageNumber});
      ctx.body = {
        code: 0,
        message: "获取商品列表成功",
        result: res,
      };
    } catch (error) {
      return ctx.app.emit("error", getListGoodsError, ctx);
    }
  }
}

module.exports = new GoodsController();
