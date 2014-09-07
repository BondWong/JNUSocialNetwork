//function showActivityDetail
function showActivityDetail(activity, community) {
	$('.activityShowName').html(activity.attributes.activityName);
	$('.aT').html(activity.attributes.activityTime);
	$('.aA').html("&nbsp;" + activity.attributes.activityAddr);
	$('.activityShowD').html("&nbsp;" + activity.attributes.activityMore);
	$('.activityHead').find('img').attr("src", activity.attributes.background);
	$('#addComment').attr("value", activity.ID);
	$('.acBtn').attr("id", "commentText" + activity.ID);
	$('.communityName').html(community.attributes.name);
	$('.communityNum').html(
			activity.likerIDs.length+ activity.participantIDs.length + "&nbspare intesting in this activity");
	var comments = FetchCommentByPost(activity.ID, "0", "5");
	var comment = "";
	$
			.each(
					comments.reverse(),
					function(index, jsonComment) {
						var atComment = "";
						if (jsonComment.attributes.commentToComment != "") {
							atComment = "@"
									+ jsonComment.attributes.commentToComment;
						}
						var removeBtn = "";
						if (USERID == jsonComment.owner.ID) {
							removeBtn = "<div class='deleteCommBtn deletCa' style='cursor:pointer'><a><input id='"
									+ jsonComment.attributes.postID
									+ "' type='hidden' value='"
									+ jsonComment.ID
									+ "' /><span class='glyphicon glyphicon-remove' style='font-size: 8px'></span></a></div>";
						}
						comment = comment
								+ "<div class='aBodyComment' id='commentTxt"
								+ jsonComment.ID
								+ "'><div class='aCommentItem'><div class='col-lg-2 col-lg-2-cust'><img class='img-circle userImg' onload='javascript:auto_resize(50, 50, this)'  src='"
								+ jsonComment.owner.attributes.avatarLink
								+ "'style='display: none'></div><div class='user_name'><strong>"
								+ jsonComment.owner.attributes.name
								+ "</strong></div><div class='user_info'><span>"
								+ jsonComment.publishDate
								+ "</span>"
								+ removeBtn
								+ "<div class='comment_reply replyaComment' id="
								+ jsonComment.attributes.postID
								+ " style='cursor: pointer'><a><input id='replyName' type='hidden' value='"
								+ jsonComment.owner.attributes.name
								+ "' /><input id='replyID' type='hidden' value='"
								+ jsonComment.ID
								+ "' />reply<span style='font-size: 8px'></span></a></div><input type='hidden' id='"
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
			community.attributes.communityCard);
	$('.addcommunityA').attr("id", community.ID);
	$('.activityJoin').attr("id", activity.ID);
	$('.leaveactivityJoin').attr("id", activity.ID);
	if ($.inArray(USERID, activity.likerIDs) != -1) {
		$('#activityLike').attr("class", "glyphicon glyphicon-heart");
	}
	if ($.inArray(USERID, activity.participantIDs) != -1) {
		$('.activityJoin').attr("selected", "selected");
	}
	var memberIDs = [];
	$.each(community.members, function(n, member) {
		memberIDs.push(member.ID);
	});
	if ($.inArray(USERID, memberIDs) != -1) {
		$('.activityAddCommunity').css("display","none");
	}
}
$('body').on("click", ".glyphicon-heart-empty", function() {
	LikePost(USERID, activity.ID);
	$('.glyphicon-heart-empty').attr("class", "glyphicon glyphicon-heart");
});
$('body').on("click", ".activityAddCommunity", function() {
	JoinCommunity(USERID,community.ID);;
	$(this).fadeOut("300");
});
$('body').on("click", ".glyphicon-heart", function() {
	CancelLikePost(USERID, activity.ID);
	$('.glyphicon-heart').attr("class", "glyphicon glyphicon-heart-empty");
});
$('body').on("click", ".editActivity", function() {
	$('#activityName').val(activity.attributes.activityName);
	$('#activityTime').val(activity.attributes.activityTime);
	$('#activityAddr').val(activity.attributes.activityAddr);
	$('#activityMore').val(activity.attributes.activityMore);
});
$('body').on("click", ".addcommunityA", function() {

});
$('body').on("click", ".editActivity", function() {
	$('.activityForm').get(0).reset();
});
$('body').on("click", "#saveActivity", function() {
	var activityC = "";
	if ($('#fileupload').val() != "") {
		activityC = FileUpload(new FormData($('.activityForm')[0]))[0];
	} else {
		activityC = activity.attributes.background;
	}
	var attributes = {
		activityName : $('#activityName').val(),
		startDate : Date.parse($('#activityTime').val().replace('-','/')).toString(),
		remindDate: Date.parse($('#activityRemind').val().replace('-','/')).toString(),
		activityTime : $('#activityTime').val(),
		activityAddr : $('#activityAddr').val(),
		activityMore : $('#activityMore').val(),
		background : activityC
	};
	if($('.activityForm')[0].checkValidity()){
		if($('#activityTime').val()!="" && $('#activityRemind').val()!=""){
		var json = $.toJSON(attributes);
		var aup = UpdateActivity(activity.ID, json);
		$('#editActivity').modal('hide');
		$('.activityShowName').html(aup.attributes.activityName);
		$('.aT').html("&nbsp;" + aup.attributes.activityTime);
		$('.aA').html("&nbsp;" + aup.attributes.activityAddr);
		$('.activityShowD').html("&nbsp;" + aup.attributes.activityMore);
		$('.activityHead').find('img').attr("src",
				activityC);
		}else{
			$('#fail_popover').fadeIn("fast");
			setTimeout('$("#fail_popover").fadeOut("slow")', 3000);
		}
	}
});
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
var date3 = $('#activityTime').val();
date2.setDate(date2.getDate() + 0.5);
$('.form_datetime2').datetimepicker({
// language: 'fr',
format : "MM dd,yyyy - hh:ii",
startDate : date2,
endDate : date3,
todayBtn : 0,
autoclose : 1,
startView : 2,
Integer : 1,
forceParse : 0,
showMeridian : 1,
pickerPosition : "bottom-left"
});