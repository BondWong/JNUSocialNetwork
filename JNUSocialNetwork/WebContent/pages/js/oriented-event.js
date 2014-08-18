/**
 * 
 */
function oriented_follow(toID) {
	var user = sessionStorage.getItem("user");
	user = $.parseJSON(user);
	if (toID == user.ID)
		return;
	var event = {};
	event.action = "EVENT";
	event.toID = toID;
	event.name = "FOLLOW";
	event.data = {};
	event.data.ID = user.ID;
	event.data.name = user.attributes.name;
	event.data.avatar = user.attributes.avatar;
	ws.send(JSON.stringify(event));
}

function oriented_add_comment(toID, commentID, postID) {
	var user = sessionStorage.getItem("user");
	user = $.parseJSON(user);
	if (toID == user.ID)
		return;
	var event = {};
	event.action = "EVENT";
	event.toID = toID + "";
	event.name = "CREATECOMMENT";
	event.data = {};
	event.data.ID = user.ID;
	event.data.name = user.attributes.name;
	event.data.avatar = user.attributes.avatar;
	event.data.commentID = commentID + "";
	event.data.postID = postID + "";
	ws.send(JSON.stringify(event));
}

function oriented_reply_comment(toID, commentID, toCommentID, postID) {
	var user = sessionStorage.getItem("user");
	user = $.parseJSON(user);
	if (toID == user.ID)
		return;
	var event = {};
	event.action = "EVENT";
	event.toID = toID;
	event.name = "REPLYCOMMENT";
	event.data = {};
	event.data.ID = user.ID;
	event.data.name = user.attributes.name;
	event.data.avatar = user.attributes.avatar;
	event.data.toCommentID = toCommentID + "";
	event.data.commentID = commentID + "";
	event.data.postID = postID + "";
	ws.send(JSON.stringify(event));

}

function oriented_like_post(toID, postID) {
	var user = sessionStorage.getItem("user");
	user = $.parseJSON(user);
	if (toID == user.ID)
		return;
	var event = {};
	event.action = "EVENT";
	event.toID = toID + "";
	event.name = "LIKEPOST";
	event.data = {};
	event.data.ID = user.ID;
	event.data.name = user.attributes.name;
	event.data.avatar = user.attributes.avatar;
	event.data.postID = postID + "";
	ws.send(JSON.stringify(event));
}

function oriented_like_comment(toID, commentID, postID) {
	var user = sessionStorage.getItem("user");
	user = $.parseJSON(user);
	if (toID == user.ID)
		return;
	var event = {};
	event.action = "EVENT";
	event.toID = toID + "";
	event.name = "LIKECOMMENT";
	event.data = {};
	event.data.ID = user.ID;
	event.data.name = user.attributes.name;
	event.data.avatar = user.attributes.avatar;
	event.data.postID = postID + "";
	event.data.commentID = commentID + "";
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
	online_event_remind(event);
}

function off_line_event_remind(event) {
	var data = {};
	data["data"] = $.parseJSON(event.data);
	data["name"] = event.name;
	online_event_remind(data);
}

function online_event_remind(data) {
	var incomingEvents = sessionStorage.getItem("incomingEvents");
	if (incomingEvents == null) {
		incomingEvents = {};
	} else {
		incomingEvents = $.parseJSON(incomingEvents);
	}
	incomingEvents["" + data.data.eventID] = data;
	sessionStorage.setItem("incomingEvents", JSON.stringify(incomingEvents));
	if (window.bellIntervalID == null)
		window.bellIntervalID = setInterval(function() {
			$("a#remind-bell").fadeOut(300).fadeIn(300);
		}, 600);
}
