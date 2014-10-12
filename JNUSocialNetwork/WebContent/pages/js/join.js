/*global define, jQuery,console,window,_,alert,document,setTimeout */
(function ($) {
    "use strict";

    var FETCH_URL_BASE = "/app/post/fetchByID/",
        POSTID_asset_url = "/pages/assets/postID.json",
        JOIN_URL_BASE = "/app/post/joinActivity/";

    $(document).ready(function () {
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
            if (window.USERID === "" || window.USERID === null) {
                $("#remindModal").modal("show");
                return;
            }
            var url = [JOIN_URL_BASE, window.USERID, "/", $(ent.currentTarget).data("postid")].join("");
            $.get(url)
                .done(function (data, textStatus) {
                    console.log("post success " + textStatus);
                    displayAlert($("#successAlert"));
                })
                .fail(function (XHR, textStatus, errorThrown) {
                    console.log("post error! " + textStatus + " " + errorThrown);
                    displayAlert($("#errorAlert"));
                });
        });
    }

    function generateListItem(data) {
        var testdata = {
            activityAddr: data.activityAddr,
            activityMore: data.activityMore,
            activityName: data.activityName,
            activityTime: data.activityTime,
            background: JSON.parse(data.attributes.background).src,
            ID: data.ID
        };
        $('#activity-list').append(_.template($('#li-template').html())(testdata));
    }

    // 展示通知框
    function displayAlert(target) {
        target.fadeIn(500);
        setTimeout(function () {
            target.fadeOut(500);
        }, 4000);
    }

}(jQuery));