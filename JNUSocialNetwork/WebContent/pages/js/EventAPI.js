//***********************************SSES   begin*********************************
//subscribe 事件源
function Subscribe() {
	var loc = window.location;
	var url = "";
	url = loc.protocol + "//" + loc.hostname + ":8080";
	if (loc.protocol === "https:")
		url = loc.protocol + "//" + loc.hostname + ":8443";
	if (EventSource.isPolyfill !== undefined) {
		var options = {};
		options['bufferSizeLimit'] = 1024 * 1024; // 1mb in bytes...
		var source = new EventSource(url + "/app/event/IE/subscribe", options);
		return source;
	} else {
		var source = new EventSource(url + "/app/event/subscribe");
		return source;
	}
}

// ***********************************SSES end*********************************
// ***********************************浏览器检测*********************************
function BrowserDetection() {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../security/detect',
		async : false,
		success : function(data) {
			response = data;
		}
	});
	return response;
}
// ***********************************FileService begin************************
// 文件上传 输入：formDate格式 输出：imagelink数组
function FileUpload(formData) {
	var fileDri = [];
	$.ajax({
		type : "POST",
		url : '../../app/fileUploader',
		data : formData,
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var dataString = data[i];
				fileDri.push(dataString);
			}
		},
		cache : false,
		contentType : false,
		processData : false
	});
	return fileDri;
}
// ***********************************FileService
// end*********************************
// ***********************************ApplicationService
// begin*********************************
function ApplicationCreate(JsonData) {
	var response = "";
	$.ajax({
		type : "POST",
		url : '../../app/application/create',
		data : JsonData,
		contentType : "application/json",
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// ***********************************ApplicationService
// end*******************************
// ***********************************PostService
// begin*******************************
// AddPost parameter:addpost.pnd -d response:success fail
function AddPost(UserID, JsonData) {
	var response = "";
	$.ajax({
		type : "POST",
		url : '../../app/post/add/' + UserID,
		data : JsonData,
		contentType : "application/json",
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			$('#infinite_loader2').fadeOut(300);
			$('.layer').fadeOut(300);
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// AddPostToCommunity parameter:addpost.pnd -d response:success fail
function AddPostToCommunity(UserID, communityID, JsonData) {
	var response = "";
	$.ajax({
		type : "POST",
		url : '../../app/post/addToCommunity/' + UserID + '/' + communityID,
		data : JsonData,
		contentType : "application/json",
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
			$('#infinite_loader2').fadeOut(300);
			$('.layer').fadeOut(300);
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// addImages 输入：数组ImageLinks[];返回：postJson
function AddActivityImages(postID, imageLinks) {
	var response = "";
	var Urls = '../../app/post/addImages/' + postID + '?';
	$.each(imageLinks, function(n, value) {
		if (n != imageLinks.length - 1) {
			Urls = Urls + 'imageLinks=' + value + '&';
		} else {
			Urls = Urls + 'imageLinks=' + value;
		}
	});
	$.ajax({
		type : "PUT",
		url : Urls,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// DeletePost 输入：postID
function DeletePost(postID, imageLinks) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/post/delete/' + postID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// DeleteAI 输入：postID
function DeleteAI(postID, imageLinks) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/post/removeImages/' + postID + '?imageLinks='
				+ imageLinks,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// DeletePostFromCommunity 输入：postID
function DeletePostFromCommunity(communityID, postID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/post/delete/' + communityID + '/' + postID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}

// likepost 输入：userID,postID
function LikePost(userID, postID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/post/like/' + userID + '/' + postID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// cancelLikepost 输入：userID,postID
function CancelLikePost(userID, postID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/post/cancelLike/' + userID + '/' + postID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// CollectPost 输入：userID,postID
function CollectPost(userID, postID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/post/collect/' + userID + '/' + postID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// CancelCollectPost 输入：userID,postID
function CancelCollectPost(userID, postID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/post/cancelCollect/' + userID + '/' + postID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
function UpdateActivity(activityID, json) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/post/updateAttributes/' + activityID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		data : json,
		async : false,
		contentType : "application/json",
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// fetchHeatPost 输入：ownerID 开始index，数量 如：0/5 表示最新的5个;返回：postJson
function FetchHeatPost(startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/post/fetch/' + startIndex + '/' + pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;

}
// fetchPostByOwner 输入：ownerID 开始index，数量 如：0/5 表示最新的5个;返回：postJson
function FetchPostsByOwner(ownerID, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/post/fetchByOwner/' + ownerID + '/' + startIndex + '/'
				+ pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;

}
// fetchByCommunity
function FetchByCommunity(communityID, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/post/fetchByCommunity/' + communityID + '/'
				+ startIndex + '/' + pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// fetchActivityByCommunity
function FetchActivitiesByCommunity(communityID, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/post/fetchActivitiesByCommunity/' + communityID + '/'
				+ startIndex + '/' + pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// fetchActivity
function FetchActivities(startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/post/fetchActivities/' + startIndex + '/' + pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// FetchPostsByFollowee 输入：userID 开始index，数量 如：0/5 表示最新的5个;返回：postJson
function FetchPostsByFollowee(userID, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/post/fetchByFollowee/' + userID + '/' + startIndex
				+ '/' + pageSize,
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// FetchByFolloweeOrOwner 输入：userID 开始index，数量 如：0/5 表示最新的5个;返回：postJson
function FetchByFolloweeOrOwner(userID, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/post/fetchByFolloweeOrOwner/' + userID + '/'
				+ startIndex + '/' + pageSize,
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// FetchPostsByID 输入：postID;返回：postJson
function FetchPostByID(postID) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/post/fetchByID/' + postID,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// FetchPostsByIDs 输入：数组postID[];返回：postJson
function FetchPostByIDs(postID) {
	var response = "";
	var Urls = '../../app/post/fetchByPostIDs?';
	$.each(postID, function(n, value) {
		if (n != postID.length - 1) {
			Urls = Urls + 'postIDs=' + value + '&';
		} else {
			Urls = Urls + 'postIDs=' + value;
			return true;
		}
	});
	$.ajax({
		type : "GET",
		url : Urls,
		async : false,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// joinActivity 输入：userID,postID
function JoinActivity(userID, postID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/post/joinActivity/' + userID + '/' + postID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// leaveActivity 输入：userID,postID
function LeaveActivity(userID, postID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/post/leaveActivity/' + userID + '/' + postID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// ***********************************PostService
// end*********************************
// ***********************************CommentService
// begin*********************************
// AddComment parameter:addcomment.pnd -d response:success fail
function AddComment(userID, postID, JsonData) {
	var response = "";
	$.ajax({
		type : "POST",
		url : '../../app/comment/add/' + userID + '/' + postID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		data : JsonData,
		contentType : "application/json",
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// DeleteComment 输入：commentID
function DeleteComment(postID, commentID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/comment/delete/' + postID + '/' + commentID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// likecomment 输入：userID,postID
function LikeComment(userID, commentID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/comment/like/' + userID + '/' + commentID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// cancelLikeComment 输入：userID,commentID
function CancelLikeComment(userID, commentID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/comment/cancelLike/' + userID + '/' + commentID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// FetchByPost 输入：postID 开始index，数量 如：0/5 表示最新的5个;返回：postJson
function FetchCommentByPost(postID, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/comment/fetchByPost/' + postID + '/' + startIndex
				+ '/' + pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
function FetchCommentByID(commentID) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/comment/fetchByID/' + commentID,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// ***********************************CommentService
// end*********************************
// ***********************************CommunityService
// begin*********************************
// AddCommunity parameter:addcomment.pnd -d response:success fail
function AddCommunity(userID, JsonData) {
	var response = "";
	$.ajax({
		type : "POST",
		url : '../../app/community/add/' + userID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		data : JsonData,
		contentType : "application/json",
		asyn : false,
		success : function(data, status) {
			$('#infinite_loader2').fadeOut(300);
			$('.layer').fadeOut(300);
			response = data;
			if (EventSource.isPolyfill != undefined) {
				window.location.href = 'ieSuccess.jsp'
						+ "?target=community.jsp?nav=mycommunity";
			} else {
				window.location.href = 'community.jsp?nav=mycommunity';
			}
			
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// DeleteCommunity 输入：communityID
function DeleteCommunity(communityID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/community/delete/' + communityID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		cache : false,
		success : function(data, status) {
			response = status;
			if (EventSource.isPolyfill != undefined) {
				window.location.href = 'ieSuccess.jsp'
						+ "?target=community.jsp?nav=mycommunity";
			} else {
				window.location.href = 'community.jsp?nav=mycommunity';
			}

		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// joinCommunity
function JoinCommunity(userID, communityID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/community/join/' + userID + '/' + communityID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
function LeaveCommunity(userID, communityID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/community/leave/' + userID + '/' + communityID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
			if (EventSource.isPolyfill != undefined) {
				window.location.href = 'ieSuccess.jsp'
						+ "?target=community.jsp?nav=mycommunity";
			} else {
				window.location.href = 'community.jsp?nav=mycommunity';
			}
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
function LeaveMember(userID, memberID, communityID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/community/leave/' + userID + '/' + memberID + '/'
				+ communityID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}

function UpdateCommunity(communityID, json) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/community/updateAttributes/' + communityID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		data : json,
		async : false,
		contentType : "application/json",
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// fetch 输入： 开始index，数量 如：0/5 表示最新的5个;返回：postJson
function FetchCommunity(startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/community/fetch/' + startIndex + '/' + pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}

// FetchByID 输入：communityID;返回：postJson
function FetchCommunityByID(communityID) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/community/fetchByID/' + communityID,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
function SearchCommunity(key, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/community/search/' + key + '/' + startIndex + '/'
				+ pageSize,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
function SearchCommunity(key, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/community/search/' + key + '/' + startIndex + '/'
				+ pageSize,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
function SearchCommunity(key, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/community/search/' + key + '/' + startIndex + '/'
				+ pageSize,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
function SearchCommunity(key, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/community/search/' + key + '/' + startIndex + '/'
				+ pageSize,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
function SearchCommunity(key, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/community/search/' + key + '/' + startIndex + '/'
				+ pageSize,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
function SearchCommunity(key, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/community/search/' + key + '/' + startIndex + '/'
				+ pageSize,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// FetchByOwner 输入：communityID;返回：postJson
function FetchCommunityByOwner(userID, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/community/fetchByOwner/' + userID + '/' + startIndex
				+ '/' + pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// FetchByJoin 输入：communityID;返回：postJson
function FetchCommunityByJoin(userID, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/community/fetchJoined/' + userID + '/' + startIndex
				+ '/' + pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// FetchByType 输入：communityID;返回：postJson
function FetchCommunityByType(communityType, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/community/fetchByType/' + communityType + '/'
				+ startIndex + '/' + pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// ***********************************CommunityService
// end*********************************
// ***********************************UserService
// begin*********************************
// DeleteMember 输入：userID
function DeleteMember(userID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/user/deleteMember/' + userID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// DeleteCommunityOwner 输入：ownerID
function DeleteCommunityOwner(ownerID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/user/deleteCommunityOwner/' + ownerID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// follow 输入：被关注和关注userID
function Follow(followeeID, followerID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/user/follow/' + followeeID + '/' + followerID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// cancelfollow 输入：被关注和关注userID
function CancelFollow(followeeID, followerID) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/user/cancelFollow/' + followeeID + '/' + followerID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// updateUserProfile 输入：被关注和关注userID
function UpdateUserProfile(userID, JsonData) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/user/updateProfile/' + userID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		data : JsonData,
		async : false,
		contentType : "application/json",
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// addImages 输入：数组ImageLinks[];返回：postJson
function AddImages(userID, imageLinks) {
	var response = "";
	var Urls = '../../app/user/addImages/' + userID + '?';
	$.each(imageLinks, function(n, value) {
		if (n != imageLinks.length - 1) {
			Urls = Urls + 'imageLinks=' + value + '&';
		} else {
			Urls = Urls + 'imageLinks=' + value;
		}
	});
	$.ajax({
		type : "PUT",
		url : Urls,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// FetchFollowees 输入：userID 开始index，数量 如：0/5 表示最新的5个;返回：postJson
function FetchFollowees(userID, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/user/fetchFollowees/' + userID + '/' + startIndex
				+ '/' + pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// FetchFollowers 输入：userID 开始index，数量 如：0/5 表示最新的5个;返回：postJson
function FetchFollowers(userID, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/user/fetchFollowers/' + userID + '/' + startIndex
				+ '/' + pageSize,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// FetchUserByID 输入：postID;返回：postJson
function FetchUserByID(userID) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/user/fetchByID/' + userID,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// fetchRandom
function FetchRandom(startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/user/fetchRandomly/',
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// recommendate
function Recommendate(startIndex, pageSize) {
	var response = "";
	var url = "";
	if (USERID != "" && USERID != null)
		url = '../../app/user/recommendate/' + USERID + '/' + startIndex + '/'
				+ pageSize;
	else
		url = '../../app/user/recommendate/' + startIndex + '/' + pageSize;
	$.ajax({
		type : "GET",
		url : url,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// RecommendateViaFollowee 输入：userID;返回：userJson
function RecommendateViaFollowee(userID) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/user/recommendateViaFollowee/' + userID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// RecommendateViaCampus 输入：userID;返回：userJson
function RecommendateViaCampus(userID) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/user/recommendateViaCampus/' + userID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// RecommendateViaCampus 输入：userID;返回：userJson
function RecommendateViaInstitution(userID) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/user/recommendateViaInstitution/' + userID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// RecommendateViaMajor 输入：userID;返回：userJson
function RecommendateViaMajor(userID) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/user/recommendateViaMajor/' + userID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// RecommendateViaSession 输入：userID;返回：userJson
function RecommendateViaSession(userID) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/user/recommendateViaSession/' + userID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// RecommendateViaClass 输入：userID;返回：userJson
function RecommendateViaClass(userID) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/user/recommendateViaClass/' + userID,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// RecommendateViaClass 输入：userID;返回：userJson
function SearchMember(key, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/user/search/' + key + '/' + startIndex + '/'
				+ pageSize,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}

// ***********************************UserService
// end*********************************
// ***********************************ChatRoomService
// begin*********************************
// fetchChatRoom 输入：userID;返回：userJson
function FetchChatRoom(userID1, userID2) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/chatRoom/fetch/' + userID1 + '/' + userID2,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// fetchMessages 输入：userID;返回：userJson
function FetchMessages(chatRoomID, startIndex, pageSize) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/chatRoom/fetchMessages/' + chatRoomID + '/'
				+ startIndex + '/' + pageSize,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// deleteAbandoned
function DeleteAbandoned(chatRoomID, year, month, date) {
	var response = "";
	$.ajax({
		type : "PUT",
		url : '../../app/chatRoom/delete/' + chatRoomID + '/' + year + '/'
				+ month + '/' + date,
		beforeSend : function(request) {
			request.setRequestHeader("ID", USERID);
		},
		async : false,
		success : function(data, status) {
			response = status;
		},
		error : function(data, status) {
			response = status;
		}

	});
	return response;
}
// ***********************************ChatRoomService
// end*********************************
// ***********************************DormInfoService
// begin*********************************
// getDormInfo 输入：userID;返回：userJson
function GetDormInfo(campus) {
	var response = "";
	$.ajax({
		type : "GET",
		url : '../../app/dormInfo/getInfo/' + campus,
		async : false,
		success : function(data, status) {
			response = data;
		},
		error : function(data, status) {
			response = status;
		}
	});
	return response;
}
// ***********************************DormInfoService
// end*********************************
