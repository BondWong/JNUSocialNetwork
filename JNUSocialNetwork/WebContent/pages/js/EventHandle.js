// JavaScript Document
//create event source
function SSEHandle() {
	if (!!window.EventSource) {
		window.source = Subscribe();
		CREATEPOST();
		CREATEPOSTINCOMMUNITY();
		DELETEPOST();
		DELETECOMMENT();
		DELETEPOSTFROMCOMMUNITY();
		LIKEPOST();
		CANCELLIKEPOST();
		LIKECOMMENT();
		CANCELLIKECOMMENT();
		COLLECTPOST();
		CANCELCOLLECTPOST();
		JOINACTIVITY();
		CREATECOMMENT();
		FOLLOW();
	}
}
function CREATEPOST() {
	source.addEventListener("CREATEPOST", function(event) {
		var jsondata = $.parseJSON(event.data);
		var usersQ = $.parseJSON(sessionStorage.getItem("user")).followeeIDs;
		usersQ.push(USERID);
		if ($.inArray(jsondata.post.owner.ID, usersQ) != -1) {
			postIdContainer.push(jsondata.post.ID);
			if (jsondata.post.owner.ID == USERID) {
				fetchPostByIDs(postIdContainer);
				postIdContainer = [];
			}
			if (jsondata.post.owner.ID != USERID) {
				$('.alertCust').css("display", "block");
			}
		}
	});
}
function CREATEPOSTINCOMMUNITY() {
	source.addEventListener("CREATEPOSTINCOMMUNITY", function(event) {
		var jsondata = $.parseJSON(event.data);
		if (jsondata.post.postType == "NORMAL") {
			communityPostIdContainer.push(jsondata.post.ID);
			if (jsondata.post.owner.ID == USERID) {
				fetchPostByIDs(communityPostIdContainer);
				communityPostIdContainer = [];
			}
			if (jsondata.post.owner.ID != USERID) {
				$('.alertCustC').css("display", "block");
			}
		}

		if (jsondata.post.postType == "ACTIVITY" && jsondata.post.available == true) {
			addActivity(jsondata.post.ID,
					jsondata.post.attributes.activityName,
					jsondata.post.attributes.activityTime,
					jsondata.post.attributes.activityAddr,
					jsondata.post.attributes.activityMore,
					jsondata.post.attributes.background,
					jsondata.post.owner.attributes.avatarLink,
					jsondata.post.owner.ID, jsondata.post.participantIDs,
					jsondata.post.owner.attributes.startDate,
					jsondata.post.owner.attributes.limitation,jsondata.post.attributes.ifUpload,jsondata.post.attributes.inquery);

		}
	});
}
function DELETEPOST() {
	source.addEventListener('DELETEPOST', function(event) {
		var jsondata = $.parseJSON(event.data);
		$("." + jsondata.ID + "").remove();
		Msnry('.pro_body', '.post', 435);
	});
}
function DELETECOMMENT() {
	source
			.addEventListener(
					'DELETECOMMENT',
					function(event) {
						var jsondata = $.parseJSON(event.data);
						var tem = $("div[class='aBodyComment'][id='commentTxt"
								+ jsondata.comment + "']");
						if ($("div[class='act_content'][id='"
								+ jsondata.comment + "']").length != 0) {
							$(
									"div[class='act_content'][id='"
											+ jsondata.comment + "']").remove();
							FetchCommentByPost(jsondata.postID, "0", "2");
							Msnry('.pro_body', '.post', 435);
						}
						if ($("div[class='aBodyComment'][id='commentTxt"
								+ jsondata.comment + "']").length != 0) {
							$(
									"div[class='aBodyComment'][id='commentTxt"
											+ jsondata.comment + "']").remove();
						}

					});
}
function DELETEPOSTFROMCOMMUNITY() {
	source.addEventListener('DELETEPOSTFROMCOMMUNITY', function(event) {
		var jsondata = $.parseJSON(event.data);
		$("div[class='post " + jsondata.postID + "']").remove();
		Msnry('.pro_body', '.post', 435);
	});
}
function LIKEPOST() {
	source.addEventListener('LIKEPOST', function(event) {
		var jsondata = $.parseJSON(event.data);
		var postID = jsondata.postID;
		var inputID = $("input[value='" + postID + "'][id='likeID']").next();
		var Span = "";
		$.each(inputID, function(n, span) {
			if ($(span).attr("id") == "likeShow") {
				Span = span;
			}
		});
		var like = parseInt($(Span).text()) + 1;
		inputID.text(like);
		if (USERID == jsondata.ID)
			oriented_like_post(jsondata.postOwnerID, postID);
	});
}
function CANCELLIKEPOST() {
	source.addEventListener('CANCELLIKEPOST', function(event) {
		var jsondata = $.parseJSON(event.data);
		var postID = jsondata.postID;
		var inputID = $("input[value='" + postID + "'][id='likeID']").next();
		var Span = "";
		$.each(inputID, function(n, span) {
			if ($(span).attr("id") == "likeShow") {
				Span = span;
			}
		});
		var like = parseInt($(Span).text()) - 1;
		inputID.text(like);
		;
	});
}
function LIKECOMMENT() {
	source.addEventListener('LIKECOMMENT', function(event) {
		var jsondata = $.parseJSON(event.data);
		var commentID = jsondata.commentID;
		var postID = jsondata.postID;
		var spanNum = $("div[class='likeComment likeCommentN" + commentID
				+ "']");
		var like = parseInt(spanNum.find("span").text()) + 1;
		spanNum.find('span').text(like);
		if (USERID == jsondata.ID)
			oriented_like_comment(jsondata.commentOwnerID, jsondata.commentID,
					postID);
	});
}
function CANCELLIKECOMMENT() {
	source.addEventListener('CANCELLIKECOMMENT', function(event) {
		var jsondata = $.parseJSON(event.data);
		var postID = jsondata.comment;
		var spanNum = $("div[class='likeComment likeCommentN" + postID + "']");
		var like = parseInt(spanNum.find("span").text()) - 1;
		spanNum.find('span').text(like);
	});
}
function COLLECTPOST() {
	source.addEventListener('COLLECTPOST', function(event) {
		var jsondata = $.parseJSON(event.data);
		var postID = jsondata.pcID;

	});
}
function CANCELCOLLECTPOST() {
	source.addEventListener('CANCELCOLLECTPOST', function(event) {
		var jsondata = $.parseJSON(event.data);
		var postID = jsondata.pcID;

	});
}
function JOINACTIVITY() {
	source.addEventListener('JOINACTIVITY', function(e) {

	});
}
function CREATECOMMENT() {
	source
			.addEventListener(
					'CREATECOMMENT',
					function(event) {
						var jsondata = $.parseJSON(event.data);
						var jsonComment = jsondata.comment;
						var type = FetchPostByID(jsondata.postID).postType;
						if (type == "NORMAL") {
							var atComment = "";
							if (jsonComment.attributes.commentToComment != "") {
								atComment = "@"
										+ jsonComment.attributes.commentToComment;
							}
							var removeBtn = "";
							var commentReply = "<div class='comment_reply' id="
									+ jsondata.postID
									+ " style='cursor: pointer'><a><input id='replyName' type='hidden' value='"
									+ jsonComment.owner.attributes.name
									+ "' /><input id='replyID' type='hidden' value='"
									+ jsonComment.ID
									+ "' />reply<span style='font-size: 8px'></span></a></div>";
							if (USERID == jsonComment.owner.ID) {
								removeBtn = "<div class='deleteCommBtn' style='cursor:pointer'><a><input id='"
										+ jsondata.postID
										+ "' type='hidden' value='"
										+ jsonComment.ID
										+ "' /><span class='glyphicon glyphicon-remove' style='font-size: 8px'></span></a></div>";
								commentReply = "";
							}
							var boarddiv = "<div class='act_content' id='"
									+ jsonComment.ID
									+ "'><div class='row'><div class='col-lg-1'><img height='30' width='30' src='"
									+ $
											.parseJSON(jsonComment.owner.attributes.avatarLink).src
									+ "' /></div><div class='col-lg-10 cus-lg-10'><div class='row'><div class='col-lg-5 custom_lg-6'><div class='user_name'><strong>"
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
							$(
									"button[value='" + jsondata.postID
											+ "'][id='addComment']").parent()
									.parent().after(boarddiv);
							$('.act_content').find('a').hide();
							$('.act_content').hover(function() {

								$(this).find('a').fadeIn(300);
							}, function() {
								$(this).find('a').fadeOut(300);
							});
							Msnry('.pro_body', '.post', 435);
						}
						if (type == "ACTIVITY") {
							var atComment = "";
							if (jsonComment.attributes.commentToComment != "") {
								atComment = "@"
										+ jsonComment.attributes.commentToComment;
							}
							var commentReply = "<div class='comment_reply' id="
									+ jsondata.postID
									+ " style='cursor: pointer'><a><input id='replyName' type='hidden' value='"
									+ jsonComment.owner.attributes.name
									+ "' /><input id='replyID' type='hidden' value='"
									+ jsonComment.ID
									+ "' />reply<span style='font-size: 8px'></span></a></div>";
							var removeBtn = "";
							if (USERID == jsonComment.owner.ID) {
								removeBtn = "<div class='deleteCommBtn deletCa' style='cursor:pointer'><a><input id='"
										+ jsonComment.attributes.postID
										+ "' type='hidden' value='"
										+ jsonComment.ID
										+ "' /><span class='glyphicon glyphicon-remove' style='font-size: 8px'></span></a></div>";
								commentReply = "";
							}
							var comment = "<div class='aBodyComment' id='commentTxt"
									+ jsonComment.ID
									+ "'><div class='aCommentItem'><div class='col-lg-2 col-lg-2-cust'><img class='img-circle userImg' width='50' height='50'  src='"
									+ $
											.parseJSON(jsonComment.owner.attributes.avatarLink).src
									+ "'></div><div class='user_name'><strong>"
									+ jsonComment.owner.attributes.name
									+ "</strong></div><div class='user_info'><span>"
									+ jsonComment.publishDate
									+ "</span>"
									+ removeBtn
									+ commentReply
									+ "<input type='hidden' id='"
									+ activity.ID
									+ "' value='"
									+ jsonComment.ID
									+ "' /></span></div><br><div class='aC'>"
									+ "<span class='commentHead'>"
									+ atComment
									+ "</span>"
									+ "&nbsp;"
									+ jsonComment.attributes.content
									+ "</div></div></div>";
							$("#commentText" + jsonComment.attributes.postID)
									.blur(
											function() {
												$(this).attr("placeholder",
														"add a comment");
											});
							$('.aBodyComment').find('a').hide();
							$('.aBodyComment').hover(function() {

								$(this).find('a').fadeIn(300);
							}, function() {
								$(this).find('a').fadeOut(300);
							});
							$(".commentBtn").after(comment);
						}
						if (USERID == jsondata.ID) {
							if (jsondata.comment.attributes.toCommentID == null
									|| jsondata.comment.attributes.toCommentID == "")
								oriented_add_comment(jsondata.postOwnerID,
										jsondata.commentID, jsondata.postID);
							else
								oriented_reply_comment(
										jsondata.toCommentOwnerID,
										jsondata.commentID,
										jsondata.comment.attributes.toCommentID,
										jsondata.postID);
						}
					});
}
function FOLLOW() {
	source.addEventListener('FOLLOW', function(event) {
		var jsondata = $.parseJSON(event.data);
		$("button[id='followBtn']").text("Following");
		//about.js
		$(".followBtnAB").text("Following");
		// people.js
		$("button[id='" + jsondata.otherID + "']").text("Following");
		oriented_follow(jsondata.otherID);
	});
}
