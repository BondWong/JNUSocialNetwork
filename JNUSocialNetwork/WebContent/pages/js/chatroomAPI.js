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
				+ '</span></h3></div><div class="panel-body chat-room-body"><div class="chat-room-load-histroy"><a href="javaScript:void(0);" class="chat-room" id="load_more"><span class="glyphicon glyphicon-cloud-download">More</span></a></div></div><div class="panel-footer chat-room-footer"><textarea name="message-text-area" class="chat-room-input" rows="3" cols="30" draggable="false" placeholder="Enter Here" autofocus maxlength="90"></textarea><div><button type="button" class="btn btn-default btn-xs btn-block">Send</button></div></div><input type="hidden" name="ID" value="'
				+ data.ID + '"><input type="hidden" id="toID" value="' + fromID
				+ '"></div>';
	} else {
		chatroom += '<span class="label label-default">'
				+ toName
				+ '</span></h3></div><div class="panel-body chat-room-body"><div class="chat-room-load-histroy"><a href="javaScript:void(0);" class="chat-room" id="load_more"><span class="glyphicon glyphicon-cloud-download">More</span></a></div></div><div><div class="panel-footer chat-room-footer"><textarea name="message-text-area" class="chat-room-input" rows="3" cols="30" draggable="false" placeholder="Enter Here" autofocus maxlength="90"></textarea><div><button type="button" class="btn btn-default btn-xs btn-block">Send</button></div></div><input type="hidden" name="ID" value="'
				+ data.ID + '"><input type="hidden" id="toID" value="' + fromID
				+ '"></div>';
	}

	$("body").append(chatroom);
	$("#chatroom").css({
		'top' : top,
		'right' : right
	});
	$("#chatroom").hide();
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
	prepare_chat_room_close_button(data, fromID);
	do_fetch_messages(data.ID, fromID);
}

function prepare_chat_room_close_button(data, fromID) {
	$("#chatroom #load_more")
			.click(
					function() {
						$("#chatroom #load_more")
								.replaceWith(
										'<img scr="pages/images/loadmessages.gif" id="loading_wait" />');
						var clickCount = sessionStorage.getItem("clickCount");
						if (clickCount == null)
							clickCount = 0;
						else
							clickCount = $.parseJSON(clickCount);
						alert(clickCount);
						$
								.ajax({
									type : "GET",
									url : '../../JNUSocialNetwork/app/chatRoom/fetchMessages/'
											+ data.ID
											+ '/'
											+ clickCount
											* 5
											+ '/5',
									success : function(messages) {
										for (var i = 0; i < messages.length; i++) {
											if (messages[i].fromID == fromID)
												prepend_to_content_panel(
														messages[i], "self");
											else
												prepend_to_content_panel(
														messages[i], "other");
											save_message(messages[i]);
										}
										sessionStorage.setItem("clickCount",
												JSON.stringify(clickCount + 1));
										if (messages.length < 5)
											$("#chatroom #loading_wait")
													.replaceWith(
															'<a href="javaScript:void(0);" class="chat-room">No More</a>');
										else {
											$("#chatroom #loading_wait")
													.replaceWith(
															'<a href="javaScript:void(0);" class="chat-room" id="load_more"><span class="glyphicon glyphicon-cloud-download">More</span></a>');
											prepare_chat_room_close_button(
													data, fromID);
										}
									}
								});
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
		var value = textarea.val();
		textarea.val("");
		var date = new Date();
		do_send({
			"action" : "CHAT",
			"fromID" : fromID,
			"toID" : toID,
			"status" : "SENDING",
			"ID" : date.getTime(),
			"chatRoomID" : chatRoomID,
			"publicDate" : date.toLocaleString(),
			"attributes" : {
				"content" : value
			}
		});
	}

}

function do_receive(data) {
	if ($("#chatroom") != null && $("#chatroom").is(":visible")
			&& $("#chatroom #toID").val() == data.toID) {
		append_to_content_panel(data, "other");
		save_message(data);
		ws.send(JSON.stringify({
			"action" : "UPDATEMESSAGESTATUS",
			"fromID" : data.fromID,
			"ID" : data.ID,
			"status" : "READ"
		}));
	}
}

function do_send(data) {
	append_to_content_panel(data, "self");
	save_message(data);
	send_to_server(data);
}

function append_to_content_panel(data, who) {
	sessionStorage.avatarLink = "pages/images/12.png";
	var message = '<div class="chat-bubble"><img class="chat-avatar" src="'
			+ sessionStorage.avatarLink
			+ '" width="30" height="30"/><p class="chat-content-' + who + '" >'
			+ data.attributes.content;
	if (who == "self")
		message += '<br /><span class="label label-warning status">SENDING</span></p></div></div>';
	if (who == "other")
		message += '</p></div></div>';
	$("#chatroom .panel-body").append(message);
	$("#chatroom .panel-body").scrollTop(10000000);
}

function prepend_to_content_panel(data, who) {
	sessionStorage.avatarLink = "pages/images/12.png";
	var message = '<div class="chat-bubble"><img class="chat-avatar" src="'
			+ sessionStorage.avatarLink
			+ '" width="30" height="30"/><p class="chat-content-' + who + '" >'
			+ data.attributes.content;
	if (who == "self")
		message += '<br /><span class="label label-warning status">SENDING</span></p></div></div>';
	if (who == "other")
		message += '</p></div></div>';
	$("#chatroom .chat-room-load-histroy").after(message);
}

function save_message(data) {
	var messages = sessionStorage.getItem("messages");
	if (messages == null)
		messages = [];
	else
		messages = $.parseJSON(messages);
	messages[messages.length] = data;
	messages.sort(function(a, b) {
		return a.ID - b.ID;
	});
	sessionStorage.setItem("messages", JSON.stringify(messages));
}

function do_fetch_messages(chat_room_ID, fromID) {
	if (sessionStorage.getItem("messages") != null
			&& $.parseJSON(sessionStorage.getItem("messages")).length != 0)
		fetch_from_local(chat_room_ID, fromID);
}

function fetch_from_local(chat_room_ID, fromID) {
	var messages = sessionStorage.getItem("messages");
	messages = $.parseJSON(messages);
	for (var i = 0; i < messages.length; i++) {
		if (messages[i].chatRoomID == chat_room_ID)
			if (messages[i].fromID == fromID)
				append_to_content_panel(messages[i], "self");
			else
				append_to_content_panel(messages[i], "other");
	}
}

function send_to_server(data) {
	ws.send(JSON.stringify({
		"action" : "CHAT",
		"fromID" : data.fromID,
		"toID" : data.toID,
		"status" : "SENDING",
		"ID" : data.ID,
		"chatRoomID" : data.chatRoomID,
		"attributes" : data.attributes
	}));
}

function change_status(id, status) {

}