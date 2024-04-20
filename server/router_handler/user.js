// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')
//导入生成和验证token模块
const jwt = require('jsonwebtoken')
//const expressJWT = require('express-jwt')
var secretKey = '!@#QWE1'

// 注册新用户的处理函数
exports.regUser = (req, res) => {
    // 获取客户端提交到服务器的用户信息
    const userinfo = req.body
    console.log('get info ~~~~~~~~~~  ', req.body)

    // 定义 SQL 语句，查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            return res.send({ status: 1, message: err.message })
            //return res.cc(err)
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            //return res.cc('用户名被占用，请更换其他用户名！')
        }
        // 调用 bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        // 定义插入新用户的 SQL 语句
        const sql = 'insert into ev_users set ?'
        // 调用 db.query() 执行 SQL 语句
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            // 判断 SQL 语句是否执行成功
            if (err) return res.send({ status: 1, message: err.message })
            //if (err) return res.cc(err)
            // 判断影响行数是否为 1
            if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
            // 注册用户成功
            res.send({ status: 200, message: '注册成功！' })
            //res.cc('注册成功！', 0)
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    console.log('~~~~ ', req.body)
    // 将 req.body 请求体中的数据，转存为 userinfo 常量
    const userinfo = req.body
    const sqlStr = 'select password from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            console.log('error~~~~ ', err)
            return res.send({ status: 1, message: err.message, token: '', })
            //return res.cc(err)
        }

        if (results.length > 1) {
            return res.send({ status: 1, message: '多个用户名，用户名冲突', token: '', })
        }
        //验证密码
        let compareResult = bcrypt.compareSync(userinfo.password, results[0].password);
        if (compareResult == true) {

            //生成token的秘钥 
            // const secretKey = '!@#QWE1' 

            //生成token返回
            const tokenStr = jwt.sign({ username: userinfo.username }, secretKey, { expiresIn: '2h' })
            console.log('token is ~~~~', tokenStr)

            //return res.cc(0,'登录成功')
            console.log('登录成功')
            return res.send({ status: 200, message: '登录成功', token: 'Bearer ' + tokenStr, })
        }
        else {
            //return res.cc('密码错误，不能登录')
            return res.send({ status: 1, message: '密码错误，重新输入', token: '', })
        }
    })
}


// 获得用户token信息
exports.getinfo = (req, res) => {
    // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
    //console.log('get admin getinfo request')
    console.log('user-------======', req.user)
    res.send({
        status: 200,
        message: '获取用户信息成功！',
        data: req.user, // 要发送给客户端的用户信息
    })
}

//退出登录
exports.logout = (req, res) => {
    // 将 req.body 请求体中的数据，转存为 userinfo 常量
    const userinfo = req.body
    //如果连接了数据库，关闭数据库连接
    db.disconnect()
    secretKey = 'wrong'  //修改秘钥，使得生成token错误
    res.send({
        status: 200,
        msg: 'logout',
        token: '',
    })
}


