/*global $, jQuery, console, ActiveXObject, alert, BMap, Papa, DataManager, document, Option, window, Elementm, map, event,BMapLib*/

(function ($) {
    "use strict";

    var winH = $(window).height();
    var availableData = [];
    var currentDepartments = [];

    $(document).ready(function () {
        fetchCommunityByType("SCHOOLUNION", 0, 30, fetchSucceed);
    });

    $(window).scroll(function () {
        var pageH = $(document.body).height(); //页面总高度 
        var scrollT = $(window).scrollTop(); //滚动条top 
        var aa = (pageH - winH - scrollT) / winH;
        if (aa < 0.1 && $("#league-list").children().size() < availableData.length) {
            // 每次加载3条新信息
            generateTopN(availableData.slice($("#league-list").children().size()), 3);
            addlistener();
        }
    });

    // 确认提交
    $("#confirm-btn").click(function () {
        var postdata = {};
        postdata.name = $("#studentID").val();
        postdata.password = $("#password").val();
        postdata.telnum = $("#telNum").val();
        postdata.wish1 = $("#intent_dept1").find("option:selected").val();
        postdata.wish2 = $("#intent_dept2").find("option:selected").val();
        var settings = {
            type: "POST",
            url: "/app/user/registerCandC",
            data: postdata,
            error: function (XHR, textStatus, errorThrown) {
                console.log("post error");
                displayAlert($("#errorAlert"));
            },
            success: function (data, textStatus) {
                console.log("post success");
                displayAlert($("#successAlert"));
            },
            headers: {
                "Content-Type:": "application/json;charset=utf-8"
            }
        };

        $('#applyModal').modal('hide');
    });

    $("#intent_dept1").change(function () {
        setCandidateDepartments();
    });

    // 为报名按钮添加监听器
    function addlistener() {
        $(".apply-btn").click(function (ent) {
            setDepartments($(this).data("id"));
        });
    }

    // FetchByType 输入：communityID;返回：postJson
    function fetchCommunityByType(communityType, startIndex, pageSize, successCallback) {
        var url = "/app/community/fetchByType/" + communityType + '/' + startIndex + '/' + pageSize;
        // var url = "js/applydata.json";
        $.getJSON(url, successCallback);
    }

    function setDepartments(id, target) {
        var url = "/app/community/getDepartment/" + id;
        //var url = "js/1411055191107.json";
        $.getJSON(url, function (data) {
            console.log(data);
            currentDepartments = data;
            var dept1 = document.getElementById("intent_dept1");
            dept1.options.length = 0;
            for (var i in currentDepartments) {
                dept1.options[i] = new Option(currentDepartments[i], currentDepartments[i]);
            }
            dept1.options[0].selected = true;
            setCandidateDepartments();
        });
    }

    function setCandidateDepartments() {
        var dept1 = document.getElementById("intent_dept1");
        var dept2 = document.getElementById("intent_dept2");
        dept2.options.length = 0;
        for (var i in currentDepartments) {
            dept2.options[i] = new Option(currentDepartments[i], currentDepartments[i]);
        }
        dept2.options.remove(dept1.selectedIndex);
    }

    function fetchSucceed(data) {
        // 过滤不可用的社团信息
        for (var i in data) {
            if (data[i].available) {
                availableData.push(data[i]);
            }
        }

        // 屏幕宽度较大时加载更多
        if (window.innerWidth >= 992) {
            generateTopN(availableData, 10);
        } else {
            generateTopN(availableData, 6);
        }
    }

    function generateTopN(data, limitSize) {
        // 提取并生成前六社团信息
        var rightStop = data.length;
        if (rightStop > limitSize) {
            rightStop = limitSize;
        }
        for (var j = 0; j < rightStop; j++) {
            var newleague = new SimpleLeague();
            newleague.id = data[j].ID;
            newleague.title = data[j].attributes.name;
            newleague.intro = data[j].attributes.introduct;
            newleague.imgsrc = JSON.parse(data[j].attributes.communityCard).src;
            generateListItem(newleague);
        }
        addlistener();
    }

    function generateListItem(league) {
        var newItem = $("#template").clone();
        newItem.removeAttr("id");
        //console.log(newItem.find(".apply-btn").data("id"));
        newItem.find(".apply-btn").data("id", league.id);
        //console.log(newItem.find(".apply-btn").data("id"));
        newItem.find(".league-photo").attr("src", league.imgsrc);
        newItem.find(".league-title").text(league.title);
        newItem.find(".league-intro").text(league.intro);
        $("#league-list").append(newItem);
    }

    function displayAlert(target) {
        target.fadeIn(500);
        setTimeout(function () {
            target.fadeOut(500);
        }, 4000);
    }

}(jQuery));

function SimpleLeague() {
    "use strict";
    this.id = '';
    this.imgsrc = '';
    this.title = '';
    this.intro = '';
    this.departments = [];
}