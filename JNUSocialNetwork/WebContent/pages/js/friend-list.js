/**
 * 
 */

function on_friends_node_click() {
	if ($("#contact-list .friends-tree-node span").attr("class").indexOf(
			"glyphicon-chevron-right") != -1) {
		$("#contact-list .friends-tree-node span")
				.replaceWith(
						'<span class="glyphicon glyphicon-chevron-down">&nbsp;好友</span>');
		var chatRooms = sessionStorage.getItem("chatrooms");
		chatRooms = $.parseJSON(chatRooms);
		var names = {};
		for (var i = 0; chatRooms != null && i < chatRooms.length; i++) {
			if (chatRooms[i].m1ID == USERID) {
				names[chatRooms[i].m2ID] = chatRooms[i].m2.name;
				var info = '<div class="person" id="'
						+ chatRooms[i].m2ID
						+ '"><a href="javascript:void(0);" class="avatar"><img src="'
						+ chatRooms[i].m2.avatarLink
						+ '" class="person-img" /><p class="person-info">'
						+ chatRooms[i].m2.name;
				if (!chatRooms[i].online)
					info += '<span class="glyphicon glyphicon-stop" style="color: rgb(169, 169, 169);"></span></p></a></div>';
				else
					info += '<span class="glyphicon glyphicon-stop" style="color: rgb(45, 189, 48);"></span></p></a></div>';
				$("#contact-list .friends-tree-node").append(info);
				$("#contact-list #" + chatRooms[i].m2ID).click(function() {
					var name = sessionStorage.getItem("userNameID");
					name = $.parseJSON(name);
					name = name[$(this).attr("id")];
					open_chatroom(USERID, $(this).attr("id"), name);
				});
			} else {
				names[chatRooms[i].m1ID] = chatRooms[i].m1.name;
				var info = '<div class="person" id="'
						+ chatRooms[i].m1ID
						+ '"><a href="javascript:void(0);" class="avatar"><img src="'
						+ chatRooms[i].m1.avatarLink
						+ '" class="person-img" /><p class="person-info">'
						+ chatRooms[i].m1.name;
				if (!chatRooms[i].online)
					info += '<span class="glyphicon glyphicon-stop" style="color: rgb(169, 169, 169);"></span></p></a></div>';
				else
					info += '<span class="glyphicon glyphicon-stop" style="color: rgb(45, 189, 48);"></span></p></a></div>';
				$("#contact-list .friends-tree-node").append(info);
				$("#contact-list #" + chatRooms[i].m1ID).click(function() {
					var name = sessionStorage.getItem("userNameID");
					name = $.parseJSON(name);
					name = name[$(this).attr("id")];
					open_chatroom(USERID, $(this).attr("id"), name);
					open_chatroom(USERID, $(this).attr("id"), name);
				});
			}
		}
		sessionStorage.setItem("userNameID", JSON.stringify(names));
	} else if ($("#contact-list .friends-tree-node span").attr("class")
			.indexOf("glyphicon-chevron-down") != -1) {
		$("#contact-list .friends-tree-node span")
				.replaceWith(
						'<span class="glyphicon glyphicon-chevron-right">&nbsp;好友</span>');
		$("#contact-list .friends-tree-node .person").remove();
	}
}
