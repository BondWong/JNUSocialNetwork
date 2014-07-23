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
			fetchPostByIDs();
			postIdContainer = [];
		}
		if(jsondata.userID!=userID){
			$('.alertCust').css("display","block");
		}
	
 });
		source.addEventListener('deletePostSSE',function(e){});
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
		source.addEventListener('ADDCOMMENT',function(event){
			var jsondata = $.parseJSON(event.data);
			var jsonComment = jsondata.commentRepresentation;
			var boarddiv = "<div class='act_content'><div class='row'><div class='col-lg-1'><img src='images/user_img2.jpg' /></div><div class='col-lg-11'><div class='ures_name'><strong>"+jsonComment.ownerRepresentation.nickName+"</strong></div><div class='user_info'>Yesterday 21:23pm</div></div></div><div class='act_comment'>"+jsonComment.content+"﻿</div></div></div>";
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