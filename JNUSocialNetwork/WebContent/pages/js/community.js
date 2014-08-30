function communityClickEvent() {
	$('body').on('click', '#communityCreate', function() {
		var communityC;
		if ($('#fileupload').val() != "") {
			communityC = FileUpload(new FormData($('.communityForm')[0]))[0];
		} else {
			communityC = 'images/default/default-community-card.png';
		}
		var community = {
			tags : [],
			attributes : {
				name : $('#communityName').val(),
				introduct : $('#communityIntro').val(),
				communityCard : communityC,
				userID : USERID
			},
			communityType : $('#communityType').val()
		};
		var json = $.toJSON(community);
		var community = AddCommunity(USERID, json);
		fetchCommunityByID(community.ID);
		$('#createCommunity').modal('hide');
		$('.communityForm').get(0).reset();
	});

	// function joinCommunity
	$('body').on('click', '.content_join', function() {
		var id = $(this).find("input").attr("value");
		if ($(this).css("background-color") == "rgb(255, 255, 255)") {
			JoinCommunity(USERID, id);
			$("div[id='"+id+"']").css("color", "rgb(255, 255, 255)");
			$("div[id='"+id+"']").css("background-color", "rgb(66,139,202)");
			return 0;
		} else {
			LeaveCommunity(USERID, id);
			$("div[id='"+id+"']").css("color", "rgb(66,139,202)");
			$("div[id='"+id+"']").css("background-color", "rgb(255, 255, 255)");
			return 0;
		}
	});
}
// fetchCommunityByID
function fetchCommunityByID(communityID) {
	var community = FetchCommunityByID(communityID);
	if (community.available == true) {
		addCommunity(community.ID, community.attributes.name,
				community.members.length, "myCommunity",
				community.attributes.communityCard, community.members);
	}
}
function fetchCommunityByOwner() {
	var communities = FetchCommunityByOwner(USERID, "0", "8");
	$.each(communities, function(n, community) {
		if (community.available == true) {
			addCommunity(community.ID, community.attributes.name,
					community.members.length, "myCommunity",
					community.attributes.communityCard, community.members);
		}
	});
}
function fetchCommunityByJoin() {
	var communities = FetchCommunityByJoin(USERID, "0", "8");
	$.each(communities, function(n, community) {
		if (community.available == true) {
			addCommunity(community.ID, community.attributes.name,
					community.members.length, "myCommunity",
					community.attributes.communityCard, community.members);
		}
	});
}
// fetchCommunity()
function fetchHotCommunity() {
	var communities = FetchCommunity("0", "8");
	$.each(communities, function(n, community) {
		if (community.available == true) {
			addCommunity(community.ID, community.attributes.name,
					community.members.length, "discoverCommunity",
					community.attributes.communityCard, community.members);
		}
	});
}
function fetchCommunityByType(communityType) {
	var communities = FetchCommunityByType(communityType, "0", "8");
	$.each(communities, function(n, community) {
		if (community.available == true) {
			addCommunity(community.ID, community.attributes.name,
					community.members.length, community.communityType,
					community.attributes.communityCard, community.members);
		}
	});
}
function fetchCommunitys() {
	fetchHotCommunity();
	fetchCommunityByType("FOLK");
	fetchCommunityByType("SCHOOLUNION");
	fetchCommunityByType("OFFICIAL");

}
// 增加社区
function addCommunity(id, name, memberNum, communityType, communityImg, members) {
	var memberIDs = [];
	$.each(members, function(n, member) {
		memberIDs.push(member.ID);
	});
	var joinClass = "";
	if ($.inArray(USERID, memberIDs) != -1) {
		joinClass = "style='color: #FFF;background-color: #428BCA;'";
	}
	var boarddiv = "<div class='content_container'><a><div class='img_container'><input type='hidden' value='"
			+ id
			+ "'><img src='"
			+ communityImg
			+ "' onload='javascript:auto_resize(267, 267, this)' style='display: none'/></div></a><div class='content_info'><div class='conten_head'>"
			+ name
			+ "</div><div class='content_count'>"
			+ memberNum
			+ " members</div><a><div "+joinClass+" class='content_join' id='"+id+"'><input type='hidden' value='"
			+ id + "'>Join</div></a></div></div>";
	switch (communityType) {
	case "discoverCommunity":
		$(".communityDiscovery").after(boarddiv);
		Msnry('.containerDiscovery', '.content_container', 265);
		break;
	case "myCommunity":
		$(".myCommunity").after(boarddiv);
		Msnry('.containerMy', '.content_container', 265);
		break;
	case "OFFICIAL":
		$(".officalCommunity").after(boarddiv);
		Msnry('.containerOffical', '.content_container', 265);
		break;
	case "SCHOOLUNION":
		$(".schoolUnionCommunity").after(boarddiv);
		Msnry('.containerSchool', '.content_container', 265);
		break;
	case "FOLK":
		$(".folkCommunity").after(boarddiv);
		Msnry('.containerFolk', '.content_container', 265);
		break;
	case "searchCommunity":
		$(".searchCommunity").after(boarddiv);
		Msnry('.containerSearch', '.content_container', 265);
		break;
	}
}
function fetchByType(communityType, communityTypeName, containerName) {
	$('.container_community').remove();
	var communityContainer = '<div class="container container_community"><div class="communityGroupTitle"><h3>'
			+ communityTypeName
			+ '</h3></div><div class="container '
			+ containerName
			+ '"><div class="'
			+ communityType
			+ '"></div></div></div>';
	$('.communitySideBar').after(communityContainer);
}
$(document)
		.ready(
				function() {
					// funtion sessionID
					$('body').on("click", ".img_container", function() {
						var comm = $(this).find("input").attr("value");
						window.location.href = 'communityShow.jsp?' + comm;
					});
					
					$('body').on("click", ".myCommunityBtn", function() {
						fetchByType("myCommunity", "我的社区", "containerMy");
						$('.titleMy').css("display", "block");
						$('.containerMy').css("display", "block");
						fetchCommunityByJoin();
						fetchCommunityByOwner();
					});
					$('body').on(
							"click",
							".officalCommunityBtn",
							function() {
								fetchByType("officalCommunity", "官方社区",
										"containerOffical");
								fetchCommunityByType("OFFICIAL");
							});
					$('body').on(
							"click",
							".studentUnionCommunityBtn",
							function() {
								fetchByType("schoolUnionCommunity", "社团组织",
										"containerSchool");
								fetchCommunityByType("SCHOOLUNION");
							});
					$('body').on("click", ".folkCommunityBtn", function() {
						fetchByType("folkCommunity", "个人社区", "containerFolk");
						fetchCommunityByType("FOLK");
					});
					$('body').on(
							"click",
							".discoverCommunityBtn",
							function() {
								fetchByType("communityDiscovery", "热门社区",
										"containerDiscovery");
								fetchHotCommunity();
							});
					$('body')
							.on(
									"click",
									".searchCommunityBtn",
									function() {
										fetchByType(
												"searchCommunity",
												"<div class='searchCommunityBody'><span class='glyphicon glyphicon-search glyphicon-search-custom communitySearch' style='cursor: pointer;'></span> <span class='searchCommunityInput'>搜索社区</span></div> ",
												"containerSearch");

									});
					$('body')
							.on(
									'click',
									'.searchCommunityInput',
									function() {
										$(this)
												.replaceWith(
														"<input style='font-size:14px;' class='searchInput' placeholder='请输入社区名' >");
										$('.searchInput').focus();
										$('.searchInput')
												.blur(
														function() {
															search_user_input_value = $(
																	this).val();
															$(this)
																	.replaceWith(
																			"<span class='searchCommunityInput'>搜索社区</span>");
														});
									});
					$('body')
							.on(
									'click',
									'.communitySearch',
									function() {
										var communityInfo = encodeURI(search_user_input_value);
										var communities = SearchCommunity(
												communityInfo, "0", "5");
										$
												.each(
														communities,
														function(n, community) {
															addCommunity(
																	community.ID,
																	community.attributes.name,
																	community.members.length,
																	"searchCommunity",
																	community.attributes.communityCard,
																	community.members);
														});
									});

				});
