if (BrowserDetection() != false) {
	var alert = "<div class='modal fade' id='browserDetection' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title'>检测到你浏览器的版本过低，有可能影响网站效果哦</h4></div><div class='modal-body modal-custom'><a data-dismiss='modal' type='button' class='btn btn-primary' >我知道了</a></div></div></div></div>";
	var button = "<button  data-toggle='modal' class='browserClick' data-target='#browserDetection'></button>";
	$('body').append(button);
	$('body').append(alert);
	$('.browserClick').click();
}

// function Msnry
function Msnry(selectContain, item, width) {
	var container = document.querySelector(selectContain);
	imagesLoaded(container, function() {
		var msnry = new Masonry(container, {
			isInitLayout : false,
			transitionDuration : '2s',
			columnWidth : width,
			itemSelector : item,
			gutter : 20
		});
		msnry.on('layoutComplete', function() {
			$(item).animate({
				opacity : 1
			}, 300);
		});
		msnry.layout();
	});
}

function post(ownerID, ownerNickName, publishDate, contentR, postID, likers,
		collecters, srcImage, ownerImage) {
	var content = '<pre>' + replaceURLWithHTMLLinks(contentR) +'</pre>';
	var response = FetchCommentByPost(postID, "0", "10");
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
						var likeCommentClass = "";
						if ($.inArray(USERID, jsonComment.likerIDs) != -1) {
							likeCommentClass = "style='color:rgb(255, 255, 255);background-color: rgb(66,139,202);'";
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
								+ "'><div class='row'><div class='col-lg-1'><img width='30' height='30' src='"
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
								+ "' >+<span>"
								+ jsonComment.likerIDs.length
								+ "</span></div><a "
								+ likeCommentClass
								+ "><input id='likeID' type='hidden' value='"
								+ jsonComment.ID
								+ "' />+1<span style='font-size: 8px'></span></a></div></div><div class='col-lg-2'>"
								+ commentReply
								+ "</div></div></div></div><div class='act_comment'><span class='commentHead'>"
								+ atComment + "</span>" + "&nbsp;"
								+ jsonComment.attributes.content
								+ "﻿</div></div>";
					});
	var likeClass = "glyphicon glyphicon-heart-empty postCLike";

	if ($.inArray(USERID, likers) != -1) {
		likeClass = "glyphicon glyphicon-heart postCLike";
	}
	/*
	 * var collectClass = "glyphicon glyphicon-star-empty"; if
	 * ($.inArray(USERID, collecters) != -1) { collectClass = "glyphicon
	 * glyphicon-star"; }
	 */
	var pRemoveBtn = "";
	if (USERID == ownerID) {
		pRemoveBtn = "<div class='deletePostBtn'><input id='deleteID' type='hidden' value="
				+ postID
				+ " /><span class='glyphicon glyphicon-remove'></span></div>";
	}
	var postImgDiv = "<div class='post_img' id='postImg" + postID + "'>";
	var imageDiv = "";
	var imageDiv1 = "";
	var imageDiv2 = "";
	if (srcImage.length > 3) {
		$.each(srcImage, function(n, image) {
			if(n%2 == 1){
				imageDiv1 = imageDiv1
				+ "<img style='float:right;' class='postimg' width='200' height="
				+ getHeight(200, $.parseJSON(image).width, $
						.parseJSON(image).height) + " onclick='showPost("
				+ postID + ")' src='" + $.parseJSON(image).src + "'/>";
			}else{
				imageDiv2 = imageDiv2
				+ "<img style='float:left;' class='postimg' width='200' height="
				+ getHeight(200, $.parseJSON(image).width, $
						.parseJSON(image).height) + " onclick='showPost("
				+ postID + ")' src='" + $.parseJSON(image).src + "'/>";
			}
			
		});
		postImgDiv = postImgDiv + "<div class='imgLeft'>" +imageDiv1 + "</div>" +"<div class='imgRight'>" +imageDiv2 + "</div>" + "</div>";
	}else if( srcImage.length > 0 && srcImage.length <= 3){
		$.each(srcImage, function(n, image) {
			imageDiv = imageDiv
					+ "<img class='postimg' width='450' height="
					+ getHeight(450, $.parseJSON(image).width, $
							.parseJSON(image).height) + " onclick='showPost("
					+ postID + ")' src='" + $.parseJSON(image).src + "'/>";
			
		});
		postImgDiv = postImgDiv + imageDiv + "</div>";
	}else{
		postImgDiv = "";
	}
	var readmore = "";
	var contentD = content;
	if (content.length > 200) {
		readmore = "<div class='post_more"+postID+"' id='" + postID
				+ "' ><a style='cursor:pointer'>read more</a></div>";
		contentD = content.substr(0, 200) + "......";
	}
	
	var boarddiv = "<div class='post "
			+ postID
			+ "'><div class='post_body'><div class='row'><div class='col-md-2'><div class='user_img'><img class='img-circle userImg' width='50' height='50' src='"
			+ $.parseJSON(ownerImage).src
			+ "' /><input type='hidden' value='"
			+ ownerID
			+ "' name='userID'/></div></div><div class='col-md-6'><div class='user_name'><strong>"
			+ ownerNickName
			+ "</strong></div><div class='user_info'>"
			+ publishDate
			+ "</div></div><div class='col-md-4 postComm"
			+ postID
			+ "'>"
			+ pRemoveBtn
			+ "</div></div><div class='post_info'><span class='postContent' id='postContent"+postID+"'>"
			+ contentD
			+ "</span>"
			+ readmore
			+ "</div>"
			+ postImgDiv
			+ "<div class='row'></div><div class='media_comm'><div class='row addCommentBtn'><div class='col-lg-8'><div class='form-group'><input type='text' placeholder='Add a comment' class='form-control  commentTxt' id='commentText"
			+ postID
			+ "' maxLength='100' required></div></div><div class='col-lg-3'><button type='submit' class='btn btn-success' id='addComment' value="
			+ postID
			+ ">Submit</button></div><div class='col-md-1 col-lg-1-cust'><div style='cursor:pointer'><a><span id='"
			+ postID
			+ "' class='"
			+ likeClass
			+ "' style='font-size:30px'></span></a></div></div></div><div class='commentArea'>"
			+ comment + "</div></div></div></div>";
	/*
	 * <div class='post_collect' style='cursor:pointer'><a><input
	 * id='collectID' type='hidden' value=" + postID + "><span class='" +
	 * collectClass + "' style='font-size:20px'></span></a></div>
	 */
	
	$("#commentText" + postID).blur(function() {
		$(this).attr("placeholder", "add a comment");
	});
	$('.act_content').find('a').hide();
	$('.act_content').hover(function() {
		$(this).find('a').fadeIn(300);
	}, function() {
		$(this).find('a').fadeOut(300);
	});
	$('body').on("click",".post_more"+postID,function(){
		var id = $(this).attr('id');
		$("span[id='postContent" + id + "']").html(content);
		Msnry('.pro_body', '.post', 435);
		$(this).remove();
	});
	
	$('body').on("click", ".post_more"+postID, function() {
		var id = $(this).attr('id');
		if($("div[id='postImg" + id + "']").find('img').length != 0){
			$("div[id='postImg" + id + "']").find('img')[0].click();
		}
		Msnry('.pro_body', '.post', 435);
	});
	return boarddiv;
}
// function addDiv
function addPost(ownerID, ownerNickName, publishDate, content, postID, likers,
		collecters, srcImage, ownerImage) {
	var boarddiv = post(ownerID, ownerNickName, publishDate, content, postID,
			likers, collecters, srcImage, ownerImage);
	$(".share").after(boarddiv);
	$('.'+postID).find('img.userImg').userTips();
	Msnry('.pro_body', '.post', 435);

}
function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(exp,"<a target='_blank' href='$1'>$1</a>"); 
}
// function hovercommentDeleteBtn

$('.act_content').hover(function() {
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
		addPost(dataString.owner.ID, dataString.owner.attributes.name,
				dataString.publishDate, dataString.attributes.content,
				dataString.ID, dataString.likerIDs, dataString.collectorIDs,
				dataString.imageLinks, dataString.owner.attributes.avatarLink);
	});
}

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
	$(document).ready(function() {
		$('.act_content').find('a').hide();
		$('.act_content').hover(function() {

			$(this).find('a').fadeIn(300);
		}, function() {
			$(this).find('a').fadeOut(300);
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
							CancelLikePost(USERID, id);
							var inputID = $("input[value='" + id
									+ "'][id='likeID']");
							inputID.next().attr("class",
									"glyphicon glyphicon-heart-empty");
							return 0;
						}
					});
	$('body')
			.on(
					"click",
					".postCLike",
					function() {
						if ($(this).attr("class") == "glyphicon glyphicon-heart-empty postCLike") {
							LikePost(USERID, $(this).attr("id"));
							$(this).attr("class",
									"glyphicon glyphicon-heart postCLike");
						} else {
							CancelLikePost(USERID, $(this).attr("id"));
							$(this)
									.attr("class",
											"glyphicon glyphicon-heart-empty postCLike");
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
	$('body')
			.on(
					'click',
					'.activityJoin',
					function() {
						var id = $(this).find("input").attr("value");
						if ( FetchUserByID(USERID).attributes.telnum != "") {
							if ($(this).css("background-color") == "rgb(255, 255, 255)") {
								$("div[id='activity" + id + "']").css("color",
										"rgb(255, 255, 255)");
								$("div[id='activity" + id + "']").css(
										"background-color", "rgb(66,139,202)");
								$("div[id='activity" + id + "']").find('span')
										.text("Joined");
								var response = JoinActivity(USERID, id);
								if (response == 'success') {
									alert("参加成功！");
								}
								return 0;
							} else {
								$("div[id='activity" + id + "']").css("color",
										"rgb(66,139,202)");
								$("div[id='activity" + id + "']").css(
										"background-color",
										"rgb(255, 255, 255)");
								$("div[id='activity" + id + "']").find('span')
										.text("Join");
								LeaveActivity(USERID, id);
								return 0;
							}
						} else {
							$(this).attr("data-toggle", "modal");
							$(this).attr("data-target", "#telemodal");
							teleAlert(id);
						}

					});
	$('body')
			.on(
					"click",
					".teleUpload",
					function() {
						var activityID = $(this).attr("id");
						var dataString = {
							telnum : $('#tele').val()
						};
						if ($('.teleForm')[0].checkValidity()) {
							UpdateUserProfile(USERID, $.toJSON(dataString));
							$('#telemodal').modal('hide');
								$("div[id='activity" + activityID + "']").css("color",
										"rgb(255, 255, 255)");
								$("div[id='activity" + activityID + "']").css(
										"background-color", "rgb(66,139,202)");
								$("div[id='activity" + activityID + "']").find('span')
										.text("Joined");
								var response = JoinActivity(USERID, activityID);
								if (response == 'success') {
									alert("参加成功！");
								}
								$('.activityJoin').attr("data-toggle", "");
								$('.activityJoin').attr("data-target", "");
						}
					});

	// function addComment
	$('body').on('click', '#addComment', function() {

		var id = this.getAttribute("value");
		var commentID = "";
		var commentOwnerName = "";
		if (sessionStorage.getItem("commentID") != null) {
			commentID = sessionStorage.getItem("commentID");
		}
		if (sessionStorage.getItem("commentOwnerName") != null) {
			commentOwnerName = sessionStorage.getItem("commentOwnerName");
		}
		var inputComm = $("input[id='commentText" + id + "']");
		var comment = {
			attributes : {
				content : inputComm.val(),
				toCommentID : commentID,
				commentToComment : commentOwnerName,
				postID : id + ""
			}
		};
		var commentJson = $.toJSON(comment);
		if (inputComm.val() != "") {
			AddComment(USERID, id, commentJson);
			sessionStorage.setItem("commentOwnerName", "");
			sessionStorage.setItem("commentID", "");
			inputComm.val("");
		}
	});
	$('body').on('click', '.addComment2', function() {

		var id = this.getAttribute("value");
		var commentID = "";
		var commentOwnerName = "";
		if (sessionStorage.getItem("commentID") != null) {
			commentID = sessionStorage.getItem("commentID");
		}
		if (sessionStorage.getItem("commentOwnerName") != null) {
			commentOwnerName = sessionStorage.getItem("commentOwnerName");
		}
		var inputComm = $("input[id='commentText2" + id + "']");
		var comment = {
			attributes : {
				content : inputComm.val(),
				toCommentID : commentID,
				commentToComment : commentOwnerName,
				postID : id + ""
			}
		};
		var commentJson = $.toJSON(comment);
		if (inputComm.val() != "") {
			AddComment(USERID, id, commentJson);
			sessionStorage.setItem("commentOwnerName", "");
			sessionStorage.setItem("commentID", "");
			inputComm.val("");
		}

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
	$('body').on('click', '.followBtn2', function() {
		// get post owner
		var id = $(this).attr('id');
		if ($(this).text() == "Follow") {
			Follow(USERID, id);
		}
		if ($(this).text() == "Following") {
			CancelFollow(USERID, id);
			var followBtn = $("button[class='btn btn-danger followBtn2']");
			followBtn.text("Follow");
		}
	});
	$('body').on('click', '.deleteCommBtn', function() {
		var commentID = $(this).find("input").attr("value");
		var postID = $(this).find("input").attr("id");
		DeleteComment(postID, commentID);
	});

	$('body').on("click", ".editCommunity", function() {
		$('.editCommunityForm').get(0).reset();
		$('#communityName').val(community.attributes.name);
		$('#communityIntro').val(community.attributes.introduct);
	});

	$('body').on("click", "#leaveCommunityBtn", function() {
		LeaveCommunity(USERID, communityID);
	});
	$('body').on("click", "#deleteCommunityBtn", function() {
		DeleteCommunity(communityID);
	});

	$('body').on("click", "#saveCommunity", function saveCommunity() {
		var card = community.attributes.communityCard;
		if ($('#fileuploadEdit').val() != "") {
			card = FileUpload(new FormData($('.editCommunityForm')[0]))[0];
		} else {

		}
		var attributes = {
			name : $('#communityName').val(),
			introduct : $('#communityIntro').val(),
			communityCard : card
		};
		var json = $.toJSON(attributes);
		if ($('.editCommunityForm')[0].checkValidity()) {
			var c = UpdateCommunity(community.ID, json);
			$('#editCommunity').modal('hide');
			$('.cName').html(c.attributes.name);
			$('.cIntro').html(c.attributes.introduct);
			$('.communityPic').find('img').attr("src", $.parseJSON(card).src);
		}
	});

	$(document)
			.click(
					function(e) {
						var drag = $(".mentionBody"), dragel = $(".mentionBody")[0], target = e.target, arrow = $("#arrowBack")[0];
						if (dragel != target && !$.contains(dragel, target)
								&& arrow != target) {
							drag.fadeOut(300);
						}
					});
	$('body').on("click", "#editMembersBtn", function() {
		window.location.href = 'communityMember.jsp?' + community.ID;
	});
	$('body').on('click', '.deletePostBtn', function() {
		var id = $(this).find("input").attr("value");
		DeletePost(id);
	});

}

function clickOffEvent() {
	$('body').on('click', '.Btnshare', function() {
		signInAlert();
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.share_txt', function() {
		signInAlert();
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.post_like', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.postCLike', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.comment_like', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.activityJoin', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.aUB', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.ulR', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.leaveactivityJoin', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '#addComment', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '#followBtn', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '#deleteCommBtn', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '#communityCreate', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.content_join', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '#activityCreate', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.pinCommon', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.pCampus', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.pSeason', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.pMajor', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.pClass', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.inforW', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.addphotoBtn', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '#activityLike', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '#chatCreate', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('body').on('click', '.followBtn', function() {
		signInAlert();
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#myModal");
	});
	$('.aSavebtn').css("display", "none");
	$('.aEditbtn').css("display", "none");
	$('.createCom').click(function(e) {
		$(this).attr("data-toggle", "");
		alert("Sign In");
	});
	$('.share_txt').attr("readonly", "readonly");

}
function signInAlert() {
	var alert = "<div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title'>还没登陆哦</h4></div><div class='modal-body modal-custom'><a type='button' class='btn btn-primary registerA '>注册</a><a type='button' class='btn btn-primary loginA'>登录</a></div></div></div></div>";
	$('body').append(alert);
}
$('body').on('click','.registerA',function(){
	localStorage.setItem("url",window.location.href);
	window.location.href = 'register.jsp';

});
$('body').on('click','.loginA',function(){
	localStorage.setItem("url",window.location.href);
	window.location.href = 'login.jsp';

});
function teleAlert(activityID) {
	var alert = "<div class='modal fade' id='telemodal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title'>没填写电话是不能参加活动的哦，请填写电话</h4></div><div class='modal-body modal-custom'><form class='teleForm' role='form' onsubmit='return false;'><input type='text' pattern='[0-9]{11}' class='form-control' placeholder='请输入手机号码' id='tele' autocomplete='off' data-errormessage-value-missing='请输入手机号码，才能参加活动哦' data-errormessage-pattern-mismatch='请输入正确手机号码' required autofocus maxLength='11' /><button class='btn btn-lg btn-success btn-block teleUpload ' id='"
			+ activityID
			+ "' type='submit'>确认</button></form></div></div></div></div>";
	$('body').append(alert);
}
var hoverT, timer;  
(function($) {
	$.fn.userTips = function() {
		// Speed of the animations in milliseconds - 1000 =
		// 1 second.
		var animSpeed = 300;
		var tinyTip=$("");
		 
		// When we hover over the element that we want the
		// tooltip applied to
		$(this)
				.hover(
						function() {
							clearTimeout(timer);
							var pos = $(this).offset();
							var nPos = pos;
							nPos.top = pos.top + 20;
							nPos.left = pos.left + 40;
							var userid = $(this).next().val();
							hoverT = setTimeout(function(){ 
								var data = FetchUserByID(userid);
								var followTxt = "Follow";
								if ($.inArray(USERID, data.followerIDs) != -1) {
									followTxt = "Following";
								}
								if (USERID == userid) {
									followTxt = "Yourself";
								}
								sessionStorage.setItem("otherUserID", data.ID);
								var chatSpan = '<span  class="glyphicon glyphicon-comment" id="chatCreate" style="font-size:24px;color:#d7d7d7;"></span>';
								if (data.ID == USERID) {
									chatSpan = "";
								}
								if (data != "") {
									var tipFrame = '<div id="'
											+ data.ID
											+ '" class="popTip"><div class="content"><div class="urserBgShort"><img width="240" height="135" src="'
											+ $
													.parseJSON(data.attributes.profileImageLink).src
											+ '" /></div><div class="urserInfShort"><div class="userInImg"><img width="120" height="120"  src="'
											+ $
													.parseJSON(data.attributes.avatarLink).src
											+ '" /></div><p><h1><a class="tipUser">'
											+ data.attributes.name
											+ '</a></h1></p><p>'
											+ data.attributes.introduce
											+ '</p><button class="btn btn-danger" id="followBtn">'
											+ followTxt + '</button></div>'
											+ chatSpan + '</div></div>';
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
										tinyTip.fadeOut(500, function() {
											$(this).remove();
										});
									});
									var chat = '';
									$('.userInImg').after(chat);
									if (USERID != null && USERID != "") {
										$("span#chatCreate")
												.click(
														function() {
															open_chatroom(
																	USERID,
																	sessionStorage
																			.getItem("otherUserID"),
																	data.attributes.name);
														});
									}
								}
							},200);
							
						}, function() {
							clearTimeout(hoverT);
							window.timer = setTimeout(function() {
								tinyTip.fadeOut(300, function() {
									$(this).remove();
								});
							}, 500);

						});

	};
})(jQuery);

function showPost(postID) {
	var response = FetchCommentByPost(postID, "0", "20");
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
								+ "'><div class='row'><div class='col-lg-1'><img width='30' height='30' src='"
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
					});

	var dataString = FetchPostByID(postID);
	var likeClass = "glyphicon glyphicon-heart-empty";

	if ($.inArray(USERID, dataString.likerIDs) != -1) {
		likeClass = "glyphicon glyphicon-heart";
	}

	$('.act_content').find('a').hide();
	$('.act_content').hover(function() {

		$(this).find('a').fadeIn(300);
	}, function() {
		$(this).find('a').fadeOut(300);
	});
	layer
			.photos({
				html : "<div class='showPost'><div class='row'><div class='col-md-3'><div class='user_img'><img class='userImg img-circle' width='50' height='50' src='"
						+ $.parseJSON(dataString.owner.attributes.avatarLink).src
						+ "'/><input type='hidden' value='"
						+ dataString.owner.ID
						+ "' name='userID'/></div></div><div class='col-md-8'><div class='user_name'><strong>"
						+ dataString.owner.attributes.name
						+ "</strong></div><div class='user_info'>"
						+ dataString.publishDate
						+ "</div></div></div><div class='post_info'><span class='postContent'>"
						+ '<pre>' + dataString.attributes.content + '</pre>'
						+ "</span></div><div class='row'><div class='col-md-6'><div class='post_like' style='cursor:pointer'><a><p id='ownerID' style='display:none;' value="
						+ dataString.owner.ID
						+ "></p><input id='likeID' type='hidden' value="
						+ postID
						+ ">"
						+ "<span id='likeShow' class='"
						+ likeClass
						+ "' style='font-size:20px'>"
						+ dataString.likerIDs.length
						+ "</span></a></div></div></div><div class='media_comm'><div class='row addCommentBtn'><div class='col-lg-8'><div class='form-group'><input type='text' placeholder='Add a comment' class='form-control  commentTxt2' id='commentText2"
						+ postID
						+ "' maxLength='100'></div></div><div class='col-lg-4'><button type='submit' class='btn btn-success addComment2' id='addComment' value="
						+ postID
						+ ">Submit</button></div></div>"
						+ comment
						+ "</div></div>",
				page : {
					parent : '#postImg' + postID,
					title : '',
					start : 0
				}
			});
}
// funtion sessionID
$('body').on("click", ".showHref", function() {
	window.location.href = 'communityShow.jsp?' + community.ID;
});
$('body').on("click", ".activityHref", function() {
	window.location.href = 'activityCommunity.jsp?' + community.ID;
});
$('body').on("click", ".memberHref", function() {
	window.location.href = 'communityMember.jsp?' + community.ID;
});
$('body').on("click", ".ownerHref", function() {
	window.location.href = 'communityOwnerPage.jsp?' + community.ID;
});
$('body').on(
		"click",
		".tipUser",
		function() {
			window.location.href = 'profile.jsp?nav=post&'
					+ sessionStorage.getItem("otherUserID");
		});

var hoverTimer, outTimer; 
$(".home-nav").hover(function(){
	clearTimeout(outTimer);
	hoverTimer = setTimeout(function(){  
		$(".home-nav").animate({height:"100px"});
		 $('.show-bar').css("display","inline-block");
	} ,500);
	 
},function(){
	clearTimeout(hoverTimer);
	outTimer = setTimeout(function(){ 
		$(".home-nav").animate({height:"50px"});
		 $('.show-bar').css("display","none");
	},300);
});
$('body').on('click', '.communityO', function() {
	window.location.href = "community.jsp?nav=official";
});
$('body').on('click', '.communityD', function() {
	window.location.href = "community.jsp?nav=discovery";
});
$('body').on('click', '.applyCommunity', function() {
	window.location.href = "applyCommunity.jsp";
});
$('body').on('click', '.activityA', function() {
	window.location.href = "activity.jsp?nav=discovery";
});
$('body').on('click', '.activityC', function() {
	window.location.href = "circle.jsp";
});
$('body').on('click', '.hrefIntro', function() {
	window.location.href = "aboutUs.jsp";
});
/**
 * auto_resize
 */
function auto_resize(maxWidth, maxHeight, srcImage) {
	var image = new Image();
	image.src = srcImage.src;
	if (image.width > maxWidth && image.height <= maxHeight) {
		image.width = maxWidth;
		image.height = (maxHeight / maxWidth) * image.width;
	} else if (image.height > maxHeight && image.width <= maxWidth) {
		image.height = maxHeight;
		image.width = (maxWidth / maxHeight) * image.height;
	} else if (image.height > maxHeight && image.width > maxWidth) {
		var intervalWidth = image.width - maxWidth;
		var intervalHeight = image.height - maxHeight;
		if (intervalWidth >= intervalHeight) {
			image.width = maxWidth;
			image.height = (maxHeight / maxWidth) * image.width;
		} else {
			image.height = maxHeight;
			image.width = (maxWidth / maxHeight) * image.height;
		}
	}

	srcImage.width = image.width;
	srcImage.height = image.height;
	$(srcImage).fadeIn("fast");
}
function getHeight(width, orgiginnalWidth, originalHeight) {
	newHeight = (width / orgiginnalWidth) * originalHeight;
	return newHeight;
}
function fixed_width_auto_resize(width, srcImage) {
	var image = new Image();
	image.src = srcImage.src;
	var originalWidth = srcImage.width;
	var originalHeight = srcImage.height;
	srcImage.width = width;
	srcImage.height = (width / originalWidth) * originalHeight;
	$(srcImage).fadeIn("fast");
}

