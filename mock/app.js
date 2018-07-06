/* 独立运行的node服务器 */

const mock = require('./mock')

const express = require('express')

const app = express()
const router = express.Router()

// 将路由挂载至应用
//     app.use('/public', router)

mock(app)

app.listen(3000, () => console.log('app listening on port 3000!'))