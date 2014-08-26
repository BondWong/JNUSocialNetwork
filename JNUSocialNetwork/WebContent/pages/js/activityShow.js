//function showActivityDetail
	function showActivityDetail(activity,community){
		$('.activityShowName').html(activity.attributes.activityName);
		$('.activityShowTime').html("&nbsp;"+activity.attributes.activityTime);
		$('.activityShowAddre').html("&nbsp;"+activity.attributes.activityAddr);
		$('.activityShowD').html("&nbsp;"+activity.attributes.activityMore);
		$('.activityHead').find('img').attr("src",activity.attributes.background);
		$('#addComment').attr("value",activity.ID);
		$('.acBtn').attr("id","commentText"+activity.ID);
		$('.communityName').html(community.attributes.name);
		$('.communityNum').html(activity.likerIDs.length+"&nbspare intesting in this activity");
		var comments = FetchCommentByPost(activity.ID,"0","5");
		var comment="";
		$.each(comments.reverse(),function(index,jsonComment){
			comment = comment + "<div class='aBodyComment'><div class='aCommentItem'><img class='img-circle userImg' onload='javascript:auto_resize(50, 50, this)'  src='"+jsonComment.owner.attributes.avatarLink+"'><div class='user_name'><strong>"+jsonComment.owner.attributes.name+"</strong></div><div class='user_info'><span>"+jsonComment.publishDate+"</span><span class='replyaComment'>reply</span><span class='glyphicon glyphicon-remove deleteCommBtn'><input type='hidden' id='"+activity.ID+"' value='"+jsonComment.ID+"' /></span></div><br><div>"+jsonComment.attributes.content+"</div></div></div>";
		 });
		$(".commentBtn").after(comment); 
		$('.communityBS').find('img').attr("src",'images/default/default-community-card.png');
		$('.addcommunityA').attr("id",community.ID);
		$('.activityJoin').attr("id",activity.ID);
		$('.leaveactivityJoin').attr("id",activity.ID);
		if($.inArray(USERID,activity.likerIDs)!= -1){
		$('#activityLike').attr("class","glyphicon glyphicon-heart");
		}
	}
	$('body').on("click",".glyphicon-heart-empty",function(){
		LikePost(USERID,activity.ID);
		$('.glyphicon-heart-empty').attr("class","glyphicon glyphicon-heart");
	});
	$('body').on("click",".glyphicon-heart",function(){
		CancelLikePost(USERID,activity.ID);
		$('.glyphicon-heart').attr("class","glyphicon glyphicon-heart-empty");
	});
	$('body').on("click",".editActivity",function(){
		$('#activityName').val(activity.attributes.activityName);
		$('#activityTime').val(activity.attributes.activityTime);
		$('#activityAddr').val(activity.attributes.activityAddr);
		$('#activityMore').val(activity.attributes.activityMore);
	});
	$('body').on("click",".addcommunityA",function(){
		
	});
	$('body').on("click","#saveActivity",function(){
		var activityC ="";
		if ($('#fileupload').val() != "") {
			activityC = FileUpload(new FormData($('.activityForm')[0]))[0];
		} else{
			activityC = activity.attributes.background;
		}
		var attributes = {
				activityName : $('#activityName').val(),
				startDate : Date.parse($('#activityTime').val())+"",
				activityTime: $('#activityTime').val(),
				activityAddr : $('#activityAddr').val(),
				activityMore : $('#activityMore').val(),
				background:activityC
		};
		var json = $.toJSON(attributes);
		var aup = UpdateActivity(activity.ID,json);
		$('#editActivity').modal('hide');
		$('.activityShowName').html(aup.attributes.activityName);
		$('.activityShowTime').html("&nbsp;"+aup.attributes.activityTime);
		$('.activityShowAddre').html("&nbsp;"+aup.attributes.activityAddr);
		$('.activityShowD').html("&nbsp;"+aup.attributes.activityMore);
	});