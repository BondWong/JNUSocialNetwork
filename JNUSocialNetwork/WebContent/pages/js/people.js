function pHot() {
	var users = FetchRandom("0", "5");
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs);
	});
}
function pRandom() {
	var users = FetchRandom("0", "5");
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs);
	});
}
function PinCommon() {
	var users = RecommendateViaFollowee(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs);
	});
}
function pCampus() {
	var users = RecommendateViaInstitution(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs);
	});
}
function pMajor() {
	var users = RecommendateViaMajor(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs);
	});
}
function pSeason() {
	var users = RecommendateViaSession(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs);
	});
}
function pClass() {
	var users = RecommendateViaClass(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.introduce,
				user.lookingForTags, user.ID, user.userType,
				user.attributes.avatarLink, user.followerIDs);
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
						user.attributes.avatarLink, user.followerIDs);
			});
		} else {
			$('.recommendBord').after("<span>没有找到结果</span>");
		}
	}
}

function AddUser(name, looking, tags, id, userType, avatarLink, followerIDs) {
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
	var boarddiv = "<div class='userCard'><img height='170' width='170' src='"
			+ $.parseJSON(avatarLink).src
			+ "' ><p class='recommendName'><a id=" + id + " class='tipUser2'>"
			+ name + "</a></p>" + pIn
			+ "<div class='recommendBtn'><button  id=" + id
			+ " class='btn btn-danger followBtn' title='" + name + "'>"
			+ followTxt + "</button></div></div>";
	$(".recommendBord").after(boarddiv);
	Msnry('.userContainer', '.userCard', 200);
}
$('body').on("click", ".tipUser2", function() {
	window.location.href = 'profile.jsp?nav=about&' + $(this).attr("id");
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
										user.followerIDs);
							}
						});
					}

				});
