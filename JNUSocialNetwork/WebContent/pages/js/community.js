function communityClickEvent() {
	$('body').on(
			'click',
			'#communityCreate',
			function() {
				var communityC;
				if($('#fileupload').val()!=""){
					communityC = FileUpload(new FormData($('.communityForm')[0]))[0];
				}else{
					communityC="";
				}
				var community = {
					tags : [],
					attributes : {
						name : $('#communityName').val(),
						introduct : $('#communityIntro').val(),
						communityCard : communityC
					},
					communityType : $('#communityType').val()
				};
				var json = $.toJSON(community);
				var community = AddCommunity(USERID, json);
				fetchCommunityByID(community.ID);
				$('#createCommunity').modal('hide');
			});
	$('body').on(
			'click',
			'#appcommunityCreate',
			function() {
				var	attributes = {
						ID : $('#appTele').val(),
						password : $('#appPassword').val(),
						email : $('#appEmail').val(),
						reason : $('#appReasons').val(),
					};
				var json = $.toJSON(attributes);
				var response = ApplicationCreate(json);
				$('#appCommunity').modal('hide');
				if(response=='success'){
					alert("申请成功，请等待通知！");
				}
			});
	// function joinCommunity
	$('body').on('click', '.content_join', function() {
		var id = $(this).find("input").attr("value");
		if ($(this).css("background-color") == "rgb(255, 255, 255)") {
			JoinCommunity(USERID, id);
			$(this).css("color", "rgb(255, 255, 255)");
			$(this).css("background-color", "rgb(66,139,202)");
			return 0;
		} else {
			LeaveCommunity(USERID, id);
			$(this).css("color", "rgb(66,139,202)");
			$(this).css("background-color", "rgb(255, 255, 255)");
			return 0;
		}
	});
}

// fetchCommunityByID
function fetchCommunityByID(communityID) {
	var community = FetchCommunityByID(communityID);
	addCommunity(community.ID, community.attributes.name,
			community.memberIDs.length);
}
// fetchCommunity()
function fetchCommunity() {
	var communities = FetchCommunity("0", "5");
	$.each(communities, function(n, community) {
		addCommunity(community.ID, community.attributes.name,
				community.memberIDs.length);
	});
}
// 增加社区
function addCommunity(id, name, memberNum) {
	var boarddiv = "<div class='content_container'><a><div class='img_container'><input type='hidden' value='"
			+ id
			+ "'><img src='images/i2.jpg' /></div></a><div class='content_info'><div class='conten_head'>"
			+ name
			+ "</div><div class='content_count'>"
			+ memberNum
			+ " members</div><a><div class='content_join style='cursor:pointer;'><input type='hidden' value='"
			+ id + "'>Join</div></a></div></div>";
	$(".communityBord").after(boarddiv);
	Msnry('.containerDiscovery', '.content_container', 265);
}
$(document).ready(function() {
	// funtion sessionID
	$('body').on("click", ".img_container", function() {
		var comm = $(this).find("input").attr("value");
		window.location.href='communityShow.jsp?'+comm;
	});
	if($.parseJSON(sessionStorage.getItem("user")).userType=='COMMUNITYOWNER'){
		$('#createCommunityBtn').css("display","inline");
		$('#appCommunityBtn').css("display","none");
	}
});
