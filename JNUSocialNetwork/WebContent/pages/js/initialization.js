/**
 * 
 */

$(document).ready(function() {
	window.onload = function() {

		/*
		 * initialize back to top
		 */
		var offset = 300;
		var duration = 500;
		$(window).scroll(function() {
			if ($(this).scrollTop() > offset) {
				$('.back_to_top_button').fadeIn(duration);
			} else {
				$('.back_to_top_button').fadeOut(duration);
			}
		});

		$('.back_to_top_button').click(function(event) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop : 0
			}, duration);
			return false;
		});

	};

});