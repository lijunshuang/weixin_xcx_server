const express = require('express');
const app =  express();
const formidable = require('formidable');
const path = require('path');//引入内置模块 path
const mongoose = require('mongoose');//引入数据库
const Tiezi = require('./models/Tiezi.js');
// console.log(Tiezi);
// 静态化路由
app.use(express.static('./uploads'))
// 链接数据库
mongoose.connect("mongodb://127.0.0.1:27017/saysay",{useNewUrlParser: true},function(err){
    　　if(err){
    　　　　console.log('Connection Error:' + err)
    　　}else{
    　　　　console.log('Connection success!') }
    });
//图片上传接口
app.post('/up',(req,res)=>{
    var form = new formidable.IncomingForm();
    //上传文件的存储目录
    form.uploadDir = './uploads';
    //保留文件的拓展名
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        // path.parse() 方法返回一个对象
        var fileName = path.parse(files.file.path).base
        res.json({
            'result' :fileName
        })
    })
})
app.post('/saysay',(req,res)=>{
    var form = new formidable.IncomingForm();
    // 将上传的数据写入数据库
    form.parse(req,(err,fields,files)=>{
        // console.log(fields);
        Tiezi.create({
			nickName : fields.nickName,
			avatarUrl : fields.avatarUrl,
			content : fields.content,
			serverPics : fields.serverPics,
			time : Date.parse(new Date())
		},function(){
			// 告诉小程序写进去了
			res.json({
				"result" : 1
			})
		})
    })
})
// 列表数据
app.get('/lists',(req,res)=>{
    //find 代表查找，sort代表排序,按时间倒叙，exec是执行
    Tiezi.find({}).sort({"time": -1}).exec((err,docs)=>{
        res.json({
            "result":docs
        })
    })
})

app.listen(3000);//监听端口

