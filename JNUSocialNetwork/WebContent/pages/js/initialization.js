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

				};

				ws.onmessage = function(e) {
					if ($.parseJSON(e.data).action != null) {
						switch ($.parseJSON(e.data).action) {
						case "CHAT":
							handle_message($.parseJSON(e.data));
							break;
						case "UPDATEMESSAGESTATUS":
							alert(e.data);
							handle_update_message_status($.parseJSON(e.data));
							break;
						}
					}
				};

				function handle_message(data) {
					do_receive(data);
					ws.send(JSON.stringify({
						"action" : "UPDATEMESSAGESTATUS",
						"fromID" : data.fromID,
						"ID" : data.ID,
						"status" : "ARRIVED"
					}));
				}

				function handle_update_message_status(data) {
					do_update_message_status(data);
				}
			};
		});