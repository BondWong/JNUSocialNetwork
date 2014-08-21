function activityClickEvent() {
	$('body').on("click", "#activityCreate", function() {
		var millisecond = Date.parse($('#activityTime').val())+"";
		var activityC="";
		if ($('#fileupload').val() != "") {
			activityC = FileUpload(new FormData($('.activityForm')[0]))[0];
		} else {
			activityC = "";
		}
		var post = {
			postType : 'ACTIVITY',
			attributes : {
				activityName : $('#activityName').val(),
				startDate : millisecond,
				activityTime:$('#activityTime').val(),
				activityAddr : $('#activityAddr').val(),
				activityMore : $('#activityMore').val(),
				background:activityC
			},
			imageLinks : []
		};
		var json = $.toJSON(post);
		AddPostToCommunity(USERID, community.ID, json);
		$('#activityCommunity').modal('hide');
	});
}

// function fetchActivitiesByCommunity()
function fetchActivitiesByCommunity() {
	var response = FetchActivitiesByCommunity(community.ID, "0", "5");
	$.each(response.reverse(), function(n, dataString) {
		addActivity(dataString.ID, dataString.attributes.activityName,
				dataString.attributes.activityTime,
				dataString.attributes.activityAddr,
				dataString.attributes.activityMore, dataString.imageLinks);
	});
}

// function addActivity
function addActivity(activityID, name, time, addre, more, imagelink) {
	var boarddiv = "<div class='activity' ><div class='activityHref' id='"
			+ activityID
			+ "'><div class='activityBg'><img src='images/activityBgS.jpg' /></div><div class='user_img activityAvatar'><img class='userImg' src='images/user_img.jpg' /></div><div class='activityName'><span>"
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
	$(".activityBord").after(boarddiv);
	Msnry('.activityBody', '.activity', 435);
}

function showCommunityInfo() {
	$('.cName').html(community.attributes.name);
	$('.cIntro').html(community.attributes.introduct);
}
// funtion sessionID
$('body')
		.on(
				"click",
				".communityHref",
				function() {
					window.location.href = 'communityShow.jsp?'
							+ community.ID;
				});

$('body')
		.on(
				"click",
				".activityHref",
				function() {
					var id = $(this).attr("id");
					alert(id);
					window.location.href = 'activityShow.jsp?'+community.ID+'&'
							+ id;
				});

var date=new Date();
date.setDate(date.getDate()+ 1);
$('.form_datetime').datetimepicker({
    //language:  'fr',
	format: "MM dd,yyyy - hh:ii",
	startDate:date,
    todayBtn:  1,
	autoclose: 1,
	startView: 2,
	Integer:1,
	forceParse: 0,
    showMeridian: 1,
    pickerPosition: "bottom-left"
});