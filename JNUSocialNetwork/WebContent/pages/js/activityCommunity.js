function activityClickEvent() {
	$('body').on("click", '#createActivityBtn', function() {
		$('.activityForm').get(0).reset();
	});
	$('body').on(
			"click",
			"#activityCreate",
			function() {
				var post = "";
				if ($('#activityTime').val() != ""
						&& $('#activityRemind').val() != "") {
					if ($('#fileuploadA').val() != "") {
						post = {
							postType : 'ACTIVITY',
							attributes : {
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
								activityAddr : $('#activityAddr').val(),
								activityMore : $('#activityMore').val(),
								communityName : community.attributes.name,
								background : FileUpload(new FormData(
										$('.activityForm')[0]))[0],
							},
							imageLinks : []
						};
					} else {
						post = {
							postType : 'ACTIVITY',
							attributes : {
								activityName : $('#activityName').val(),
								startDate : toTimeValue($('#activityTime')
										.val()
										+ "")
										+ "",
								remindDate : toTimeValue($('#activityRemind')
										.val()
										+ "")
										+ "",
								communityName : community.attributes.name,
								activityTime : $('#activityTime').val(),
								activityAddr : $('#activityAddr').val(),
								activityMore : $('#activityMore').val(),
							},
							imageLinks : []
						};
					}
					var diffDate = toTimeValue($('#activityTime').val() + "")
							- toTimeValue($('#activityRemind').val() + "");
					if ($('.activityForm')[0].checkValidity()) {

						if (diffDate > 0.5 * 24 * 60 * 60 * 1000) {
							var json = $.toJSON(post);
							AddPostToCommunity(USERID, community.ID, json);
							$('#activityCommunity').modal('hide');
						} else {
							$('#fail_popover2').fadeIn("fast");
							setTimeout('$("#fail_popover2").fadeOut("slow")',
									3000);
						}

					}
				} else {
					$('#fail_popover').fadeIn("fast");
					setTimeout('$("#fail_popover").fadeOut("slow")', 3000);
				}
			});
}
var pageSize = 15;
// function fetchActivitiesByCommunity()
function fetchActivitiesByCommunity() {
	var response = FetchActivitiesByCommunity(community.ID, 0, pageSize);
	$.each(response.reverse(), function(n, dataString) {
		if (dataString.available == true) {
			addActivity(dataString.ID, dataString.attributes.activityName,
					dataString.attributes.activityTime,
					dataString.attributes.activityAddr,
					dataString.attributes.activityMore,
					dataString.attributes.background,
					dataString.owner.attributes.avatarLink,
					dataString.owner.ID, dataString.participantIDs);
		}
	});
}
function activity(activityID, name, time, addre, more, imagelink, avatarLink,
		ownerID, joinIDs) {
	var select = "";
	if ($.inArray(USERID, joinIDs) != -1) {
		select = "selected";
	}
	var askActivity = "<div class='activityAsk'><span>Are you going to join in?</span><select class='btn btn-default'><option>Maybe</option><option class='activityJoin' id='"
			+ activityID
			+ "' "
			+ select
			+ ">Yes</option><option class='leaveactivityJoin' id='"
			+ activityID + "'>No</option></select></div>";
	var pRemoveBtn = "";
	if (USERID == ownerID) {
		pRemoveBtn = "<div class='deletePostBtn deleteActivity'><input id='deleteID' type='hidden' value="
				+ activityID
				+ " /><span class='glyphicon glyphicon-remove'></span></div>";
		askActivity = "";
	}

	var boarddiv = "<div class='activity post"
			+ activityID
			+ "' >"
			+ pRemoveBtn
			+ "<div class='activityBg'><img width='435' height='100'  src='"
			+ $.parseJSON(imagelink).src
			+ "' /></div><div class='user_img activityAvatar'><img onload='javascript:auto_resize(49, 49, this)' class='img-circle userImg' src='"
			+ $.parseJSON(avatarLink).src
			+ "' style='display: none'/></div><div class='activityName activityHref' id='"
			+ activityID
			+ "'><a><span>"
			+ name
			+ "</span></a></div><div class='activityTime'><span class='glyphicon glyphicon-time'>&nbsp;</span><span class='aT'>"
			+ time
			+ "</span></div><div class='activityaddre'><span class='glyphicon glyphicon-flag'>&nbsp;</span><span class='aA'>"
			+ addre + "</span></div><div class='activityD'><span>" + more
			+ "</span></div>" + askActivity + "</div>";
	return boarddiv;
}
// function addActivity
function addActivity(activityID, name, time, addre, more, imagelink,
		avatarLink, ownerID, joinIDs) {
	var boarddiv = activity(activityID, name, time, addre, more, imagelink,
			avatarLink, ownerID, joinIDs);
	$(".activityBord").after(boarddiv);
	Msnry('.activityBody', '.activity', 435);
}

function showCommunityInfo() {
	$('.cName').html(community.attributes.name);
	$('.cIntro').html(community.attributes.introduct);
	$('.communityPic').find('img').attr("src",
			$.parseJSON(community.attributes.communityCard).src);
}
// funtion sessionID
$('body').on("click", ".communityHref", function() {
	window.location.href = 'communityShow.jsp?' + community.ID;
});

$('body').on("click", ".activityHref", function() {
	var id = $(this).attr("id");
	window.location.href = 'activityShow.jsp?' + community.ID + '&' + id;
});
$('body').on('click', '.deletePostBtn', function() {
	var id = $(this).find("input").attr("value");
	DeletePostFromCommunity(community.ID, id);
	$(".post" + id + "").remove();
	Msnry('.activityBody', '.activity', 435);
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
date2.setTime(date2.getTime() + 0.4 * 24 * 60 * 60 * 1000);
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
$(window)
		.scroll(
				function() {
					if ($(window).scrollTop() == $(document).height()
							- window.windowHeight) {
						var startIndex = $('.activity').length;
						$('div#infinite_loader').show();
						var response = FetchActivitiesByCommunity(communityID,
								startIndex, pageSize);
						$.each(response, function(n, dataString) {
							var boarddiv = activity(dataString.ID,
									dataString.attributes.activityName,
									dataString.attributes.activityTime,
									dataString.attributes.activityAddr,
									dataString.attributes.activityMore,
									dataString.attributes.background,
									dataString.owner.ID,
									dataString.participantIDs);
							$(".activityBord").after(boarddiv);
							Msnry('.activityBody', '.activity', 435);
						});
						if (response.length == pageSize) {
							$('div#infinite_loader').hide();
						} else {
							$('div#infinite_loader')
									.replaceWith(
											'<div id="no_more_infinite_load"><span>no more</span></div>');
							$(window).unbind("scroll");
						}
					}
				});