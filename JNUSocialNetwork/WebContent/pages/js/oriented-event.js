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
		alert(JSON.stringify(event));
		break;
	case "REPLYCOMMENT":
		alert(JSON.stringify(event));
		break;
	case "LIKEPOST":
		alert(JSON.stringify(event));
		break;
	case "LIKECOMMENT":
		alert(JSON.stringify(event));
		break;
	case "FOLLOW":
		alert(JSON.stringify(event));
		break;
	}
}

function off_line_event_remind(event) {
	switch (event.name) {
	case "CREATECOMMENT":
		alert(JSON.stringify(event));
		break;
	case "REPLYCOMMENT":
		alert(JSON.stringify(event));
		break;
	case "LIKEPOST":
		alert(JSON.stringify(event));
		break;
	case "LIKECOMMENT":
		alert(JSON.stringify(event));
		break;
	case "FOLLOW":
		alert(JSON.stringify(event));
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