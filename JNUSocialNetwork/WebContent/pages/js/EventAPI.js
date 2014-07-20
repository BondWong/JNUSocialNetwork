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
//***********************************PostService   begin*********************************
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
//AddPostToCommunity parameter:addpost.pnd -d  response:success fail
function AddPostToCommunity(UserID,communityID,JsonData){
	var response="";
	$.ajax({
    	type:"POST",
    	url:'../../JNUSocialNetwork/app/post/add/'+UserID+'/'+communityID,
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
//DeletePostFromCommunity 输入：postID
function DeletePostFromCommunity(communityID,postID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/post/delete/'+communityID+'/'+postID,
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
    	url:'../../JNUSocialNetwork/app/post/like/'+userID+'/'+postID,
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
    	url:'../../JNUSocialNetwork/app/post/cancelLike/'+userID+'/'+postID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//CollectPost 输入：userID,postID 
function CollectPost(userID,postID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/post/collect/'+userID+'/'+postID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//CancelCollectPost 输入：userID,postID 
function CancelCollectPost(userID,postID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/post/cancelCollect/'+userID+'/'+postID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//fetchPostByOwner  输入：ownerID 开始index，数量  如：0/5 表示最新的5个;返回：postJson
function FetchPostsByOwner(ownerID,startIndex,pageSize){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/post/fetchByOwner/'+ownerID+'/'+startIndex+'/'+pageSize,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
	
}
// FetchPostsByFollowee  输入：userID 开始index，数量  如：0/5 表示最新的5个;返回：postJson
function FetchPostsByFollowee(userID,startIndex,pageSize){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/post/fetchByFollowee/'+userID+'/'+startIndex+'/'+pageSize,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//FetchPostsByID  输入：postID;返回：postJson
function FetchPostByID(postID){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/post/fetchByID/'+postID,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//FetchPostsByIDs  输入：数组postID[];返回：postJson
function FetchPostByIDs(postID){
	var response="";
	var Urls = '../../JNUSocialNetwork/app/post/fetchByPostIDs?';
	$.each(postID,function(n,value){
		if(n != postID.length-1){
			Urls = Urls +'postIDs='+ value+'&';
		}
		else{
			Urls = Urls +'postIDs='+ value;
			return true;
		}
	});
	$.ajax({
    	type:"GET",
    	url:Urls,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//joinActivity 输入：userID,postID 
function JoinActivity (userID,postID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/post/joinActivity/'+userID+'/'+postID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//***********************************PostService   end*********************************
//***********************************CommentService   begin*********************************
//AddComment parameter:addcomment.pnd -d  response:success fail
function AddComment(userID,postID,JsonData){
	var response="";
	$.ajax({
    	type:"POST",
    	url:'../../JNUSocialNetwork/app/comment/add/'+userID+'/'+postID,
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
//DeleteComment 输入：commentID
function DeleteComment(postID,commentID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/comment/delete/'+postID+'/'+commentID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//likecomment 输入：userID,postID 
function LikeComment(userID,commentID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/comment/like/'+userID+'/'+commentID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//cancelLikeComment 输入：userID,commentID
function CancelLikeComment(userID,commentID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/comment/cancelLike/'+userID+'/'+commentID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//FetchByPost  输入：postID 开始index，数量  如：0/5 表示最新的5个;返回：postJson
function FetchCommentByPost(postID,startIndex,pageSize){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/comment/fetchByPost/'+postID+'/'+startIndex+'/'+pageSize,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//***********************************CommentService   end*********************************
//***********************************CommunityService   begin*********************************
//AddCommunity parameter:addcomment.pnd -d  response:success fail
function AddCommunity(userID,JsonData){
	var response="";
	$.ajax({
    	type:"POST",
    	url:'../../JNUSocialNetwork/app/community/add/'+userID,
    	data:JsonData,
    	async: false,
    	contentType: "application/json",
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//DeleteCommunity 输入：communityID
function DeleteCommunity(communityID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/community/delete/'+communityID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//fetch  输入： 开始index，数量  如：0/5 表示最新的5个;返回：postJson
function FetchCommunity(startIndex,pageSize){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/community/fetch/'+startIndex+'/'+pageSize,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}

//FetchByID  输入：communityID;返回：postJson
function FetchCommunityByID(communityID){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/community/fetchByID/'+communityID,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//FetchByType  输入：communityID;返回：postJson
function FetchCommunityByType(communityType,startIndex,pageSize){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/community/fetchByType/'+communityType+'/'+startIndex+'/'+pageSize,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//***********************************CommunityService   end*********************************
//***********************************UserService   begin*********************************
//DeleteMember 输入：userID
function DeleteMember(userID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/user/deleteMember/'+userID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//DeleteCommunityOwner 输入：ownerID
function DeleteCommunityOwner(ownerID){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/user/deleteCommunityOwner/'+ownerID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    });
	return response;
}
//follow 输入：被关注和关注userID
function Follow(followeeID,followerID){
	var response="";
	$.ajax({
		type:"PUT",
    	url:'../../JNUSocialNetwork/app/user/follow/'+followeeID+'/'+followerID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
	});
	return response;
}
//cancelfollow 输入：被关注和关注userID
function CancelFollow(followeeID,followerID){
	var response="";
	$.ajax({
		type:"PUT",
    	url:'../../JNUSocialNetwork/app/user/cancelFollow/'+followeeID+'/'+followerID,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
	});
	return response;
}
//updateUserProfile 输入：被关注和关注userID
function UpdateUserProfile(userID,JsonData){
	var response="";
	$.ajax({
		type:"PUT",
    	url:'../../JNUSocialNetwork/app/user/updateProfile/'+userID,
    	data:JsonData,
    	async: false,
    	contentType: "application/json",
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
	});
	return response;
}
//addImages  输入：数组ImageLinks[];返回：postJson
function AddImages(userID,imageLinks){
	var response="";
	var Urls = '../../JNUSocialNetwork/app/user/addImages/'+userID+'?';
	$.each(imageLinks,function(n,value){
		if(n != imageLinks.length-1){
			Urls = Urls +'imageLinks='+ value+'&';
		}
		else{
			Urls = Urls +'imageLinks='+ value;
		}
	});
	$.ajax({
    	type:"PUT",
    	url:Urls,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//FetchFollowees  输入：userID 开始index，数量  如：0/5 表示最新的5个;返回：postJson
function FetchFollowees(userID,startIndex,pageSize){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/user/fetchFollowees/'+userID+'/'+startIndex+'/'+pageSize,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//FetchFollowers  输入：userID 开始index，数量  如：0/5 表示最新的5个;返回：postJson
function FetchFollowers(userID,startIndex,pageSize){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/user/fetchFollowers/'+userID+'/'+startIndex+'/'+pageSize,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//FetchUserByID  输入：postID;返回：postJson
function FetchUserByID(userID){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/user/fetchByID/'+userID,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//RecommendateViaFollowee  输入：userID;返回：userJson
function RecommendateViaFollowee(userID){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/user/recommendateViaFollowee/'+userID,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//RecommendateViaCampus 输入：userID;返回：userJson
function RecommendateViaCampus(userID){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/user/recommendateViaCampus/'+userID,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//RecommendateViaMajor 输入：userID;返回：userJson
function RecommendateViaMajor(userID){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/user/recommendateViaMajor/'+userID,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//RecommendateViaSession 输入：userID;返回：userJson
function RecommendateViaSession(userID){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/user/recommendateViaSession/'+userID,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//RecommendateViaClass 输入：userID;返回：userJson
function RecommendateViaClass(userID){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/user/recommendateViaClass/'+userID,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}

//***********************************UserService   end*********************************
//***********************************ChatRoomService   begin*********************************
//fetchChatRoom 输入：userID;返回：userJson
function FetchChatRoom(userID1,userID2){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/chatRoom/fetch/'+userID1+'/'+userID2,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//fetchMessages 输入：userID;返回：userJson
function FetchMessages(chatRoomID,startIndex,pageSize){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/chatRoom/fetchMessages/'+chatRoomID+'/'+startIndex+'/'+pageSize,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//deleteAbandoned 
function DeleteAbandoned(chatRoomID,year,month,date){
	var response="";
	$.ajax({
    	type:"PUT",
    	url:'../../JNUSocialNetwork/app/chatRoom/delete/'+chatRoomID+'/'+year+'/'+month+'/'+date,
    	async: false,
    	success:function(data,status){
    		response = status;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//***********************************ChatRoomService   end*********************************
//***********************************DormInfoService   begin*********************************
//getDormInfo 输入：userID;返回：userJson
function GetDormInfo(campus){
	var response="";
	$.ajax({
    	type:"GET",
    	url:'../../JNUSocialNetwork/app/dormInfo/getInfo/'+campus,
    	async: false,
    	success:function(data,status){
    		response = data;
    	},
    	error:function(data,status){
    		response = status;
    	}
    	
    });
	return response;
}
//***********************************DormInfoService   end*********************************