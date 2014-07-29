/**
 * 
 */

$(document).ready(function() {
	window.onload = function() {
		$('body').on('click', '#chatroom-close', function() {
			var id = $("#chatroom input").val();
			close_chatroom(id);
		});
		
		
		
	};
});