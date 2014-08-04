/**
 * 
 */

function on_friends_node_click() {
	if ($("#contact-list .friends-tree-node span").attr("class").indexOf(
			"glyphicon-chevron-right") != -1) {
		$("#contact-list .friends-tree-node span")
				.replaceWith(
						'<span class="glyphicon glyphicon-chevron-down">Friends</span>');
		$("#contact-list .friends-tree-node")
				.append(
						'<div class="person"><img src="" class="person-img" /><p class="person-info">Bond<span class="glyphicon glyphicon-stop" style="color: rgb(169, 169, 169);"></span></p></div>');
	} else if ($("#contact-list .friends-tree-node span").attr("class")
			.indexOf("glyphicon-chevron-down") != -1) {
		$("#contact-list .friends-tree-node span")
				.replaceWith(
						'<span class="glyphicon glyphicon-chevron-right">Friends</span>');
		$("#contact-list .friends-tree-node .person").remove();
	}
}

function on_strangers_node_click() {
	if ($("#contact-list .strangers-tree-node span").attr("class").indexOf(
			"glyphicon-chevron-right") != -1) {
		$("#contact-list .strangers-tree-node span")
				.replaceWith(
						'<span class="glyphicon glyphicon-chevron-down">Strangers</span>');
		$("#contact-list .strangers-tree-node")
				.append(
						'<div class="person"><img src="" class="person-img" /><p class="person-info">Mary<span class="glyphicon glyphicon-stop" style="color: rgb(45, 189, 48);"></span></p></div>');
	} else if ($("#contact-list .strangers-tree-node span").attr("class")
			.indexOf("glyphicon-chevron-down") != -1) {
		$("#contact-list .strangers-tree-node span")
				.replaceWith(
						'<span class="glyphicon glyphicon-chevron-right">Strangers</span>');
		$("#contact-list .strangers-tree-node .person").remove();
	}
}

function do_create_chatroom() {
	
}