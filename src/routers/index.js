const fs = require('fs')

const Router = require('koa-router')
const router = new Router()

fs.readdirSync(__dirname).forEach(file =>{
    if (file!='index.js'&&file!='README.md') {
        let dir = require('./'+file)
        router.use(dir.routes())
    }
})

module.exports = router