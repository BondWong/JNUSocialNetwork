/**
 * 
 */

function open_chatroom(fromID, toID, toName, online, top, right) {
	$.ajax({
		type : "GET",
		url : '../../JNUSocialNetwork/app/chatRoom/fetch/' + fromID + '/'
				+ toID,
		success : function(data) {
			create_chatroom(data, fromID, toID, toName, online, top, right);
		}
	});
}

function create_chatroom(data, fromID, toID, toName, online, top, right) {
	$("#chatroom").remove();
	var chatroom = '<div id="chatroom" class="panel panel-default chat-room"><div class="panel-heading chat-room-header"><a id="chatroom-close" href="javaScript:void(0);" class="chat-room-close chat-room"><span class="glyphicon glyphicon-remove"></span></a><h3 class="panel-title">';
	if (online) {
		chatroom += '<span class="label label-success">'
				+ toName
				+ '</span></h3></div><div class="panel-body chat-room-body"><div class="chat-room-load-histroy"><a href="javaScript:void(0);" class="chat-room"><span class="glyphicon glyphicon-cloud-download">More</span></a></div></div><div class="panel-footer chat-room-footer"><textarea name="message-text-area" class="chat-room-input" rows="3" cols="30" draggable="false" placeholder="Enter Here" autofocus maxlength="90"></textarea><div><button type="button" class="btn btn-default btn-xs btn-block">Send</button></div></div></div>';
	} else {
		chatroom += '<span class="label label-default">'
				+ toName
				+ '</span></h3></div><div class="panel-body chat-room-body"><div class="chat-room-load-histroy"><a href="javaScript:void(0);" class="chat-room"><span class="glyphicon glyphicon-cloud-download">More</span></a></div></div><div><div class="panel-footer chat-room-footer"><textarea name="message-text-area" class="chat-room-input" rows="3" cols="30" draggable="false" placeholder="Enter Here" autofocus maxlength="90"></textarea><div><button type="button" class="btn btn-default btn-xs btn-block">Send</button></div></div><input type="hidden" name="ID" value="'
				+ data.ID + '"></div>';
	}

	$("body").append(chatroom);
	$("#chatroom").css({
		'top' : top,
		'right' : right
	});
	$("#chatroom").fadeOut("slow");
	$("#chatroom").fadeIn("slow");
	$("#chatroom button").click(function() {
		on_click_send(data.ID, fromID, toID);
	});
	$("#chatroom textarea").keypress(function(key) {
		if (key.which == 13) {
			on_click_send(data.ID, fromID, toID);
			key.preventDefault();
		}
	});
}

function close_chatroom(ID) {
	$("#chatroom").fadeOut("fast");
}

function on_click_send(chatRoomID, fromID, toID) {
	var textarea = $("#chatroom textarea");
	if (textarea.val().length == 0) {
		var background_color = textarea.css("background-color");
		textarea.animate({
			backgroundColor : '#FF6347'
		}, "fast", function() {
			textarea.animate({
				backgroundColor : background_color
			}, "fast");
		});
	} else {
		do_send({
			"action" : "CHAT",
			"fromID" : fromID,
			"toID" : toID,
			"status" : "ARRIVED",
			"ID" : new Date().getTime(),
			"chatRoomID" : chatRoomID,
			"attributes" : {
				"content" : textarea.val()
			}
		});
		textarea.val("");
	}

}

function do_send(data) {
	add_to_content_panel(data, "self");
}

function add_to_content_panel(data, who) {
	sessionStorage.avatarLink = "pages/images/12.png";
	var message = '<div class="chat-bubble"><img class="chat-avatar" src="'
			+ sessionStorage.avatarLink
			+ '" width="30" height="30"/><div class="chat-content-'
			+ who
			+ '"><p class="chat-content">'
			+ data
			+ '</p><span class="label label-warning status">SENDING</span></div></div>';
	$("#chatroom .panel-body").append(message);
	$("#chatroom .panel-body").scrollTop(10000000);
}

function change_status(id, status) {
	switch (status) {
	case 'ARRIVED':
		$("#chatroom .chat-bubble span")
				.replaceWith(
						'<span class="label label-primary status">ARRIVED</span></div></div>');
		break;
	case 'READ':
		$("#chatroom .chat-bubble .chat-content")
				.replaceWith(
						'<span class="label label-success status">SENDING</span></div></div>');
		break;
	case 'FAIL':
		$("#chatroom .chat-bubble .chat-content")
				.replaceWith(
						'<span class="label label-default status">FAILED</span></div></div>');
		break;
	}
}

function send_to_server(data) {

}