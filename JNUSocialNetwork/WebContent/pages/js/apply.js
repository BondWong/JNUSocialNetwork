/*global $, jQuery, console, ActiveXObject, alert, BMap, Papa, DataManager, document, Option, window, Elementm, map, event,BMapLib*/

(function ($) {
    var winH = $(window).height();
    $(document).ready(function () {

    });
    $(window).scroll(function () {
        var pageH = $(document.body).height(); //页面总高度 
        var scrollT = $(window).scrollTop(); //滚动条top 
        var aa = (pageH - winH - scrollT) / winH;
        if (aa < 0.1 && $("#league-list").children().size() <= 24) {
            $("#league-list").append('<li class="league col-xs-12 col-sm-12 col-md-6"><div class="league-card"><button type="button" class="btn btn-primary apply-btn" data-toggle="modal" data-target="#applyModal">报名</button><div class="img-box"><img class="league-photo" src="images/founder-avatar/del.png" alt="645.png" /></div><div class="league-info"><h2 class="league-title">电竞社</h2><p class="league-intro">图文混排的Thumbnail List这是一种在很多网站上都用得比较普遍的列表样式，“图文混排”，图文混排往往比单一的文字更能吸引人的眼球</p></div></div></li>');
        }
    });

}(jQuery));