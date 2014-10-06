function communityClickEvent() {
	$('body').on(
			'click',
			'#communityCreate',
			function() {
				var community = '';
				if ($('#fileupload').val() != "") {
					community = {
						tags : [],
						attributes : {
							name : $('#communityName').val(),
							introduct : $('#communityIntro').val(),
							communityCard : FileUpload(new FormData(
									$('.communityForm')[0]))[0],
							userID : USERID
						},
						communityType : $('#communityType').val()
					};
				} else {
					community = {
						tags : [],
						attributes : {
							name : $('#communityName').val(),
							introduct : $('#communityIntro').val(),
							userID : USERID
						},
						communityType : $('#communityType').val()
					};
				}

				var json = $.toJSON(community);
				if ($('.communityForm')[0].checkValidity()) {
					$('.layer2').fadeIn(300);
					$('#infinite_loader2').fadeIn(300);
					var community = AddCommunity(USERID, json);
					fetchCommunityByID(community.ID);
				}

			});

	// function joinCommunity
	$('body').on(
			'click',
			'.content_join',
			function() {
				var id = $(this).find("input").attr("value");
				if ($(this).css("background-color") == "rgb(255, 255, 255)") {
					JoinCommunity(USERID, id);
					$("div[id='" + id + "']")
							.css("color", "rgb(255, 255, 255)");
					$("div[id='" + id + "']").css("background-color",
							"rgb(66,139,202)");
					$("div[id='" + id + "']").find('span').text("Joined");
					return 0;
				} else {
					LeaveCommunity(USERID, id);
					$("div[id='" + id + "']").css("color", "rgb(66,139,202)");
					$("div[id='" + id + "']").css("background-color",
							"rgb(255, 255, 255)");
					$("div[id='" + id + "']").find('span').text("Join");
					return 0;
				}
			});
}
var homePageSize = "8";
var clickPageSize = "16";
// fetchCommunityByID
function fetchCommunityByID(communityID) {
	var community = FetchCommunityByID(communityID);
	if (community.available == true) {
		addCommunity(community.ID, community.attributes.name,
				community.members.length, "myCommunity",
				community.attributes.communityCard, community.members,
				community.attributes.userID);
	}
}
function fetchCommunityByOwner(pageSize) {
	var communities = FetchCommunityByOwner(USERID, "0", pageSize);
	$.each(communities.reverse(), function(n, community) {
		if (community.available == true) {
			addCommunity(community.ID, community.attributes.name,
					community.members.length, "myCommunity",
					community.attributes.communityCard, community.members,
					community.attributes.userID);
		}
	});
}
function fetchCommunityByJoin(pageSize) {
	var communities = FetchCommunityByJoin(USERID, "0", pageSize);
	$.each(communities.reverse(), function(n, community) {
		if (community.available == true) {
			addCommunity(community.ID, community.attributes.name,
					community.members.length, "myCommunity",
					community.attributes.communityCard, community.members,
					community.attributes.userID);

		}
	});
}
function fetchMyCommunities(pageSize) {
	var communities = FetchMyCommunities(USERID, "0", pageSize);
	$.each(communities.reverse(), function(n, community) {
		if (community.available == true) {
			addCommunity(community.ID, community.attributes.name,
					community.members.length, "myCommunity",
					community.attributes.communityCard, community.members,
					community.attributes.userID);

		}
	});
}
// fetchCommunity()
function fetchHotCommunity(pageSize) {
	var communities = FetchCommunity("0", pageSize);
	$.each(communities.reverse(), function(n, community) {
		if (community.available == true) {
			addCommunity(community.ID, community.attributes.name,
					community.members.length, "discoverCommunity",
					community.attributes.communityCard, community.members,
					community.attributes.userID);
		}
	});
}
function fetchCommunityByType(communityType, pageSize) {
	var communities = FetchCommunityByType(communityType, "0", pageSize);
	$.each(communities.reverse(), function(n, community) {
		if (community.available == true) {
			addCommunity(community.ID, community.attributes.name,
					community.members.length, community.communityType,
					community.attributes.communityCard, community.members,
					community.attributes.userID);
		}
	});
}

// 增加社区
function communities(id, name, memberNum, communityType, communityImg, members,
		ownerID) {
	var memberIDs = [];
	$.each(members, function(n, member) {
		memberIDs.push(member.ID);
	});
	var officalID = [ "13750070105", "13750059219", "13143127771",
			"13750056472", "13728357716", "13286050151", "13631272706",
			"13726285186", "13750044036", "13750057060", "13750066893",
			"13750069327", "13750069659", "13750069678", "13750070025",
			"13750072213", "13750075145", "13750075284", "18666561301" ];
	var officalIcon = "";
	if ($.inArray(ownerID, officalID) != -1) {
		officalIcon = "<span class='officalIcon'><img src='images/offical.png' /><span>";
	}
	var join = "<a><div class='content_join' id='" + id
			+ "'><input type='hidden' value='" + id
			+ "'><span>Join</span></div></a>";
	if ($.inArray(USERID, memberIDs) != -1) {
		join = "<a><div style='color: #FFF;background-color: #428BCA;' class='content_join' id='"
				+ id
				+ "'><input type='hidden' value='"
				+ id
				+ "'><span>Joined</span></div></a>";
	}
	if (ownerID == USERID) {
		join = '';
	}
	var boarddiv = "<div class='content_container'><a><div class='img_container'><input type='hidden' value='"
			+ id
			+ "'><img src='"
			+ $.parseJSON(communityImg).src
			+ "' width='266' height='266' />"
			+ officalIcon
			+ "</div></a><div class='content_info'><div class='conten_head'>"
			+ name
			+ "</div><div class='content_count'>"
			+ memberNum
			+ " members</div>" + join + "</div></div>";
	return boarddiv;
}
function addCommunity(id, name, memberNum, communityType, communityImg,
		members, ownerID) {
	var boarddiv = communities(id, name, memberNum, communityType,
			communityImg, members, ownerID);
	switch (communityType) {
	case "discoverCommunity":
		$(".communityDiscovery").after(boarddiv);
		Msnry('.containerDiscovery', '.content_container', 265);
		break;
	case "ACADEMIC":
		$(".communityAcademic").after(boarddiv);
		Msnry('.containerAcademic', '.content_container', 265);
		break;
	case "myCommunity":
		$(".myCommunity").after(boarddiv);
		Msnry('.containerMy', '.content_container', 265);
		break;
	case "ATHLETIC":
		$(".athleticCommunity").after(boarddiv);
		Msnry('.containerAthletic', '.content_container', 265);
		break;
	case "STUDENTUNION":
		$(".schoolUnionCommunity").after(boarddiv);
		Msnry('.containerSchool', '.content_container', 265);
		break;
	case "ENTERTAINMENT":
		$(".entertainmentCommunity").after(boarddiv);
		Msnry('.containerEntertainment', '.content_container', 265);
		break;
	case "searchCommunity":
		$(".searchCommunity").after(boarddiv);
		Msnry('.containerSearch', '.content_container', 265);
		break;
	}
}
function fetchByType(communityType, communityTypeName, containerName) {
	$('.container_community').remove();
	var communityContainer = '<div class="container container_community"><div class="'
			+ containerName
			+ '"><div class="'
			+ communityType
			+ '"></div></div></div>';
	$('.communitySideBar').after(communityContainer);
}
$(document).ready(
		function() {
			// funtion sessionID
			$('body').on("click", ".img_container", function() {
				var comm = $(this).find("input").attr("value");
				window.location.href = 'communityOwnerPage.jsp?' + comm;
			});
			$('body').on('click', '.userSearch', function() {
				searchCommunity();
			});
			$('body').on('keydown', '.searchInput', function(event) {
				if (event.keyCode == 13) {
					searchCommunity();
				}
			});
			function searchCommunity() {
				if ($('.searchInput').val() != "") {
					var communityInfo = encodeURI($('.searchInput').val());
					var communities = SearchCommunity(communityInfo, "0", "5");

					if ($.toJSON(communities[0]) != '{}') {
						$('.searchInput').val("");
						$('.searchInput').blur();
						fetchByType("searchCommunity", "", "containerSearch");
						$.each(communities, function(n, community) {
							addCommunity(community.ID,
									community.attributes.name,
									community.members.length,
									"searchCommunity",
									community.attributes.communityCard,
									community.members,community.attributes.userID);
						});
					}
				}
			}
		});