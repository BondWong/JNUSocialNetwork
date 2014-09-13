/**
 * 
 */
function on_bell_click(e) {
	clearInterval(window.bellIntervalID);
	window.bellIntervalID = null;
	var tinyTip;
	var t = $(this).position().top;
	var l = $(this).offset().left;
	t += 50;
	l -= 238;
	var divTip = '.mentionBody';
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
	$(".mentionBody-content").empty();
	var hasMessageItem = false;
	var hasEventItem = false;
	hasMessageItem = add_messages_to_bell();
	hasEventItem = add_events_to_bell();
	if (!hasMessageItem && !hasEventItem) {
		$(".mentionBody-content").empty();
		$(".mentionBody-content").append(
				'<div id="mentionBody-no-content-item">没有消息</div>');
	}

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

	var online_messages_length = 0;
	var offline_messages_length = 0;
	for (key in online_messages) {
		if (online_messages.hasOwnProperty(key))
			online_messages_length++;
	}
	for (key in offline_messages) {
		if (offline_messages.hasOwnProperty(key))
			offline_messages_length++;
	}
	if (online_messages_length == 0 && offline_messages_length == 0)
		return false;

	return true;
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

	var incomingEvents_length = 0;
	for (key in incomingEvents)
		if (incomingEvents.hasOwnProperty(key))
			incomingEvents_length++;
	if (incomingEvents_length != 0)
		return true;
	return false;

}

function messages_remind(message) {
	if ($("div.mentionBody-content #" + message.fromID).length == 0) {
		$("div.mentionBody-content")
				.append(
						'<div class="NotiItem" id="'
								+ message.fromID
								+ '"><div class="col-lg-3"><div><img src="'
								+ $.parseJSON(message.attributes.avatarLink).src
								+ '" onload="javascript:auto_resize(50, 50, this)" style="display: none"/></div></div>'
								+ '<div class="col-lg-9"><div>'
								+ message.from
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
	$("div.mentionBody-content")
			.append(
					'<div class="NotiItem" id="'
							+ event.data.eventID
							+ '"><div class="col-lg-3"><div><img src="'
							+ $.parseJSON(event.data.avatar).src
							+ '" onload="javascript:auto_resize(50, 50, this)" style="display: none"/></div></div><div class="col-lg-9"><h1>'
							+ head + '</h1><div class="remindConent">'
							+ event.data.name + ' ' + description
							+ '</div></div><div>');
	var type = event.name;
	var eventID = event.data.eventID;
	var isOnline = event.action == null ? false : true;
	$("div#" + event.data.eventID).click(
			function(e) {
				e.stopPropagation();
				var incomingEvents = sessionStorage.getItem("incomingEvents");
				incomingEvents = $.parseJSON(incomingEvents);
				delete incomingEvents["" + eventID];
				sessionStorage.setItem("incomingEvents", JSON
						.stringify(incomingEvents));

				switch (type) {
				case "CREATECOMMENT":
					var dataString = FetchPostByID(event.data.postID);
					notifyAddComment(event.data.commentID, dataString.owner.ID,
							dataString.owner.attributes.name,
							dataString.publishDate,
							dataString.attributes.content, dataString.ID,
							dataString.likerIDs,
							dataString.owner.attributes.avatarLink,
							dataString.imageLinks, dataString.collectorIDs);
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
							dataString.attributes.content, dataString.ID,
							dataString.likerIDs,
							dataString.owner.attributes.avatarLink,
							dataString.imageLinks, dataString.collectorIDs);
					break;
				case "LIKEPOST":
					var dataString = FetchPostByID(event.data.postID);
					notifyLikePost(dataString.owner.ID,
							dataString.owner.attributes.name,
							dataString.publishDate,
							dataString.attributes.content, dataString.ID,
							dataString.likerIDs,
							dataString.owner.attributes.avatarLink,
							dataString.imageLinks, dataString.collectorIDs);
					break;
				case "REPLYCOMMENT":
					var dataString = FetchPostByID(event.data.postID);
					notifyReplyComment(event.data.commentID,
							event.data.toCommentID, dataString.owner.ID,
							dataString.owner.attributes.name,
							dataString.publicDate,
							dataString.attributes.content, dataString.ID,
							dataString.likerIDs,
							dataString.owner.attributes.avatarLink,
							dataString.imageLinks, dataString.collectorIDs);
					break;
				}

				$("#arrowBack").css("display", "inline");
				$('.arrowBack').click(function() {
					$("#arrowBack").css("display", "none");
					$(".mentionBody-content").empty();
					show_remind_content();
				});
				if (!isOnline) {
					$.ajax({
						type : "PUT",
						url : '../../app/event/deleteUnhandledEvent/' + USERID
								+ '/' + eventID,
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
		likerIDs, postOwnerAvatar, postImage, colloctorIDs) {
	notifyItem([], ownerID, ownerNickName, publishDate, content, postID,
			likerIDs, postOwnerAvatar, postImage, colloctorIDs);
}
function notifyLikeComment(commentID, ownerID, ownerNickName, publishDate,
		content, postID, likerIDs, postOwnerAvatar, postImage, colloctorIDs) {
	var response = FetchCommentByID(commentID);
	notifyItem([ response ], ownerID, ownerNickName, publishDate, content,
			postID, likerIDs, postOwnerAvatar, postImage, colloctorIDs);
}
function notifyReplyComment(commentID, toCommentID, ownerID, ownerNickName,
		publishDate, content, postID, likerIDs, postOwnerAvatar, postImage,
		colloctorIDs) {
	var response = [];
	var comment1 = FetchCommentByID(commentID);
	var comment2 = FetchCommentByID(toCommentID);
	response.push(comment1);
	response.push(comment2);
	notifyItem(response, ownerID, ownerNickName, publishDate, content, postID,
			likerIDs, postOwnerAvatar, postImage, colloctorIDs);
}
function notifyAddComment(commentID, ownerID, ownerNickName, publishDate,
		content, postID, likerIDs, postOwnerAvatar, postImage, colloctorIDs) {
	var response = FetchCommentByID(commentID);
	notifyItem([ response ], ownerID, ownerNickName, publishDate, content,
			postID, likerIDs, postOwnerAvatar, postImage, colloctorIDs);
}

function notifyFollow(followerID) {
	var data = FetchUserByID(followerID);
	sessionStorage.setItem("otherUserID", data.ID);
	var tipFrame = '<div class="popTip notifyItem"><div class="content"><div class="urserBgShort"><img  onload="javascript:auto_resize(350, 180, this)" src="'
			+ $.parseJSON(data.attributes.profileImageLink).src
			+ '" id="remind-bell-profileImg" style="display: none"/></div><div class="urserInfShort"><img class="img-circle" onload="javascript:auto_resize(120, 120, this)" src="'
			+ $.parseJSON(data.attributes.avatarLink).src
			+ '" id="remind-bell-avatarImg" style="display: none"/><p><h1><a class="tipUser">'
			+ data.attributes.name
			+ '</a></h1></p><p>'
			+ data.attributes.lookingFor + '</p></div></div></div>';
	$(".mentionBody-content").empty();
	$(".mentionBody-content").append(tipFrame);
}

function notifyItem(response, ownerID, ownerNickName, publishDate, content,
		postID, likerIDs, postOwnerAvatar, postImage, colloctorIDs) {
	var comment = "";
	$
			.each(
					response,
					function(index, jsonComment) {
						var atComment = "";
						if (jsonComment.attributes.commentToComment != "") {
							atComment = "@"
									+ jsonComment.attributes.commentToComment;
						}
						var removeBtn = "";
						var commentReply = "<div class='comment_reply' id="
								+ postID
								+ " style='cursor: pointer'><a><input id='replyName' type='hidden' value='"
								+ jsonComment.owner.attributes.name
								+ "' /><input id='replyID' type='hidden' value='"
								+ jsonComment.ID
								+ "' />reply<span style='font-size: 8px'></span></a></div>";
						if (USERID == jsonComment.owner.ID) {
							removeBtn = "<div class='deleteCommBtn' style='cursor:pointer'><a><input id='"
									+ postID
									+ "' type='hidden' value='"
									+ jsonComment.ID
									+ "' /><span class='glyphicon glyphicon-remove' style='font-size: 8px'></span></a></div>";
							commentReply = "";
						}
						comment = comment
								+ "<div class='act_content' id='"
								+ jsonComment.ID
								+ "'><div class='row'><div class='col-lg-1'><img onload='javascript:auto_resize(30, 30, this)' src='"
								+ $
										.parseJSON(jsonComment.owner.attributes.avatarLink).src
								+ "' style='display: none'/></div><div class='col-lg-10 cus-lg-10'><div class='row'><div class='col-lg-5 custom_lg-6'><div class='user_name'><strong>"
								+ jsonComment.owner.attributes.name
								+ "</strong></div></div><div class='col-lg-6 custom_lg-6'>"
								+ removeBtn
								+ "</div></div><div class='row'><div class='col-lg-7 custom_lg-6'><div class='user_info'>"
								+ jsonComment.publishDate
								+ "</div></div><div class='col-lg-2 custom_lg-6'><div class='comment_like' style='cursor: pointer'><div class='likeComment likeCommentN"
								+ jsonComment.ID
								+ "'>+<span>"
								+ jsonComment.likerIDs.length
								+ "</span></div><a><input id='likeID' type='hidden' value='"
								+ jsonComment.ID
								+ "' />+1<span style='font-size: 8px'></span></a></div></div><div class='col-lg-2'>"
								+ commentReply
								+ "</div></div></div></div><div class='act_comment'><span class='commentHead'>"
								+ atComment + "</span>" + "&nbsp;"
								+ jsonComment.attributes.content
								+ "﻿</div></div>";
						if (USERID != jsonComment.owner.ID) {
							$('.deleteCommBtn').css("display", "none");
						}
					});
	var likeClass = "glyphicon glyphicon-heart-empty";
	if ($.inArray(USERID, likerIDs) != -1) {
		likeClass = "glyphicon glyphicon-heart";
	}
	var postImgDiv = "<div class='post_img' id='postImg" + postID + "'>";
	var imageDiv = "";

	if (postImage.length != 0) {
		$
				.each(
						postImage,
						function(n, image) {
							imageDiv = imageDiv
									+ "<img class='postimg' onload='javascript:auto_resize(350, 208, this)' src='"
									+ $.parseJSON(image).src
									+ "' style='display: none'/>";
						});
		postImgDiv = postImgDiv + imageDiv + "</div>";
	} else {
		postImgDiv = "";
	}
	var boarddiv = "<div class='row'><div class='col-md-2'><div class='user_img'><img class='img-circle userImg' onload='javascript:auto_resize(50, 50, this)' src='"
			+ $.parseJSON(postOwnerAvatar).src
			+ "' style='display: none'/><input type='hidden' value='"
			+ ownerID
			+ "' name='userID'/></div></div><div class='col-md-8'><div class='user_name'><strong>"
			+ ownerNickName
			+ "</strong></div><div class='user_info'>"
			+ publishDate
			+ "</div></div></div><div class='post_info'><span class='postContent'>"
			+ content
			+ "</span></div>"
			+ postImgDiv
			+ "<div class='row'><div class='col-md-1'><div class='post_like' style='cursor:pointer'><a><p id='ownerID' style='display:none;' value="
			+ ownerID
			+ "></p><input id='likeID' type='hidden' value="
			+ postID
			+ ">"
			+ "<span id='likeShow' class='"
			+ likeClass
			+ "' style='font-size:20px'>"
			+ likerIDs.length
			+ "</span></a></div></div><div class='col-md-1'></div><div class='col-md-1'></div></div><div class='media_comm'><div class='row addCommentBtn'><div class='col-lg-8'><div class='form-group'><input type='text' placeholder='Add a comment' class='form-control  commentTxt' id='commentText"
			+ postID
			+ "' maxLength='100'></div></div><div class='col-lg-4'><button type='submit' class='btn btn-success' id='addComment' value="
			+ postID + ">发送</button></div></div>" + comment + "</div>";

	$("#commentText" + postID).blur(function() {
		$(this).attr("placeholder", "add a comment");
	});
	$('.act_content').find('a').hide();
	$('.act_content').hover(function() {

		$(this).find('a').fadeIn(300);
	}, function() {
		$(this).find('a').fadeOut(300);
	});

	$('.deletePostBtn').css("display", "none");
	$(".mentionBody-content").empty();
	$(".mentionBody-content").append(boarddiv);
	$("#commentText" + postID).blur(function() {
		$(this).attr("placeholder", "add a comment");
	});
}
