/*global define, jQuery,console,window,_,alert,document,setTimeout */
(function ($) {
    "use strict";

    var FETCH_URL_BASE = "/app/post/fetchByID/",
        POSTID_asset_url = "/pages/assets/postID.json",
        JOIN_URL_BASE = "/app/post/joinActivity/",
        LEAVE_URL_BASE = "/app/post/leaveActivity/",
        dataset = {};

    $(document).ready(function () {
        _.templateSettings = {
            evaluate: /<@([\s\S]+?)@>/g,
            interpolate: /<@=([\s\S]+?)@>/g,
            escape: /<@-([\s\S]+?)@>/g
        };
        initialActivityList();
        initialListeners();
    });

    function initialActivityList() {
        $.getJSON(POSTID_asset_url).done(function (data) {
            for (var i in data) {
                $.getJSON(FETCH_URL_BASE + data[i])
                    .done(generateListItem);
            }
        });
    }

    function initialListeners() {
        $("#activity-list").delegate('.join-btn', 'click', function (ent) {
            if (!window.USERID) {
                $("#remindModal").modal("show");
                return;
            }
            var $element = $(ent.currentTarget),
                data = dataset[$element.data("postid")];
            if ($.inArray(window.USERID, data.participantIDs) >= 0) {
                leaveClickProcess($element);
            } else {
                joinClickProcess($element);
            }
        });

        $(".account-link").click(function (ent) {
            localStorage.setItem("url", window.location.href);
            window.location.href = ent.currentTarget.getAttribute("href");
            console.log(window.location.href);
        });
    }

    function joinClickProcess($element) {

        var url = [JOIN_URL_BASE, window.USERID, "/",
                       $element.data("postid")].join("");
        $.ajax(url, {
            type: "PUT",
            processData: false,
            contentType: false,
            beforeSend: function (request) {
                request.setRequestHeader("ID", USERID);
            },
            success: function (data, textStatus, jqXHR) {
                console.log("join succeed! " + textStatus);
                switchButtonState($element);
                displayAlert($("#successAlert"), "亲！你已成功加入该活动");
                refreshDataSet($element.data("postid"));
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("join failed! " + textStatus + " " + errorThrown);
                displayAlert($("#errorAlert"), "未知错误，加入失败，抱歉！");
            }
        });
    }

    function leaveClickProcess($element) {
        var url = [LEAVE_URL_BASE, window.USERID, "/",
                       $element.data("postid")].join("");
        $.ajax(url, {
            type: "PUT",
            processData: false,
            contentType: false,
            beforeSend: function (request) {
                request.setRequestHeader("ID", USERID);
            },
            success: function (data, textStatus, jqXHR) {
                console.log("leave succeed " + textStatus);
                switchButtonState($element);
                displayAlert($("#successAlert"), "亲！很遗憾你放弃了参加这次活动！");
                refreshDataSet($element.data("postid"));
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("leave failed! " + textStatus + " " + errorThrown);
                displayAlert($("#errorAlert"), "亲！未知错误，上天也阻止你放弃啊！");
            }
        });
    }

    function refreshDataSet(postid) {
        $.getJSON(FETCH_URL_BASE + postid)
            .done(function (data) {
                dataset[data.ID] = data;
            });
    }

    function switchButtonState($btn) {
        if ($btn.hasClass("btn-success")) {
            $btn.removeClass("btn-success").addClass("btn-danger").html("离开");
        } else {
            $btn.removeClass("btn-danger").addClass("btn-success").html("参加");
        }
    }

    function generateListItem(data) {
        var testdata = {
            activityAddr: data.attributes.activityAddr,
            activityMore: data.attributes.activityMore,
            activityName: data.attributes.activityName,
            activityTime: data.attributes.activityTime,
            imgsrc: JSON.parse(data.attributes.background).src,
            ID: data.ID
        };
        dataset[data.ID] = data;
        var genearatedLI = _.template($('#li-template').html())(testdata),
            $genearatedLI = $(genearatedLI);
        if ($.inArray(window.USERID, data.participantIDs) >= 0) {
            switchButtonState($(".join-btn", $genearatedLI));
        }
        if (data.participantIDs.length === data.attributes.limitation) {
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