//导入mysql模块
const mysql=require('mysql')
//创建数据库连接对象，
//***密码修改为你设置的连接密码***
const db=mysql.createPool({
host:'127.0.0.1',
user:'root',
password:'LMy789654123!',
database:'my_db_01',
})


//向外共享db数据库连接对象
module.exports=db
