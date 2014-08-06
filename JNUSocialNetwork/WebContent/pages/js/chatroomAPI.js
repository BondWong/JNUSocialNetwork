/**
 * 
 */

function open_chatroom(fromID, toID, toName, online) {
	$.ajax({
		type : "GET",
		url : '../../JNUSocialNetwork/app/chatRoom/fetch/' + fromID + '/'
				+ toID,
		success : function(data) {
			var top = $("#contact-list").css("top");
			var right = $("#contact-list").css("right");
			var width = $("#contact-list").css("width");
			right = right.substring(0, right.indexOf("px"));
			right = parseInt(right);
			width = width.substring(0, width.indexOf("px"));
			width = parseInt(width);
			create_chatroom(data, fromID, toID, toName, online, top, right
					+ width);
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
				+ data.ID + '"><input type="hidden" id="fromID" value="'
				+ fromID + '"></div>';
	} else {
		chatroom += '<span class="label label-default">'
				+ toName
				+ '</span></h3></div><div class="panel-body chat-room-body"><div class="chat-room-load-histroy"><a href="javaScript:void(0);" class="chat-room" id="load_more"><span class="glyphicon glyphicon-cloud-download">More</span></a></div></div><div><div class="panel-footer chat-room-footer"><textarea name="message-text-area" class="chat-room-input" rows="3" cols="30" draggable="false" placeholder="Enter Here" autofocus maxlength="90"></textarea><div><button type="button" class="btn btn-default btn-xs btn-block">Send</button></div></div><input type="hidden" name="ID" value="'
				+ data.ID + '"><input type="hidden" id="fromID" value="'
				+ fromID + '"></div>';
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
		online_remind(data);
	}
	if ($("#chatroom") != null && $("#chatroom").is(":visible")
			&& $("#chatroom #fromID").val() == data.toID) {
		append_to_content_panel(data, "other");
		save_message(data);
		oriented_send({
			"action" : "UPDATEMESSAGESTATUS",
			"fromID" : data.fromID,
			"ID" : data.ID,
			"status" : "READ"
		});
	}
}

function do_send(data) {
	append_to_content_panel(data, "self");
	save_message(data);
	send_to_server(data);
}

function append_to_content_panel(data, who) {
	var message = '<div class="chat-bubble" id="' + data.ID
			+ '" ><img class="chat-avatar" src="' + data.attributes.avatarLink
			+ '" width="30" height="30"/><p class="chat-content-' + who + '" >'
			+ data.attributes.content;
	if (who == "self")
		message += '<br /><span class="label label-warning status">'
				+ data.status + '</span></p></div>';
	if (who == "other")
		message += '</p></div>';

	var id = $("#chatroom .chat-bubble").last().attr("id");
	id = parseInt(id);
	var time = parseInt(data.ID) - id;
	if (time > 5 * 60 * 1000) {
		var timeInfo = '<p class="time">' + data.publishDate + '</p>';
		$("#chatroom .panel-body").append(timeInfo);
	}

	$("#chatroom .panel-body").append(message);
	if (data.attributes.content.length > 10
			&& data.attributes.content.length <= 18)
		$("#" + data.ID + ' .chat-content-' + who).css("width",
				100 + (data.attributes.content.length - 10) * 10 + "px");
	if (data.attributes.content.length > 18)
		$("#" + data.ID + ' .chat-content-' + who).css("width", "180px");
	$("#chatroom .panel-body").scrollTop(10000000);
}

function prepend_to_content_panel(data, who) {
	var message = '<div class="chat-bubble" id="' + data.ID
			+ '" ><img class="chat-avatar" src="' + data.attributes.avatarLink
			+ '" width="30" height="30"/><p class="chat-content-' + who + '" >'
			+ data.attributes.content;
	if (who == "self")
		message += '<br /><span class="label label-warning status">'
				+ data.status + '</span></p></div>';
	if (who == "other")
		message += '</p></div>';

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
			&& data.attributes.content.length <= 18)
		$("#" + data.ID + ' .chat-content-' + who).css("width",
				100 + (data.attributes.content.length - 10) * 10 + "px");
	if (data.attributes.content.length > 18)
		$("#" + data.ID + ' .chat-content-' + who).css("width", "180px");
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
	var count = {};
	var i = 0;
	for (i; messages != null && i < messages.length; i++) {
		if (count[messages[i].fromID] == null) {
			count[messages[i].fromID] = 1;
			$("div.mentionBody-content").append(
					'<div class="NotiItem" id="' + messages[i].fromID
							+ '"><div class="col-lg-3"><div><img src="'
							+ messages[i].attributes.avatarLink
							+ '" /></div></div><div class="col-lg-6"><div>'
							+ messages[i].from + '<span class="badge">'
							+ count[messages[i].fromID]
							+ '</span></div></div><div>');
			var tempFromID = messages[i].fromID;
			var tempToID = messages[i].toID;
			var tempFrom = messages[i].from;
			$("#" + messages[i].fromID).click(
					function(e) {
						e.stopPropagation();
						$(this).fadeOut("fast");
						var online = false;
						IDs = sessionStorage.getItem("onlineUserIDs");
						IDs = $.parseJSON(IDs);
						for (var k = 0; k < IDs.length; k++)
							if (IDs[k] == tempFromID)
								break;
						if (k != IDs.length)
							online = true;
						show_unread_messages(messages, tempToID, tempFromID,
								tempFrom, online);
						show_online_messages($.parseJSON(sessionStorage
								.getItem("online_message_" + tempFromID)),
								tempToID, tempFromID, tempFrom, online);
						$(this).remove();
					});
		} else {
			var number = $(
					"div.mentionBody-content " + "#" + messages[i].fromID
							+ " span").text();
			number = parseInt(number);
			number++;
			$("div.mentionBody-content " + "#" + messages[i].fromID + " span")
					.replaceWith('<span class="badge">' + number + '</span>');
		}
	}
	if (i != 0)
		windows.bellIntervalID = setInterval(function() {
			$("a#remind-bell").fadeOut(300).fadeIn(300);
		}, 600);
}

function show_unread_messages(messages, toID, fromID, toName, online) {
	open_chatroom(toID, fromID, toName, online);
	for (var i = 0; i < messages.length; i++) {
		if (messages[i].fromID == fromID) {
			append_to_content_panel(messages[i], "other");
			save_message(messages[i]);
			oriented_send({
				"action" : "UPDATEMESSAGESTATUSTOSERVER",
				"fromID" : messages[i].fromID,
				"ID" : messages[i].ID,
				"status" : "READ"
			});
		}
	}
}

function handle_unhandled_events(events) {
	for (var i = 0; i < events.length; i++) {
		switch (events[i].name) {
		case "CREATECOMMENT":
			break;
		case "LIKEPOST":
			break;
		case "LIKECOMMENT":
			break;
		case "FOLLOW":
			break;
		case "REPLYCOMMENT":
			break;
		}
	}
}

function online_remind(message) {
	if ($("div.mentionBody-content #" + message.fromID).length == 0) {
		$("div.mentionBody-content").append(
				'<div class="NotiItem" id="' + message.fromID
						+ '"><div class="col-lg-3"><div><img src="'
						+ message.attributes.avatarLink + '"/></div></div>'
						+ '<div class="col-lg-6"><div>' + message.from
						+ '<span class="badge">1</span></div></div></div>');
		sessionStorage.setItem("online_message_" + message.fromID, JSON
				.stringify([ message ]));
		var tempToID = message.toID;
		var tempFromID = message.fromID;
		var tempFrom = message.from;
		$("div.mentionBody-content #" + message.fromID).click(
				function(e) {
					e.stopPropagation();
					show_online_messages($.parseJSON(sessionStorage
							.getItem("online_message_" + tempFromID)),
							tempToID, tempFromID, tempFrom, true, 30, 30);
					$(this).remove();
				});
	} else {
		var temp = $("div.mentionBody-content #" + message.fromID + " span")
				.text();
		temp = parseInt(temp);
		$("div.mentionBody-content #" + message.fromID + " span")
				.text(temp + 1);
		var online_messages = sessionStorage.getItem("online_message_"
				+ message.fromID);
		if (online_messages == null) {
			online_messages = [];
		} else {
			online_messages = $.parseJSON(online_messages);
		}
		online_messages[online_messages.length] = message;
		sessionStorage.setItem("online_message_" + message.fromID, JSON
				.stringify(online_messages));
	}
	window.bellIntervalID = setInterval(function() {
		$("a#remind-bell").fadeOut(300).fadeIn(300);
	}, 600);

}

function show_online_messages(messages, toID, fromID, toName, online) {
	open_chatroom(toID, fromID, toName, online);
	for (var i = 0; messages != null && i < messages.length; i++) {
		append_to_content_panel(messages[i], "other");
		save_message(messages[i]);
		oriented_send({
			"action" : "UPDATEMESSAGESTATUS",
			"fromID" : messages[i].fromID,
			"ID" : messages[i].ID,
			"status" : "READ"
		});
	}
}

function oriented_send(data) {
	ws.send(JSON.stringify(data));
}
