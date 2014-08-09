/**
 * 
 */
function oriented_follow(toID) {
	// var user = sessionStorage.getItem("user");
	// user = $.parseJSON(user);
	var event = {};
	event.action = "EVENT";
	event.toID = toID;
	event.SSEType = "FOLLOW";
	event.data = {};
	// event.data.ID = user.ID;
	// event.data.name = user.attributes.name;
	// event.data.avatar = user.attributes.avatar;
	event.data.ID = "2011052408";
	event.data.name = "Nobama";
	event.data.avatar = "adsfldaa";
	ws.send(JSON.stringify(event));
}

function add_comment(toID, commentID, postID) {
	// var user = sessionStorage.getItem("user");
	// user = $.parseJSON(user);
	var event = {};
	event.action = "EVENT";
	event.toID = toID;
	event.SSEType = "CREATECOMMENT";
	event.data = {};
	// event.data.ID = user.ID;
	// event.data.name = user.attributes.name;
	// event.data.avatar = user.attributes.avatar;
	event.data.ID = "2011052408";
	event.data.name = "Nobama";
	event.data.avatar = "adsfldaa";
	event.data.commentID = commentID;
	event.data.postID = postID;
	ws.send(JSON.stringify(event));
}

function reply_comment(toID, commentID, toCommentID, postID) {
	// var user = sessionStorage.getItem("user");
	// user = $.parseJSON(user);
	var event = {};
	event.action = "EVENT";
	event.toID = toID;
	event.SSEType = "REPLYCOMMENT";
	event.data = {};
	// event.data.ID = user.ID;
	// event.data.name = user.attributes.name;
	// event.data.avatar = user.attributes.avatar;
	event.data.ID = "2011052408";
	event.data.name = "Nobama";
	event.data.avatar = "adsfldaa";
	event.data.toCommentID = toCommentID;
	event.data.commentID = commentID;
	event.data.postID = postID;
	ws.send(JSON.stringify(event));

}

function like_post(toID, postID) {
	// var user = sessionStorage.getItem("user");
	// user = $.parseJSON(user);
	var event = {};
	event.action = "EVENT";
	event.toID = toID;
	event.SSEType = "LIKEPOST";
	event.data = {};
	// event.data.ID = user.ID;
	// event.data.name = user.attributes.name;
	// event.data.avatar = user.attributes.avatar;
	event.data.ID = "2011052408";
	event.data.name = "Nobama";
	event.data.avatar = "adsfldaa";
	event.data.postID = postID;
	ws.send(JSON.stringify(event));
}

function like_comment(toID, commentID, postID) {
	// var user = sessionStorage.getItem("user");
	// user = $.parseJSON(user);
	var event = {};
	event.action = "EVENT";
	event.toID = toID;
	event.SSEType = "LIKECOMMENT";
	event.data = {};
	// event.data.ID = user.ID;
	// event.data.name = user.attributes.name;
	// event.data.avatar = user.attributes.avatar;
	event.data.ID = "2011052408";
	event.data.name = "Nobama";
	event.data.avatar = "adsfldaa";
	event.data.postID = postID;
	event.data.commentID = commentID;
	ws.send(JSON.stringify(event));
}

function do_handle_event(event) {
	event_remind(event);
}

function handle_unhandled_events(events) {
	for (var i = 0; i < events.length; i++) {
		off_line_event_remind(events[i]);
	}
}

function event_remind(event) {
	switch (event.SSEType) {
	case "CREATECOMMENT":
		add_to_bell(event, "added comment to your post");
		break;
	case "REPLYCOMMENT":
		add_to_bell(event, "replied your comment");
		break;
	case "LIKEPOST":
		add_to_bell(event, "liked your post");
		break;
	case "LIKECOMMENT":
		add_to_bell(event, "liked your comment");
		break;
	case "FOLLOW":
		add_to_bell(event, "followed you");
		break;
	}
}

function off_line_event_remind(event) {
	switch (event.name) {
	case "CREATECOMMENT":
		add_to_bell(event, "added comment to your post");
		break;
	case "REPLYCOMMENT":
		add_to_bell(event, "replied your comment");
		break;
	case "LIKEPOST":
		add_to_bell(event, "liked your post");
		break;
	case "LIKECOMMENT":
		add_to_bell(event, "liked your comment");
		break;
	case "FOLLOW":
		add_to_bell(event, "followed you");
		break;
	}
}

function delete_event(eventID) {
	$.ajax({
		type : "PUT",
		url : '../../JNUSocialNetwork/app/event/deleteUnhandledEvent/' + USERID
				+ '/' + eventID,
		success : function(data) {
		}
	});
}

function add_to_bell(event, description) {
	$("div.mentionBody-content").append(
			'<div class="NotiItem" id="' + event.data.eventID
					+ '"><div class="col-lg-3"><div><img src="'
					+ event.data.avatar
					+ '" /></div></div><div class="col-lg-6"><div>'
					+ event.data.name + '<br />' + description + '</div></div><div>');
	var event_data = event.data;
	$("#" + event.data.eventID).click(function(e) {
		e.stopPropagation();
		$(this).fadeOut("fast");
		alert(event_data);
		/*
		 * 
		 */
		$(this).remove();
	});
	window.bellIntervalID = setInterval(function() {
		$("a#remind-bell").fadeOut(300).fadeIn(300);
	}, 600);
}