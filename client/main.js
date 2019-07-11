var socket = io.connect('http://172.25.179.49:6677',{'forceNew':true});

var photo ="";
$.ajax({

	url: 'https://randomuser.me/api/',
	dataType: 'json',

	success: function(data) {
		photo = data.results[0].picture.thumbnail;
		console.log(data.results[0].picture);
		console.log(photo);
	}
});

socket.on('messages',function(data){

	render(data);
	render2(data);
});

function render(data){
	var html = 'Welcome to the CHAT';

	document.getElementById('welcome').innerHTML = html;
}

function addmessage(e){
	var message = {
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