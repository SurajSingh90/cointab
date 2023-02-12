const express = require('express')
// const bodyParser = require('body-parser');
const {sequelize} = require('./models')
const path = require('path');
// let http = require('http')
// let fs = require('fs')

const app = express() 

app.use(express.urlencoded({extended: true }));
app.use(express.static('public')); 
app.use(express.json())  
require('./route/user.routes')(app)
// fs.readFile('./register.html',function(error,html){
//     if(error) throw error;
//     http.createServer(function(req,res){
//         res.writeHead(200,{"Content-Type":"text/html"})
//         res.write(html)
//         res.end()
//     })
// })
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public'+'/register.html'))
    // res.send("Api run")
})
app.listen(3500, async()=>{ 
    console.log('server is running on this port on 3500')
    await sequelize.sync({force:false})
})