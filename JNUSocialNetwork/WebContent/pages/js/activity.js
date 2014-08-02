$(document).ready(function(){
	$('body').on("click","#activityCreate",function(){
		var post={
				postType:'ACTIVITY',
				attributes:{
					activityName:$('#activityName').val(),
					activityTime:$('#activityTime').val(),
					activityAddr:$('#activityAddr').val(),
					activityMore:$('#activityMore').val(),
				},
				imageLinks:FileUpload(new FormData($('.activityForm')[0]))
		};
		var json = $.toJSON(post);
		AddPostToCommunity("2011052405","1406962347159","COMMUNITYOWNER",json);
	    $('#activityCommunity').modal('hide');
	});
});
	//function fetchActivityByCommunity
	function fetchActivitiesByCommunity(){
		var response = FetchActivitiesByCommunity("1406962347159","0","5");
		$.each(response.reverse(),function(n,dataString){
			addActivity(dataString.communityID,dataString.activityName,dataString.activityTime,dataString.activityAddr,dataString.activityMore,dataString.imageLinks);
		});
	}
	//function fetchActivityByCommunity
	function fetchPostByCommunity(){
		var response = FetchActivitiesByCommunity("1406962347159","0","5");
		$.each(response.reverse(),function(n,dataString){
			addActivity(dataString.ID,dataString.attributes.activityName,dataString.attributes.activityTime,dataString.attributes.activityAddr,dataString.attributes.activityMore,dataString.imageLinks);
		});
	}
	//function addActivity
	function addActivity(activityID,name,time,addre,more,imagelink){
		 var boarddiv = "<div class='activity'><div class='activityBg'><img src='images/activityBgS.jpg' /></div><div class='user_img activityAvatar'><img class='userImg' src='images/user_img.jpg' /></div><div class='activityName'><span>"+name+"</span></div><div class='activityTime'><span class='glyphicon glyphicon-time'>&nbsp;"+time+"</span></div><div class='activityaddre'><span class='glyphicon glyphicon-flag'>&nbsp;"+addre+"</span></div><div class='activityD'><span>"+more+"</span></div><div class='activityAsk'><span>Are you going to join in?</span><select class='btn btn-default'><option>Maybe</option><option class='activityJoin' id='"+activityID+"'>Yes</option><option class='leaveactivityJoin' id='"+activityID+"'>No</option></select></div></div>";
		 $(".activityBord").after(boarddiv); 
		 Msnry('.activityBody', '.activity', 435);
	}
	