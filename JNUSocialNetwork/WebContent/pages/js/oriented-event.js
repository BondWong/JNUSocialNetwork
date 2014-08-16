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
	event.SSEType = "FOLLOW";
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
	event.SSEType = "CREATECOMMENT";
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
	event.SSEType = "REPLYCOMMENT";
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
	event.SSEType = "LIKEPOST";
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
	event.SSEType = "LIKECOMMENT";
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
	switch (event.SSEType) {
	case "CREATECOMMENT":
		add_to_bell(event, "added comment to your post", "Add Comment");
		break;
	case "REPLYCOMMENT":
		add_to_bell(event, "replied your comment", "Reply Comment");
		break;
	case "LIKEPOST":
		add_to_bell(event, "liked your post", "Like Post");
		break;
	case "LIKECOMMENT":
		add_to_bell(event, "liked your comment", "Like Comment");
		break;
	case "FOLLOW":
		add_to_bell(event, "followed you", "Follow");
		break;
	}
}

function off_line_event_remind(event) {
	switch (event.name) {
	case "CREATECOMMENT":
		add_to_bell(event, "added comment to your post", "Add Comment");
		break;
	case "REPLYCOMMENT":
		add_to_bell(event, "replied your comment", "Reply Comment");
		break;
	case "LIKEPOST":
		add_to_bell(event, "liked your post", "Like Post");
		break;
	case "LIKECOMMENT":
		add_to_bell(event, "liked your comment", "Like Comment");
		break;
	case "FOLLOW":
		add_to_bell(event, "followed you", "Follow");
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

function add_to_bell(event, description, head) {
	$("div.mentionBody-content").append(
			'<div class="NotiItem" id="' + event.data.eventID
					+ '"><div class="col-lg-3"><div><img src="'
					+ event.data.avatar
					+ '" /></div></div><div class="col-lg-9"><h1>' + head
					+ '</h1><div class="remindConent">' + event.data.name + ' '
					+ description + '</div></div><div>');
	var type = event.SSEType;
	$("#" + event.data.eventID)
			.click(
					function(e) {
						e.stopPropagation();
						$(this).fadeOut("fast");
						$('.mentionBody-appear').css("display", "none");
						switch (type) {
						case "CREATECOMMENT":
							var dataString = FetchPostByID(event.data.postID);
							notifyLikeComment(event.data.commentID,
									dataString.owner.ID,
									dataString.owner.attributes.name,
									dataString.publishDate,
									dataString.attributes.content,
									dataString.ID, dataString.likerIDs.length);
							break;
						case "FOLLOW":
							notifyFollow(event.data.ID);
							break;
						case "LIKECOMMENT":
							var dataString = FetchPostByID(event.data.postID);
							notifyLikeComment(event.data.commentID,
									dataString.owner.ID,
									dataString.owner.attributes.name,
									dataString.publishDate,
									dataString.attributes.content,
									dataString.ID, dataString.likerIDs.length);
							break;
						case "LIKEPOST":
							var dataString = FetchPostByID(event.data.postID);
							notifyLikePost(dataString.owner.ID,
									dataString.owner.attributes.name,
									dataString.publishDate,
									dataString.attributes.content,
									dataString.ID, dataString.likerIDs.length);
							break;
						case "REPLYCOMMENT":
							var dataString = FetchPostByID(event.data.postID);
							notifyReplyComment(event.data.commentID,
									event.data.toCommentID,
									dataString.owner.ID,
									dataString.owner.attributes.name,
									dataString.publicDate,
									dataString.attributes.content,
									dataString.ID, dataString.likerIDs.length);
							break;
						}
						$(".arrowBack")
								.append(
										"<span class='glyphicon glyphicon-chevron-left' id='arrowBack' style='font-size:12px;'>&nbsp;</span>");
						/*
						 * 
						 */
						$(this).remove();
					});
	window.bellIntervalID = setInterval(function() {
		$("a#remind-bell").fadeOut(300).fadeIn(300);
	}, 600);
}