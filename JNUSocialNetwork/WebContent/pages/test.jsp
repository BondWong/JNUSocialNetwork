<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="js/jquery-1.10.2.js"></script>
<script src="js/jquery.json.min.js"></script>
<script src="js/EventAPI.js"></script>
</head>
<body>
<button class="subscribe">subscribe</button>
<button class="addpost">addPost</button>
<button class="deletepost">deletePost</button>
<button class="likepost">likePost</button>
<button class="cancellikepost">cancellikePost</button>
<button class="collectpost">cancelPost</button>
<button class="cancelcollectpost">cancelcancelPost</button>
<button class="fetchPostByOwner">fetchPostByOwner</button>
<button class="fetchPostByFollowee">fetchPostByFollowee</button>
<button class="fetchPostByID">fetchPostByID</button>
<button class="fetchPostByIDs">fetchPostByIDs</button>
<button class="addcomment">addComment</button>
<button class="deletecomment">deleteComment</button>
<button class="likecomment">likeComment</button>
<button class="cancellikecomment">cancellikeComment</button>
<button class="fetchByPost">fetchByPost</button>
<button class="addcommunity">addCommunity</button>
<button class="deletecommunity">deleteCommunity</button>
<button class="fetch">fetch</button>
<button class="FetchByID">FetchByID</button>
<button class="FetchByType">FetchByType</button>
<button class="deletemember">deleteMember</button>
<button class="deletecommunityowner">deleteCommunityOwner</button>
<button class="follow">follow</button>
<button class="cancelfollow">cancelFollow</button>
<button class="updateuserprofile">updateUserProfile</button>
<button class="AddImages">AddImages</button>
<button class="FetchFollowees">FetchFollowees</button>
<button class="FetchFollowers">FetchFollowers</button>
<button class="FetchUserByID">FetchUserByID</button>
<button class="RecommendateViaFollowee">RecommendateViaFollowee</button>
<button class="RecommendateViaCampus">RecommendateViaCampus</button>
<button class="RecommendateViaMajor">RecommendateViaMajor</button>
<button class="RecommendateViaSession">RecommendateViaSession</button>
<button class="RecommendateViaClass">RecommendateViaClass</button>
<button class="FetchChatRoom">FetchChatRoom</button>
<button class="FetchMessages">FetchMessages</button>
<button class="DeleteAbandoned">DeleteAbandoned</button>
<button class="GetDormInfo">GetDormInfo</button>
<button class="addposttocommunity">addPostToCommunity</button>
<form>
	<input id="fileupload" type="file" name="files[]" multiple>
	<input type="submit" value="fileupload" />
</form>

<script>
$('body').on('click','.subscribe',function(){
	
	Subscribe();
});
$('body').on('click','.fileupload',function(){
	var formData = new FormData($("form")[0]);
	var response = FileUpload(formData);
	alert(response);
});
$('body').on('click','.addpost',function(){
	var jsonString ={postType:"NORMAL",attributes:{content:"test"},imageLinks:[]};
	var jsonData = $.toJSON(jsonString);
	AddPost("2011052407",jsonData);
});
$('body').on('click','.addposttocommunity',function(){
	var jsonString ={postType:"NORMAL",attributes:{content:"test"},imageLinks:[]};
	var jsonData = $.toJSON(jsonString);
	AddPostToCommunity("2011052406","1405856667670",jsonData);
});
$('body').on('click','.deletepost',function(){
	DeletePost("1405701186191");
});
$('body').on('click','.likepost',function(){
	LikePost("2011052407","1405701186191");
});
$('body').on('click','.cancellikepost',function(){
	CancelLikePost("2011052407","1405701186191");
});
$('body').on('click','.collectpost',function(){
	CollectPost("2011052407","1405701186191");
});
$('body').on('click','.cancelcollectpost',function(){
	CancelCollectPost("2011052407","1405701186191");
});
$('body').on('click','.fetchPostByOwner',function(){
	var response = FetchPostsByOwner("2011052407","0","2");
});
$('body').on('click','.fetchPostByFollowee',function(){
	var response = FetchPostsByFollowee("2011052407","0","2");
});

$('body').on('click','.fetchPostByID',function(){
	var response = FetchPostByID("1405701186191");
});
$('body').on('click','.fetchPostByIDs',function(){
	var postIDs=[];
	postIDs.push("1405701186191");
	postIDs.push("1405701187181");
	var response = FetchPostByIDs(postIDs);
});
$('body').on('click','.addcomment',function(){
	var jsonString ={attributes:{content:"test"}};
	var jsonData = $.toJSON(jsonString);
	AddComment("2011052407","1405784525603",jsonData);
});
$('body').on('click','.deletecomment',function(){
	DeleteComment("1405784525603","1405785150369");
});
$('body').on('click','.likecomment',function(){
	LikeComment("2011052407","1405785780802");
});
$('body').on('click','.cancellikecomment',function(){
	CancelLikeComment("2011052407","1405785780802");
});
$('body').on('click','.fetchByPost',function(){
	var response = FetchCommentByPost("1405784525603","0","2");
	alert(response);
});
$('body').on('click','.addcommunity',function(){
	var jsonString ={attributes:{content:"test"},tags:[],communityType:"SCHOOLUNION"};
	var jsonData = $.toJSON(jsonString);
	AddCommunity("2011052405",jsonData);
});
$('body').on('click','.deletecommunity',function(){
	DeleteCommunity("1405789655695");
});
$('body').on('click','.fetch',function(){
	var response = FetchCommunity("0","2");
	alert(response);
});
$('body').on('click','.FetchByID',function(){
	var response = FetchCommunityByID("1405789655695");
	alert(response);
});
$('body').on('click','.FetchByType',function(){
	var response = FetchCommunityByType("SCHOOLUNION","0","2");
	alert(response);
});
$('body').on('click','.deletemember',function(){
	DeleteMember("2011052406");
});
$('body').on('click','.deletecommunityowner',function(){
	DeleteCommunityOwner("2011052405");
});
$('body').on('click','.follow',function(){
	Follow("2011052406","2011052407");
});
$('body').on('click','.cancelfollow',function(){
	CancelFollow("2011052406","2011052407");
});
$('body').on('click','.updateuserprofile',function(){
	var jsonString ={lookingFor:"a"};
	var jsonData = $.toJSON(jsonString);
	var response = UpdateUserProfile("2011052407",jsonData);
});
$('body').on('click','.AddImages',function(){
	var imageLinks=[];
	imageLinks.push("f:");
	imageLinks.push("d:");
	var response = AddImages("2011052407",imageLinks);
	alert(response);
});
$('body').on('click','.FetchFollowees',function(){
	var response = FetchFollowees("2011052407","0","2");
});
$('body').on('click','.FetchFollowers',function(){
	var response = FetchFollowers("2011052407","0","2");
});
$('body').on('click','.FetchUserByID',function(){
	var response = FetchUserByID("2011052407");
	alert(response);
});
$('body').on('click','.RecommendateViaFollowee',function(){
	var response = RecommendateViaFollowee("2011052407");
	alert(response);
});
$('body').on('click','.RecommendateViaCampus',function(){
	var response = RecommendateViaCampus("2011052407");
	alert(response);
});
$('body').on('click','.RecommendateViaMajor',function(){
	var response = RecommendateViaMajor("2011052407");
	alert(response);
});
$('body').on('click','.RecommendateViaSession',function(){
	var response = RecommendateViaSession("2011052407");
	alert(response);
});
$('body').on('click','.RecommendateViaClass',function(){
	var response = RecommendateViaClass("2011052407");
	alert(response);
});
$('body').on('click','.FetchChatRoom',function(){
	var response = FetchChatRoom("2011052407","2011052406");
	alert(response);
});
$('body').on('click','.FetchMessages',function(){
	var response = FetchMessages("6768546055","0","1");
	alert(response);
});
$('body').on('click','.DeleteAbandoned',function(){
	DeleteAbandoned("6768546055","2016","01","01");
});
$('body').on('click','.GetDormInfo',function(){
	var response = GetDormInfo("ZhuhaiCampus");
	alert(response);
});

</script>

</body>
</html>