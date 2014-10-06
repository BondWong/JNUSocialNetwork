function activityClickEvent() {
	$('body').on("click", '#createActivityBtn', function() {
		$('.activityForm').get(0).reset();
	});
	$('body')
			.on(
					"click",
					"#go_submit",
					function() {
						var post = "";
						if ($('#activityTime').val() != ""
								&& $('#activityRemind').val() != "") {
							var comForm = new FormData();
							comForm.append('file', ($('#fileuploadA')));
							var regForm = new FormData();
							regForm.append('file', $('#fileuploadB'));
							if ($('#fileuploadA').val() != "") {
								post = {
									postType : 'ACTIVITY',
									attributes : {
										activityName : $('#activityName').val(),
										startDate : toTimeValue($(
												'#activityTime').val()
												+ "")
												+ "",
										remindDate : toTimeValue($(
												'#activityRemind').val()
												+ "")
												+ "",
										activityTime : $('#activityTime').val(),
										activityRemindTime : $(
												'#activityRemind').val(),
										activityAddr : $('#activityAddr').val(),
										activityMore : $('#activityMore').val(),
										limitation : $('.activityNum').val(),
										communityName : community.attributes.name,
										communityID : community.ID.toString(),
										ifUpload : $('#table_activitySign')
												.text(),
										background : FileUpload(new FormData(
												$('.activityForm')[0]))[0],
										registerTemplateAddr : RegisterFormUpload(new FormData(
												$('.regForm')[0]))
									},
									imageLinks : [],
									activityTypeTags : [$('#activityType').val()]
								};
							} else {
								post = {
									postType : 'ACTIVITY',
									attributes : {
										activityName : $('#activityName').val(),
										startDate : toTimeValue($(
												'#activityTime').val()
												+ "")
												+ "",
										remindDate : toTimeValue($(
												'#activityRemind').val()
												+ "")
												+ "",
										communityName : community.attributes.name,
										activityTime : $('#activityTime').val(),
										activityRemindTime : $(
												'#activityRemind').val(),
										activityAddr : $('#activityAddr').val(),
										activityMore : $('#activityMore').val(),
										limitation : $('#activityNum').val(),
										communityID : community.ID.toString(),
										ifUpload : $('#table_activitySign')
												.text(),
										registerTemplateAddr : RegisterFormUpload(new FormData(
												$('.regForm')[0]))
									},
									imageLinks : [],
									activityTypeTags : [$('#activityType').val()]
								};
							}
							var diffDate = toTimeValue($('#activityTime').val()
									+ "")
									- toTimeValue($('#activityRemind').val()
											+ "");
							if ($('.activityForm')[0].checkValidity()) {

								if (diffDate >= 0.021 * 24 * 60 * 60 * 1000) {
									var json = $.toJSON(post);
									$('.layer2').fadeIn(300);
									$('#infinite_loader2').fadeIn(300);
									AddPostToCommunity(USERID, community.ID,
											json);
									$('#activityCommunity').modal('hide');
								} else {
									$('#fail_popover2').fadeIn("fast");
									setTimeout(
											'$("#fail_popover2").fadeOut("slow")',
											3000);
								}

							}
						} else {
							$('#fail_popover').fadeIn("fast");
							setTimeout('$("#fail_popover").fadeOut("slow")',
									3000);
						}
					});
}
var pageSize = 15;
// function fetchActivitiesByCommunity()
function fetchActivitiesByCommunity() {
	var response = FetchActivitiesByCommunity(community.ID, 0, pageSize);
	$.each(response.reverse(), function(n, dataString) {
		if (dataString.available == true) {
			addActivity(dataString.ID, dataString.attributes.activityName,
					dataString.attributes.activityTime,
					dataString.attributes.activityAddr,
					dataString.attributes.activityMore,
					dataString.attributes.background,
					dataString.owner.attributes.avatarLink,
					dataString.owner.ID, dataString.participantIDs,
					dataString.attributes.startDate,
					dataString.attributes.limitation,
					dataString.attributes.ifUpload);
		}
	});
}
function activity(activityID, name, time, addre, more, imagelink, avatarLink,
		ownerID, joinIDs, startDate, limitation, ifUpload) {
	var join = "";
	if (ifUpload == "默认方式") {
		join = "<a><div class='activityJoin' id='activity" + activityID
				+ "'><input type='hidden' value='" + activityID
				+ "'><span>Join</span></div></a>";
		if ($.inArray(USERID, joinIDs) != -1) {
			join = "<a><div style='color: #FFF;background-color: #428BCA;' class='activityJoin' id='activity"
					+ activityID
					+ "'><input type='hidden' value='"
					+ activityID + "'><span>Joined</span></div></a>";
		}
	} else {
		join = "<div class='aUB'><a href='../../app/fileDownloader?type=REGISTERFORM&activityID="+activityID+"' class='btn btn-default dlR' id='"
				+ activityID
				+ "'>下载报名表</a><a class='btn btn-default ulR' id='"
				+ activityID + "'>上传报名表</a></div>";
	}

	var pRemoveBtn = "";
	if (USERID == ownerID) {
		pRemoveBtn = "<div class='deleteActivity'><input id='deleteID' type='hidden' value="
				+ activityID
				+ " /><span class='glyphicon glyphicon-remove'></span></div>";
		join = "";
	}
	var now = new Date();
	if (joinIDs.length >= limitation || startDate - now.getTime() <= 0) {
		join = "";
	}
	var boarddiv = "<div class='activity post"
			+ activityID
			+ "' >"
			+ pRemoveBtn
			+ "<div class='activityBg'><img width='435' height='"+getHeight(435, $.parseJSON(imagelink).width, $.parseJSON(imagelink).height)+"'  src='"
			+ $.parseJSON(imagelink).src
			+ "' /></div><div class='user_img activityAvatar'><img width='49' height='49' class='img-circle userImg' src='"
			+ $.parseJSON(avatarLink).src
			+ "' /></div><div class='activityName activityShowHref' id='"
			+ activityID
			+ "'><a><span>"
			+ name
			+ "</span></a></div><div class='activityTime'><span class='glyphicon glyphicon-time'>&nbsp;</span><span class='aT'>"
			+ time
			+ "</span></div><div class='activityaddre'><span class='glyphicon glyphicon-flag'>&nbsp;</span><span class='aA'>"
			+ addre + "</span></div><div class='activityD'><span>" + '<pre>'
			+ more + '</pre>' + "</span></div><div class='activityAsk'>" + join
			+ "</div></div>";
	return boarddiv;
}
// function addActivity
function addActivity(activityID, name, time, addre, more, imagelink,
		avatarLink, ownerID, joinIDs, startDate, limitation, ifUpload) {
	var boarddiv = activity(activityID, name, time, addre, more, imagelink,
			avatarLink, ownerID, joinIDs, startDate, limitation, ifUpload);
	$(".activityBord").after(boarddiv);
	Msnry('.activityBody', '.activity', 435);
}

function showCommunityInfo() {
	$('.cName').html(community.attributes.name);
	$('.cIntro').html(community.attributes.introduct);
	$('.communityPic').find('img').attr("src",
			$.parseJSON(community.attributes.communityCard).src);
}

$('body')
		.on(
				"click",
				".ulR",
				function() {
					var teleAlert = "";
					if ($.parseJSON(sessionStorage.getItem("user")).attributes.telnum == "") {
						teleAlert = "<div class='uploadItem'><span>电话号码：</span><input type='text' pattern='[0-9]{11}' style='margin-bottom:20px;width:80%;' class='form-control' placeholder='个人资料未填写手机号码，请输入手机号码' id='tele' autocomplete='off' data-errormessage-value-missing='请输入手机号码，才能参加活动哦' data-errormessage-pattern-mismatch='请输入正确手机号码' required autofocus maxLength='11' /></div>";
					}
					$(this).attr("data-toggle", "modal");
					$(this).attr("data-target", "#uploadmodal");
					var board = "<div class='modal fade' id='uploadmodal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title'>上传报名表</h4></div><form class='uploadForm' role='form' onsubmit='return false;'><div class='modal-body'>"
							+ teleAlert
							+ "<div class='uploadItem'><span>报名表：</span><input class='uploadexe' type='file' name='file'/></div><p style='margin-top:20px;margin-left:14px;'>[注意：请先下载报名表，填写并上传，其他文件报名不成功！]</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>取消</button><button type='submit' class='btn btn-primary' id='ulFile' value='upload'>上传</button></div></form></div></div></div>";
					$('body').append(board);
				});
$('body').on('click','#ulFile',function(){
	if($('.uploadForm')[0].checkValidity() && $('.uploadexe').val() != ""){
		if($('.tele').val()!=""){
			var dataString = {
					telnum : $('#tele').val()
				};
			UpdateUserProfile(USERID, $.toJSON(dataString));
		}
		var response = formUpload(new FormData($('.uploadForm')[0]),$('.ulR').attr('id'),encodeURI($.parseJSON(sessionStorage.getItem("user")).attributes.name));
		JoinActivity(USERID, $('.ulR').attr('id'));
		$('#uploadmodal').modal('hide');
		if(response == 'success'){
			alert("参加成功！");
		}
	}
});
// funtion sessionID
$('body').on("click", ".communityHref", function() {
	window.location.href = 'communityShow.jsp?' + community.ID;
});

$('body').on("click", ".activityShowHref", function() {
	var id = $(this).attr("id");
	window.location.href = 'activityShow.jsp?' + community.ID + '&' + id;
});
$('body').on('click', '.deleteActivity', function() {
	var id = $(this).find("input").attr("value");
	DeletePostFromCommunity(community.ID, id);
	$(".post" + id + "").remove();
	Msnry('.activityBody', '.activity', 435);
});
var date1 = new Date();
date1.setDate(date1.getDate() + 1);
$('.form_datetime1').datetimepicker({
	// language: 'fr',
	format : "MM dd,yyyy - hh:ii",
	startDate : date1,
	todayBtn : 0,
	autoclose : 1,
	startView : 2,
	Integer : 1,
	forceParse : 0,
	showMeridian : 1,
	pickerPosition : "bottom-left"
});
var date2 = new Date();
date2.setTime(date2.getTime());
$('.form_datetime2').datetimepicker({
	// language: 'fr',
	format : "MM dd,yyyy - hh:ii",
	startDate : date2,
	todayBtn : 0,
	autoclose : 1,
	startView : 2,
	Integer : 1,
	forceParse : 0,
	showMeridian : 1,
	pickerPosition : "bottom-left"
});
function toTimeValue(dateTime) {
	var patt = /([a-zA-Z]{3,9})\s(\d{2}),(\d{4})\s-\s(\d{2}):(\d{2})/;
	var matchers = patt.exec(dateTime);
	var month = "NaN";
	switch (matchers[1]) {
	case "January":
		month = 0;
		break;
	case "February":
		month = 1;
		break;
	case "March":
		month = 2;
		break;
	case "April":
		month = 3;
		break;
	case "May":
		month = 4;
		break;
	case "June":
		month = 5;
		break;
	case "July":
		month = 6;
		break;
	case "August":
		month = 7;
		break;
	case "September":
		month = 8;
		break;
	case "October":
		month = 9;
		break;
	case "November":
		month = 10;
		break;
	case "December":
		month = 11;
		break;
	}
	var d = new Date(matchers[3], month, matchers[2], matchers[4], matchers[5],
			0, 0);
	return d.valueOf();

}
$(document)
		.ready(
				function() {
					var easingtime = 300;
					var go_page = [ $('#go_page1'), $('#go_page2'),
							$('#go_page3') ];
					var page = [ $('#page1'), $('#page2'), $('#page3') ];
					var go_pre = $('#go_pre');
					var go_next = $('#go_next');
					var go_submit = $('#go_submit');
					var current_page = 0;
					go_page[0].click(function(event) {
						page[2].animate({
							left : '700px'
						}, easingtime);
						page[1].animate({
							left : '700px'
						}, easingtime);
						page[0].animate({
							left : '0px'
						}, easingtime);
						go_page[0].addClass('active');
						go_page[1].removeClass();
						go_page[2].removeClass();
						go_pre.css('display', 'none');
						go_next.css('display', '');
						go_submit.css('display', 'none');
						current_page = 0;
					});
					go_page[1].click(function(event) {
						page[0].animate({
							left : '-700px'
						}, easingtime);
						page[1].animate({
							left : '0px'
						}, easingtime);
						page[2].animate({
							left : '700px'
						}, easingtime);
						go_page[1].addClass('active');
						go_page[0].removeClass();
						go_page[2].removeClass();
						go_pre.css('display', '');
						go_next.css('display', '');
						go_submit.css('display', 'none');
						current_page = 1;
					});
					go_page[2].click(function(event) {
						page[0].animate({
							left : '-700px'
						}, easingtime);
						page[1].animate({
							left : '-700px'
						}, easingtime);
						page[2].animate({
							left : '0px'
						}, easingtime);
						go_page[2].addClass('active');
						go_page[0].removeClass();
						go_page[1].removeClass();
						go_pre.css('display', '');
						go_next.css('display', 'none');
						go_submit.css('display', '');
						current_page = 2;
					});
					go_pre.click(function(event) {
						if (current_page > 0) {
							go_page[--current_page].click();
						}
					});
					go_next
							.click(function(event) {
								if (!$('.activityForm')[0].checkValidity()
										|| toTimeValue($('#activityTime').val()
												+ "")
												- toTimeValue($(
														'#activityRemind')
														.val()
														+ "") < 0.021 * 24 * 60
												* 60 * 1000  ) {
									go_submit.click();
									return;
								}else if (current_page < page.length - 1) {
									go_page[++current_page].click();
									if (current_page == 2) {
										$('#table_activityName').html(
												$('#activityName').val());
										$('#table_activityTime').html(
												$('#activityTime').val());
										$('#table_activityRemind').html(
												$('#activityRemind').val());
										$('#table_activityAddr')
												.html(
														$('#activityAddr')
																.val().length > 30 ? $(
																'#activityAddr')
																.val()
																.substring(0,
																		30)
																+ '......'
																: $(
																		'#activityAddr')
																		.val());
										$('#table_activityMore')
												.html(
														$('#activityMore')
																.val().length > 30 ? $(
																'#activityMore')
																.val()
																.substring(0,
																		30)
																+ '......'
																: $(
																		'#activityMore')
																		.val());
										$('#table_activityNum').html(
												$('#activityNum').val());
										$('#table_activitySign').html(
												$('#optionsRadios1').is(
														':checked') ? '默认方式'
														: '上传报名表');
										$('#table_fileuploadA')
												.html(
														$('#fileuploadA').val() == '' ? '否'
																: $(
																		'#fileuploadA')
																		.val());
										$('#table_fileuploadB')
												.html(
														$('#fileuploadB').val() == '' ? '否'
																: $(
																		'#fileuploadB')
																		.val());
									}
								}
							});
					$('#optionsRadios1').click(function(event) {
						$('#div_fileuploadB').fadeOut(easingtime);
					});
					$('#optionsRadios2').click(function(event) {
						$('#div_fileuploadB').fadeIn(easingtime);
					});

				});
$(window)
		.scroll(
				function() {
					if ($(window).scrollTop() == $(document).height()
							- window.windowHeight) {
						var startIndex = $('.activity').length;
						$('div#infinite_loader').show();
						var response = FetchActivitiesByCommunity(communityID,
								startIndex, pageSize);
						if (response.length != 0) {
							$
									.each(
											response,
											function(n, dataString) {
												if (dataString.available == true
														&& $("div[class='activity post"
																+ dataString.ID
																+ "']").length == 0) {
													var boarddiv = activity(
															dataString.ID,
															dataString.attributes.activityName,
															dataString.attributes.activityTime,
															dataString.attributes.activityAddr,
															dataString.attributes.activityMore,
															dataString.attributes.background,
															dataString.owner.attributes.avatarLink,
															dataString.owner.ID,
															dataString.participantIDs,
															dataString.attributes.startDate,
															dataString.attributes.limitation,
															dataString.attributes.ifUpload);
													$(".activityBord").after(
															boarddiv);
													Msnry('.activityBody',
															'.activity', 435);
												}
											});
						}

						if (response.length == pageSize) {
							$('div#infinite_loader').hide();
						} else {
							$('div#infinite_loader')
									.replaceWith(
											'<div id="no_more_infinite_load"><span>no more</span></div>');
							$(window).unbind("scroll");
						}
					}
				});
