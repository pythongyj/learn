const Router = require("koa-router");

const router = new Router({ prefix: "/goods" });

const { upload } = require("../controller/goods.controller");

const { auth,hasAdminPermissions } = require('../middleware/auth')


router.post('/upload',auth,hasAdminPermissions,upload)

module.exports = router