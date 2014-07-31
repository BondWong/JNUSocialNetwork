//function Activity
	$('.activityJoin').click(function(e){
		JoinActivity("2011052407","1406129450025");
	});
	$('.leaveactivityJoin').click(function(e){
		LeaveActivity("2011052407","1406129450025");
	});
//
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
		AddPostToCommunity("2011052405","1406820610144","COMMUNITYOWNER",json);
	    $('#activityCommunity').modal('hide');
	});
	//function fetchActivityByCommunity
	function fetchActivityByCommunity(){
		var response = fetchByCommunity("1406820610144","0","5");
		$.each(response.reverse(),function(n,dataString){
			addActivity(dataString.communityID,dataString.activityName,dataString.activityTime,dataString.activityAddr,dataString.activityMore,dataString.imageLinks);
		});
	}
	//function addActivity
	function addActivity(communityID,name,time,addre,more,imagelink){
		 var boarddiv = "<div class='activity'><div class='activityBg'><img src='images/activityBgS.jpg' /></div><div class='user_img activityAvatar'><img class='userImg' src='images/user_img.jpg' /></div><div class='activityName'><span>"+name+"</span></div><div class='activityTime'><span class='glyphicon glyphicon-time'>&nbsp;"+time+"</span></div><div class='activityaddre'><span class='glyphicon glyphicon-flag'>&nbsp;+addre+</span></div><div class='activityD'><span>"+more+"</span></div><div class='activityAsk'><span>Are you going to join in?</span><select class='btn btn-default'><option>Maybe</option><option class='activityJoin' id='"+communityID+"'>Yes</option><option class='leaveactivityJoin' id='"+communityID+"'>No</option></select></div></div>";
		 $(".activityBord").after(boarddiv); 
		 Msnry('.activityBody', '.activity', 435);
	}
	