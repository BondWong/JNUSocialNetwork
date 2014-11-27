function fetchMembers() {
	$.each(community.members, function(n, member) {
		addMember(member.avatarLink, member.ID, member.name);
	});
}
function addMember(avatarLink, id, name) {
	var imageA = $.parseJSON(avatarLink).src;
	if($.parseJSON(avatarLink).thumbnail != undefined){
		imageA = $.parseJSON($.parseJSON(avatarLink).thumbnail).src;
	}
	var memberDiv = "<div class='member' id='"
			+ id
			+ "'><img width='80' height='80'  class='userMember' src='"
			+ imageA
			+ "' /><span class='glyphicon glyphicon-remove memberRemoveBtn' style='font-size:10px'></span><input type='hidden' value='"
			+ id
			+ "' /><span class='memberName'><a style='cursor:pointer;color:#404040'>"
			+ name + "</a></span><input type='hidden' value='" + id
			+ "' name='userID'/></div>";
	$('.membersBord').after(memberDiv);
	Msnry('.membersContainer', '.member', 215);
	$('.memberName').userTips();
}
function showCommunityInfo() {
	var imageC = $.parseJSON(community.attributes.communityCard).src;
	if($.parseJSON(community.attributes.communityCard).thumbnail != undefined){
		imageC = $.parseJSON($.parseJSON(community.attributes.communityCard).thumbnail).src;
	}
	$('.cName').html(community.attributes.name);
	$('.cIntro').html(community.attributes.introduct);
	$('.communityPic').find('img').attr("src",imageC);
}
$('body').on("click", ".communityHref", function() {
	window.location.href = 'communityShow.jsp?' + community.ID;
});
$('body').on("click", ".memberRemoveBtn", function() {
	var userID = $(this).next().attr("value");
	LeaveMember(USERID, userID, community.ID);
	$("#" + userID + "").remove();
	Msnry('.membersContainer', '.member', 215);
});