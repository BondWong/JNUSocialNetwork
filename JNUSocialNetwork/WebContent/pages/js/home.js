if (BrowserDetection() != false) {
	var alert = "<div class='modal fade' id='browserDetection' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title'>检测到你浏览器的版本过低，有可能影响网站效果哦</h4></div><div class='modal-body modal-custom'><a data-dismiss='modal' type='button' class='btn btn-primary' >我知道了</a></div></div></div></div>";
	var button = "<button  data-toggle='modal' class='browserClick' data-target='#browserDetection'></button>";
	$('body').append(button);
	$('body').append(alert);
	$('.browserClick').click();
}/*
	 * var hoverTimer, outTimer; $(".home-nav").hover(function(){
	 * clearTimeout(outTimer); hoverTimer = setTimeout(function(){
	 * $(".home-nav").animate({height:"100px"});
	 * $('.show-bar').css("display","inline-block"); } ,500);
	 * 
	 * },function(){ clearTimeout(hoverTimer); outTimer = setTimeout(function(){
	 * $(".home-nav").animate({height:"50px"});
	 * $('.show-bar').css("display","none"); },300); });
	 */
$('body').on('click', '.communityO', function() {
	window.location.href = "community.jsp?nav=official";
});
$('body').on('click', '.communityD', function() {
	window.location.href = "community.jsp?nav=discovery";
});
$('body').on('click', '.applyCommunity', function() {
	window.location.href = "applyCommunity.jsp";
});
$('body').on('click', '.activityA', function() {
	window.location.href = "activity.jsp?nav=discovery";
});
$('body').on('click', '.activityC', function() {
	window.location.href = "circle.jsp";
});
$('body').on('click', '.hrefIntro', function() {
	window.location.href = "aboutUs.jsp";
});
$('body').on('click', '.loneUser', function() {
	window.open('profile.jsp?nav=about&' + $(this).attr("id"));
});
function addCommunity(id, name, memberNum, communityImg, introduce, ownerID) {
	var imageC = $.parseJSON(communityImg).src;
	if ($.parseJSON(communityImg).thumbnail != undefined) {
		imageC = $.parseJSON($.parseJSON(communityImg).thumbnail).src;
	}
	var boarddiv = "<li class='communityShowItem'><div class='community_container'><a><div class='img_container'><input type='hidden' value='"
			+ id
			+ "'><img src='"
			+ imageC
			+ "' width='267' height='267' /></div></a><div class='content_info'><div class='conten_head'>"
			+ name
			+ "</div><div class='content_count'>"
			+ memberNum
			+ " members</div></div><div class='content_tips'><p>"
			+ introduce
			+ "</p></div></div></div>";

	$('.communityBoard').after(boarddiv);
	$('.community_container').hover(function() {
		$(this).find('.content_info').animate({
			opacity : 0
		}, "fast");
		$(this).find('.content_tips').animate({
			opacity : 1
		}, "fast");
	}, function() {
		$(this).find('.content_info').animate({
			opacity : 1
		}, "fast");
		$(this).find('.content_tips').animate({
			opacity : 0
		}, "fast");
	});
}

function fetchHotCommunity() {
	var communities = FetchCommunity("0", "8");
	$.each(communities.reverse(),
			function(n, community) {
				if (community.available == true) {
					addCommunity(community.ID, community.attributes.name,
							community.members.length,
							community.attributes.communityCard,
							community.attributes.introduct,
							community.attributes.userID);
				}
			});
}
function fetchLonelySouls() {

	var users = FetchLonelySouls(11);

	$.each(users.reverse(), function(n, user) {
		if (user.available == true) {
			addUser();
		}
	});
}
function addUser() {

	// $('.userBoard').after(boarddiv);
}
$('body').on("click", ".img_container", function() {
	var comm = $(this).find("input").attr("value");
	window.location.href = 'communityShow.jsp?' + comm;
});

/**
 * auto_resize
 */
function auto_resize(maxWidth, maxHeight, srcImage) {
	var image = new Image();
	image.src = srcImage.src;
	if (image.width > maxWidth && image.height <= maxHeight) {
		image.width = maxWidth;
		image.height = (maxHeight / maxWidth) * image.width;
	} else if (image.height > maxHeight && image.width <= maxWidth) {
		image.height = maxHeight;
		image.width = (maxWidth / maxHeight) * image.height;
	} else if (image.height > maxHeight && image.width > maxWidth) {
		var intervalWidth = image.width - maxWidth;
		var intervalHeight = image.height - maxHeight;
		if (intervalWidth >= intervalHeight) {
			image.width = maxWidth;
			image.height = (maxHeight / maxWidth) * image.width;
		} else {
			image.height = maxHeight;
			image.width = (maxWidth / maxHeight) * image.height;
		}
	}

	srcImage.width = image.width;
	srcImage.height = image.height;
	$(srcImage).fadeIn("fast");
}

// texts-ad-js 使用：push记录即可
$(document)
		.ready(
				function() {

					var textList = new Array();
					var easingtime = 200;
					if (textList.length === 0) {
						init();
					}
					function init() {

						$('.texts-ad-body').empty();
						textList
								.push({
									title : 'To Be Warm 社区开启！',
									url : 'http://campusite.com.cn/pages/communityShow.jsp?1415010467533'
								});
						textList
								.push({
									title : 'Running Man 社区开启！',
									url : 'http://campusite.com.cn/pages/communityShow.jsp?1416360968810'
								});
						textList
								.push({
									title : '暨大表白墙 爱需要勇气！',
									url : 'http://campusite.com.cn/pages/communityShow.jsp?1411092566183'
								});
						textList
								.push({
									title : '【益箩筐】“益彩画”公益涂鸦系列活动',
									url : 'http://campusite.com.cn/pages/activityShow.jsp?1411094627377&1416667468313'
								});
						textList
								.push({
									title : '【Running Man】第一期 Running Man 候补召集！',
									url : 'http://campusite.com.cn/pages/activityShow.jsp?1416360968810&1416447822779'
								});
						if (textList.length == 0) {
							var alertbox = $('<div class="alert alert-info" style="width: 91%;height:70px;padding-top:25px; text-align: center;margin-top:70px;background-color:rgba(0,0,0,0.5);border:none;color:#cccccc">还没有任何咨询哦！</div>');
							alertbox.appendTo($('.texts-ad-body'));
						} else {
							var page1size = textList.length > 5 ? 5
									: textList.length;
							for (var i = 0; i < page1size; i++) {
								var textUrl = $("<li><a data="
										+ i
										+ " class='texts-ad-url' href='"
										+ textList[i].url
										+ "'>"
										+ (textList[i].title.length > 15 ? textList[i].title
												.substr(0, 15)
												+ "..."
												: textList[i].title)
										+ "</a></li>");

								textUrl.appendTo($('.texts-ad-body'));
								$('<hr class="texts-ad-hr"/>').appendTo(
										$('.texts-ad-body'));
							}
							var pageNum = Math.ceil($
									.parseJSON(textList.length / 5));
							var pageCurrent = 1;
							function pageRun(index) {
								if (index == pageCurrent) {
									return;
								}
								var pagensize = textList.length - (index - 1)
										* 5 > 5 ? 5 : textList.length
										- (index - 1) * 5;
								$('.texts-ad-body')
										.animate(
												{
													opacity : '0'
												},
												easingtime,
												function() {
													$('.texts-ad-body').empty();
													for (var i = (index - 1) * 5; i < (index - 1)
															* 5 + pagensize; i++) {
														var textUrl = $("<li><a data="
																+ i
																+ " class='texts-ad-url' href='"
																+ textList[i].url
																+ "'>"
																+ (textList[i].title.length > 28 ? textList[i].title
																		.substr(
																				0,
																				28)
																		+ "..."
																		: textList[i].title)
																+ "</a></li>");
														textUrl
																.appendTo($('.texts-ad-body'));
														$(
																'<hr class="texts-ad-hr"/>')
																.appendTo(
																		$('.texts-ad-body'));
													}

												});
								$('.texts-ad-body').animate({
									opacity : '1'
								}, easingtime);
								pageCurrent = index;
							}
							;
							$('#texts-ad-pagination').twbsPagination({
								totalPages : pageNum,
								visiblePages : 1,
								version : '1.1',
								paginationClass : 'pagination-custom-1',
								onPageClick : function(event, page) {
									pageRun(page);
								}
							});

						}
					}
				});

// lonely-souls-js 所有内容放进Ajax的成功回调，并插入真实数据即可
$(document)
		.ready(
				function() {
					var userBoard = $('.userBoard');
					var lonelySouls = new Array();
					function createLonelyUserDiv(id, name, headSrc, tags) {
						return $(
								'<div class="loneUser" id="'
										+ id
										+ '"><div class="loneUsersHeadContainer"><img class="loneUsersHead" src="'
										+ headSrc
										+ '"/></div><div class="loneUsersName">'
										+ name
										+ '</div><div class="loneUsersTags">'
										+ tags[0] + ', ' + tags[1]
										+ '</div></div>').css({
							'top' : userBoard.offset().top + 150,
							'left' : userBoard.offset().left + 100,
							'display' : 'block'
						});
					}
					var users = FetchLonelySouls(11);

					$
							.each(
									users.reverse(),
									function(n, user) {
										if (user.available == true) {
											var imageAC = $
													.parseJSON(user.attributes.avatarLink).src;
											if ($
													.parseJSON(user.attributes.avatarLink).thumbnail != undefined) {
												imageAC = $
														.parseJSON($
																.parseJSON(user.attributes.avatarLink).thumbnail).src;
											}
											lonelySouls
													.push(createLonelyUserDiv(
															user.ID,
															user.attributes.name,
															imageAC,
															user.lookingForTags)
															.appendTo(userBoard));
										}
									});
					function unFold(index) {
						if (index > 0) {

							lonelySouls[index].css({
								left : $(
										'.loneUserPlaceHolder[place=' + index
												+ ']').offset().left,
								top : $(
										'.loneUserPlaceHolder[place=' + index
												+ ']').offset().top
							});
							unFold(index - 1);

						} else if (index === 0) {
							lonelySouls[index]
									.css(
											{
												height : '+=100',
												width : '+=100',
												top : $(
														'.loneUserPlaceHolder[place=1]')
														.offset().top,
												left : '-=30'
											}).children('.loneUsersName')
									.show().siblings('.loneUsersTags').show();

							var masks = new Array();
							for (var i = 1; i < lonelySouls.length; i++) {
								masks[i] = $(
										'<div class="loneUserMask" place="' + i
												+ '"></div>')
										.css({
											'height' : '40px',
											'width' : lonelySouls[i].width(),
											'left' : '0',
											'top' : '0',
											'opacity' : '0'
										})
										.appendTo(
												lonelySouls[i]
														.children('.loneUsersHeadContainer'));
								if (i > 0) {
									lonelySouls[i].children('.loneUsersName')
											.css({
												'left' : 5,
												'top' : 0
											});
									lonelySouls[i].children('.loneUsersTags')
											.css({
												'left' : 0,
												'top' : 0,
												'color' : '#ffffff'
											}).appendTo(masks[i]);
								}

							}

							$('.loneUsersHeadContainer').mouseleave(
									function(e) {
										var target = $(e.target);
										if (!target.hasClass('loneUserMask')) {
											target = target
													.siblings(".loneUserMask");
										}
										target.animate({
											opacity : '0',
											top : '0px'
										}, 300);
									});
							$('.loneUsersHeadContainer').mouseenter(
									function(e) {
										var target = $(e.target);
										if (!target.hasClass('loneUserMask')) {
											target = target
													.siblings(".loneUserMask");
										}

										target.animate({
											opacity : '1',
											top : '-40px'
										}, 300);
									});

						}
					}

					unFold(lonelySouls.length - 1);

				});
