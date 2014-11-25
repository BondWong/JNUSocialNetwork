/*global define, jQuery,console,window,_,alert,document,setTimeout */
(function($) {
	"use strict";

	var FETCH_POST_URL_BASE = "/app/post/fetchByID/", FETCH_USERINFO_URL_BASE = "/app/user/fetchByID/", POSTID_asset_url = "/pages/assets/postID.json", JOIN_URL_BASE = "/app/post/joinActivity/", UPDATE_USERINFO_URL_BASE = "/app/user/updateProfile/", LEAVE_URL_BASE = "/app/post/leaveActivity/", dataset = {};

	$(document).ready(function() {
		_.templateSettings = {
			evaluate : /<@([\s\S]+?)@>/g,
			interpolate : /<@=([\s\S]+?)@>/g,
			escape : /<@-([\s\S]+?)@>/g
		};

		initialActivityList();
		initialListeners();
	});

	// 根据配置文件的id初始化活动列表
	function initialActivityList() {
		$.getJSON(POSTID_asset_url).done(
				function(data) {
					for ( var i in data) {
						$.getJSON(FETCH_POST_URL_BASE + data[i]).done(
								generateListItem);
					}
				});
	}

	// 初始化特定元素的事件监听器
	function initialListeners() {
		$("#activity-list")
				.delegate(
						'.join-btn',
						'click',
						function(ent) {
							if (!window.USERID) {
								$("#remindModal").modal("show");
								return;
							}
							var $element = $(ent.currentTarget), data = dataset[$element
									.data("postid")];

							// 判断user是否已加入活动
							if ($.inArray(window.USERID, data.participantIDs) >= 0) {
								leaveClickProcess($element);
							} else {
								joinClickProcess($element);
							}
						});

		// 账号操作跳转
		$(".account-link").click(function(ent) {
			localStorage.setItem("url", window.location.href);
			window.location.href = ent.currentTarget.getAttribute("href");
			console.log(window.location.href);
		});
	}

	// 已存在用户时点击参加的处理，先获取该用户信息，再检查手机号
	function joinClickProcess($element) {

		$
				.getJSON(FETCH_USERINFO_URL_BASE + window.USERID)
				.done(
						function(data) {
							if (!data.attributes.telnum) {
								$("#checkTN").data("postid",
										$element.data("postid"));
								$("#addPhoneModal").modal("show");
								$("#checkTN")
										.click(
												function(ent) {
													var data = $("#telnum")
															.val();
													// 错误手机号简单过滤
													if (data >= 10000000001) {
														var transit = {
															telnum : data
														};
														$
																.ajax(
																		UPDATE_USERINFO_URL_BASE
																				+ window.USERID,
																		{
																			type : "PUT",
																			data : JSON
																					.stringify(transit),
																			contentType : "application/json",
																			beforeSend : function(
																					request) {
																				request
																						.setRequestHeader(
																								"ID",
																								window.USERID);
																			},
																			success : function(
																					data,
																					textStatus,
																					jqXHR) {
																				joinProcess($element);
																				$(
																						"#addPhoneModal")
																						.modal(
																								"hide");
																			},
																			error : function(
																					jqXHR,
																					textStatus,
																					errorThrown) {
																				console
																						.log("add Phone failed! "
																								+ textStatus
																								+ " "
																								+ errorThrown);
																			}
																		});
													}
													return false;
												});
							} else {
								joinProcess($element);
							}
						});
	}

	// 最终参加活动处理，并显示相应处理信息
	function joinProcess($element) {
		var url = [ JOIN_URL_BASE, window.USERID, "/", $element.data("postid") ]
				.join("");
		$.ajax(url, {
			type : "PUT",
			processData : false,
			contentType : false,
			beforeSend : function(request) {
				request.setRequestHeader("ID", window.USERID);
			},
			success : function(data, textStatus, jqXHR) {
				console.log("join succeed! " + textStatus);
				switchButtonState($element);
				displayAlert($("#successAlert"), "亲！你已成功加入该活动");
				refreshDataSet($element.data("postid"));
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log("join failed! " + textStatus + " " + errorThrown);
				displayAlert($("#errorAlert"), "未知错误，加入失败，抱歉！");
			}
		});
	}

	// 离开活动点击处理
	function leaveClickProcess($element) {
		var url = [ LEAVE_URL_BASE, window.USERID, "/", $element.data("postid") ]
				.join("");
		$.ajax(url, {
			type : "PUT",
			processData : false,
			contentType : false,
			beforeSend : function(request) {
				request.setRequestHeader("ID", window.USERID);
			},
			success : function(data, textStatus, jqXHR) {
				console.log("leave succeed " + textStatus);
				switchButtonState($element);
				displayAlert($("#successAlert"), "亲！很遗憾你放弃了参加这次活动！");
				refreshDataSet($element.data("postid"));
			},
			error : function(jqXHR, textStatus, errorThrown) {
				console.log("leave failed! " + textStatus + " " + errorThrown);
				displayAlert($("#errorAlert"), "亲！未知错误，上天也阻止你放弃啊！");
			}
		});
	}

	// 更新当前作用域全局的活动数据集的特定活动的数据
	function refreshDataSet(postid) {
		$.getJSON(FETCH_POST_URL_BASE + postid).done(function(data) {
			dataset[data.ID] = data;
		});
	}

   
    
	// 展示通知框
	function displayAlert(target, message) {
		if (message) {
			$("p", target).html(message);
		}
		target.fadeIn(500);
		setTimeout(function() {
			target.fadeOut(500);
		}, 4000);
	}
    // 切换按钮状态
    function switchButtonState($btn) {
        if ($btn.hasClass("btn-success")) {
            $btn.removeClass("btn-success").addClass("btn-danger").html("离开");
        } else {
            $btn.removeClass("btn-danger").addClass("btn-success").html("参加");
        }
    }
   
    
    // 生成活动列表
    function generateListItem(data) {
    	var imageLink = data.attributes.background;
    	var imageObject = imageLink.substr(imageLink.indexOf(",{")+1);
        var testdata = {
            activityAddr: data.attributes.activityAddr,
            activityMore: data.attributes.activityMore,
            activityName: data.attributes.activityName,
            activityTime: data.attributes.activityTime,
            imgsrc: JSON.parse(imageObject).src,
            ID: data.ID
        };
        dataset[data.ID] = data;
        var genearatedLI = _.template($('#li-template').html())(testdata),
            $genearatedLI = $(genearatedLI);

        if ($.inArray(window.USERID, data.participantIDs) >= 0) {
            switchButtonState($(".join-btn", $genearatedLI));
        } else if (data.participantIDs.length === data.attributes.limitation) {
            $(".join-btn", $genearatedLI).prop("disabled", true).html("人数已满");
        }
        if (data.attributes.startDate - new Date().getTime() <= 0) {
            $(".join-btn", $genearatedLI).prop("disabled", true).html("已过期");
        }

        console.log($genearatedLI.get(0));
        $('#activity-list').append($genearatedLI[0]);
    }

    // 展示通知框
    function displayAlert(target, message) {
        if (message) {
            $("p", target).html(message);
        }
        target.fadeIn(500);
        setTimeout(function () {
            target.fadeOut(500);
        }, 4000);
    }

}(jQuery));