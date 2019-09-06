var express = require('express');
var app 	= express();
var server 	= require('http').Server(app);
var io 		= require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo',function(req,res){
	res.status(200).send("Hola Mundo");
});

var messages = [{
	id:null,
	text:null,
	nickname: null,
	photo : null
}];

var userList = [];

io.on('connection',function(socket){
	console.log("New connection "+ socket.handshake.address );
	
	//socket.emit('messages', messages);

	socket.on('add-message', function(data){

		messages.push(data);

		io.sockets.emit('messages', messages);

		var x = userList.find(item => item.nickname == data.nickname);

		if(x == undefined){
			userList.push(data);
			io.sockets.emit('registration', userList);	
		}else{
			//console.log(data.nickname);
			
		}

	});

	socket.on('close', function(name){

		var x = userList.find(item => item.nickname == name);

		delete userList.splice(userList.indexOf(x),1);

		console.log(userList);
		io.sockets.emit('registration', userList);
	});
});

server.listen(6677, function(){
	console.log('Server Running');
});
