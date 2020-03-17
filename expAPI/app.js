let express = require('express')
let path = require('path')
// let fs = require('fs')
let app = express()
const connect = require('connect-multiparty')
const multiparty = connect();
let qs = require('qs');
// let formidable = require('formidable')

// 部门 详细 信息
let API = require('./export/model');

// 加载静态资源
app.use(express.static(path.join(__dirname,'import')))  

// 跨域设置
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 查询数据库
app.get('/',function(req,res){
    API.User.find({},function(err,doc){
        if(err){
            console.log(err)
            return
        }else{
            console.log(doc)
        }
        res.send(JSON.stringify(doc))
    })
})


// 保存到数据库
app.all('/user',multiparty,function(req,res,next){
    req.on('data',function(data){
        let dataInif = qs.parse(data.toString())
        let fun = new API.User(dataInif)
        fun.save()
    })
})

// 修改数据
app.post('/userAmend',multiparty,function(req,res,next){
    req.on('data',function(data){
        let amend = qs.parse(data.toString())
        API.User.updateOne(amend[0],amend[1],(err,data) => {
           if(err){
               console.log(err)
           }else{
               console.log(data)
           }
       })
    })
})

// 删除数据
app.post('/userRemove',multiparty,function(req,res,next){
    req.on('data',function(data){
        let removeData = qs.parse(data.toString())
        API.User.deleteOne(removeData,(err,data) =>{
            if(err){
                console.log(err)
            }else{
                console.log(data)
            }
        })

    })
})

// 数据查询
app.get('/commo',(req,res) => {
    API.Commo.find({},(err,doc) => {
        if(err){
            console.log(err)
            return;
        }else{
            console.log(doc)
        }
        res.send(JSON.stringify(doc))
    })
})

// 商品添加
app.post('/commoAdd',multiparty,function(req,res,next){
    req.on('data',function(data){
        let commoAdd = qs.parse(data.toString()) // 信息
        let add = new API.Commo(commoAdd)
        add.save();
    })
})

// 注册用户
app.post('/register',multiparty,function(req,res,next){
    req.on('data',function(data){
        let registerText = qs.parse(data.toString())
        API.Account.find({"account":registerText.account},(err,doc) => {
            if(doc.length > 0 ){
                res.send("注册失败")
            }else{
                let model = new API.Account(registerText)
                model.save()
                res.send("注册成功")
                
            }
        })
    })
})

// 用户登录
app.post('/regi',multiparty,(req,res,next) => {
    req.on('data',function(data){
        let regiText = qs.parse(data.toString())
        API.Account.find(regiText,(err,doc) => {
            if(doc.length > 0 ){
                res.send("登录成功")
            }else{
                res.send("登录失败")
            }
        })
    })
})


app.listen(1122,()=>{
    console.log('current listen 1122')
})


