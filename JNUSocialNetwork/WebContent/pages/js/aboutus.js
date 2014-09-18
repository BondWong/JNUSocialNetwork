/*global $, jQuery, console, ActiveXObject, alert, BMap, Papa, DataManager, document, Option, window, Elementm, map, event,BMapLib*/

(function ($) {
    var currentSlideIndex;
    $(document).ready(function () {
        $('#fullpage').fullpage({
            anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
            sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
            navigation: true,
            navigationPosition: 'right',
            navigationTooltips: ['First page', 'Second page', 'Third page', 'The last page'],
            loopBottom: true,
            onLeave: customOnLeave,
            afterLoad: customAfterLoad,
            onSlideLeave: customOnSlideLeave,
            afterSlideLoad: customAfterSlideLoad
        });

    });

    function customAfterLoad(anchorLink, index) {
        if (index === 2) {
            customAfterSlideLoad(null, null, null, currentSlideIndex);
        }
    }

    function customOnLeave(index, nextIndex, direction) {
        if (index === 2 && nextIndex === 3) {
            customOnSlideLeave(null, null, currentSlideIndex, null);
        }
    }

    function customAfterSlideLoad(anchorLink, index, slideAnchor, slideIndex) {

        var $$target;
        if (slideIndex === 1) {
            $$target = $("#lwx,#hjb");
        } else if (slideIndex === 2) {
            $$target = $("#hzy,#hhc,#del");
        } else if (slideIndex === 3) {
            $$target = $("#hjj");
        }
        if ($$target) {
            $$target.addClass("show");
            setTimeout(function () {
                $$target.css("opacity", 1);
            }, 10);
        }
        currentSlideIndex = slideIndex;
    }

    function customOnSlideLeave(anchorLink, index, slideIndex, direction) {

        var $$target;
        if (slideIndex === 1) {
            $$target = $("#hjb,#lwx");
        } else if (slideIndex === 2) {
            $$target = $("#hzy,#hhc,#del");
        } else if (slideIndex === 3) {
            $$target = $("#hjj");
        }
        if ($$target) {
            $$target.css("opacity", 0);
            setTimeout(function () {
                $$target.removeClass("show");
            }, 1000);
        }
    }

}(jQuery));