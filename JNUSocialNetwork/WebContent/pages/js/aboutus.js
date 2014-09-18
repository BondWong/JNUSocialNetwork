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
        if (slideIndex === 1) {
            $("#hjb").show();
        } else if (slideIndex === 2) {
            $("#lwx,#hjj").show();
        } else if (slideIndex === 3) {
            $("#hzy,#hhc,#del").show();
        }
    }

    function customOnSlideLeave(anchorLink, index, slideIndex, direction) {
        if (slideIndex === 1) {
            $("#hjb").hide();
        } else if (slideIndex === 2) {
            $("#lwx,#hjj").hide();
        } else if (slideIndex === 3) {
            $("#hzy,#hhc,#del").hide();
        }
    }

}(jQuery));