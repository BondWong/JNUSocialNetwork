//function showActivityDetail
	function showActivityDetail(activity,community){
		$('.activityShowName').html(activity.attributes.activityName);
		$('.activityShowTime').html("&nbsp;"+activity.attributes.activityTime);
		$('.activityShowAddre').html("&nbsp;"+activity.attributes.activityAddr);
		$('.activityShowD').html("&nbsp;"+activity.attributes.activityMore);
		$('#addComment').attr("value",activityID);
		$('.acBtn').attr("id","commentText"+activityID);
		$('.communityName').html(community.memberIDs.length);
		$('.communityNum').html(community.attributes.name);
		var comments = FetchCommentByPost(activityID,"0","5");
		var comment="";
		$.each(comments.reverse(),function(index,jsonComment){
			comment = comment + "<div class='aBodyComment'><div class='aCommentItem'><img alt=''  src='images/user_img.jpg'><div class='user_name'><strong>"+jsonComment.owner.attributes.nickName+"</strong></div><div class='user_info'>"+jsonComment.publishDate+"</div><br><div>"+jsonComment.attributes.content+"</div></div></div>";
		 });
		$(".commentBtn").after(comment); 
	}
	
	$('body').on("click",".editActivity",function(){
		$('#activityName').val(activity.attributes.activityName);
		$('#activityTime').val(activity.attributes.activityTime);
		$('#activityAddr').val(activity.attributes.activityAddr);
		$('#activityMore').val(activity.attributes.activityMore);
	});
	$('body').on("click",".saveActivity",function(){
		var millisecond = Date.parse($('#activityTime').val())+"";
		var post = {
			postType : 'ACTIVITY',
			attributes : {
				activityName : $('#activityName').val(),
				startDate : millisecond,
				activityTime:$('#activityTime').val(),
				activityAddr : $('#activityAddr').val(),
				activityMore : $('#activityMore').val(),
			},
			imageLinks : FileUpload(new FormData($('.activityForm')[0]))
		};
		var json = $.toJSON(post);
		AddPostToCommunity("2011052405", community.ID, "COMMUNITYOWNER", json);
		$('#activityCommunity').modal('hide');
	});