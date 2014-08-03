//function showActivityDetail
	function showActivityDetail(user,activity,community){
		var activity = FetchPostByID("1406981762238");
		$('.activityShowName').html(activity.attributes.activityName);
		$('.activityShowTime').html("&nbsp;"+activity.attributes.activityTime);
		$('.activityShowAddre').html("&nbsp;"+activity.attributes.activityAddr);
		$('.activityShowD').html("&nbsp;"+activity.attributes.activityMore);
		
		var comments = FetchCommentByPost("1406981762238","0","5");
		$.each(comments,function(index,jsonComment){
			//comment = comment + "<div class='act_content "+jsonComment.ID+"'><div class='row'><div class='col-lg-1'><img src='images/user_img3.jpg' /></div><div class='col-lg-10'><div class='col-lg-6 custom_lg-6'><div class='user_name'><strong>"+jsonComment.owner.attributes.nickName+"</strong></div></div><div class='col-lg-6 custom_lg-6'><div class='deleteCommBtn' style='cursor:pointer'><a><input id='"+ID+"' type='hidden' value='"+jsonComment.ID+"' /><span class='glyphicon glyphicon-remove' style='font-size: 8px'></span></a></div></div><div class='col-lg-5 custom_lg-6'><div class='user_info'>"+jsonComment.publishDate+"</div></div><div class='col-lg-7 custom_lg-6'><div class='comment_like' style='cursor: pointer'><div class='likeComment likeCommentN"+jsonComment.ID+"'>+<span>"+jsonComment.likerIDs.length+"</span></div><a><input id='likeID' type='hidden' value='"+jsonComment.ID+"' />+1<span style='font-size: 8px'></span></a></div></div></div></div><div class='act_comment'>"+jsonComment.attributes.content+"﻿</div></div>";
		 });
		//var activityOwner = 
		
	}