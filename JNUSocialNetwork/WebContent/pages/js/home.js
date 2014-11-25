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

function addCommunity(id, name, memberNum, communityImg, introduce, ownerID) {
	var boarddiv = "<li class='communityShowItem'><div class='community_container'><a><div class='img_container'><input type='hidden' value='"
			+ id
			+ "'><img src='"
			+ $.parseJSON(communityImg).src
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
									title : 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext',
									url : '#'
								});
						textList.push({
							title : 'text test 2',
							url : '#'
						});
						textList.push({
							title : 'text test 3',
							url : '#'
						});
						textList.push({
							title : 'text test 4',
							url : '#'
						});
						textList.push({
							title : 'text test 5',
							url : '#'
						});
						textList
								.push({
									title : 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext',
									url : '#'
								});
						textList.push({
							title : 'text test 7',
							url : '#'
						});
						textList.push({
							title : 'text test 8',
							url : '#'
						});
						textList.push({
							title : 'text test 9',
							url : '#'
						});
						textList.push({
							title : 'text test 10',
							url : '#'
						});
						textList.push({
							title : 'text test 111',
							url : '#'
						});
						textList.push({
							title : 'text test 12',
							url : '#'
						});
						textList.push({
							title : 'text test 13',
							url : '#'
						});
						textList.push({
							title : 'text test 14',
							url : '#'
						});
						if (textList.length == 0) {
							var alertbox = $('<div class="alert alert-info" style="width: 91%;height:70px;padding-top:25px; text-align: center;margin-top:70px;background-color:rgba(0,0,0,0.5);border:none;color:#cccccc">还没有任何咨询哦！</div>');
							alertbox.appendTo($('.texts-ad-body'));
						} else {
							var page1size = textList.length > 5 ? 5
									: textList.length;
							for (var i = 0; i < page1size; i++) {
								var textUrl = $("<a data="
										+ i
										+ " class='texts-ad-url' href='"
										+ textList[i].url
										+ "'>"
										+ (textList[i].title.length > 30 ? textList[i].title
												.substr(0, 30)
												+ "..."
												: textList[i].title) + "</a>");

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
														var textUrl = $("<a data="
																+ i
																+ " class='texts-ad-url' href='"
																+ textList[i].url
																+ "'>"
																+ (textList[i].title.length > 30 ? textList[i].title
																		.substr(
																				0,
																				30)
																		+ "..."
																		: textList[i].title)
																+ "</a>");
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
$(document).ready(
		function() {
			var showAllSpeed = 200;
			var userBoard = $('.userBoard');
			var lonelySouls = new Array();
			var isFold = true;

			function createLonelyUserDiv(name, headSrc, tags) {
				return $(
						'<div class="loneUser"><img class="loneUsersHead" src="'
								+ headSrc + '"/><div class="loneUsersName">'
								+ name + '</div><div class="loneUsersTags">'
								+ tags[0] + ', ' + tags[1] + '</div></div>')
						.css({
							'top' : userBoard.offset().top + 150,
							'left' : userBoard.offset().left + 100,
							'display':'none'
						});
			}
			lonelySouls.push(createLonelyUserDiv('Liu Weixiong',
					'./images/founder-avatar/lwx.png', [ '唱歌', '跳舞' ])
					.appendTo(userBoard));
			lonelySouls.push(createLonelyUserDiv('Huang Junbang',
					'./images/founder-avatar/hjb.png',
					[ '唱歌唱歌唱歌唱歌', '跳舞跳舞跳舞跳舞' ]).appendTo(userBoard));
			lonelySouls.push(createLonelyUserDiv('Liu Weixiong',
					'./images/founder-avatar/lwx.png', [ '唱歌', '跳舞' ])
					.appendTo(userBoard));
			lonelySouls.push(createLonelyUserDiv('Huang Junbang',
					'./images/founder-avatar/hjb.png',
					[ '唱歌唱歌唱歌唱歌', '跳舞跳舞跳舞跳舞' ]).appendTo(userBoard));
			lonelySouls.push(createLonelyUserDiv('Liu Weixiong',
					'./images/founder-avatar/lwx.png', [ '唱歌', '跳舞' ])
					.appendTo(userBoard));
			lonelySouls.push(createLonelyUserDiv(
					'Huang 123123Junbang12331231212321',
					'./images/founder-avatar/hjb.png',
					[ '唱歌唱歌唱歌唱歌', '跳舞跳舞跳舞跳舞' ]).appendTo(userBoard));
			lonelySouls.push(createLonelyUserDiv('Liu Weixiong',
					'./images/founder-avatar/lwx.png', [ '唱歌', '跳舞' ])
					.appendTo(userBoard));
			lonelySouls.push(createLonelyUserDiv('Huang Junbang',
					'./images/founder-avatar/hjb.png',
					[ '唱歌唱歌唱歌唱歌', '跳舞跳舞跳舞跳舞' ]).appendTo(userBoard));
			lonelySouls.push(createLonelyUserDiv('Liu Weixiong',
					'./images/founder-avatar/lwx.png', [ '唱歌', '跳舞' ])
					.appendTo(userBoard));
			lonelySouls.push(createLonelyUserDiv('Huang Junbang',
					'./images/founder-avatar/hjb.png',
					[ '唱歌唱歌唱歌唱歌', '跳舞跳舞跳舞跳舞' ]).appendTo(userBoard));
			lonelySouls.push(createLonelyUserDiv('Huang Junbang',
					'./images/founder-avatar/hjb.png',
					[ '唱歌唱歌唱歌唱歌', '跳舞跳舞跳舞跳舞' ]).appendTo(userBoard));

			function unFold(index) {
				if (index > 0) {

					lonelySouls[index].css(
							{
								left : $(
										'.loneUserPlaceHolder[place=' + index
												+ ']').offset().left,
								top : $(
										'.loneUserPlaceHolder[place=' + index
												+ ']').offset().top
							}).fadeIn(150, function() {
						unFold(index - 1);
					});
				} else if (index === 0) {
					lonelySouls[index].css({
						height : '+=100',
						width : '+=100',
						top : $('.loneUserPlaceHolder[place=1]').offset().top
					}).delay(300).fadeIn(400).children('.loneUsersName').delay(
							600).fadeIn(400).siblings('.loneUsersTags').delay(
							900).fadeIn(
							400,
							function() {
								var masks = new Array();
								for (var i = 0; i < lonelySouls.length; i++) {
									masks[i] = $(
											'<div class="loneUserMask" place="'
													+ i + '"></div>').css({
										'height' : lonelySouls[i].height(),
										'width' : lonelySouls[i].width(),
										'left' : lonelySouls[i].offset().left,
										'top' : lonelySouls[i].offset().top,
										'opacity' : '0'
									}).appendTo('body');
									if (i > 0) {
										lonelySouls[i].children(
												'.loneUsersName').css({
											'position' : 'absolute',
											'left' : 5,
											'top' : 0,
											'color' : '#ffffff',
											'display' : 'none'
										});
										lonelySouls[i].children(
												'.loneUsersTags').css({
											'position' : 'absolute',
											'left' : 5,
											'top' : 90,
											'color' : '#ffffff',
											'display' : 'none'
										});
									}

								}
								for (var i = 0; i < lonelySouls.length; i++) {
									masks[i].mouseout(function(e) {
										$(e.target)
										$(e.target).animate({
											opacity : '0'
										}, 300);
										var index = parseInt($(e.target).attr(
												'place'));
										if (index > 0) {
											lonelySouls[index].children(
													'.loneUsersName').fadeOut(
													300);
											lonelySouls[index].children(
													'.loneUsersTags').fadeOut(
													300);
										}
									});
									masks[i].mouseover(function(e) {
										$(e.target).animate({
											opacity : '1'
										}, 300);
										var index = parseInt($(e.target).attr(
												'place'));
										if (index > 0) {
											lonelySouls[index].children(
													'.loneUsersName').fadeIn(
													300);
											lonelySouls[index].children(
													'.loneUsersTags').fadeIn(
													300);
										}
									});
								}
							})

				}
			}

			$(window)
					.scroll(
							function() {
								if (isFold) {
									if ($(window).scrollTop() > $(userBoard)
											.offset().top - 300) {
										lonelySouls[0].hide();
										unFold(lonelySouls.length - 1);
										isFold = false;
									}
								}

							});

		});
