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

io.on('connection',function(socket){
	console.log("New connection "+ socket.handshake.address );
	
	//socket.emit('messages', messages);

	socket.on('add-message', function(data){

		messages.push(data);

		io.sockets.emit('messages', messages);
		console.log("-> ",io.sockets.ids);
	})
});

server.listen(6677, function(){
	console.log('Server Running');
});
