// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
const fs = require('fs')
const path = require('path')

app.use(express.static(__dirname + '/client'));

// 允许跨域资源共享
const cors = require('cors')
app.use(cors())
app.use(express.static('../client/'))

// 解析 post 表单数据的中间件
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


const router = (require('./server/router/user'))
app.use(router)


app.use((err, req, res, next) => {
    console.log('error @@@')
    console.log('error module !!!!!  ', req.url)
    console.log('err---', err)
    jwt({
        secret: secretKey,
        getToken: function fromheader(req) {
            if (req.headers.authorization &&
                req.headers.authorization.split(' ')[0] === 'Bearer'
            ) {
                let uname = req.headers.authorization.split(' ')[1]
                console.log(uname)
            }
        }
    })
    // 这次错误是由 token 解析失败导致的
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            message: '无效的token',
        })
    }
    res.send({
        status: 500,
        message: '未知的错误',
    })
})

app.listen(8888, function () {
    console.log('Express server running at http://127.0.0.1:8888')
})
