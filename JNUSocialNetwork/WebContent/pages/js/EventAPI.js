//subscribe 事件源
function Subscribe(){
	/*if (!window.EventSource) {
		 document.write('js/jquery.eventsource.js');
	}*/
	var source = new EventSource("../../JNUSocialNetwork/app/event/subscribe");
	return source;
}
//文件上传 输入：formDate格式 输出：imagelink数组
function FileUpload(formData){
	var fileDri = [];
	$.ajax({
    	type:"POST",
    	url:'../../JNUSocialNetwork/app/fileUploader',
    	data:formData,
    	success:function(data){
	    	for(var i=0;i<data.length;i++){
	    		var dataString=data[i];
	    		fileDri.push(dataString);
	    		}
	    	},
    	cache:false,
		contentType:false,
		processData:false
    });
	return fileDri;
}
//AddPost parameter:addpost.pnd -d  response:success fail
function AddPost(UserID,JsonData){
	var response="";
	$.ajax({
    	type:"POST",
    	url:'../../JNUSocialNetwork/app/post/add/'+UserID,
    	data:JsonData,
    	contentType: "application/json",
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}

//DeletePost 输入：postID
function DeletePost(postID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/post/delete/'+postID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}

//likepost 输入：userID,postID 
function LikePost(userID,postID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/post/like/'+userID+postID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//cancelLikepost 输入：userID,postID 
function CancelLikePost(userID,postID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/post/cancelLike/'+userID+postID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
