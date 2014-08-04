//function showActivityDetail
	function showActivityDetail(activity,community){
		var activity = FetchPostByID("1407045012720");
		$('.activityShowName').html(activity.attributes.activityName);
		$('.activityShowTime').html("&nbsp;"+activity.attributes.activityTime);
		$('.activityShowAddre').html("&nbsp;"+activity.attributes.activityAddr);
		$('.activityShowD').html("&nbsp;"+activity.attributes.activityMore);
		var community = FetchCommunityByID("1407044989969");
		$('.communityName').html(community.memberIDs.length);
		$('.communityNum').html(community.attributes.name);
		var comments = FetchCommentByPost("1407032926865","0","5");
		var comment="";
		$.each(comments.reverse(),function(index,jsonComment){
			comment = comment + "<div class='aBodyComment'><div class='aCommentItem'><img alt=''  src='images/user_img.jpg'><div class='user_name'><strong>"+jsonComment.owner.attributes.nickName+"</strong></div><div class='user_info'>"+jsonComment.publishDate+"</div><br><div>"+jsonComment.attributes.content+"</div></div></div>";
		 });
		$(".commentBtn").after(comment); 
		
		//var activityOwner = 
		
	}