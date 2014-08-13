//function showActivityDetail
	function showActivityDetail(activity,community){
		$('.activityShowName').html(activity.attributes.activityName);
		$('.activityShowTime').html("&nbsp;"+activity.attributes.activityTime);
		$('.activityShowAddre').html("&nbsp;"+activity.attributes.activityAddr);
		$('.activityShowD').html("&nbsp;"+activity.attributes.activityMore);
		$('#addComment').attr("value",activity.ID);
		$('.acBtn').attr("id","commentText"+activity.ID);
		$('.communityName').html(community.memberIDs.length);
		$('.communityNum').html(community.attributes.name);
		var comments = FetchCommentByPost(activity.ID,"0","5");
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