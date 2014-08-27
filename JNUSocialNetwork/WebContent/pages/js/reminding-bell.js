/**
 * 
 */
function on_bell_click(e) {
	clearInterval(window.bellIntervalID);
	window.bellIntervalID = null;
	var tinyTip;
	var t = $(this).position().top;
	var l = $(this).offset().left;
	t += 20;
	l -= 250;
	var divTip = 'div.mentionBody';
	tinyTip = $(divTip);
	tinyTip.hide();
	tinyTip.css({
		top : t,
		left : l
	}).fadeIn(300);
	e.stopPropagation();
	show_remind_content();
}

function show_remind_content() {
	add_messages_to_bell();
	add_events_to_bell();
}

function add_messages_to_bell() {
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

	$.each(offline_messages, function(index, val) {
		for (var i = 0; i < val.length; i++) {
			messages_remind(val[i]);
		}
	});

	$.each(online_messages, function(index, val) {
		for (var i = 0; i < val.length; i++) {
			messages_remind(val[i]);
		}
	});
}

function add_events_to_bell() {
	var incomingEvents = sessionStorage.getItem("incomingEvents");
	if (incomingEvents == null)
		incomingEvents = {};
	else
		incomingEvents = $.parseJSON(incomingEvents);

	$.each(incomingEvents, function(index, event) {
		events_remind(event);
	});
}

function messages_remind(message) {
	if ($("div.mentionBody-content #" + message.fromID).length == 0) {
		$("div.mentionBody-content").append(
				'<div class="NotiItem" id="' + message.fromID
						+ '"><div class="col-lg-3"><div><img src="'
						+ message.attributes.avatarLink + '"/></div></div>'
						+ '<div class="col-lg-9"><div>' + message.from
						+ '<span class="badge">1</span></div></div></div>');
		var tempToID = message.toID;
		var tempFromID = message.fromID;
		var tempFrom = message.from;
		$("div.mentionBody-content #" + message.fromID).click(
				function(e) {
					e.stopPropagation();
					show_messages("message_" + tempFromID, tempToID,
							tempFromID, tempFrom);
					$(this).remove();
				});
	} else {
		var temp = $("div.mentionBody-content #" + message.fromID + " span")
				.text();
		temp = parseInt(temp);
		$("div.mentionBody-content #" + message.fromID + " span")
				.text(temp + 1);
	}

}

function events_remind(event) {
	var head = '';
	var description = '';
	switch (event.name) {
	case "CREATECOMMENT":
		head = "added comment to your post";
		description = "Add Comment";
		break;
	case "REPLYCOMMENT":
		head = "replied your comment";
		description = "Reply Comment";
		break;
	case "LIKEPOST":
		head = "liked your post";
		description = "Like Post";
		break;
	case "LIKECOMMENT":
		head = "liked your comment";
		description = "Like Comment";
		break;
	case "FOLLOW":
		head = "followed you";
		description = "Follow";
		break;
	}
	$("div.mentionBody-content").append(
			'<div class="NotiItem" id="' + event.data.eventID
					+ '"><div class="col-lg-3"><div><img src="'
					+ event.data.avatar
					+ '" /></div></div><div class="col-lg-9"><h1>' + head
					+ '</h1><div class="remindConent">' + event.data.name + ' '
					+ description + '</div></div><div>');
	var type = event.name;
	var eventID = event.data.eventID;
	var isOnline = event.action == null ? false : true;
	$("div#" + event.data.eventID)
			.click(
					function(e) {
						e.stopPropagation();
						var incomingEvents = sessionStorage
								.getItem("incomingEvents");
						incomingEvents = $.parseJSON(incomingEvents);
						delete incomingEvents["" + eventID];
						sessionStorage.setItem("incomingEvents", JSON
								.stringify(incomingEvents));

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
								.replaceWith(
										'<div class="arrowBack"><a href="javascript:void(0);"><span class="glyphicon glyphicon-chevron-left" id="arrowBack" style="font-size:12px;">&nbsp;</span></a></div>');
						$('.arrowBack').click(
								function() {
									$(".arrowBack").replaceWith(
											'<div class="arrowBack"></div>');
									$(".mentionBody-content").empty();
									show_remind_content();
								});
						if (!isOnline) {
							$.ajax({
								type : "PUT",
								url : '../../app/event/deleteUnhandledEvent/'
										+ USERID + '/' + eventID,
								beforeSend : function(request) {
									request.setRequestHeader("ID", USERID);
								},
								success : function(data) {
								}
							});
						}
					});

}

function notifyLikePost(ownerID, ownerNickName, publishDate, content, postID,
		likeNum) {
	notifyItem([], ownerID, ownerNickName, publishDate, content, postID,
			likeNum);
}
function notifyLikeComment(commentID, ownerID, ownerNickName, publishDate,
		content, postID, likeNum) {
	var response = FetchCommentByID(commentID);
	notifyItem([ response ], ownerID, ownerNickName, publishDate, content,
			postID, likeNum);
}
function notifyReplyComment(commentID, toCommentID, ownerID, ownerNickName,
		publishDate, content, postID, likeNum) {
	var response = [];
	var comment1 = FetchCommentByID(commentID);
	var comment2 = FetchCommentByID(toCommentID);
	response.push(comment1);
	response.push(comment2);
	notifyItem(response, ownerID, ownerNickName, publishDate, content, postID,
			likeNum);
}
function notifyAddComment(commentID, ownerID, ownerNickName, publishDate,
		content, postID, likeNum) {
	var response = FetchCommentByID(commentID);
	response.push(commenterID);
	response.push(commentOwnerID);
	notifyItem([ response ], ownerID, ownerNickName, publishDate, content,
			postID, likeNum);
}

function notifyFollow(followerID) {
	var data = FetchUserByID(followerID);
	var tipFrame = '<div class="popTip"><div class="content"><div class="urserBgShort"><img src="images/urseBgShort.jpg" /></div><div class="urserInfShort"><img src="images/user_img4.jpg" /><p><h1><a class="tipUser">'
			+ data.attributes.name
			+ '</a></h1></p><p>'
			+ data.attributes.lookingFor + '</p></div></div></div>';
	$(".mentionBody-content").empty();
	$(".mentionBody-content").append(tipFrame);
}

function notifyItem(response, ownerID, ownerNickName, publishDate, content,
		postID, likeNum) {
	var comment = "";
	$
			.each(
					response,
					function(index, jsonComment) {
						comment = comment
								+ "<div class='act_content' id='"
								+ jsonComment.ID
								+ "'><div class='row'><div class='col-lg-1'><img src='images/user_img3.jpg' /></div><div class='col-lg-10'><div class='col-lg-6 custom_lg-6'><div class='user_name'><strong>"
								+ jsonComment.owner.attributes.name
								+ "</strong></div></div><div class='col-lg-6 custom_lg-6'><div class='deleteCommBtn' style='cursor:pointer'><a><input id='"
								+ postID
								+ "' type='hidden' value='"
								+ jsonComment.ID
								+ "' /><span class='glyphicon glyphicon-remove' style='font-size: 8px'></span></a></div></div><div class='col-lg-5 custom_lg-6'><div class='user_info'>"
								+ jsonComment.publishDate
								+ "</div></div><div class='col-lg-5 custom_lg-6'><div class='comment_like' style='cursor: pointer'><div class='likeComment likeCommentN"
								+ jsonComment.ID
								+ "'>+<span>"
								+ jsonComment.likerIDs.length
								+ "</span></div><a><input id='likeID' type='hidden' value='"
								+ jsonComment.ID
								+ "' />+1<span style='font-size: 8px'></span></a></div></div><div class='col-lg-2'><div class='comment_reply' id="
								+ postID
								+ " style='cursor: pointer'><a><input id='replyName' type='hidden' value='"
								+ jsonComment.owner.attributes.name
								+ "' /><input id='replyID' type='hidden' value='"
								+ jsonComment.ID
								+ "' />reply<span style='font-size: 8px'></span></a></div></div></div></div><div class='act_comment'><a class='commentHead'>@"
								+ jsonComment.attributes.commentToComment
								+ "</a>" + "&nbsp;"
								+ jsonComment.attributes.content
								+ "﻿</div></div>";
						if (USERID != jsonComment.owner.ID) {
							$('.deleteCommBtn').css("display", "none");
						}
					});
	var boarddiv = "<div class='post"
			+ postID
			+ " notifyItem'><div class='post_body'><div class='row'><div class='col-md-2'><div class='user_img'><img class='userImg' src='images/user_img.jpg' /><input type='hidden' value='"
			+ ownerID
			+ "' name='userID'/></div></div><div class='col-md-6'><div class='user_name'><strong>"
			+ ownerNickName
			+ "</strong></div><div class='user_info'>"
			+ publishDate
			+ "</div></div><div class='col-md-4'><div class='deletePostBtn'><a><input id='deleteID' type='hidden' value="
			+ postID
			+ " /><span class='glyphicon glyphicon-remove'></span></a></div></div></div><div class='post_info'>"
			+ content
			+ "<div class='post_more'><a>read more...</a></div></div><div class='post_img'><img src='' /></div><div class='row'><div class='col-md-1'><div class='post_like' style='cursor:pointer'><a><input id='likeID' type='hidden' value="
			+ postID
			+ "><span class='glyphicon glyphicon-heart-empty' style='font-size:20px'>"
			+ likeNum
			+ "</span></a></div></div><div class='col-md-1'><div class='post_collect' style='cursor:pointer'><a><input id='collectID' type='hidden' value="
			+ postID
			+ "><span class='glyphicon glyphicon-star-empty' style='font-size:20px'></span></a></div></div><div class='col-md-1'><div class='post_share' style='cursor:pointer'><a><span class='glyphicon glyphicon-share-alt' style='font-size:20px'></span></a></div></div></div><div class='media_comm'><div class='row addCommentBtn'><div class='col-lg-8'><div class='form-group'><input type='text' placeholder='Add a comment' class='form-control  commentTxt' id='commentText"
			+ postID
			+ " autocomplete='off''></div></div><div class='col-lg-4'><button type='submit' class='btn btn-success' id='addComment' value="
			+ postID + ">Submit</button></div></div>" + comment
			+ "</div></div></div>";
	if (USERID != ownerID) {
		$('.deletePostBtn').css("display", "none");
	}
	$(".mentionBody-content").empty();
	$(".mentionBody-content").append(boarddiv);
	$("#commentText" + postID).blur(function() {
		$(this).attr("placeholder", "add a comment");
	});
}