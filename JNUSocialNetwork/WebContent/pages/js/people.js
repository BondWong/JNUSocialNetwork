function pHot() {
	var users = FetchRandom("0", "5");
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs,user.attributes.email);
	});
}
function pRandom() {
	var users = FetchRandom("0", "5");
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs,user.attributes.email);
	});
}
function PinCommon() {
	var users = RecommendateViaFollowee(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs,user.attributes.email);
	});
}
function pCampus() {
	var users = RecommendateViaCampus(USERID,encodeURI($.parseJSON(sessionStorage.getItem("user")).attributes.institution),"0","30");
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs,user.attributes.email);
	});
}
function pMajor() {
	var users = RecommendateViaMajor(USERID,encodeURI($.parseJSON(sessionStorage.getItem("user")).attributes.major),"0","30");
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs,user.attributes.email);
	});
}
function pSeason() {
	var users = RecommendateViaSession(USERID,$.parseJSON(sessionStorage.getItem("user")).attributes.season,"0","30");
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs,user.attributes.email);
	});
}
function pClass() {
	var users = RecommendateViaClass(USERID,$.parseJSON(sessionStorage.getItem("user")).attributes.season,encodeURI($.parseJSON(sessionStorage.getItem("user")).attributes.major),"0","30");
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs,user.attributes.email);
	});
}
function peopleClickEvent() {

	$('body')
			.on(
					'click',
					'.pCampus',
					function() {
						$('.peopeleType').css("background-color", "#fff");
						$('.peopeleType').css("border-left", "#4285f4");
						$(this).css("background-color", "#f6f6f6");
						$(this).css("border-left", "2px solid #4285f4");
						$('.userContainer').remove();
						var borddiv = "<div class='userContainer'><div class='recommendBord'></div></div>";
						$('.containBord').after(borddiv);
						pCampus();
					});
	$('body')
			.on(
					'click',
					'.pMajor',
					function() {
						$('.peopeleType').css("background-color", "#fff");
						$('.peopeleType').css("border-left", "#4285f4");
						$(this).css("background-color", "#f6f6f6");
						$(this).css("border-left", "2px solid #4285f4");
						$('.userContainer').remove();
						var borddiv = "<div class='userContainer'><div class='recommendBord'></div></div>";
						$('.containBord').after(borddiv);
						pMajor();
					});
	$('body')
			.on(
					'click',
					'.pSeason',
					function() {
						$('.peopeleType').css("background-color", "#fff");
						$('.peopeleType').css("border-left", "#4285f4");
						$(this).css("background-color", "#f6f6f6");
						$(this).css("border-left", "2px solid #4285f4");
						$('.userContainer').remove();
						var borddiv = "<div class='userContainer'><div class='recommendBord'></div></div>";
						$('.containBord').after(borddiv);
						pSeason();
					});

	$('body')
			.on(
					'click',
					'.pClass',
					function() {
						$('.peopeleType').css("background-color", "#fff");
						$('.peopeleType').css("border-left", "#4285f4");
						$(this).css("background-color", "#f6f6f6");
						$(this).css("border-left", "2px solid #4285f4");
						$('.userContainer').remove();
						var borddiv = "<div class='userContainer'><div class='recommendBord'></div></div>";
						$('.containBord').after(borddiv);
						pClass();
					});
	$('body')
			.on(
					'click',
					'.pinCommon',
					function() {
						$('.peopeleType').css("background-color", "#fff");
						$('.peopeleType').css("border-left", "#4285f4");
						$(this).css("background-color", "#f6f6f6");
						$(this).css("border-left", "2px solid #4285f4");
						$('.userContainer').remove();
						var borddiv = "<div class='userContainer'><div class='recommendBord'></div></div>";
						$('.containBord').after(borddiv);
						PinCommon();
					});
	$('body')
			.on(
					'click',
					'.pRandom',
					function() {
						$('.peopeleType').css("background-color", "#fff");
						$('.peopeleType').css("border-left", "#4285f4");
						$(this).css("background-color", "#f6f6f6");
						$(this).css("border-left", "2px solid #4285f4");
						$('.userContainer').remove();
						var borddiv = "<div class='userContainer'><div class='recommendBord'></div></div>";
						$('.containBord').after(borddiv);
						pRandom();
					});
	$('body').on("click", ".inforW", function() {
		window.location.href = 'profile.jsp?nav=about&' + USERID;
	});
}

$('body').on('click', '.userSearch', function() {
	searchUser();
});
$('body').on('keydown', '.searchInput', function(event) {
	if (event.keyCode == 13) {
		searchUser();
	}
});
function searchUser() {
	if ($('.searchInput').val() != "") {
		var userInfo = encodeURI($('.searchInput').val());
		$('.userContainer').remove();
		var borddiv = "<div class='userContainer'><div class='recommendBord'></div></div>";
		$('.containBord').after(borddiv);
		var users = SearchMember(userInfo, "0", "10");
		if ($.toJSON(users[0]) != '{}') {
			$('.searchInput').val("");
			$('.searchInput').blur();
			$.each(users, function(n, user) {
				AddUser(user.attributes.name, user.attributes.introduce,
						user.lookingForTags, user.ID, user.userType,
						user.attributes.avatarLink, user.followerIDs,user.attributes.email);
			});
		} else {
			$('.recommendBord').after("<span>没有找到结果</span>");
		}
	}
}

function AddUser(name, looking, tags, id, userType, avatarLink, followerIDs,email) {
	var followTxt = "Follow";
	if ($.inArray(USERID, followerIDs) != -1) {
		followTxt = "Following";
	}
	if (USERID == id) {
		followTxt = "Yourself";
	}
	var tagBord = "";
	$.each(tags, function(n, tag) {
		if (n <= 9) {
			tagBord += "<span>" + tag + ".</span>";
		}
	});
	var pIn = "<p class='tagCP'>" + tagBord + "<br clear='all' /></p>";
	if (userType == "COMMUNITYOWNER") {
		pIn = "<p class='recommendLooking'>" + looking + "</p>";
	}
	var imageO = $.parseJSON(avatarLink).src;
	if($.parseJSON(avatarLink).thumbnail != undefined){
		imageO = $.parseJSON($.parseJSON(avatarLink).thumbnail).src;
	}
	var peopleI = "<img  height='170' width='170' src='"
			+ imageO
			+ "' >";
	if (imageO == "images/default/default-user-avartar.png" && email!="" && id!=USERID) {
		peopleI ="<div class='peopleImgP' style='cursor:pointer;' id='"+id +"'><img  height='170' width='170' src='"
			+ imageO
			+ "' ></div>";
	}
	var boarddiv = "<div class='userCard'>"+peopleI+"<p class='recommendName'><a id=" + id + " class='tipUser2'>"
			+ name + "</a></p>" + pIn
			+ "<div class='recommendBtn'><button  id=" + id
			+ " class='btn btn-danger followBtn' title='" + name + "'>"
			+ followTxt + "</button></div></div>";
	$(".recommendBord").after(boarddiv);
	
		$("div[id='"+id +"']").hover(function(){
			$(this).append("<div class='begAP begAP"+id+"'><span style='font-size:20px;'>一起求头像!</span></div>");
			$(".begAP"+id+"").hide();
			$(".begAP"+id+"").fadeIn(300);
		},function(){
			$(".begAP"+id+"").fadeOut(300);
		});
	Msnry('.userContainer', '.userCard', 200);
}
$('body').on("click",".peopleImgP",function(){
	  $('.layer2').fadeIn(300);
	  $('#infinite_loader2').fadeIn(300);
	  InviteToAddImage(USERID, $(this).attr("id"));
});
$('body').on("click", ".tipUser2", function() {
	window.open('profile.jsp?nav=about&' + $(this).attr("id"));
});
$('body').on(
		"click",
		".recommendBtn",
		function() {
			var id = $(this).find('button').attr('id');
			if ($(this).find('button').text() == "Follow") {
				Follow(USERID, id);
				open_chatroom_with_message(USERID, id, $(this)
						.find('button').attr('title'), "hi");
			}
			if ($(this).find('button').text() == "Following") {
				CancelFollow(USERID, id);
				$("button[id='" + id + "']").text("Follow");
			}
		});
$('body')
		.on(
				"click",
				".searchTagUser",
				function() {
					var users = FetchByLookingForTag($(this).attr("title"),
							"0", "20");
					$('.userContainer').remove();
					var borddiv = "<div class='userContainer'><div class='recommendBord'></div></div>";
					$('.containBord').after(borddiv);
					if (users.length == 0) {
						$('.recommendBord').after("<span>没有找到结果</span>");
					} else {
						$.each(users, function(n, user) {
							if (user.ID != USERID) {
								AddUser(user.attributes.name,
										user.attributes.introduce,
										user.lookingForTags, user.ID,
										user.userType,
										user.attributes.avatarLink,
										user.followerIDs,user.attributes.email);
							}
						});
					}

				});
