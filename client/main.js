var socket = io.connect('http://172.25.179.15:6677',{'forceNew':true});

var users = [];
var photo ="";
var message;
$.ajax({

	url: 'https://randomuser.me/api/',
	dataType: 'json',

	success: function(data) {
		photo = data.results[0].picture.thumbnail;
	}
});

socket.on('messages',function(data){

	render(data);
	render2(data);

});

socket.on('registration', function(data){
	shareUser(data);
});

function render(data){
	var html = 'Welcome to the CHAT';

	document.getElementById('welcome').innerHTML = html;
}

function addmessage(e){
	
	message = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value,
		photo: photo
	};

	if(message.text.length > 0){
		console.log("A ",message.text);
		document.getElementById('nickname').style.display = 'none';
		document.getElementById('text').value = '';
		document.getElementById('text').focus();
		socket.emit('add-message', message);
		return false;
	}
	
}

function render2(data){
	
	var html = data.map(function(message, index){
		var nick = document.getElementById('nickname').value;
		
		if(message.nickname != null ){
			if(message.nickname == nick ){

				return (`
					<div class="incoming_msg">
					<div class="incoming_msg_img"> <img src="${message.photo}" alt="sunil"> </div>
						<div class="received_msg">
							<div class="received_withd_msg">
							<p>${message.text}</p>
							<span class="time_date"><b>${message.nickname}</b> 11:01 AM    |    June 9</span></div>
						</div>
						</div>
					</div><br>
				`);
			}else{	
				

				return (`
				
					<div class="outgoing_msg">
					<div class="sent_msg_img"> <img src="${message.photo}" alt="sunil"> </div>
						<div class="sent_msg">
							<p>${message.text}</p>
							<span class="time_date"><b>${message.nickname}</b> 11:01 AM    |    June 9</span></div>
					</div>
					</div>

				`);
			}
		}
		

	}).join(' ');


	var div_msgs = document.getElementById('msg_history');
	div_msgs.innerHTML = html;
	div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addUser(message){

	console.log(message);
	
	var html_user = "";

	html_user = Object.keys(message).map(function(nickname, index){

		var x = users.indexOf(message.nickname);
		console.log(x);

		if(x == -1){
			users.push(message.nickname);
			return (`
				<div class="chat_list active_chat">
				<div class="chat_people">
				<div class="chat_img"> <img src="${message.photo}" alt="sunil"> </div>
					<div class="chat_ib">
						<h5>${message.nickname} <span class="chat_date">Dec 25</span></h5>
						<p>Test, which is a new approach to have all solutions astrology under one roof.</p>
					</div>
				</div>
				</div>
				</div>
			`);
		}

	}).join(' ');

	var div_msgs = document.getElementById('inbox_chat');
	div_msgs.innerHTML = html_user;
}

function shareUser(data){

	var html_user = "";
	var div_msgs = document.getElementById('inbox_chat');
	div_msgs.innerHTML = "";

	html_user = data.map(function(nickname, index){

		return (`
			<div class="chat_list active_chat">
			<div class="chat_people">
			<div class="chat_img"> <img src="${nickname.photo}" alt="sunil"> </div>
				<div class="chat_ib">
					<h5>${nickname.nickname} <span class="chat_date">Dec 25</span></h5>
					<p>Test, which is a new approach to have all solutions astrology under one roof.</p>
				</div>
			</div>
			</div>
			</div>
		`);
		
	}).join(' ');

	
	div_msgs.innerHTML = html_user;
}

function ConfirmClose(){
	var nick = document.getElementById('nickname').value;

	socket.emit('close', nick);
}

function HandleOnClose(){

	//nickname: document.getElementById('nickname').value,

	//socket.emit('close', nickname);
}