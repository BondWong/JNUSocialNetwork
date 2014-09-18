/*global $, jQuery, console, ActiveXObject, alert, BMap, Papa, DataManager, document, Option, window, Elementm, map, event,BMapLib*/

(function ($) {
    $(document).ready(function () {
        $('#fullpage').fullpage({
            anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
            sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['First page', 'Second page', 'Third page', 'The last page'],
            loopBottom: true,
            afterSlideLoad: customAfterSlideLoad,
            onSlideLeave: customOnSlideLeave
        });

    });

    function customAfterSlideLoad(anchorLink, index, slideAnchor, slideIndex) {
        var $$target;
        if (slideIndex === 1) {
            $$target = $("#hjb");
        } else if (slideIndex === 2) {
            $$target = $("#lwx,#hjj");
        } else if (slideIndex === 3) {
            $$target = $("#hzy,#hhc,#del");
        }
        if ($$target) {
            $$target.addClass("show");
            setTimeout(function () {
                $$target.css("opacity", 1);
            }, 10);
        }
    }

    function customOnSlideLeave(anchorLink, index, slideIndex, direction) {

        var $$target;
        if (slideIndex === 1) {
            $$target = $("#hjb");
        } else if (slideIndex === 2) {
            $$target = $("#lwx,#hjj");
        } else if (slideIndex === 3) {
            $$target = $("#hzy,#hhc,#del");
        }
        if ($$target) {

            $$target.css("opacity", 0);
            setTimeout(function () {
                $$target.removeClass("show");
            }, 1000);
        }
    }

}(jQuery));