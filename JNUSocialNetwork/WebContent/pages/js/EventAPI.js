//subscribe 事件源
function Subscribe(){
	/*if (!window.EventSource) {
		 document.write('js/jquery.eventsource.js');
	}*/
	var source = new EventSource("../../JNUSocialNetwork/app/event/subscribe");
	return source;
}
//fileUpload
//AddPost parameter:addpost.pnd -d  response:CREATEPOST
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