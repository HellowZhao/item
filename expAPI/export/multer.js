let multer = require('multer')

let storage = multer.diskStorage({
     
     // 设置上传后文件的路径，uploads文件夹会自动创建
     destination:function(req,file,cb){
          cb(null,'./import/image')
     },
     
     // 指定文件名
     filename:function(req,file,cb){
          let name = (new Date()).getTime() + "." + file.originalname.split('.')[1];
          cb(null,name)
     }

})

let upload = multer({
     storage:storage
})

exports.upload = upload









