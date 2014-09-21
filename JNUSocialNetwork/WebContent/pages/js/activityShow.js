//function showActivityDetail
function showActivityDetail(activity, community) {
	$('.activityShowName').html(activity.attributes.activityName);
	$('.aT').html(activity.attributes.activityTime);
	$('.aA').html("&nbsp;" + activity.attributes.activityAddr);
	$('.activityShowD').html("&nbsp;" + activity.attributes.activityMore);
	$('.activityHead').find('img').attr("src",
			$.parseJSON(activity.attributes.background).src);
	$('#addComment').attr("value", activity.ID);
	$('.acBtn').attr("id", "commentText" + activity.ID);
	$('.communityName').html(community.attributes.name);

	$('.communityNum').html( activity.participantIDs.length
					+ "&nbsp个小伙伴参加了这个活动");
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
								+ commentReply + "<input type='hidden' id='"
								+ activity.ID + "' value='" + jsonComment.ID
								+ "' /></span></div><br><div class='aC'>"
								+ "<span class='commentHead'>" + atComment
								+ "</span>" + "&nbsp;"
								+ jsonComment.attributes.content
								+ "</div></div></div>";
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
		$('.joinSActivity').css("background-color",
				"rgb(66,139,202)");
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
		$('.activityAddCommunity').css("display","inline");
	}
}
$('body')
.on(
		'click',
		'.joinSActivity',
		function() {
			if (FetchUserByID(USERID).attributes.telnum != "") {
				if ($(this).css("background-color") == "rgb(235, 235, 235)") {
					$(this).css("color", "rgb(255, 255, 255)");
					$(this).css("background-color",
							"rgb(66,139,202)");
					$(this).text("已经参加");
					var response = JoinActivity(USERID, activityID);
					if (response == 'success') {
						alert("参加成功！");
					}
					return 0;
				} else {
					$(this).css("color", "rgb(51,51,51)");
					$(this).css("background-color","rgb(235, 235, 235)");
					$(this).text("参加活动");
					LeaveActivity(USERID, activityID);
					return 0;
				}
			} else {
				$(this).attr("data-toggle", "modal");
				$(this).attr("data-target", "#telemodal");
				teleAlert2(activityID);
			}

		});
$('body').on("click", ".teleUpload2", function() {
var dataString = {
telnum : $('#tele').val()
};
if ($('.teleForm')[0].checkValidity()) {
UpdateUserProfile(USERID, $.toJSON(dataString));
	var response = JoinActivity(USERID, activityID);
	if (response == 'success') {
		alert("参加成功！");
	}
	$('.joinSActivity').css("color", "rgb(255, 255, 255)");
	$('.joinSActivity').css("background-color",
			"rgb(66,139,202)");
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
$('body').on("click",".backActivity",function(){
	window.location.href = "activityCommunity.jsp?"+ community.ID;
});
$('body').on("click", ".editActivity", function() {
	$('#activityName').val(activity.attributes.activityName);
	$('#activityTime').val(activity.attributes.activityTime);
	$('#activityRemind').val(activity.attributes.activityRemindTime);
	$('#activityAddr').val(activity.attributes.activityAddr);
	$('#activityMore').val(activity.attributes.activityMore);
	$('#activityNum').val(activity.attributes.limitation);
	dataPicker();
});
$('body')
		.on(
				"click",
				"#saveActivity",
				function() {
					var attributes = "";
					if ($('#activityTime').val() != ""
							&& $('#activityRemind').val() != "") {
						if ($('#fileupload').val() != "") {
							attributes = {
								activityName : $('#activityName').val(),
								startDate : toTimeValue($('#activityTime')
										.val()
										+ "")
										+ "",
								remindDate : toTimeValue($('#activityRemind')
										.val()
										+ "")
										+ "",
								activityTime : $('#activityTime').val(),
								activityRemindTime : $('#activityRemind').val(),
								activityAddr : $('#activityAddr').val(),
								activityMore : $('#activityMore').val(),
								limitation : $('#activityNum').val(),
								background : FileUpload(new FormData(
										$('.activityForm')[0]))[0]
							};
						} else {
							attributes = {
								activityName : $('#activityName').val(),
								startDate : toTimeValue($('#activityTime')
										.val()
										+ "")
										+ "",
								remindDate : toTimeValue($('#activityRemind')
										.val()
										+ "")
										+ "",
								activityTime : $('#activityTime').val(),
								activityRemindTime : $('#activityRemind').val(),
								activityAddr : $('#activityAddr').val(),
								activityMore : $('#activityMore').val(),
								limitation : $('#activityNum').val()
							};
						}

						var diffDate = toTimeValue($('#activityTime').val()
								+ "")
								- toTimeValue($('#activityRemind').val() + "");
						if ($('.activityForm')[0].checkValidity()) {
							if (diffDate > 0) {
								var json = $.toJSON(attributes);
								var aup = UpdateActivity(activity.ID, json);
								$('#editActivity').modal('hide');
								$('.activityShowName').html(
										aup.attributes.activityName);
								$('.aT').html(
										"&nbsp;" + aup.attributes.activityTime);
								$('.aA').html(
										"&nbsp;" + aup.attributes.activityAddr);
								$('.activityShowD').html(
										"&nbsp;" + aup.attributes.activityMore);
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
						setTimeout('$("#fail_popover").fadeOut("slow")', 3000);
					}
				});
function dataPicker() {
	var date1 = new Date();
	date1.setDate(date1.getDate() + 1);
	$('.form_datetime1').datetimepicker({
		// language: 'fr',
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
		// language: 'fr',
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
}
