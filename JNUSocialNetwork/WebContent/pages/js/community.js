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
	$.each(communities, function(n, community) {
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
	$.each(communities, function(n, community) {
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
	$.each(communities, function(n, community) {
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
	$.each(communities, function(n, community) {
		if (community.available == true) {
			addCommunity(community.ID, community.attributes.name,
					community.members.length, community.communityType,
					community.attributes.communityCard, community.members,
					community.attributes.userID);
		}
	});
}
function fetchCommunitys() {
	fetchHotCommunity(homePageSize);
	fetchCommunityByType("FOLK", homePageSize);
	fetchCommunityByType("SCHOOLUNION", homePageSize);
	// fetchCommunityByType("OFFICIAL",homePageSize);
}
// 增加社区
function communities(id, name, memberNum, communityType, communityImg, members,
		ownerID) {
	var memberIDs = [];
	$.each(members, function(n, member) {
		memberIDs.push(member.ID);
	});
	var officalID = ["13286050151","13631272706","13726285186","13750044036","13750057060","13750066893","13750069327","13750069659","13750069678","13750070025","13750072213","13750075145","13750075284","18666561301"];
	var officalIcon="";
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
			+ "' width='266' height='266' />"+officalIcon+"</div></a><div class='content_info'><div class='conten_head'>"
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
	case "myCommunity":
		$(".myCommunity").after(boarddiv);
		Msnry('.containerMy', '.content_container', 265);
		break;
	/*
	 * case "OFFICIAL": $(".officalCommunity").after(boarddiv);
	 * Msnry('.containerOffical', '.content_container', 265); break;
	 */
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
					$('body')
							.on(
									"click",
									".img_container",
									function() {
										var comm = $(this).find("input").attr(
												"value");
										window.location.href = 'communityOwnerPage.jsp?'
												+ comm;
									});

					$('body').on(
							"click",
							".myCommunityBtn",
							function() {
								fetchByType("myCommunity", "我的社区",
										"containerMy");
								$('.titleMy').css("display", "block");
								$('.containerMy').css("display", "block");
								fetchCommunityByJoin("15");
								fetchCommunityByOwner("1");
								var communities = FetchCommunityByJoin(USERID,
										$('.content_container').length,
										clickPageSize);
								scrollType(communities, "myCommunity");
							});
					/*
					 * $('body').on( "click", ".officalCommunityBtn", function() {
					 * fetchByType("officalCommunity", "官方社区",
					 * "containerOffical");
					 * fetchCommunityByType("OFFICIAL","15"); var communities =
					 * FetchCommunityByType("OFFICIAL",
					 * $('.content_container').length,clickPageSize);
					 * scrollType(communities,"OFFICIAL"); });
					 */
					$('body').on(
							"click",
							".studentUnionCommunityBtn",
							function() {
								fetchByType("schoolUnionCommunity", "社团组织",
										"containerSchool");
								fetchCommunityByType("SCHOOLUNION",
										clickPageSize);
								var communities = FetchCommunityByType(
										"SCHOOLUNION",
										$('.content_container').length,
										clickPageSize);
								scrollType(communities, "SCHOOLUNION");
							});
					$('body').on(
							"click",
							".folkCommunityBtn",
							function() {
								fetchByType("folkCommunity", "个人社区",
										"containerFolk");
								fetchCommunityByType("FOLK", clickPageSize);
								var communities = FetchCommunityByType("FOLK",
										$('.content_container').length,
										clickPageSize);
								scrollType(communities, "FOLK");
							});
					$('body').on(
							"click",
							".discoverCommunityBtn",
							function() {
								fetchByType("communityDiscovery", "热门社区",
										"containerDiscovery");
								fetchHotCommunity(clickPageSize);
								var communities = FetchCommunityByType("FOLK",
										$('.content_container').length,
										clickPageSize);
								scrollType(communities, "FOLK");
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
														"<input style='font-size:14px;' class='searchInput' placeholder='请输入社区名' maxLength='30'>");
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
function scrollType(response, communityType) {
	$(window)
			.scroll(
					function() {
						if ($(window).scrollTop() == $(document).height()
								- window.windowHeight) {
							$('div#infinite_loader').show();
							$.each(response, function(n, community) {
								var boarddiv = communities(community.ID,
										community.attributes.name,
										community.members.length,
										community.communityType,
										community.attributes.communityCard,
										community.members,
										community.attributes.userID);
								switch (communityType) {
								case "discoverCommunity":
									$(".communityDiscovery").after(boarddiv);
									Msnry('.containerDiscovery',
											'.content_container', 265);
									break;
								case "myCommunity":
									$(".containerMy").append(boarddiv);
									Msnry('.containerMy', '.content_container',
											265);
									break;
								/*
								 * case "OFFICIAL":
								 * $(".containerOffical").append(boarddiv);
								 * Msnry('.containerOffical',
								 * '.content_container', 265); break;
								 */
								case "SCHOOLUNION":
									$(".containerSchool").append(boarddiv);
									Msnry('.containerSchool',
											'.content_container', 265);
									break;
								case "FOLK":
									$(".containerFolk").append(boarddiv);
									Msnry('.containerFolk',
											'.content_container', 265);
									break;
								case "searchCommunity":
									$(".containerSearch").append(boarddiv);
									Msnry('.containerSearch',
											'.content_container', 265);
									break;
								}
							});
							if (response.length == "15") {
								$('div#infinite_loader').hide();
							} else {
								$('div#infinite_loader')
										.replaceWith(
												'<div id="no_more_infinite_load"><span>no more</span></div>');
								$(window).unbind("scroll");
							}

						}
					});
}