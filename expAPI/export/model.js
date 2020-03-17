let mongoose = require('mongoose');

// 1. 连接数据库
mongoose.connect('mongodb://localhost:27017/data')

// 判断连接失败
mongoose.connection.on('error',function(error){
    console.log('数据库data 连接失败'+error)
})

// 连接成功提示
mongoose.connection.once('open',()=>{
    console.log('数据库data 连接成功')
})

// 2.写人员schema 样式
let UserSchema = mongoose.Schema({
    company:String,
    name:String,
    iphone:Number,
    site:String,
    client:String,
    remark:String
})
let User = mongoose.model('User',UserSchema,'user');
exports.User = User
 
// 3.  写商品schema 样式
let CommoSchema = mongoose.Schema({
    name:String,
    model:String,
    url:[{
        name:String,
        url:String,
        uid:Number,
        status:String
    }],
    price:Number,
    firm:String,
    iphone:String,
    describe:String
})

let Commo = mongoose.model('Commodity',CommoSchema,'commodity')
exports.Commo = Commo

// 4. 账号
let AccountSchema = mongoose.Schema({
    account:String,
    pass:String
})
let Account = mongoose.model('Account',AccountSchema,'account')
exports.Account = Account






