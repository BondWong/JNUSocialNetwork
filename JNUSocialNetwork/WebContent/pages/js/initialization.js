/**
 * 
 */

$(document).ready(
		function() {
			window.onload = function() {
				$('body').on('click', '#chatroom-close', function() {
					var id = $("#chatroom input").val();
					close_chatroom(id);
				});
				
				window.ws = new WebSocket(
						"ws://localhost:8080/JNUSocialNetwork/endpoint/connect/"
								+ $("#ID").val());
				ws.onopen = function(e) {

				};

				ws.onclose = function(e) {

				};

				ws.onerror = function(e) {
					alert(e);
				};

				ws.onmessage = function(e) {
					if ($.parseJSON(e.data).action != null) {
						switch ($.parseJSON(e.data).action) {
						case "CHAT":
							handle_message($.parseJSON(e.data));
							break;
						case "UPDATEMESSAGESTATUS":
							handle_update_message_status($.parseJSON(e.data));
							break;
						case "REMIND":
							handle_remind($.parseJSON(e.data));
							break;
						}
					}
				};

				function handle_message(data) {
					do_receive(data);
				}

				function handle_update_message_status(data) {
					do_change_status(data);
				}

				function handle_remind(data) {
					handle_unread_messages(data.unreadMessages);
					// handle_unhandledEvents(data.unhandledEvents);
				}

			};
		});