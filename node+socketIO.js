// 需要HTTP 模块来启动服务器和Socket.IO
var express=require('express');
var app=express();
var http= require('http').Server(app), io= require('socket.io')(http);
app.use(express.static('public'));
//express获得GET请求时将index.html文件返回给浏览器
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(9527,"192.168.10.146");
var msgBox=[];

// 客户端数组
var clients=[];

// 创建一个Socket.IO实例，把它传递给服务器
var socket= io.listen(http);

// 添加一个连接监听器
socket.on('connection', function(client){
  console.log('Server has connected');
var firstConnect=0;
var signName;
  // 成功！现在开始监听接收到的消息
  client.on('clinet-server',function(event){

    if(firstConnect){
      msgBox.push(signName+'___>>>'+event);
      io.sockets.emit('server-client',msgBox);
    }else{
      firstConnect=1;
      signName=event;

    }


  });

  // 监听cvsimg
  client.on('client-server-cvsimg',function(event){

    socket.emit('server-client-cvsimg',event);
  })
  client.on('disconnect',function(){

    console.log('Server has disconnected');
  });
  // var interval=setInterval(function(){
  //   client.send(msgBox);
  // },1000)
});
