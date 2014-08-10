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
		postIdContainer.push(jsondata.post.ID);
		if (jsondata.post.owner.ID == USERID) {
			fetchPostByIDs(postIdContainer);
			postIdContainer = [];
		}
		if (jsondata.post.owner.ID != USERID) {
			$('.alertCust').css("display", "block");
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
		if (jsondata.post.postType == "ACTIVITY") {
			addActivity(jsondata.communityID,
					jsondata.post.attributes.activityName,
					jsondata.post.attributes.activityTime,
					jsondata.post.attributes.activityAddr,
					jsondata.post.attributes.activityMore,
					jsondata.post.imageLinks);
		}
	});
}
function DELETEPOST() {
	source.addEventListener('DELETEPOST', function(event) {
		var jsondata = $.parseJSON(event.data);
		$("div[class='post " + jsondata.ID + "']").remove();
		fetchByFolloweeOrOwner();
		Msnry('.pro_body', '.post', 435);
	});
}
function DELETECOMMENT() {
	source.addEventListener('DELETECOMMENT', function(event) {
		var jsondata = $.parseJSON(event.data);
		$("div[class='act_content'][id='" + jsondata.comment + "']").remove();
		FetchCommentByPost(jsondata.postID, "0", "2");
		Msnry('.pro_body', '.post', 435);
	});
}
function DELETEPOSTFROMCOMMUNITY() {
	source.addEventListener('DELETEPOSTFROMCOMMUNITY', function(event) {
		var jsondata = $.parseJSON(event.data);
		$("div[class='post " + jsondata.postID + "']").remove();
		fetchPostByCommunity();
		Msnry('.pro_body', '.post', 435);
	});
}
function LIKEPOST() {
	source.addEventListener('LIKEPOST', function(event) {
		var jsondata = $.parseJSON(event.data);
		var postID = jsondata.postID;
		var inputID = $("input[value='" + postID + "'][id='likeID']");
		var like = parseInt(inputID.next().text()) + 1;
		inputID.next().text(like);
	});
}
function LIKECOMMENT() {
	source.addEventListener('LIKECOMMENT', function(event) {
		var jsondata = $.parseJSON(event.data);
		var postID = jsondata.postID;
		var spanNum = $("div[class='likeComment likeCommentN" + postID + "']");
		var like = parseInt(spanNum.find("span").text()) + 1;
		spanNum.find('span').text(like);
	});
}
function CANCELLIKEPOST() {
	source.addEventListener('CANCELLIKEPOST', function(event) {
		var jsondata = $.parseJSON(event.data);
		var postID = jsondata.postID;
		var inputID = $("input[value='" + postID + "'][id='likeID']");
		var like = parseInt(inputID.next().text()) - 1;
		inputID.next().text(like);
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
							var boarddiv = "<div class='act_content' id='"
									+ jsonComment.ID
									+ "'><div class='row'><div class='col-lg-1'><img src='images/user_img3.jpg' /></div><div class='col-lg-10'><div class='col-lg-6 custom_lg-6'><div class='user_name'><strong>"
									+ jsonComment.owner.attributes.nickName
									+ "</strong></div></div><div class='col-lg-6 custom_lg-6'><div class='deleteCommBtn' style='cursor:pointer'><a><input id='"
									+ jsondata.postID
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
									+ jsondata.postID
									+ " style='cursor: pointer'><a><input id='replyName' type='hidden' value='"
									+ jsonComment.owner.attributes.nickName
									+ "' /><input id='replyID' type='hidden' value='"
									+ jsonComment.ID
									+ "' />reply<span style='font-size: 8px'></span></a></div></div></div></div><div class='act_comment'><a class='commentHead'>@"
									+ jsonComment.attributes.commentToComment
									+ "</a>"+ "&nbsp;" + jsonComment.attributes.content
									+ "﻿</div></div>";
							$(
									"button[value='" + jsondata.postID
											+ "'][id='addComment']").parent()
									.parent().after(boarddiv);
							Msnry('.pro_body', '.post', 435);
						}
						if (type == "ACTIVITY") {
							var comment = "<div class='aBodyComment'><div class='aCommentItem'><img alt=''  src='images/user_img.jpg'><div class='user_name'><strong>"
									+ jsonComment.owner.attributes.nickName
									+ "</strong></div><div class='user_info'>"
									+ jsonComment.publishDate
									+ "</div><br><div>"
									+ jsonComment.attributes.content
									+ "</div></div></div>";
							$(".commentBtn").after(comment);
						}

					});
}
function FOLLOW() {
	source.addEventListener('FOLLOW', function(event) {
		var jsondata = $.parseJSON(event.data);
		var followBtn = $("button[id='followBtn']");
		followBtn.text("Following");

	});
}
