/**
 * 
 */

function open_chatroom(fromID, toID, name, message) {
	$.ajax({
		type : "GET",
		url : '../../app/chatRoom/fetch/' + fromID + '/' + toID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data) {
			var top = $("#contact-list").css("top");
			var right = $("#contact-list").css("right");
			var width = $("#contact-list").css("width");
			right = right.substring(0, right.indexOf("px"));
			right = parseInt(right);
			width = width.substring(0, width.indexOf("px"));
			width = parseInt(width);
			var online = false;
			var IDs = sessionStorage.getItem("onlineUserIDs");
			IDs = $.parseJSON(IDs);
			for (var i = 0; i < IDs.length; i++)
				if (IDs[i] == toID) {
					online = true;
					break;
				}
			create_chatroom(data, fromID, toID, name, online, top, right
					+ width, message);
			add_chatroom(data);
		}
	});
}

function create_chatroom(data, fromID, toID, toName, online, top, right,
		message) {
	$("#chatroom").remove();
	var chatroom = '<div id="chatroom" class="panel panel-default chat-room"><div class="panel-heading chat-room-header"><a id="chatroom-close" href="javaScript:void(0);" class="chat-room-close chat-room"><span class="glyphicon glyphicon-remove"></span></a><h3 class="panel-title">';
	if (online) {
		chatroom += '<span class="label label-success" id="'
				+ toID
				+ '">'
				+ '<a class="instant-chat-name" href="../pages/profile.jsp?nav=about&'
				+ toID
				+ '"'
				+ 'target="_blank">'
				+ toName
				+ '</a>'
				+ '</span></h3></div><div class="panel-body chat-room-body"><div class="chat-room-load-histroy"><a href="javaScript:void(0);" class="chat-room" id="load_more"><span class="glyphicon glyphicon-cloud-download">历史对话</span></a></div></div><div class="panel-footer chat-room-footer"><textarea name="message-text-area" class="form-control chat-room-input" rows="3" cols="30" draggable="false" placeholder="Enter Here" autofocus maxlength="90"></textarea><div><button type="button" class="btn btn-default btn-xs btn-block">Send</button></div></div><input type="hidden" name="ID" value="'
				+ data.ID + '"><input type="hidden" id="toID" value="' + toID
				+ '"></div>';
	} else {
		chatroom += '<span class="label label-default" id="'
				+ toID
				+ '">'
				+ '<a class="instant-chat-name" href="../pages/profile.jsp?nav=about&'
				+ toID
				+ '"'
				+ 'target="_blank">'
				+ toName
				+ '</a>'
				+ '</span></h3></div><div class="panel-body chat-room-body"><div class="chat-room-load-histroy"><a href="javaScript:void(0);" class="chat-room" id="load_more"><span class="glyphicon glyphicon-cloud-download">历史对话</span></a></div></div><div><div class="panel-footer chat-room-footer"><textarea name="message-text-area" class="form-control chat-room-input" rows="3" cols="30" draggable="false" placeholder="Enter Here" autofocus maxlength="90"></textarea><div><button type="button" class="btn btn-default btn-xs btn-block">Send</button></div></div><input type="hidden" name="ID" value="'
				+ data.ID + '"><input type="hidden" id="toID" value="' + toID
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
	prepare_chat_room_load_more(data, fromID);
	$("#chatroom #chatroom-close").click(function() {
		$("#chatroom").fadeOut("fast");
	});
	do_fetch_messages(data.ID, fromID);

	if (message != null && message != '') {
		$("#chatroom textarea").val(message);
		$("#chatroom textarea").focus();
	}
}

function open_chatroom_with_message(fromID, toID, name, message) {
	open_chatroom(fromID, toID, name, message);
}

function prepare_chat_room_load_more(data, fromID) {
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
						$
								.ajax({
									type : "GET",
									url : '../../app/chatRoom/fetchMessages/'
											+ data.ID + '/' + clickCount * 5
											+ '/5',
									beforeSend : function(request) {
										request.setRequestHeader("ID", USERID);
									},
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
															'<a href="javaScript:void(0);" class="chat-room">木有了</a>');
										else {
											$("#chatroom #loading_wait")
													.replaceWith(
															'<a href="javaScript:void(0);" class="chat-room" id="load_more"><span class="glyphicon glyphicon-cloud-download">历史对话</span></a>');
											prepare_chat_room_load_more(data,
													fromID);
										}
									}
								});
					});
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
		value = value.replace(/ /g, '&nbsp;');
		var date = new Date();

		var user = sessionStorage.getItem("user");
		user = $.parseJSON(user);
		do_send({
			"action" : "CHAT",
			"fromID" : fromID,
			"toID" : toID,
			"status" : "SENDING",
			"ID" : date.getTime(),
			"from" : user.attributes.name,
			"chatRoomID" : chatRoomID,
			"publishDate" : date.toLocaleString(),
			"attributes" : {
				"content" : value,
				"avatarLink" : user.attributes.avatarLink
			}
		});
	}

}

function do_receive(data) {
	if ($("#chatroom") != null && !$("#chatroom").is(":visible")) {
		save_online_remind_messages(data);
		if (window.bellIntervalID == null)
			window.bellIntervalID = setInterval(function() {
				$("a#remind-bell").fadeOut(300).fadeIn(300);
			}, 600);
	} else if ($("#chatroom") != null && $("#chatroom").is(":visible")
			&& $("#chatroom #toID").val() == data.fromID) {
		append_to_content_panel(data, "other");
		$.playSound('../pages/noti-sound/youve-been-informed');
		save_message(data);
		oriented_send({
			"action" : "UPDATEMESSAGESTATUS",
			"fromID" : data.fromID,
			"ID" : data.ID,
			"status" : "READ"
		});
	} else if ($("#chatroom") != null && $("#chatroom").is(":visible")
			&& $("#chatroom #toID").val() != data.fromID) {
		save_online_remind_messages(data);
		if (window.bellIntervalID == null)
			window.bellIntervalID = setInterval(function() {
				$("a#remind-bell").fadeOut(300).fadeIn(300);
			}, 600);
	}
}

function do_send(data) {
	append_to_content_panel(data, "self");
	save_message(data);
	send_to_server(data);
}

function append_to_content_panel(data, who) {
	var message = "";
	if (who == "self") {
		message = '<div class="chat-bubble" id="' + data.ID
				+ '" ><a target="_blank" href="../pages/profile.jsp?nav=about&'
				+ data.fromID + '" ><img class="chat-avatar" src="'
				+ $.parseJSON(data.attributes.avatarLink).src
				+ '" width="30" height="30" /></a><p class="chat-content-'
				+ who + '" >' + data.attributes.content;
		message += '<br /><span class="label label-warning status">'
				+ data.status + '</span></p></div>';
	}

	if (who == "other") {
		message = '<div class="chat-bubble" id="' + data.ID
				+ '" ><a target="_blank" href="../pages/profile.jsp?nav=about&'
				+ data.fromID + '" ><img class="chat-avatar" src="'
				+ $.parseJSON(data.attributes.avatarLink).src
				+ '" width="30" height="30" /></a><p class="chat-content-'
				+ who + '" >' + data.attributes.content;
		message += '</p></div>';
	}

	var id = $("#chatroom .chat-bubble").last().attr("id");
	id = parseInt(id);
	var time = parseInt(data.ID) - id;
	if (time > 5 * 60 * 1000) {
		var timeInfo = '<p class="time">' + data.publishDate + '</p>';
		$("#chatroom .panel-body").append(timeInfo);
	}

	$("#chatroom .panel-body").append(message);
	if (data.attributes.content.length > 10
			&& data.attributes.content.length <= 25)
		$("#" + data.ID + ' .chat-content-' + who).css("width",
				100 + (data.attributes.content.length - 10) * 10 + "px");
	if (data.attributes.content.length > 25)
		$("#" + data.ID + ' .chat-content-' + who).css("width", "250px");
	$("#chatroom .panel-body").scrollTop(10000000);
}

function prepend_to_content_panel(data, who) {
	var message = "";
	if (who == "self") {
		message = '<div class="chat-bubble" id="' + data.ID
				+ '" ><a target="_blank" href="../pages/profile.jsp?nav=about&'
				+ data.fromID + '"><img class="chat-avatar" src="'
				+ $.parseJSON(data.attributes.avatarLink).src
				+ '" width="30" height="30"/></a><p class="chat-content-' + who
				+ '" >' + data.attributes.content;
		message += '<br /><span class="label label-warning status">'
				+ data.status + '</span></p></div>';
	}

	if (who == "other") {
		message = '<div class="chat-bubble" id="' + data.ID
				+ '" ><a target="_blank" href="../pages/profile.jsp?nav=about&'
				+ data.toID + '"><img class="chat-avatar" src="'
				+ $.parseJSON(data.attributes.avatarLink).src
				+ '" width="30" height="30"/></a><p class="chat-content-' + who
				+ '" >' + data.attributes.content;
		message += '</p></div>';
	}

	var id = $("#chatroom .chat-bubble").first().attr("id");
	id = parseInt(id);
	var time = id - parseInt(data.ID);
	if (time > 5 * 60 * 10000) {
		var date = new Date();
		date.setTime(id);
		var timeInfo = '<p class="time">' + date.toLocaleString() + '</p>';
		$("#chatroom .chat-room-load-histroy").after(timeInfo);
	}

	$("#chatroom .chat-room-load-histroy").after(message);
	if (data.attributes.content.length > 10
			&& data.attributes.content.length <= 25)
		$("#" + data.ID + ' .chat-content-' + who).css("width",
				100 + (data.attributes.content.length - 10) * 10 + "px");
	if (data.attributes.content.length > 25)
		$("#" + data.ID + ' .chat-content-' + who).css("width", "250px");

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
	oriented_send({
		"action" : "CHAT",
		"fromID" : data.fromID,
		"toID" : data.toID,
		"status" : "SENDING",
		"ID" : data.ID,
		"from" : data.from,
		"publishDate" : data.publishDate,
		"chatRoomID" : data.chatRoomID,
		"attributes" : data.attributes
	});
}

function do_change_status(data) {
	$("#" + data.ID + " span").replaceWith(
			'<span class="label label-warning status">' + data.status
					+ '</span>');
	var messages = sessionStorage.getItem("messages");
	messages = $.parseJSON(messages);
	for (var i = 0; i < messages.length; i++)
		if (messages[i].ID == data.ID)
			messages[i].status = data.status;
	sessionStorage.setItem("messages", JSON.stringify(messages));
}

function handle_unread_messages(messages) {
	var i = 0;
	for (i; i < messages.length; i++)
		save_offline_remind_messages(messages[i]);
	if (i != 0)
		if (window.bellIntervalID == null)
			window.bellIntervalID = setInterval(function() {
				$("a#remind-bell").fadeOut(300).fadeIn(300);
			}, 600);
}

function save_online_remind_messages(message) {
	var online_messages = sessionStorage.getItem("online_messages");
	if (online_messages == null) {
		online_messages = {};
	} else {
		online_messages = $.parseJSON(online_messages);
	}
	if (online_messages["message_" + message.fromID] == null)
		online_messages["message_" + message.fromID] = [];

	var size = online_messages["message_" + message.fromID].length;
	online_messages["message_" + message.fromID][size] = message;
	sessionStorage.setItem("online_messages", JSON.stringify(online_messages));
}

function save_offline_remind_messages(message) {
	var offline_messages = sessionStorage.getItem("offline_messages");
	if (offline_messages == null) {
		offline_messages = {};
	} else {
		offline_messages = $.parseJSON(offline_messages);
	}
	if (offline_messages["message_" + message.fromID] == null)
		offline_messages["message_" + message.fromID] = [];

	var size = offline_messages["message_" + message.fromID].length;
	offline_messages["message_" + message.fromID][size] = message;
	sessionStorage
			.setItem("offline_messages", JSON.stringify(offline_messages));
}

function show_messages(messagesID, toID, fromID, toName) {
	open_chatroom(toID, fromID, toName);

	var online_messages = sessionStorage.getItem("online_messages");
	if (online_messages == null)
		online_messages = {};
	else
		online_messages = $.parseJSON(online_messages);

	var offline_messages = sessionStorage.getItem("offline_messages");
	if (offline_messages == null)
		offline_messages = {};
	else
		offline_messages = $.parseJSON(offline_messages);

	var messages = [];
	var on = online_messages[messagesID];
	if (on == null)
		on = [];
	var off = offline_messages[messagesID];
	if (off == null)
		off = [];
	messages = off;
	messages = messages.concat(on);

	for (var i = 0; messages != null && i < messages.length; i++) {
		append_to_content_panel(messages[i], "other");
		save_message(messages[i]);
	}

	for (var i = 0; on != null && i < on.length; i++) {
		oriented_send({
			"action" : "UPDATEMESSAGESTATUS",
			"fromID" : on[i].fromID,
			"ID" : on[i].ID,
			"status" : "READ"
		});
	}
	delete online_messages[messagesID];
	sessionStorage.setItem("online_messages", JSON.stringify(online_messages));

	for (var i = 0; off != null && i < off.length; i++) {
		oriented_send({
			"action" : "UPDATEMESSAGESTATUSTOSERVER",
			"fromID" : off[i].fromID,
			"ID" : off[i].ID,
			"status" : "READ"
		});
	}
	delete offline_messages[messagesID];
	sessionStorage
			.setItem("offline_messages", JSON.stringify(offline_messages));
}

function oriented_send(data) {
	ws.send(JSON.stringify(data));
}
