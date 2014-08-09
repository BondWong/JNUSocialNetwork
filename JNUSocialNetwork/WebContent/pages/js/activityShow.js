//function showActivityDetail
	function showActivityDetail(activity,community){
		var activity = FetchPostByID(sessionStorage.getItem("activityID"));
		$('.activityShowName').html(activity.attributes.activityName);
		$('.activityShowTime').html("&nbsp;"+activity.attributes.activityTime);
		$('.activityShowAddre').html("&nbsp;"+activity.attributes.activityAddr);
		$('.activityShowD').html("&nbsp;"+activity.attributes.activityMore);
		var community = FetchCommunityByID(sessionStorage.getItem("commmunityID"));
		$('.communityName').html(community.memberIDs.length);
		$('.communityNum').html(community.attributes.name);
		var comments = FetchCommentByPost(sessionStorage.getItem("activityID"),"0","5");
		var comment="";
		$.each(comments.reverse(),function(index,jsonComment){
			comment = comment + "<div class='aBodyComment'><div class='aCommentItem'><img alt=''  src='images/user_img.jpg'><div class='user_name'><strong>"+jsonComment.owner.attributes.nickName+"</strong></div><div class='user_info'>"+jsonComment.publishDate+"</div><br><div>"+jsonComment.attributes.content+"</div></div></div>";
		 });
		$(".commentBtn").after(comment); 
	}