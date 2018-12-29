const express = require('express');
const app = express();
const star = require('./mingxinginfo.js')

const url = require('url'); // 引入内置url 模块

let a = 0;

//将 目录静态化
app.use(express.static('www'))
//接口
app.get('/',(req,res)=>{
    res.json({ })
})
app.get('/add',(req,res)=>{
    a+=2;
    res.json({
        a
    })
})


// 明星列表 接口
app.get('/star',(req,res)=>{
    var page = url.parse(req.url,true).query.page
    // console.log(page);
    res.json({
        arr : star.slice((page-1)*4,page*4)
    })
})
//搜索明星 接口
app.get('/search',(req,res)=>{
    var keyword = url.parse(req.url,true).query.keyword;
    var kwReg = new RegExp(keyword)
    // console.log(kwReg);
    res.json({
        arr: star.filter(item => kwReg.test(item.name))
    })
})
// 明星详情页 接口
app.get('/info',(req,res)=>{
    var id = url.parse(req.url,true).query.id;
    console.log(id);
    res.json({
        arr: star.filter(item => item.id == id)
    })
})

//监听 端口
app.listen(3000)