let express = require('express')
let path = require('path')
let app = express()
let connect = require('connect-multiparty')
let multiparty = connect()
let qs = require('qs')

// 部门 详细 信息
let API = require('./export/model');
let multer = require('./export/multer')

// 加载静态资源
app.use('/import',express.static(path.join(__dirname,'import')))  

// 跨域设置
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 人员接口-查询
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

// 人员接口-保存
app.all('/user',multiparty,function(req,res,next){
    req.on('data',function(data){
        let dataInif = qs.parse(data.toString())
        console.log(dataInif)
        let fun = new API.User(dataInif)
        fun.save()
    })
})

// 人员接口-修改
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

// 人员接口-删除
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

// 商品接口-查询
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

// 商品接口-添加
app.post('/upload',multer.upload.single('urlName'),(req,res) => {
    let {size,mimetype,path} = req.file;
    let types = ['jpg','jpeg','png']
    let index = mimetype.split('/')[1] 
    if(size > 100000){
        return res.send('文件过大')
    } else  if(types.indexOf[index] == -1){
        return res.send("上传失败！文件格式不正确")
    }else{
        let formData = JSON.parse(req.body.formItem)
        formData.urlName = `http://localhost:1122/${path}`
        let fun = new API.Commo(formData)
        fun.save()
        res.send(formData)
    }

})

// app.post('/commoAdd',multiparty,function(req,res,next){
//     req.on('data',function(data){
//         let commoAdd = qs.parse(data.toString()) // 信息
//         res.send(commoAdd)
//         // console.log(commoAdd)
//         // let add = new API.Commo(commoAdd)
//         // add.save();
//     })
// })

// 注册接口
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

// 用户接口
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




