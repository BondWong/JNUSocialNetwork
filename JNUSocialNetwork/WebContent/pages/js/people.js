function pHot() {
	var users = Recommendate("0", "5");
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor, user.ID,
				user.attributes.avatarLink);
	});
}
function PinCommon() {
	var users = RecommendateViaFollowee(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor, user.ID,
				user.attributes.avatarLink);
	});
}
function pCampus() {
	var users = RecommendateViaCampus(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor, user.ID,
				user.attributes.avatarLink);
	});
}
function pMajor() {
	var users = RecommendateViaMajor(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor, user.ID,
				user.attributes.avatarLink);
	});
}
function pSeason() {
	var users = RecommendateViaSession(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor, user.ID,
				user.attributes.avatarLink);
	});
}
function pClass() {
	var users = RecommendateViaClass(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor, user.ID,
				user.attributes.avatarLink);
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
}
var search_user_input_value = "";
$('body')
		.on(
				'click',
				'.searchUser',
				function() {
					$(this)
							.replaceWith(
									"<input class='searchInput' placeholder='name or id or sex ' maxLength='20'>");
					$('.searchInput').focus();
					$('.searchInput')
							.blur(
									function() {
										search_user_input_value = $(this).val();
										$(this)
												.replaceWith(
														"<span class='searchUser'>Search for anyone</span>");
									});
				});
$('body')
		.on(
				'click',
				'.userSearch',
				function() {
					if (search_user_input_value != "") {
						var userInfo = encodeURI(search_user_input_value);
						$('.userContainer').remove();
						var borddiv = "<div class='userContainer'><div class='recommendBord'></div></div>";
						$('.containBord').after(borddiv);
						var users = SearchMember(userInfo, "0", "5");
						if (users.length != 0) {
							$.each(users, function(n, user) {
								AddUser(user.attributes.name,
										user.attributes.lookingFor, user.ID,
										user.attributes.avatarLink);
							});
						}
					}

				});

function AddUser(name, looking, id, avatarLink) {
	var boarddiv = "<div class='userCard'><img onload='javascript:auto_resize(170, 170, this)' src='"
			+ avatarLink
			+ "' style='display: none'><p class='recommendName'>"
			+ name
			+ "</p><p class='recommendLooking'>"
			+ looking
			+ "</p><div class='recommendBtn'><button  id="
			+ id
			+ " class='btn btn-danger followBtn'>Follow</button></div></div>";
	$(".recommendBord").after(boarddiv);
	Msnry('.userContainer', '.userCard', 200);
}
$('body').on("click", ".recommendBtn", function() {
	var id = $(this).find('button').attr('id');
	if ($(this).find('button').text() == "Follow") {
		Follow(USERID, id);
	}
	if ($(this).find('button').text() == "Following") {
		CancelFollow(USERID, id);
		$("button[id='" + id + "']").text("Follow");
	}
});