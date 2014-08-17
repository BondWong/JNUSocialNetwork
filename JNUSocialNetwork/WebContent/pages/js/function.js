//function Msnry
function Msnry(selectContain, item, width) {
	var container = document.querySelector(selectContain);
	imagesLoaded(container, function() {
		msnry = new Masonry(container, {
			columnWidth : width,
			itemSelector : item,
			gutter : 20
		});
	});
}

// function addDiv
function addPost(ownerID, ownerNickName, publishDate, content, postID, likers, collecters) {
	var response = FetchCommentByPost(postID, "0", "2");
	var comment = "";
	$
			.each(
					response,
					function(index, jsonComment) {
						comment = comment
								+ "<div class='act_content' id='"
								+ jsonComment.ID
								+ "'><div class='row'><div class='col-lg-1'><img src='images/user_img3.jpg' /></div><div class='col-lg-10'><div class='col-lg-6 custom_lg-6'><div class='user_name'><strong>"
								+ jsonComment.owner.attributes.nickName
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
								+ jsonComment.owner.attributes.nickName
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
	var likeClass = "glyphicon glyphicon-heart-empty";
	var collectClass = "glyphicon glyphicon-star-empty";
	if ($.inArray(USERID, likers) != -1) {
		likeClass = "glyphicon glyphicon-heart";
	}
	if ($.inArray(USERID, collecters) != -1) {
		collectClass = "glyphicon glyphicon-star";
	}
	var boarddiv = "<div class='post "
			+ postID
			+ "'><div class='post_body'><div class='row'><div class='col-md-2'><div class='user_img'><img class='userImg' src='images/user_img.jpg' /><input type='hidden' value='"
			+ ownerID
			+ "' name='userID'/></div></div><div class='col-md-6'><div class='user_name'><strong>"
			+ ownerNickName
			+ "</strong></div><div class='user_info'>"
			+ publishDate
			+ "</div></div><div class='col-md-4'><div class='deletePostBtn'><a><input id='deleteID' type='hidden' value="
			+ postID
			+ " /><span class='glyphicon glyphicon-remove'></span></a></div></div></div><div class='post_info'><span class='postContent'>"
			+ content
			+ "</span><div class='post_more'><a>read more...</a></div></div><div class='post_img'><img src='images/9.jpg' /></div><div class='row'><div class='col-md-1'><div class='post_like' style='cursor:pointer'><a><p id='ownerID' style='display:none;' value="
			+ ownerID
			+ "></p><input id='likeID' type='hidden' value="
			+ postID
			+ ">"
			+ "<span class='"
			+ likeClass
			+ "' style='font-size:20px'>"
			+ likers.length
			+ "</span></a></div></div><div class='col-md-1'><div class='post_collect' style='cursor:pointer'><a><input id='collectID' type='hidden' value="
			+ postID
			+ "><span class='"
			+ collectClass
			+ "' style='font-size:20px'></span></a></div></div><div class='col-md-1'></div></div><div class='media_comm'><div class='row addCommentBtn'><div class='col-lg-8'><div class='form-group'><input type='text' placeholder='Add a comment' class='form-control  commentTxt' id='commentText"
			+ postID
			+ "'></div></div><div class='col-lg-4'><button type='submit' class='btn btn-success' id='addComment' value="
			+ postID + ">Submit</button></div></div>" + comment
			+ "</div></div></div>";
	if (USERID != ownerID) {
		$('.deletePostBtn').css("display", "none");
	}
	$(".share").after(boarddiv);
	$("#commentText" + postID).blur(function() {
		$(this).attr("placeholder", "add a comment");
	});
	$('img.userImg').userTips();
	Msnry('.pro_body', '.post', 435);

}
// function hovercommentDeleteBtn

$('.act_content')
		.hover(
				function() {
					var changeBtn = "<div class='changeBtnGroup'><form><button class='btn btn-success profileImgBtn' data-toggle='modal' data-target='#myModalB'>Change BlackgroundImg</button><input type='file' name='file' class='btn_file' style='display:none'/></form></div>";// <button
					// class='btn
					// btn-success
					// avatarImgBtn'>Change
					// Avatar</button>
					$('.profile_img').append(changeBtn);
					$('.changeBtnGroup').hide();
					$('.changeBtnGroup').fadeIn(300);
				}, function() {
					$('.changeBtnGroup').fadeOut(300, function() {
						$(this).remove();
					});
				});

// fetchPostByIDs
function fetchPostByIDs(container) {
	var response = FetchPostByIDs(container);
	$.each(response, function(n, dataString) {
		addPost(dataString.owner.ID, dataString.owner.attributes.nickName,
				dataString.publishDate, dataString.attributes.content,
				dataString.ID, dataString.likerIDs);
	});
}
$(document).ready(function() {
	// function userTip

	// Notification
	$(".mentionBell").click(function(e) {
		clearInterval(window.bellIntervalID);
		var tinyTip;
		var pos = $(this).offset();
		var nPos = pos;
		nPos.top = pos.top + 20;
		nPos.left = pos.left - 250;
		var divTip = 'div.mentionBody';
		tinyTip = $(divTip);
		tinyTip.hide();
		tinyTip.css(nPos).fadeIn(300);
		e.stopPropagation();
	});
	/***************************************************************************
	 * $(document).mousedown(function(e) { if (e.which == 1) { var divTip =
	 * 'div.mentionBody'; tinyTip = $(divTip); tinyTip.fadeOut(300); } });
	 **************************************************************************/

});
// function clickFuntion
function clickEvent() {
	// function collectPost and cancelCollcet
	$('body')
			.on(
					'click',
					'.post_collect',
					function() {
						var id = $(this).find("input").attr("value");
						if ($(this).find("span").attr("class") == "glyphicon glyphicon-star-empty") {
							CollectPost("2011052406", id);
							var inputID = $("input[value='" + id
									+ "'][id='collectID']");
							inputID.next().attr("class",
									"glyphicon glyphicon-star");
							return 0;
						}
						if ($(this).find("span").attr("class") == "glyphicon glyphicon-star") {
							CancelCollectPost("2011052406", id);
							var inputID = $("input[value='" + id
									+ "'][id='collectID']");
							inputID.next().attr("class",
									"glyphicon glyphicon-star-empty");
							return 0;
						}
					});
	$(document)
			.ready(
					function() {

						$('body')
								.on(
										"click",
										".tipUser",
										function() {
											window.location.href = 'http://localhost:8080/JNUSocialNetwork/pages/profile.jsp?nav=post&'
													+ sessionStorage
															.getItem("otherUserID");
										});
						$('body')
								.on(
										"click",
										".glyphicon-home",
										function() {
											window.location.href = 'http://localhost:8080/JNUSocialNetwork/pages/profile.jsp?nav=post&'
													+ USERID;
										});
					});
	// function likePost and cancelLike
	$('body')
			.on(
					'click',
					'.post_like',
					function() {
						var id = $(this).find("input").attr("value");
						if ($(this).find("span").attr("class") == "glyphicon glyphicon-heart-empty") {
							LikePost(USERID, id);
							var inputID = $("input[value='" + id
									+ "'][id='likeID']");
							inputID.next().attr("class",
									"glyphicon glyphicon-heart");
							return 0;
						}
						if ($(this).find("span").attr("class") == "glyphicon glyphicon-heart") {
							CancelLikePost("2011052406", id);
							var inputID = $("input[value='" + id
									+ "'][id='likeID']");
							inputID.next().attr("class",
									"glyphicon glyphicon-heart-empty");
							return 0;
						}
					});
	// reply comment
	$('body').on("click", ".comment_reply", function() {
		var postID = $(this).attr("id");
		var commmentName = $(this).find("input[id='replyName']").attr("value");
		var commentID = $(this).find("input[id='replyID']").attr("value");
		sessionStorage.setItem("commentOwnerName", commmentName);
		sessionStorage.setItem("commentID", commentID);
		var inputID = $("input[id='commentText" + postID + "']");
		inputID.attr("placeholder", "@" + commmentName);
		inputID.focus();
	});
	// function notifyItem
	/*
	 * $('body') .on( 'click', '.commentItem', function() {
	 * $(this).fadeOut(300); $('.mentionBody-appear').css("display", "none");
	 * var dataString = FetchPostByID("1408108100658");
	 * notifyItem(dataString.owner.ID, dataString.owner.attributes.nickName,
	 * dataString.publishDate, dataString.attributes.content, dataString.ID,
	 * dataString.likerIDs.length); $(".arrowBack") .append( "<span
	 * class='glyphicon glyphicon-chevron-left' id='arrowBack'
	 * style='font-size:12px;'>&nbsp;</span>"); });
	 */
	// function backarrow
	$('body').on('click', '.arrowBack', function() {
		$('.mentionBody-new').css("display", "none");
		$(".arrowBack").css("display", "none");
		$('.mentionBody-appear').fadeIn(300);
	});
	// function likecomment and cancelLike
	$('body').on('click', '.comment_like', function() {
		var id = $(this).find("input").attr("value");
		if ($(this).find("a").css("color") == "rgb(90, 90, 90)") {
			LikeComment(USERID, id);
			var inputID = $("input[value='" + id + "'][id='likeID']");
			inputID.parents("a").css("color", "rgb(255, 255, 255)");
			inputID.parents("a").css("background-color", "rgb(66,139,202)");
			return 0;
		}
		if ($(this).find("a").css("color") == "rgb(255, 255, 255)") {
			CancelLikeComment(USERID, id);
			var inputID = $("input[value='" + id + "'][id='likeID']");

			inputID.parents("a").css("color", "rgb(90, 90, 90)");
			inputID.parents("a").css("background-color", "rgb(255, 255, 255)");
			return 0;
		}
	});
	// function Activity
	$('body').on('click', '.activityJoin', function() {
		var activityID = $(this).attr("id");
		JoinActivity(USERID, activityID);
	});
	$('body').on('click', '.leaveactivityJoin', function() {
		var activityID = $(this).attr("id");
		LeaveActivity(USERID, activityID);
	});

	//
	// function addComment
	$('body').on('click', '#addComment', function() {
		var id = this.getAttribute("value");
		var inputComm = $("input[id='commentText" + id + "']");
		var comment = {
			attributes : {
				content : inputComm.val(),
				toCommentID : sessionStorage.getItem("commentID"),
				postID : id + ""
			}
		};
		var commentJson = $.toJSON(comment);
		AddComment(USERID, id, commentJson);
		sessionStorage.setItem("commentOwnerName", "");
		sessionStorage.setItem("commentID", "");
	});
	// function follow cancelfollow
	$('body').on('click', '#followBtn', function() {
		// get post owner
		var id = $('.popTip').attr('id');
		if ($(this).text() == "Follow") {
			Follow(USERID, id);
		}
		if ($(this).text() == "Following") {
			CancelFollow(USERID, id);
			var followBtn = $("button[id='followBtn']");
			followBtn.text("Follow");
		}
	});
	$('body').on('click', '.deleteCommBtn', function() {
		var commentID = $(this).find("input").attr("value");
		var postID = $(this).find("input").attr("id");
		DeleteComment(postID, commentID);
	});
	$('body').on("click", ".editCommunity", function() {
		$('#communityName').val(community.attributes.name);
		$('#communityIntro').val(community.attributes.introduct);
	});
	$('body').on("click", "#saveCommunity", function() {
		var communityC;
		if ($('#fileupload').val() != "") {
			communityC = FileUpload(new FormData($('.communityForm')[0]))[0];
		} else {
			communityC = "";
		}
		var attributes = {
			name : $('#communityName').val(),
			introduct : $('#communityIntro').val(),
			communityCard : communityC
		};
		var json = $.toJSON(attributes);
		var c = UpdateCommunity(community.ID, json);
		$('#editCommunity').modal('hide');
		$('.cName').html(c.attributes.name);
		$('.cIntro').html(c.attributes.introduct);
	});
}
function clickOffEvent() {
	$('.Btnshare').click(function(e) {
		e.preventDefault();
		$(this).attr("data-toggle", "");
		alert("Sign In");
	});
	$('.share_txt').click(function(e) {
		e.preventDefault();
		$(this).attr("data-toggle", "");
		alert("Sign In");
	});
	$('.post_collect').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('.post_like').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('.comment_like').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('.activityJoin').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('.leaveactivityJoin').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('#addComment').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('#followBtn').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('#deleteCommBtn').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('#communityCreate').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('.content_join').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('#activityCreate').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('.pinCommon').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('.pCampus').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('.pSeason').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('.pMajor').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('。pClass').click(function(e) {
		e.preventDefault();
		alert("Sign In");
	});
	$('.addphotoBtn').click(function(e) {
		$(this).attr("data-toggle", "");
		alert("Sign In");
	});
	$('.aSavebtn').css("display", "none");
	$('.aEditbtn').css("display", "none");
	$('.createCom').click(function(e) {
		$(this).attr("data-toggle", "");
		alert("Sign In");
	});

}
(function($) {
	$.fn.userTips = function() {
		// Speed of the animations in milliseconds - 1000 =
		// 1 second.
		var animSpeed = 300;
		var tinyTip;
		// When we hover over the element that we want the
		// tooltip applied to
		$(this)
				.hover(
						function() {
							var pos = $(this).offset();
							var nPos = pos;
							nPos.top = pos.top + 20;
							nPos.left = pos.left + 40;
							var userid = $(this).next().val();
							var data = FetchUserByID(userid);
							var followTxt = "Follow";
							if($.inArray(USERID,data.followerIDs) != -1){
								followTxt = "Following";
							}
							if(USERID == userid){
								followTxt="Yourself";
							}
							sessionStorage.setItem("otherUserID", data.ID);
							if (data != "") {
								var tipFrame = '<div id="'
										+ data.ID
										+ '" class="popTip"><div class="content"><div class="urserBgShort"><img src="images/urseBgShort.jpg" /></div><div class="urserInfShort"><img src="images/user_img4.jpg" /><p><h1><a class="tipUser">'
										+ data.attributes.nickName
										+ '</a></h1></p><p>'
										+ data.attributes.lookingFor
										+ '</p><button id="followBtn">'+followTxt+'</button></div></div></div>';
								$('body').append(tipFrame);
								var divTip = 'div.popTip';
								tinyTip = $(divTip);
								tinyTip.hide();
								tinyTip.css('position', 'absolute').css(
										'z-index', '1000');
								tinyTip.css(nPos).fadeIn(animSpeed);
								tinyTip.hover(function() {
									clearTimeout(window.timer);
								}, function() {
									tinyTip.fadeOut(animSpeed, function() {
										$(this).remove();
									});
								});
							}
						}, function() {
							window.timer = setTimeout(function() {
								tinyTip.fadeOut(animSpeed, function() {
									$(this).remove();
								});
							}, 200);

						});
	};
})(jQuery);
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
	$(".mentionBody-new").append(tipFrame);
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
	$(".mentionBody-new").append(boarddiv);
	$("#commentText" + postID).blur(function() {
		$(this).attr("placeholder", "add a comment");
	});
}
$('body').on("click", ".mentionClose", function() {
	$('.mentionBody').css("display", "none");
});
function displayRemindItem() {

}
