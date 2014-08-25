function activityClickEvent() {
	$('body').on("click", "#activityCreate", function() {
		var millisecond = Date.parse($('#activityTime').val()) + "";
		var activityC = "";
		if ($('#fileuploadA').val() != "") {
			activityC = FileUpload(new FormData($('.activityForm')[0]))[0];
		} else {
			activityC = "";
		}
		var post = {
			postType : 'ACTIVITY',
			attributes : {
				activityName : $('#activityName').val(),
				startDate : millisecond,
				activityTime : $('#activityTime').val(),
				activityAddr : $('#activityAddr').val(),
				activityMore : $('#activityMore').val(),
				background : activityC
			},
			imageLinks : []
		};
		var json = $.toJSON(post);
		AddPostToCommunity(USERID, community.ID, json);
		$('#activityCommunity').modal('hide');
	});
}
var pageSize = 15;
// function fetchActivitiesByCommunity()
function fetchActivitiesByCommunity() {
	var response = FetchActivitiesByCommunity(community.ID, 0, pageSize);
	$.each(response.reverse(), function(n, dataString) {
		addActivity(dataString.ID, dataString.attributes.activityName,
				dataString.attributes.activityTime,
				dataString.attributes.activityAddr,
				dataString.attributes.activityMore, dataString.attributes.background);
	});
}
function activity(activityID, name, time, addre, more, imagelink) {
	var boarddiv = "<div class='activity' ><div class='activityHref' id='"
			+ activityID
			+ "'><div class='activityBg'><img onload='javascript:auto_resize(435, 100, this)' src='"+imagelink+"' /></div><div class='user_img activityAvatar'><img class='userImg' src='images/user_img.jpg' /></div><div class='activityName'><span>"
			+ name
			+ "</span></div><div class='activityTime'><span class='glyphicon glyphicon-time'>&nbsp;"
			+ time
			+ "</span></div><div class='activityaddre'><span class='glyphicon glyphicon-flag'>&nbsp;"
			+ addre
			+ "</span></div><div class='activityD'><span>"
			+ more
			+ "</span></div></div><div class='activityAsk'><span>Are you going to join in?</span><select class='btn btn-default'><option>Maybe</option><option class='activityJoin' id='"
			+ activityID
			+ "'>Yes</option><option class='leaveactivityJoin' id='"
			+ activityID + "'>No</option></select></div></div>";
	return boarddiv;
}
// function addActivity
function addActivity(activityID, name, time, addre, more, imagelink) {
	var boarddiv = activity(activityID, name, time, addre, more, imagelink);
	$(".activityBord").after(boarddiv);
	Msnry('.activityBody', '.activity', 435);
}

function showCommunityInfo() {
	$('.cName').html(community.attributes.name);
	$('.cIntro').html(community.attributes.introduct);
	$('.communityPic').find('img').attr("src", community.attributes.communityCard);
}
// funtion sessionID
$('body').on("click", ".communityHref", function() {
	window.location.href = 'communityShow.jsp?' + community.ID;
});

$('body').on("click", ".activityHref", function() {
	var id = $(this).attr("id");
	window.location.href = 'activityShow.jsp?' + community.ID + '&' + id;
});

var date = new Date();
date.setDate(date.getDate() + 1);
$('.form_datetime').datetimepicker({
	// language: 'fr',
	format : "MM dd,yyyy - hh:ii",
	startDate : date,
	todayBtn : 1,
	autoclose : 1,
	startView : 2,
	Integer : 1,
	forceParse : 0,
	showMeridian : 1,
	pickerPosition : "bottom-left"
});
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
									dataString.attributes.background);
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