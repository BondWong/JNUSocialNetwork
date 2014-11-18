photosfileDri = [];
// funtion fileupload
$('#fileuploadPhoto')
		.fileupload({
			url : '../../app/fileUploader',
			beforeSend : function(request) {
				request.setRequestHeader("ID", USERID);
			},
			success : function(data) {
				for (var i = 0; i < data.length; i++) {
					var dataString = data[i];
					photosfileDri.push(encodeURIComponent(dataString));
				}
			},
			acceptFileTypes : /(\.|\/)(gif|jpe?g|png)$/i,
			maxFileSize : 5000000
		// 5 MB
		})
		.on(
				'fileuploadadd',
				function(e, data) {
					data.context = $('<div/>').appendTo('#files').addClass(
							'myfileItem');
					$.each(data.files, function(index, file) {
						var node = $('<p/>').append(
								$('<span/>').text(file.name));
						if (!index) {
							node.append('<br>');
						}
						node.appendTo(data.context);
					});
				})
		.on(
				'fileuploadprocessalways',
				function(e, data) {
					var index = data.index, file = data.files[index], node = $(data.context
							.children()[index]);
					if (file.preview) {
						node.prepend('<br>').prepend(file.preview);
					}
					if (file.error) {
						node.append('<br>').append(
								$('<span class="text-danger"/>').text(
										file.error));
					}
					if (index + 1 === data.files.length) {
						data.context.find('button').text('Upload').prop(
								'disabled', !!data.files.error);
					}
				}).on('fileuploadprogressall', function(e, data) {
			$('#progress .progress-bar').css('width', '0%');
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#progress .progress-bar').css('width', progress + '%');
		}).on(
				'fileuploadfail',
				function(e, data) {
					$.each(data.files, function(index, file) {
						var error = $('<span class="text-danger"/>').text(
								'File upload failed.');
						$(data.context.children()[index]).append('<br>')
								.append(error);
					});
				}).prop('disabled', !$.support.fileInput).parent().addClass(
				$.support.fileInput ? undefined : 'disabled');
// function showActivityDetail
function showActivityDetail(activity, community) {
	if (activity.attributes.ifUpload == "默认方式") {
		$('#download-name-list-button').attr(
				"href",
				"../app/fileDownloader?type=ACTIVITYNAMELIST&version=2007+&activityID="
						+ activity.ID);
	} else {
		$('#download-name-list-button').attr(
				"href",
				"../app/fileDownloader?type=ACTIVITYREGISTERS&activityID="
						+ activity.ID);
		/*
		 * $('.joinSActivity') .replaceWith( "<div class='aUB'><a
		 * href='../../app/fileDownloader?type=REGISTERFORM&activityID=" +
		 * activity.ID + "' class='btn btn-default dlR' id='" + activity.ID +
		 * "'>下载报名表</a><a class='btn btn-default ulR' id='" + activity.ID +
		 * "'>上传报名表</a></div>");
		 */
	}

	$('.activityShowName').html(activity.attributes.activityName);
	$('.aT').html(activity.attributes.activityTime);
	$('.aI').html(activity.attributes.inquery);
	$('.aA').html("&nbsp;" + activity.attributes.activityAddr);
	$('.activityShowD').html(
			"<pre>" + "&nbsp;" + activity.attributes.activityMore + "</pre>");
	var imagelink = activity.attributes.background;
	$('.activityPh').find('img').attr("src",
			$.parseJSON(imagelink.split(",{")[0]).src);
	$('#addComment').attr("value", activity.ID);
	$('.acBtn').attr("id", "commentText" + activity.ID);
	$('.communityName').html(community.attributes.name);
	if (activity.participantIDs.length != 0) {
		$('.communityNum').html(
				activity.participantIDs.length + "&nbsp个小伙伴参加了这个活动");
	}
	var comments = FetchCommentByPost(activity.ID, "0", "5");
	var comment = "";
	$
			.each(
					comments,
					function(index, jsonComment) {
						var atComment = "";
						if (jsonComment.attributes.commentToComment != "") {
							atComment = "@"
									+ jsonComment.attributes.commentToComment;
						}
						var commentReply = "<div class='comment_reply replyaComment' id="
								+ activity.ID
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
						comment = comment
								+ "<div class='aBodyComment' id='commentTxt"
								+ jsonComment.ID
								+ "'><div class='aCommentItem'><div class='col-lg-2 col-lg-2-cust'><img class='img-circle userImg' width='50' width='50'  src='"
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
								+ "&nbsp;<pre>"
								+ replaceURLWithHTMLLinks(jsonComment.attributes.content)
								+ "</pre></div></div></div>";
						$("#commentText" + jsonComment.attributes.postID).blur(
								function() {
									$(this)
											.attr("placeholder",
													"add a comment");
								});
						$('.aBodyComment').find('a').hide();
						$('.aBodyComment').hover(function() {

							$(this).find('a').fadeIn(300);
						}, function() {
							$(this).find('a').fadeOut(300);
						});
					});
	$(".commentBtn").after(comment);
	$('.communityBS').find('img').attr("src",
			$.parseJSON(community.attributes.communityCard).src);
	$('.addcommunityA').attr("id", community.ID);
	if ($.inArray(USERID, activity.participantIDs) != -1) {
		$('.joinSActivity').css("color", "rgb(255, 255, 255)");
		$('.joinSActivity').css("background-color", "rgb(66,139,202)");
		$('.joinSActivity').text("已经参加");
	}
	var memberIDs = [];
	$.each(community.members, function(n, member) {
		memberIDs.push(member.ID);
	});
	if (USERID != null
			&& USERID != ""
			&& $.parseJSON(sessionStorage.getItem("user")).userType != 'COMMUNITYOWNER'
			&& $.inArray(USERID, memberIDs) == -1) {
		$('.activityAddCommunity').css("display", "inline");
	}
}
$('body')
		.on(
				"click",
				".ulR",
				function() {
					var teleAlert = "";
					if ($.parseJSON(sessionStorage.getItem("user")).attributes.telnum == "") {
						teleAlert = "<div class='uploadItem'><span>电话号码：</span><input type='text' pattern='[0-9]{11}' style='margin-bottom:20px;width:80%;' class='form-control' placeholder='个人资料未填写手机号码，请输入手机号码' id='tele' autocomplete='off' data-errormessage-value-missing='请输入手机号码，才能参加活动哦' data-errormessage-pattern-mismatch='请输入正确手机号码' required autofocus maxLength='11' /></div>";
					}
					$(this).attr("data-toggle", "modal");
					$(this).attr("data-target", "#uploadmodal");
					var board = "<div class='modal fade' id='uploadmodal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title'>上传报名表</h4></div><form class='uploadForm' role='form' onsubmit='return false;'><div class='modal-body'>"
							+ teleAlert
							+ "<div class='uploadItem'><span>报名表：</span><input class='uploadexe' type='file' name='file'/></div><p style='margin-top:20px;margin-left:14px;'>[注意：请先下载报名表，填写并上传，其他文件报名不成功！]</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>取消</button><button type='submit' class='btn btn-primary' id='ulFile' value='upload'>上传</button></div></form></div></div></div>";
					$('body').append(board);
				});
$('body')
		.on(
				'click',
				'#ulFile',
				function() {
					if ($('.uploadForm')[0].checkValidity()
							&& $('.uploadexe').val() != "") {
						if ($('.tele').val() != "") {
							var dataString = {
								telnum : $('#tele').val()
							};
							UpdateUserProfile(USERID, $.toJSON(dataString));
						}
						var response = formUpload(new FormData(
								$('.uploadForm')[0]), $('.ulR').attr('id'),
								encodeURI($.parseJSON(sessionStorage
										.getItem("user")).attributes.name));
						JoinActivity(USERID, $('.ulR').attr('id'));
						$('#uploadmodal').modal('hide');
						if (response == 'success') {
							alert("参加成功！");
						}
					}
				});
$('body').on('click', '.joinSActivity', function() {
	if (FetchUserByID(USERID).attributes.telnum != "") {
		if ($(this).css("background-color") == "rgb(230, 230, 230)") {
			$(this).css("color", "rgb(255, 255, 255)");
			$(this).css("background-color", "rgb(66,139,202)");
			$(this).text("已经参加");
			var response = JoinActivity(USERID, activity.ID);
			if (response == 'success') {
				alert("参加成功！");
			}
			return 0;
		} else {
			$(this).css("color", "rgb(51,51,51)");
			$(this).css("background-color", "rgb(230, 230, 230)");
			$(this).text("参加活动");
			LeaveActivity(USERID, activity.ID);
			return 0;
		}
	} else {
		$(this).attr("data-toggle", "modal");
		$(this).attr("data-target", "#telemodal");
		teleAlert2(activity.ID);
	}

});
$('body').on("click", ".teleUpload2", function() {
	var dataString = {
		telnum : $('#tele').val()
	};
	if ($('.teleForm')[0].checkValidity()) {
		UpdateUserProfile(USERID, $.toJSON(dataString));
		var response = JoinActivity(USERID, activity.ID);
		if (response == 'success') {
			alert("参加成功！");
		}
		$('.joinSActivity').css("color", "rgb(255, 255, 255)");
		$('.joinSActivity').css("background-color", "rgb(66,139,202)");
		$('.joinSActivity').text("已经参加");
		$('#telemodal').modal('hide');
		$('.joinSActivity').attr("data-toggle", "");
		$('.joinSActivity').attr("data-target", "");
		return 0;
	}
});

function teleAlert2(activityID) {
	var alert = "<div class='modal fade' id='telemodal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title'>没填写电话是不能参加活动的哦，请填写电话</h4></div><div class='modal-body modal-custom'><form class='teleForm' role='form' onsubmit='return false;'><input type='text' pattern='[0-9]{11}' class='form-control' placeholder='请输入手机号码' id='tele' autocomplete='off' data-errormessage-value-missing='请输入手机号码，才能参加活动哦' data-errormessage-pattern-mismatch='请输入正确手机号码' required autofocus maxLength='11' /><button class='btn btn-lg btn-success btn-block teleUpload2 ' id='"
			+ activityID
			+ "' type='submit'>确认</button></form></div></div></div></div>";
	$('body').append(alert);
}
$('body').on("click", ".activityAddCommunity", function() {
	JoinCommunity(USERID, community.ID);
	$(this).fadeOut("300");
});
$('body').on("click", ".glyphicon-heart", function() {
	CancelLikePost(USERID, activity.ID);
	$('.glyphicon-heart').attr("class", "glyphicon glyphicon-heart-empty");
});
$('body').on("click", ".backActivity", function() {
	window.location.href = "communityShow.jsp?" + community.ID;
});
$('body').on("click", ".backActivityA", function() {
	window.location.href = "activity.jsp?nav=discovery";
});
$('body').on("click", ".editActivity", function() {
	$('#activityName').val(activity.attributes.activityName);
	$('#activityTime').val(activity.attributes.activityTime);
	if (activity.attributes.ifUpload != "无需报名") {
		$('#activityRemind').val(activity.attributes.activityRemindTime);
	} else {
		$('#activityRemind').remove();
	}
	$('#activityAddr').val(activity.attributes.activityAddr);
	$('#activityMore').val(activity.attributes.activityMore);
	$('#activityNum').val(activity.attributes.limitation);
	$('#inquery').val(activity.attributes.inquery);
	dataPicker();
});

$('body')
		.on(
				"click",
				".addActivityPhoto",
				function() {
					AddActivityImages(activity.ID, photosfileDri);
					$('#addActivityPhoto').modal('hide');
					$
							.each(
									photosfileDri,
									function(index, imageLink) {
										var photoContainer = "<img width='600' height='450' src='"
												+ $
														.parseJSON(decodeURIComponent(imageLink)).src
												+ "' />";
										$('.carousel-inner')
												.append(
														"<div class='item'>"
																+ "<div class='deleteAI'><span class='glyphicon glyphicon-remove'></span></div>"
																+ photoContainer
																+ "</div>");
									});
					photosfileDri = [];
					window.location.href = "activityShow.jsp?" + community.ID
							+ "&" + activity.ID;
				});
$('body')
		.on(
				'click',
				'.deleteAI',
				function() {
					if (DeleteAI(activity.ID, $(this).next().attr("src")) == "success") {
						window.location.href = "activityShow.jsp?"
								+ community.ID + "&" + activity.ID;
					}
				});
// showJoinMembers
function showJoinMembers() {
	var response = FetchParticipants(activity.ID, "0", "30");
	$.each(response, function(index, aMember) {
		if (aMember.available == true) {
			var memberDiv = addMember(aMember.ID,
					aMember.attributes.avatarLink, aMember.attributes.name);
			$('.activity-bords').after(memberDiv);
			Msnry('.activity-members', '.member', 215);
		}
	});
}
// user的html代码
function addMember(id, avatarLink, name) {
	var followDiv = "<div class='aMember' id='"
			+ id
			+ "'><img width='50' height='50'  class='userMember' src='"
			+ $.parseJSON(avatarLink).src
			+ "' /><span class='followName'><a style='cursor:pointer;color:#404040'>"
			+ name + "</a></span><input type='hidden' value='" + id
			+ "' name='userID'/></div>";
	return followDiv;
}
$('body').on("click", ".followName", function() {
	window.location.href = 'profile.jsp?nav=about&' + $(this).next().val();
});

function showImages() {
	if (activity.imageLinks.length == 0) {
		$('.activityPhotos').css("display", "none");
	} else {
		var pRemoveBtn = "";
		if (USERID == activity.owner.ID) {
			pRemoveBtn = "<div class='deleteAI'><span style='color:#000;' class='glyphicon glyphicon-remove'></span></div>";
		}
		$.each(activity.imageLinks, function(index, imageLink) {
			if (index == 0) {
				var photoContainer = "<img width='600' height='450' src='"
						+ $.parseJSON(decodeURIComponent(imageLink)).src
						+ "' />";
				$('.carousel-inner').append(
						"<div class='item active'>" + pRemoveBtn
								+ photoContainer + "</div>");
			} else {
				var photoContainer = "<img width='600' height='450' src='"
						+ $.parseJSON(decodeURIComponent(imageLink)).src
						+ "' />";
				$('.carousel-inner').append(
						"<div class='item'>" + pRemoveBtn + photoContainer
								+ "</div>");
			}
		});
	}
}
var banner2;
$(function() {
	banner2 = new CropBanner($("#editActivity"), {
		aspectRatio : 3.8,
		imgPreferredSize : 5
	});
});

$('body')
		.on(
				"click",
				"#saveActivity",
				function() {
					banner2.submit();
					var attributes = "";
					if (activity.attributes.ifUpload != "无需报名") {
						if ($('#activityTime').val() != ""
								&& $('#activityRemind').val() != "") {
							if ($('#fileupload').val() != "") {
								attributes = {
									activityName : $('#activityName').val(),
									startDate : toTimeValue($('#activityTime')
											.val()
											+ "")
											+ "",
									remindDate : toTimeValue($(
											'#activityRemind').val()
											+ "")
											+ "",
									activityTime : $('#activityTime').val(),
									activityRemindTime : $('#activityRemind')
											.val(),
									activityAddr : $('#activityAddr').val(),
									activityMore : $('#activityMore').val(),
									limitation : $('#activityNum').val(),
									inquery : $('#inquery').val(),
									background : (function() {
										var target = $(".activityForm .banner-src");
										var result = target.val();
										return result;
									}())
								};
							} else {
								attributes = {
									activityName : $('#activityName').val(),
									startDate : toTimeValue($('#activityTime')
											.val()
											+ "")
											+ "",
									remindDate : toTimeValue($(
											'#activityRemind').val()
											+ "")
											+ "",
									activityTime : $('#activityTime').val(),
									activityRemindTime : $('#activityRemind')
											.val(),
									activityAddr : $('#activityAddr').val(),
									activityMore : $('#activityMore').val(),
									limitation : $('#activityNum').val(),
									inquery : $('#inquery').val()
								};
							}

							var diffDate = toTimeValue($('#activityTime').val()
									+ "")
									- toTimeValue($('#activityRemind').val()
											+ "");
							if ($('.activityForm')[0].checkValidity()) {
								if (diffDate > 0.021 * 24 * 60 * 60 * 1000) {
									var json = $.toJSON(attributes);
									var aup = UpdateActivity(activity.ID, json);
									$('.banner-wrapper').css("display", "none");
									$('#editActivity').modal('hide');
									$('.activityShowName').html(
											aup.attributes.activityName);
									$('.aT')
											.html(
													"&nbsp;"
															+ aup.attributes.activityTime);
									$('.aA')
											.html(
													"&nbsp;"
															+ aup.attributes.activityAddr);
									$('.activityShowD')
											.html(
													"&nbsp;"
															+ aup.attributes.activityMore);
									$('.aA').html(
											"&nbsp;" + aup.attributes.inquery);
									$('.activityHead')
											.find('img')
											.attr(
													"src",
													$
															.parseJSON(aup.attributes.background).src);
								} else {
									$('#fail_popover2').fadeIn("fast");
									setTimeout(
											'$("#fail_popover2").fadeOut("slow")',
											3000);
								}
							}
						} else {
							$('#fail_popover').fadeIn("fast");
							setTimeout('$("#fail_popover").fadeOut("slow")',
									3000);
						}
					} else {
						if ($('#activityTime').val() != ""
								&& $('#activityRemind').val() != "") {
							if ($('#fileupload').val() != "") {
								attributes = {
									activityName : $('#activityName').val(),
									startDate : toTimeValue($('#activityTime')
											.val()
											+ "")
											+ "",
									remindDate : "0",
									activityTime : $('#activityTime').val(),
									activityRemindTime : "0",
									activityAddr : $('#activityAddr').val(),
									activityMore : $('#activityMore').val(),
									limitation : $('#activityNum').val(),
									inquery : $('#inquery').val(),
									background : (function() {
										var target = $(".activityForm .banner-src");
										var result = target.val();
										return result;
									}())
								};
							} else {
								attributes = {
									activityName : $('#activityName').val(),
									startDate : toTimeValue($('#activityTime')
											.val()
											+ "")
											+ "",
									remindDate : "0",
									activityTime : $('#activityTime').val(),
									activityRemindTime : "0",
									activityAddr : $('#activityAddr').val(),
									activityMore : $('#activityMore').val(),
									limitation : $('#activityNum').val(),
									inquery : $('#inquery').val()
								};
							}
							if ($('.activityForm')[0].checkValidity()) {
								var json = $.toJSON(attributes);
								var aup = UpdateActivity(activity.ID, json);
								$('.banner-wrapper').css("display", "none");
								$('#editActivity').modal('hide');
								$('.activityShowName').html(
										aup.attributes.activityName);
								$('.aT').html(
										"&nbsp;" + aup.attributes.activityTime);
								$('.aA').html(
										"&nbsp;" + aup.attributes.activityAddr);
								$('.activityShowD').html(
										"&nbsp;" + aup.attributes.activityMore);
								$('.aA')
										.html("&nbsp;" + aup.attributes.inquery);
								$('.activityHead')
										.find('img')
										.attr(
												"src",
												$
														.parseJSON(aup.attributes.background).src);
							}
						} else {
							$('#fail_popover').fadeIn("fast");
							setTimeout('$("#fail_popover").fadeOut("slow")',
									3000);
						}
					}

				});

function dataPicker() {
	var date1 = new Date();
	date1.setTime(date1.getTime() + 0.25 * 24 * 60 * 60 * 1000);
	$('.form_datetime1').datetimepicker({
		format : "MM dd,yyyy - hh:ii",
		startDate : date1,
		todayBtn : 0,
		autoclose : 1,
		startView : 2,
		Integer : 1,
		forceParse : 0,
		showMeridian : 1,
		pickerPosition : "bottom-left"
	});
	var date2 = new Date();
	date2.setTime(date2.getTime());
	$('.form_datetime2').datetimepicker({
		format : "MM dd,yyyy - hh:ii",
		startDate : date2,
		todayBtn : 0,
		autoclose : 1,
		startView : 2,
		Integer : 1,
		forceParse : 0,
		showMeridian : 1,
		pickerPosition : "bottom-left"
	});
}

function toTimeValue(dateTime) {
	var patt = /([a-zA-Z]{3,9})\s(\d{2}),(\d{4})\s-\s(\d{2}):(\d{2})/;
	var matchers = patt.exec(dateTime);
	var month = "NaN";
	switch (matchers[1]) {
	case "January":
		month = 0;
		break;
	case "February":
		month = 1;
		break;
	case "March":
		month = 2;
		break;
	case "April":
		month = 3;
		break;
	case "May":
		month = 4;
		break;
	case "June":
		month = 5;
		break;
	case "July":
		month = 6;
		break;
	case "August":
		month = 7;
		break;
	case "September":
		month = 8;
		break;
	case "October":
		month = 9;
		break;
	case "November":
		month = 10;
		break;
	case "December":
		month = 11;
		break;
	}
	var d = new Date(matchers[3], month, matchers[2], matchers[4], matchers[5],
			0, 0);
	return d.valueOf();
};

// inviteFriends modal
var selectedFriendNumber = 0;
var maxInviteNumber = 5;
var friendList = new Array();
var selectedIndexs = new Array();
var easingtime = 200;
$('#inviteFriendsButton')
		.click(
				function() {
					$('#invite_friends_modal_contener')
							.css(
									{
										'background' : 'url("images/loading.gif") no-repeat center'
									});
					if (friendList.length == 0) {
						$
								.ajax({
									url : '/app/user/fetchFolloweesWithEmail/'
											+ USERID
											+ '/'
											+ 0
											+ '/'
											+ $.parseJSON(sessionStorage
													.getItem("user")).followeeWithEmailIDs.length,
									dataType : 'json',
									type : 'GET',
									success : function(data) {
										for (var i = 0; i < data.length; i++) {
											friendList.push(data[i]);
										}
										init();
									}
								});
					} else {
						$('#invite_friends_modal_contener').css({
							'background' : 'none'
						});
					}
				});
function init() {
	selectedFriendNumber = 0;
	selectedIndexs = [];
	for (var i = 0; i < friendList.length; i++) {
		selectedIndexs.push(false);
	}
	$('#invite_friends_modal_contener').empty();
	$('#invite_friends_modal_contener').css({
		'background' : 'none'
	});
	if (friendList.length == 0) {
		var alertbox = $('<div class="alert alert-info" style="width: 81%;height:70px; margin-left: 80px; text-align: center; padding-top: 25px;margin-top:150px">你还没有任何小伙伴哦！</div>');
		alertbox.appendTo($('#invite_friends_modal_contener'));
	} else {
		var page1size = friendList.length > 6 ? 6 : friendList.length;
		for (var i = 0; i < page1size; i++) {
			var friendbox = $("<div data="
					+ i
					+ " class='friendbox' active='false'><div data="
					+ i
					+ " class='head'><img data="
					+ i
					+ " src='"
					+ friendList[i].attributes.avatarLink
							.substr(8, friendList[i].attributes.avatarLink
									.indexOf(',') - 9) + "'/></div><div data="
					+ i + " class='name'>" + friendList[i].attributes.name
					+ "</div></div>");
			if (selectedIndexs[i]) {
				friendbox.css({
					backgroundColor : '#3071a9',
					color : '#ffffff'
				});
				friendbox.attr('active', 'true');
			}
			friendbox.appendTo($('#invite_friends_modal_contener'));
		}

		$('.friendbox').click(
				function(event) {
					var data = event.target.getAttribute('data');
					var target = $(".friendbox[data='" + data + "']");
					if (target.attr('active') == 'false') {
						if (selectedFriendNumber == maxInviteNumber) {
							$('#max_invite_friends_alert').fadeIn(easingtime)
									.delay(2000).fadeOut(easingtime);
							return;
						}
						target.animate({
							backgroundColor : '#3071a9',
							color : '#ffffff'
						}, easingtime);
						target.attr('active', 'true');
						selectedFriendNumber++;
						selectedIndexs[data] = true;
					} else {
						target.animate({
							backgroundColor : '#ffffff',
							color : '#000000'
						}, easingtime);
						target.attr('active', 'false');
						selectedFriendNumber--;
						selectedIndexs[data] = false;
					}

				});

		var pageNum = Math
				.ceil($.parseJSON(sessionStorage.getItem("user")).followeeWithEmailIDs.length / 6);
		var pageCurrent = 1;
		function pageRun(index) {
			if (index == pageCurrent) {
				return;
			}
			$('#pagerOfInviteFriends li:gt(0)').removeClass('active');
			$('#pagerOfInviteFriends li:eq(' + index + ')').addClass('active');

			var pagensize = friendList.length - (index - 1) * 6 > 6 ? 6
					: friendList.length - (index - 1) * 6;
			$('#invite_friends_modal_contener')
					.animate(
							{
								opacity : '0'
							},
							easingtime,
							function() {
								$('#invite_friends_modal_contener').empty();
								for (var i = (index - 1) * 6; i < (index - 1)
										* 6 + pagensize; i++) {
									var friendbox = $("<div data="
											+ i
											+ " class='friendbox' active='false'><div data="
											+ i
											+ " class='head'><img data="
											+ i
											+ " src='"
											+ friendList[i].attributes.avatarLink
													.substr(
															8,
															friendList[i].attributes.avatarLink
																	.indexOf(',') - 9)
											+ "'/></div><div data=" + i
											+ " class='name'>"
											+ friendList[i].attributes.name
											+ "</div></div>");
									if (selectedIndexs[i]) {
										friendbox.css({
											backgroundColor : '#3071a9',
											color : '#ffffff'
										});
										friendbox.attr('active', 'true');
									}
									friendbox
											.appendTo($('#invite_friends_modal_contener'));
								}
								$('.friendbox')
										.click(
												function(event) {
													var data = event.target
															.getAttribute('data');
													var target = $(".friendbox[data='"
															+ data + "']");
													if (target.attr('active') == 'false') {
														if (selectedFriendNumber == maxInviteNumber) {
															$(
																	'#max_invite_friends_alert')
																	.fadeIn(
																			easingtime)
																	.delay(2000)
																	.fadeOut(
																			easingtime);
															return;
														}
														target
																.animate(
																		{
																			backgroundColor : '#3071a9',
																			color : '#ffffff'
																		},
																		easingtime);
														target.attr('active',
																'true');
														selectedFriendNumber++;
														selectedIndexs[data] = true;
													} else {
														target
																.animate(
																		{
																			backgroundColor : '#ffffff',
																			color : '#000000'
																		},
																		easingtime);
														target.attr('active',
																'false');
														selectedFriendNumber--;
														selectedIndexs[data] = false;
													}

												});
							});
			$('#invite_friends_modal_contener').animate({
				opacity : '1'
			}, easingtime);
			pageCurrent = index;
		}
		;
		$('#pagination-demo').twbsPagination({
			totalPages : pageNum,
			visiblePages : pageNum > 7 ? 7 : pageNum,
			version : '1.1',
			onPageClick : function(event, page) {
				 pageRun(page);
			}
		});
		
	}
	$('#sendInvite')
			.click(
					function() {
						var url = window.location.search;
						var activityID = url.substr(url.indexOf("&") + 1);

						$
								.ajax({
									url : '../../app/user/canSendInvitation/'
											+ USERID + '/' + activityID,
									dataType : 'json',
									type : 'GET',
									error : function(XMLHttpRequest,
											textStatus, errorThrown) {
										if (XMLHttpRequest.status != 200) {
											$('#cannot_invite_friends_alert')
													.fadeIn(easingtime).delay(
															2000).fadeOut(
															easingtime);
										} else {
											var emails = new Array();
											for (var i = 0; i < friendList.length; i++) {
												if (selectedIndexs[i]) {
													emails
															.push(friendList[i].attributes.email);
												}
											}
											emails = $.toJSON(emails);
											//console.log(emails);
											$
													.ajax({
														type : 'POST',
														url : '../../app/user/sendInvitation/'
																+ USERID
																+ '/'
																+ activityID,
														dataType : 'json',
														contentType : "application/json",
														data : emails,
														success : function(data) {
															console.log('good');
														}
													});
											$('#success_invite_friends_alert').fadeIn(easingtime)
											.delay(1500).fadeOut(easingtime,function(){
												$('#inviteFriends').modal('hide');
											})

										}
									}
								});

					});
}

// color-changer
(function(d) {
	d
			.each(
					[ "backgroundColor", "borderBottomColor",
							"borderLeftColor", "borderRightColor",
							"borderTopColor", "color", "outlineColor" ],
					function(f, e) {
						d.fx.step[e] = function(g) {
							if (!g.colorInit) {
								g.start = c(g.elem, e);
								g.end = b(g.end);
								g.colorInit = true
							}
							g.elem.style[e] = "rgb("
									+ [
											Math
													.max(
															Math
																	.min(
																			parseInt((g.pos * (g.end[0] - g.start[0]))
																					+ g.start[0]),
																			255),
															0),
											Math
													.max(
															Math
																	.min(
																			parseInt((g.pos * (g.end[1] - g.start[1]))
																					+ g.start[1]),
																			255),
															0),
											Math
													.max(
															Math
																	.min(
																			parseInt((g.pos * (g.end[2] - g.start[2]))
																					+ g.start[2]),
																			255),
															0) ].join(",")
									+ ")"
						}
					});

	function b(f) {
		var e;
		if (f && f.constructor == Array && f.length == 3) {
			return f
		}
		if (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/
				.exec(f)) {
			return [ parseInt(e[1]), parseInt(e[2]), parseInt(e[3]) ]
		}
		if (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/
				.exec(f)) {
			return [ parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55,
					parseFloat(e[3]) * 2.55 ]
		}
		if (e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) {
			return [ parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16) ]
		}
		if (e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) {
			return [ parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16),
					parseInt(e[3] + e[3], 16) ]
		}
		if (e = /rgba\(0, 0, 0, 0\)/.exec(f)) {
			return a.transparent
		}
		return a[d.trim(f).toLowerCase()]
	}
	function c(g, e) {
		var f;
		do {
			f = d.css(g, e);
			if (f != "" && f != "transparent" || d.nodeName(g, "body")) {
				break
			}
			e = "backgroundColor"
		} while (g = g.parentNode);
		return b(f)
	}
	var a = {
		aqua : [ 0, 255, 255 ],
		azure : [ 240, 255, 255 ],
		beige : [ 245, 245, 220 ],
		black : [ 0, 0, 0 ],
		blue : [ 0, 0, 255 ],
		brown : [ 165, 42, 42 ],
		cyan : [ 0, 255, 255 ],
		darkblue : [ 0, 0, 139 ],
		darkcyan : [ 0, 139, 139 ],
		darkgrey : [ 169, 169, 169 ],
		darkgreen : [ 0, 100, 0 ],
		darkkhaki : [ 189, 183, 107 ],
		darkmagenta : [ 139, 0, 139 ],
		darkolivegreen : [ 85, 107, 47 ],
		darkorange : [ 255, 140, 0 ],
		darkorchid : [ 153, 50, 204 ],
		darkred : [ 139, 0, 0 ],
		darksalmon : [ 233, 150, 122 ],
		darkviolet : [ 148, 0, 211 ],
		fuchsia : [ 255, 0, 255 ],
		gold : [ 255, 215, 0 ],
		green : [ 0, 128, 0 ],
		indigo : [ 75, 0, 130 ],
		khaki : [ 240, 230, 140 ],
		lightblue : [ 173, 216, 230 ],
		lightcyan : [ 224, 255, 255 ],
		lightgreen : [ 144, 238, 144 ],
		lightgrey : [ 211, 211, 211 ],
		lightpink : [ 255, 182, 193 ],
		lightyellow : [ 255, 255, 224 ],
		lime : [ 0, 255, 0 ],
		magenta : [ 255, 0, 255 ],
		maroon : [ 128, 0, 0 ],
		navy : [ 0, 0, 128 ],
		olive : [ 128, 128, 0 ],
		orange : [ 255, 165, 0 ],
		pink : [ 255, 192, 203 ],
		purple : [ 128, 0, 128 ],
		violet : [ 128, 0, 128 ],
		red : [ 255, 0, 0 ],
		silver : [ 192, 192, 192 ],
		white : [ 255, 255, 255 ],
		yellow : [ 255, 255, 0 ],
		transparent : [ 255, 255, 255 ]
	}
})(jQuery);

// pager
(function($, window, document, undefined) {

	'use strict';

	var old = $.fn.twbsPagination;

	// PROTOTYPE AND CONSTRUCTOR

	var TwbsPagination = function(element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.twbsPagination.defaults, options);
		this.init(this.options);
	};

	TwbsPagination.prototype = {

		constructor : TwbsPagination,

		init : function(options) {
			this.options = $.extend({}, this.options, options);

			switch (this.options.version) {
			case '1.0':
				this.currentPages = this.getPages_v_1_0(this.options.startPage);
				break;
			case '1.1':
				this.currentPages = this.getPages_v_1_1(this.options.startPage);
				break;
			default:
				this.currentPages = this.getPages_v_1_1(this.options.startPage);
				break;
			}

			if (this.options.startPage < 1
					|| this.options.startPage > this.options.totalPages) {
				throw new Error('Start page option is incorrect');
			}

			if (this.options.totalPages <= 0) {
				throw new Error('Total pages option cannot be less 1 (one)!');
			}

			if (!$.isNumeric(this.options.visiblePages)
					&& !this.options.visiblePages) {
				this.options.visiblePages = this.options.totalPages;
			}

			if (this.options.onPageClick instanceof Function) {
				this.$element.bind('page', this.options.onPageClick);
			}

			var tagName = (typeof this.$element.prop === 'function') ? this.$element
					.prop('tagName')
					: this.$element.attr('tagName');

			if (tagName === 'UL') {
				this.$listContainer = this.$element;
			} else {
				this.$listContainer = $('<ul></ul>');
			}

			this.$listContainer.addClass(this.options.paginationClass);

			this.$listContainer.append(this
					.buildListItems(this.currentPages.numeric));

			if (tagName !== 'UL') {
				this.$element.append(this.$listContainer);
			}

			this.show(this.options.startPage);
		},

		show : function(page) {
			if (page < 1 || page > this.options.totalPages) {
				throw new Error('Page is incorrect.');
			}

			switch (this.options.version) {
			case '1.0':
				this.render(this.getPages_v_1_0(page));
				break;
			case '1.1':
				this.render(this.getPages_v_1_1(page));
				break;
			default:
				this.render(this.getPages_v_1_1(page));
				break;
			}

			this.setupEvents();

			this.$element.trigger('page', page);
		},

		buildListItems : function(pages) {
			var $listItems = $();

			if (this.options.first) {
				$listItems = $listItems.add(this.buildItem('first', 1));
			}

			if (this.options.prev) {
				$listItems = $listItems.add(this.buildItem('prev', 1));
			}

			for (var i = 0; i < pages.length; i++) {
				$listItems = $listItems.add(this.buildItem('page', pages[i]));
			}

			if (this.options.next) {
				$listItems = $listItems.add(this.buildItem('next', 2));
			}

			if (this.options.last) {
				$listItems = $listItems.add(this.buildItem('last',
						this.options.totalPages));
			}

			return $listItems;
		},

		buildItem : function(type, page) {
			var itemContainer = $('<li></li>'), itemContent = $('<a></a>'), itemText = null;

			itemContainer.addClass(type);
			itemContainer.attr('data-page', page);

			switch (type) {
			case 'page':
				itemText = page;
				break;
			case 'first':
				itemText = this.options.first;
				break;
			case 'prev':
				itemText = this.options.prev;
				break;
			case 'next':
				itemText = this.options.next;
				break;
			case 'last':
				itemText = this.options.last;
				break;
			default:
				break;
			}

			itemContainer.append(itemContent.attr('href', this.href(page))
					.text(itemText));
			return itemContainer;
		},

		getPages_v_1_0 : function(currentPage) {
			var pages = [];

			var startPage;
			var section = parseInt(currentPage / this.options.visiblePages, 10);
			if (currentPage % this.options.visiblePages === 0) {
				startPage = (section - 1) * this.options.visiblePages + 1;
			} else {
				startPage = section * this.options.visiblePages + 1;
			}

			var endPage = Math.min(this.options.totalPages,
					(startPage + this.options.visiblePages) - 1);
			for (var i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			return {
				"currentPage" : currentPage,
				"numeric" : pages
			};
		},

		getPages_v_1_1 : function(currentPage) {
			var pages = [];

			var half = Math.floor(this.options.visiblePages / 2);
			var start = currentPage - half + 1 - this.options.visiblePages % 2;
			var end = currentPage + half;

			// handle boundary case
			if (start <= 0) {
				start = 1;
				end = this.options.visiblePages;
			}
			if (end > this.options.totalPages) {
				start = this.options.totalPages - this.options.visiblePages + 1;
				end = this.options.totalPages;
			}

			var itPage = start;
			while (itPage <= end) {
				pages.push(itPage);
				itPage++;
			}

			return {
				"currentPage" : currentPage,
				"numeric" : pages
			};
		},

		render : function(pages) {
			if (!this.equals(this.currentPages.numeric, pages.numeric)) {
				this.$listContainer.children().remove();
				this.$listContainer.append(this.buildListItems(pages.numeric));
				this.currentPages = pages;
			}

			this.$listContainer.find('.page').removeClass('active');
			this.$listContainer.find('.page').filter(
					'[data-page="' + pages.currentPage + '"]').addClass(
					'active');

			this.$listContainer.find('.first').toggleClass('disabled',
					pages.currentPage === 1);

			this.$listContainer.find('.last').toggleClass('disabled',
					pages.currentPage === this.options.totalPages);

			var prev = pages.currentPage - 1;
			this.$listContainer.find('.prev').toggleClass('disabled',
					pages.currentPage === 1).data('page', prev > 1 ? prev : 1);

			var next = pages.currentPage + 1;
			this.$listContainer.find('.next').toggleClass('disabled',
					pages.currentPage === this.options.totalPages).data(
					'page',
					next < this.options.totalPages ? next
							: this.options.totalPages);
		},

		setupEvents : function() {
			var base = this;
			this.$listContainer.find('li').each(function() {
				var $this = $(this);
				$this.off();
				if ($this.hasClass('disabled') || $this.hasClass('active'))
					return;
				$this.click(function() {
					base.show(parseInt($this.data('page'), 10));
				});
			});
		},

		equals : function(oldArray, newArray) {
			var i = 0;
			while ((i < oldArray.length) || (i < newArray.length)) {
				if (oldArray[i] !== newArray[i]) {
					return false;
				}
				i++;
			}
			return true;
		},

		href : function(c) {
			return this.options.href.replace(this.options.hrefVariable, c);
		}

	};

	// PLUGIN DEFINITION

	$.fn.twbsPagination = function(option) {
		var args = Array.prototype.slice.call(arguments, 1);
		var methodReturn;

		var $set = this.each(function() {
			var $this = $(this);
			var data = $this.data('twbs-pagination');
			var options = typeof option === 'object' && option;

			if (!data)
				$this.data('twbs-pagination', (data = new TwbsPagination(this,
						options)));
			if (typeof option === 'string')
				methodReturn = data[option].apply(data, args);
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.twbsPagination.defaults = {
		totalPages : 0,
		startPage : 1,
		visiblePages : 5,
		href : 'javascript:void(0);',
		hrefVariable : '{{number}}',
		first : '<<',
		prev : '<',
		next : '>',
		last : '>>',
		paginationClass : 'pagination',
		onPageClick : null,
		version : '1.0'
	};

	$.fn.twbsPagination.Constructor = TwbsPagination;

	$.fn.twbsPagination.noConflict = function() {
		$.fn.twbsPagination = old;
		return this;
	};

})(jQuery, window, document);