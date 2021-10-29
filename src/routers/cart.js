const Router = require("koa-router");

const router = new Router({ prefix: "/cart" });

const { auth } = require("../middleware/auth");
const {
  addCartItem,
  getCartList,
  deleteCartItem,
  editCartItem,
  selectCartItem,
  selectAllCartItem,
} = require("../controller/cart.controller");

// 获取购物车列表
router.get("/", auth, getCartList);

// 添加商品到购物车
router.post("/:id", auth, addCartItem);

// 删除购物车商品
router.delete("/:id", auth, deleteCartItem);

// 修改购物车商品
router.put("/:id", auth, editCartItem);

// 选择购物车商品
router.post("/select/:id", auth, selectCartItem);

// 全选购物车商品
router.post("/select/all/:id", auth, selectAllCartItem);

module.exports = router;
