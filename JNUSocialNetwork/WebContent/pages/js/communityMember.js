function fetchMembers() {
	$.each(community.members, function(n, member) {
		addMember(member.avatarLink, member.ID, member.name);
	});
}
function addMember(avatarLink, id, name) {
	var memberDiv = "<div class='member' id='"+id+"'><img onload='javascript:auto_resize(80, 80, this)'  class='userMember' src='"
			+ $.parseJSON(avatarLink).src
			+ "' style='display: none'/><span class='glyphicon glyphicon-remove memberRemoveBtn' style='font-size:10px'></span><input type='hidden' value='"
			+ id + "' /><span class='memberName'><a style='cursor:pointer;color:#404040'>" + name 
			+ "</a></span><input type='hidden' value='"
			+ id 
			+ "' name='userID'/></div>";
	$('.membersBord').after(memberDiv);
	Msnry('.membersContainer', '.member', 215);
	$('.memberName').userTips();
}
function showCommunityInfo() {
	$('.cName').html(community.attributes.name);
	$('.cIntro').html(community.attributes.introduct);
	$('.communityPic').find('img').attr("src",
			community.attributes.communityCard);
}
$('body').on("click", ".communityHref", function() {
	window.location.href = 'communityShow.jsp?' + community.ID;
});
$('body').on("click", ".memberRemoveBtn", function() {
	var userID = $(this).next().attr("value");
	LeaveMember(USERID, userID,community.ID);
	$("#"+userID+"").remove();
	Msnry('.membersContainer', '.member', 215);
});