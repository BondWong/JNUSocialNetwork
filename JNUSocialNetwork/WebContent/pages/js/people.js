function pHot() {
	var users = Recommendate("0", "5");
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor);
	});
}
function PinCommon() {
	var users = RecommendateViaFollowee(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor);
	});
}
function pCampus() {
	var users = RecommendateViaCampus(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor);
	});
}
function pMajor() {
	var users = RecommendateViaMajor(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor);
	});
}
function pSeason() {
	var users = RecommendateViaSession(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor);
	});
}
function pClass() {
	var users = RecommendateViaClass(USERID);
	$.each(users, function(n, user) {
		AddUser(user.attributes.name, user.attributes.lookingFor);
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

$('body')
		.on(
				'click',
				'.searchUser',
				function() {
					$(this)
							.replaceWith(
									"<input class='searchInput' placeholder='name or id or sex ' >");
					$('.searchInput').focus();
					$('.searchInput')
							.blur(
									function() {
										$(this)
												.replaceWith(
														"<span class='searchUser'>Search for anyone</span>");
									});

				});
$('body')
		.on(
				'click',
				'.glyphicon-search-custom',
				function() {
					var userInfo = encodeURI($('.searchInput').val());
					$('.userContainer').remove();
					var borddiv = "<div class='userContainer'><div class='recommendBord'></div></div>";
					$('.containBord').after(borddiv);
					var users = SearchMember(USERID, userInfo, "0", "5");
					$.each(users, function(n, user) {
						AddUser(user.attributes.name,
								user.attributes.lookingFor);
					});
				});

function AddUser(name, looking) {
	var boarddiv = "<div class='userCard'><img src='images/userRecomm.jpg' width='200px'><p class='recommendName'>"
			+ name
			+ "</p><p class='recommendLooking'>"
			+ looking
			+ "</p><div class='recommendBtn'><button class='btn btn-default recommendAdd'  id='followBtn'>+<span class='glyphicon glyphicon-user' >&nbsp;Follow</span></button></div></div>";
	$(".recommendBord").after(boarddiv);
	Msnry('.userContainer', '.userCard', 200);
}
