/*global $, jQuery, console, ActiveXObject, alert, BMap, Papa, DataManager, document, Option, window, Elementm, map, event,BMapLib*/

(function ($) {
    "use strict";

    var winH = $(window).height();
    var availableData = [];
    var currentDepartments = [];

    $(document).ready(function () {
        fetchCommunityByType("OFFICIAL", 0, 30)
            .done(function (oData) {
                fetchCommunityByType("SCHOOLUNION", 0, 30)
                    .done(function (sData) {
                        fetchSucceed(oData.concat(sData));
                    });

            });
        addlisteners();

        // 开启表单验证
        $("#signup").validate({
            rules: {
                studentID: {
                    minlength: 10
                },
                telNum: {
                    minlength: 11
                },
                password: {
                    minlength: 5,
                    required: true
                },
                confirmpassword: {
                    required: true,
                    minlength: 5,
                    equalTo: "#password"
                }
            }
        });
    });

    // 添加监听器
    function addlisteners() {
        // 滚动加载
        $(window).scroll(function () {
            var pageH = $(document.body).height(); //页面总高度 
            var scrollT = $(window).scrollTop(); //滚动条top 
            var aa = (pageH - winH - scrollT) / winH;
            if (aa < 0.1 && $("#league-list").children().size() < availableData.length) {
                // 每次加载3条新信息
                generateTopN(availableData.slice($("#league-list").children().size()), 3);
            }
        });

        // 确认提交
        $("#confirm-btn").click(function () {
            if ($("#signup").valid()) {
                var postdata = {};
                postdata.name = $("#studentID").val();
                postdata.password = $("#password").val();
                postdata.telnum = $("#telNum").val();
                postdata.wish1 = $("#intent_dept1").find("option:selected").val();
                postdata.wish2 = $("#intent_dept2").find("option:selected").val();


                var settings = {
                    type: "POST",
                    data: JSON.stringify(postdata),
                    error: function (XHR, textStatus, errorThrown) {
                        console.log("post error! " + textStatus + " " + errorThrown);
                        displayAlert($("#errorAlert"));
                    },
                    success: function (data, textStatus) {
                        console.log("post success " + textStatus);
                        displayAlert($("#successAlert"));
                    },
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                };
                $.ajax("/app/user/registerCandC", settings);
                $('#applyModal').modal('hide');
            }
        });

        // 下拉框2随下拉框1改变而改变
        $("#intent_dept1").change(function () {
            setCandidateDepartments();
        });
        //为报名按钮添加监听器
        $("#league-list").delegate('.apply-btn', 'click', function () {
            setDepartments($(this).data("id"));
        });
    }

    // FetchByType 输入：communityID;返回：postJson
    function fetchCommunityByType(communityType, startIndex, pageSize) {
        var url = "/app/community/fetchByType/" + communityType + '/' + startIndex + '/' + pageSize;
        //var url = filename;
        return $.getJSON(url);
    }

    // 设置下拉框1选择项
    function setDepartments(id, target) {
        var url = "/app/community/getDepartment/" + id;
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

    // 设置下拉框2选择项
    function setCandidateDepartments() {
        var dept1 = document.getElementById("intent_dept1");
        var dept2 = document.getElementById("intent_dept2");
        dept2.options.length = 0;
        for (var i in currentDepartments) {
            dept2.options[i] = new Option(currentDepartments[i], currentDepartments[i]);
        }
        dept2.options.remove(dept1.selectedIndex);
    }

    // 拉取信息成功则回调加载信息
    function fetchSucceed(data) {
        // 过滤不可用的社团信息
        var filterArr = [1411301318703, 1411090991902, 1411555413859, 1411397204271, 1411055191107, 1411054407457, 1411390027993, 1411094627377, 1411112101865, 1411141391379, 1411697745258];
        for (var i in filterArr) {
            //if (data[i].available)
            for (var j in data) {
                if (filterArr[i] === data[j].ID) {
                    availableData.push(data[j]);
                    break;
                }
            }
        }

        // 屏幕宽度较大时加载更多
        if (window.innerWidth >= 992) {
            generateTopN(availableData, 10);
        } else {
            generateTopN(availableData, 6);
        }
    }

    // 生成前N个信息
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
    }

    // 生成列表项
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

    // 展示通知框
    function displayAlert(target) {
        target.fadeIn(500);
        setTimeout(function () {
            target.fadeOut(500);
        }, 4000);
    }

}(jQuery));

// 创建一个简单的社团信息类
function SimpleLeague() {
    "use strict";
    this.id = '';
    this.imgsrc = '';
    this.title = '';
    this.intro = '';
    this.departments = [];
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, fromIndex) {
        if (fromIndex == null) {
            fromIndex = 0;
        } else if (fromIndex < 0) {
            fromIndex = Math.max(0, this.length + fromIndex);
        }
        for (var i = fromIndex, j = this.length; i < j; i++) {
            if (this[i] === obj)
                return i;
        }
        return -1;
    };
}