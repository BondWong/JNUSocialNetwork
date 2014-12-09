function activity(activityID, name, time, addre, more, imagelink, avatarLink,
		ownerID, joinIDs, startDate, limitation, ifUpload, inquery) {
	var join = "";
	if (ifUpload == "上传报名表") {
		join = "<div class='aUB'><a href='../../app/fileDownloader?type=REGISTERFORM&activityID="+activityID+"' class='btn btn-default dlR' id='"
		+ activityID
		+ "'>下载报名表</a><a class='btn btn-default ulR' id='"
		+ activityID + "'>上传报名表</a></div>";
	} else if(ifUpload == "默认方式") {
		join = "<a><div class='activityJoin' id='activity" + activityID
		+ "'><input type='hidden' value='" + activityID
		+ "'><span>Join</span></div></a>";
	if ($.inArray(USERID, joinIDs) != -1) {
		join = "<a><div style='color: #FFF;background-color: #428BCA;' class='activityJoin' id='activity"
				+ activityID
				+ "'><input type='hidden' value='"
				+ activityID + "'><span>Joined</span></div></a>";
	}
	}
	var pRemoveBtn = "";
	if (USERID == ownerID) {
		pRemoveBtn = "<div class='deleteActivity deleteActivityA'><input id='deleteID' type='hidden' value="
				+ activityID
				+ " /><span class='glyphicon glyphicon-remove'></span></div>";
		join = "";
	}
	var now = new Date();
	if (joinIDs.length >= limitation ) {
		join = "<button class='btn btn-default'>已经满人</button>";
	}
	if(startDate - now.getTime() <= 0){
		join = "<button class='btn btn-default'>已经过期</button>";
	}
	
	var imageObject = imagelink.substr(imagelink.indexOf(",{")+1);
	var attrO = "height='"+getHeight(330,$.parseJSON(imageObject).width, $.parseJSON(imageObject).height)+"'  src='"
			+ $.parseJSON(imageObject).src
			+ "'";
	if($.parseJSON(imageObject).thumbnail != undefined){
		attrO = "height='"+getHeight(330,$.parseJSON($.parseJSON(imagelink).thumbnail).width, $.parseJSON($.parseJSON(imagelink).thumbnail).height)+"'  src='"
			+ $.parseJSON($.parseJSON(imagelink).thumbnail).src
			+ "'";
	}
	var imageA = $.parseJSON(avatarLink).src;
	if($.parseJSON(avatarLink).thumbnail != undefined){
		imageA = $.parseJSON($.parseJSON(avatarLink).thumbnail).src;
	}
	var boarddiv = "<div class='activity activityAll post"
			+ activityID
			+ "' >"
			+ pRemoveBtn
			+ "<div class='activityBg activityBgAll'><img width='330' "+attrO+" /></div><div class='user_img activityAvatarA'><img width='49' height='49' class='img-circle userImg' src='"
			+ imageA
			+ "' /></div><div class='activityName activityShowHref' id='"
			+ activityID
			+ "'><a><span>"
			+ name
			+ "</span></a></div><div class='activityTime'><span class='glyphicon glyphicon-time'></span><span id='font14'>&nbsp;活动时间:&nbsp;</span><span class='aT'>"
			+ time
			+ "</span></div><div class='inquery'><span class='glyphicon glyphicon-phone'></span><span id='font14'>&nbsp;联系方式:&nbsp;</span><span class='aI'>"
			+ inquery
			+ "</span></div><div class='activityaddre'><span class='glyphicon glyphicon-flag'></span><span id='font14'>&nbsp;活动地点:&nbsp;</span><span class='aA'>"
			+ addre + "</span></div><div class='activityD'><span>" + '<pre>'
			+ replaceURLWithHTMLLinks(more) + '</pre>' + "</span></div><div class='activityAsk'>" + join
			+ "</div></div>";
	return boarddiv;
}
// function addActivity
function addActivity(activityID, name, time, addre, more, imagelink,
		avatarLink, ownerID, joinIDs, startDate, limitation, ifUpload, inquery) {
	var boarddiv = activity(activityID, name, time, addre, more, imagelink,
			avatarLink, ownerID, joinIDs, startDate, limitation, ifUpload, inquery);
	$(".activityBord").after(boarddiv);
	Msnry('.activityBody', '.activity', 330);
}
var pageSize = "16";
function fetchAllActivities() {
	var response = FetchAllActivities( 0, pageSize);
	$.each(response.reverse(), function(n, dataString) {
		if (dataString.available == true) {
			
			addActivity(dataString.ID, dataString.attributes.activityName,
					dataString.attributes.activityTime,
					dataString.attributes.activityAddr,
					dataString.attributes.activityMore,
					dataString.attributes.background,
					dataString.owner.attributes.avatarLink,
					dataString.owner.ID, dataString.participantIDs,
					dataString.attributes.startDate,
					dataString.attributes.limitation,
					dataString.attributes.ifUpload,dataString.attributes.inquery);
			
		}
	});
}
function fetchHeatActivities() { 
	var response = FetchHeatActivities( 0, pageSize);
	$.each(response.reverse(), function(n, dataString) {
		if (dataString.available == true) {
			addActivity(dataString.ID, dataString.attributes.activityName,
					dataString.attributes.activityTime,
					dataString.attributes.activityAddr,
					dataString.attributes.activityMore,
					dataString.attributes.background,
					dataString.owner.attributes.avatarLink,
					dataString.owner.ID, dataString.participantIDs,
					dataString.attributes.startDate,
					dataString.attributes.limitation,
					dataString.attributes.ifUpload,dataString.attributes.inquery);
		}
	});
}
function fetchActivitiesByOwner() {
	var response = FetchActivitiesByOwner(USERID, 0, "16");
	$.each(response.reverse(), function(n, dataString) {
		if (dataString.available == true) {
			addActivity(dataString.ID, dataString.attributes.activityName,
					dataString.attributes.activityTime,
					dataString.attributes.activityAddr,
					dataString.attributes.activityMore,
					dataString.attributes.background,
					dataString.owner.attributes.avatarLink,
					dataString.owner.ID, dataString.participantIDs,
					dataString.attributes.startDate,
					dataString.attributes.limitation,
					dataString.attributes.ifUpload,dataString.attributes.inquery);
		}
	});
}
function fetchJoinedActivities() {
	var response = FetchJoinedActivities(USERID, 0,  "16");
	$.each(response.reverse(), function(n, dataString) {
		if (dataString.available == true) {
			addActivity(dataString.ID, dataString.attributes.activityName,
					dataString.attributes.activityTime,
					dataString.attributes.activityAddr,
					dataString.attributes.activityMore,
					dataString.attributes.background,
					dataString.owner.attributes.avatarLink,
					dataString.owner.ID, dataString.participantIDs,
					dataString.attributes.startDate,
					dataString.attributes.limitation,
					dataString.attributes.ifUpload,dataString.attributes.inquery);
		}
	});
}
function fetchActivitiesByType(activityType) {
	var response = FetchActivitiesByType(activityType, 0, pageSize);
	$.each(response.reverse(), function(n, dataString) {
		if (dataString.available == true) {
			addActivity(dataString.ID, dataString.attributes.activityName,
					dataString.attributes.activityTime,
					dataString.attributes.activityAddr,
					dataString.attributes.activityMore,
					dataString.attributes.background,
					dataString.owner.attributes.avatarLink,
					dataString.owner.ID, dataString.participantIDs,
					dataString.attributes.startDate,
					dataString.attributes.limitation,
					dataString.attributes.ifUpload,dataString.attributes.inquery);
		}
	});
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
$('body').on('click','#ulFile',function(){
	if($('.uploadForm')[0].checkValidity() && $('.uploadexe').val() != ""){
	if($('.tele').val()!=""){
		var dataString = {
				telnum : $('#tele').val()
			};
		UpdateUserProfile(USERID, $.toJSON(dataString));
	}
	var response = formUpload(new FormData($('.uploadForm')[0]),$('.ulR').attr('id'),encodeURI($.parseJSON(sessionStorage.getItem("user")).attributes.name));
		if(response == "200"){
			alert("参加成功！");
			JoinActivity(USERID, $('.ulR').attr('id'));
			$('.uploadexe').val("");
			$('#uploadmodal').modal('hide');
		}else{
			alert("参加出错，请重试！");
		}
	}
});
$('body').on("click", ".activityShowHref", function() {
	var id = $(this).attr("id");
	var communityID = FetchPostByID(id).attributes.communityID;
	window.open('activityShow.jsp?' + communityID + '&' + id);
});
$('body').on('click', '.deleteActivity', function() {
	var id = $(this).find("input").attr("value");
	DeletePostFromCommunity(($.parseJSON(sessionStorage.getItem("user")).communityIDNameTuples)[0].ID, id);
	$(".post" + id + "").remove();
	Msnry('.activityBody', '.activity', 330);
});
