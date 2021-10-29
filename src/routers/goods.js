const Router = require("koa-router");

const router = new Router({ prefix: "/goods" });

const { upload,cracteGoods,update,offGoodsItem,onGoodsItem,getGoodsList } = require("../controller/goods.controller");

const { auth,hasAdminPermissions } = require('../middleware/auth')
const { validaterGoods } = require('../middleware/goods')

// 商品图片上传接口
router.post('/upload',auth,hasAdminPermissions,upload)

// 发布商品接口
router.post('/',auth,hasAdminPermissions,validaterGoods,cracteGoods)

// 修改商品接口
router.put('/:id',auth,hasAdminPermissions,validaterGoods,update)

// 删除商品接口
// router.delete('/delete/:id',auth,hasAdminPermissions,deleteItem)

// 删除(下架)商品接口
router.post('/off/:id',auth,hasAdminPermissions,offGoodsItem)

// 添加(上架)商品接口
router.post('/on/:id',auth,hasAdminPermissions,onGoodsItem)

// 获取商品列表
router.get('/list',auth,getGoodsList)



module.exports = router