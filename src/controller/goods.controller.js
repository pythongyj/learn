class GoodsController{
    // 文件上传
    async upload(ctx,next){
        ctx.body = '图片上传成功'
    }
}

module.exports = new GoodsController()