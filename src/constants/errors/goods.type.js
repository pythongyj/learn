module.exports = {
  uploadImgError: {
    code: "10201",
    message: "商品图片上传错误",
    result: "",
  },
  fileTypeError: {
    code: "10202",
    message: "商品图片上传类型错误",
    result: "",
  },
  goodsFormateError(err) {
    err.errors = err.errors.map((e) => ({
      [e.field]: e.message,
      params: {
        [e.field]: err.params[e.field],
      },
    }));
    return {
      code: "10203",
      message: "商品参数错误",
      result: {
        errors: err.errors,
      },
    };
  },
  publishGoodsError: {
    code: "10204",
    message: "商品上架失败",
    result: "",
  },
  updateGoodsError: {
    code: "10205",
    message: "商品修改失败",
    result: "",
  },
  getGoodsError(err) {
    return {
      code: "10206",
      message: "商品查询失败",
      result: err,
    };
  },
  deleteGoodsError(err) {
    return {
      code: "10207",
      message: "商品删除失败",
      result: err,
    };
  },
  onGoodsError(err) {
    return {
      code: "10208",
      message: "商品上架失败",
      result: err,
    };
  },
  getListGoodsError(err) {
    return {
      code: "10209",
      message: "获取商品列表失败",
      result: err,
    };
  },
};
