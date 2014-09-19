if (BrowserDetection() != false) {
	var alert = "<div class='modal fade' id='browserDetection' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title'>检测到你浏览器的版本过低，有可能影响网站效果哦</h4></div><div class='modal-body modal-custom'><a data-dismiss='modal' type='button' class='btn btn-primary' >我知道了</a></div></div></div></div>";
	var button = "<button  data-toggle='modal' class='browserClick' data-target='#browserDetection'></button>";
	$('body').append(button);
	$('body').append(alert);
	$('.browserClick').click();
}
function addCommunity(id, name, memberNum, communityImg, introduce, ownerID) {
	var officalID = [ "13750046461", "13286050151", "13631272706",
			"13726285186", "13750044036", "13750057060", "13750066893",
			"13750069327", "13750069659", "13750069678", "13750070025",
			"13750072213", "13750075145", "13750075284", "18666561301" ];
	var officalIcon = "";
	if ($.inArray(ownerID, officalID) != -1) {
		officalIcon = "<span class='officalIcon'><img src='images/offical.png' /><span>";
	}
	var boarddiv = "<li class='communityShowItem'><div class='community_container'><a><div class='img_container'><input type='hidden' value='"
			+ id
			+ "'><img src='"
			+ $.parseJSON(communityImg).src
			+ "' width='267' height='267' />"
			+ officalIcon
			+ "</div></a><div class='content_info'><div class='conten_head'>"
			+ name
			+ "</div><div class='content_count'>"
			+ memberNum
			+ " members</div></div><div class='content_tips'><p>"
			+ introduce
			+ "</p></div></div></div>";

	$('.communityBoard').after(boarddiv);
	$('.community_container').hover(function() {
		$(this).find('.content_info').animate({
			opacity : 0
		}, "fast");
		$(this).find('.content_tips').animate({
			opacity : 1
		}, "fast");
	}, function() {
		$(this).find('.content_info').animate({
			opacity : 1
		}, "fast");
		$(this).find('.content_tips').animate({
			opacity : 0
		}, "fast");
	});
}

function fetchHotCommunity() {
	var communities = FetchCommunity("0", "8");
	$.each(communities.reverse(),
			function(n, community) {
				if (community.available == true) {
					addCommunity(community.ID, community.attributes.name,
							community.members.length,
							community.attributes.communityCard,
							community.attributes.introduct,
							community.attributes.userID);
				}
			});
}
$('body').on("click", ".img_container", function() {
	var comm = $(this).find("input").attr("value");
	window.location.href = 'communityOwnerPage.jsp?' + comm;
});

/**
 * auto_resize
 */
function auto_resize(maxWidth, maxHeight, srcImage) {
	var image = new Image();
	image.src = srcImage.src;
	if (image.width > maxWidth && image.height <= maxHeight) {
		image.width = maxWidth;
		image.height = (maxHeight / maxWidth) * image.width;
	} else if (image.height > maxHeight && image.width <= maxWidth) {
		image.height = maxHeight;
		image.width = (maxWidth / maxHeight) * image.height;
	} else if (image.height > maxHeight && image.width > maxWidth) {
		var intervalWidth = image.width - maxWidth;
		var intervalHeight = image.height - maxHeight;
		if (intervalWidth >= intervalHeight) {
			image.width = maxWidth;
			image.height = (maxHeight / maxWidth) * image.width;
		} else {
			image.height = maxHeight;
			image.width = (maxWidth / maxHeight) * image.height;
		}
	}

	srcImage.width = image.width;
	srcImage.height = image.height;
	$(srcImage).fadeIn("fast");
}
