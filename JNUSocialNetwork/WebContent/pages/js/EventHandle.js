// JavaScript Document
//create event source
$(document).ready(function(){
window.onload = function(){
if (!!window.EventSource) {
		var source = Subscribe();
		source.addEventListener("CREATEPOST",function(event){
			var jsondata = $.parseJSON(event.data);
			postIdContainer.push(jsondata.post.ID);
			if(jsondata.post.owner.ID==userID){
				fetchPostByIDs(postIdContainer);
				postIdContainer = [];
			}
			if(jsondata.userID!=userID){
				$('.alertCust').css("display","block");
			}
	
 });	
		source.addEventListener("CREATEPOSTINCOMMUNITY",function(event){
			var jsondata = $.parseJSON(event.data);
			communityPostIdContainer.push(jsondata.post.ID);
			if(jsondata.post.owner.ID==userID){
				fetchByCommunity();
				communityPostIdContainer = [];
			}
			if(jsondata.userID!=userID){
				$('.alertCustC').css("display","block");
			}
	
});
		source.addEventListener('DELETEPOST',function(event){
			var jsondata = $.parseJSON(event.data);
			$("div[class='post "+jsondata.ID+"']").remove();
			fetchByFolloweeOrOwner();
			Msnry('.pro_body','.post',435);
		});
		source.addEventListener('DELETEPOSTFROMCOMMUNITY',function(event){
			var jsondata = $.parseJSON(event.data);
			$("div[class='post "+jsondata.ID+"']").remove();
			fetchByCommunity();
			Msnry('.pro_body','.post',435);
		});
		source.addEventListener('LIKEPOST',function(event){
			var jsondata = $.parseJSON(event.data);
			var postID = jsondata.postID;
			var inputID = $("input[value='"+postID+"'][id='likeID']");
			var like = parseInt(inputID.next().text())+1;
			inputID.next().text(like); 
		});
		source.addEventListener('CANCELLIKEPOST',function(event){
			var jsondata = $.parseJSON(event.data);
			var postID = jsondata.postID;
			var inputID = $("input[value='"+postID+"'][id='likeID']");
			var like = parseInt(inputID.next().text())-1;
			inputID.next().text(like);
		});
		source.addEventListener('COLLECTPOST',function(event){
			var jsondata = $.parseJSON(event.data);
			var postID = jsondata.pcID;
			
		});
		source.addEventListener('CANCELCOLLECTPOST',function(event){
			var jsondata = $.parseJSON(event.data);
			var postID = jsondata.pcID;
			
		});
		source.addEventListener('JOINACTIVITY',function(e){
			
		});
		source.addEventListener('CREATECOMMENT',function(event){
			var jsondata = $.parseJSON(event.data);
			var jsonComment = jsondata.comment;
			var boarddiv = "<div class='act_content'><div class='row'><div class='col-lg-1'><img src='images/user_img3.jpg' /></div><div class='col-lg-10'><div class='col-lg-6 custom_lg-6'><div class='user_name'><strong>"+jsonComment.owner.attributes.nickName+"</strong></div></div><div class='col-lg-6 custom_lg-6'><div class='deleteCommBtn'><a><input id='deleteID' type='hidden' value='"+jsonComment.ID+"' /><span class='glyphicon glyphicon-remove' style='font-size: 8px'></span></a></div></div><div class='col-lg-5 custom_lg-6'><div class='user_info'>"+jsonComment.publishDate+"</div></div><div class='col-lg-7 custom_lg-6'><div class='comment_like' style='cursor: pointer'><a><input id='likeID' type='hidden' value='"+jsonComment.ID+"' />+1<span style='font-size: 8px'></span></a></div></div></div></div><div class='act_comment'>"+jsonComment.attributes.content+"﻿</div></div>";
			$("button[value='"+jsondata.postID+"'][id='addComment']").parent().parent().after(boarddiv); 
			Msnry('.pro_body','.post',435);
		});
		source.addEventListener('supportSSE',function(e){});
		source.addEventListener('cancelSupportSSE',function(e){});
		source.addEventListener('FOLLOW',function(event){
			var jsondata = $.parseJSON(event.data);
			var followBtn = $("button[id='followBtn']");
			followBtn.text("Following");
			
		});
		source.addEventListener('CANCELFOLLOW',function(event){
			var jsondata = $.parseJSON(event.data);
			var followBtn = $("button[id='followBtn']");
			followBtn.text("Follow");
			
		});
		
}
};
});