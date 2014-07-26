//function Msnry
	function Msnry(selectContain,item,width){
		var container = document.querySelector(selectContain);
		var msnry;
		imagesLoaded( container, function() {
		msnry = new Masonry( container,{
			columnWidth: width,
			itemSelector: item,
			gutter:20
			});
		});
	}
//global userID
	var userID = $("input[name='userID']").val();
//function addDiv
	function addPost(ownerID,ownerNickName,publishDate,content,ID,likeNum){
		 var boarddiv = "<div class='post "+ID+"'><div class='post_body'><div class='row'><div class='col-md-2'><div class='user_img'><img class='userImg' src='images/user_img.jpg' /><input type='hidden' value='"+ownerID+"' name='userID'/></div></div><div class='col-md-6'><div class='user_name'><strong>"+ownerNickName+"</strong></div><div class='user_info'>"+publishDate+"</div></div><div class='col-md-4'><div class='deletePostBtn'><a><input id='deleteID' type='hidden' value="+ID+" /><span class='glyphicon glyphicon-remove'></span></a></div></div></div><div class='post_info'>"+content+"<div class='post_more'><a>read more...</a></div></div><div class='post_img'><img src='images/9.jpg' /></div><div class='row'><div class='col-md-1'><div class='post_like' style='cursor:pointer'><a><input id='likeID' type='hidden' value="+ID+"><span class='glyphicon glyphicon-heart-empty' style='font-size:20px'>"+likeNum+"</span></a></div></div><div class='col-md-1'><div class='post_collect' style='cursor:pointer'><a><input id='collectID' type='hidden' value="+ID+"><span class='glyphicon glyphicon-star-empty' style='font-size:20px'></span></a></div></div><div class='col-md-1'><div class='post_share' style='cursor:pointer'><a><span class='glyphicon glyphicon-share-alt' style='font-size:20px'></span></a></div></div></div><div class='media_comm'><div class='row addCommentBtn'><div class='col-lg-8'><div class='form-group'><input type='text' placeholder='Add a comment' class='form-control' id='commentText"+ID+"'></div></div><div class='col-lg-4'><button type='submit' class='btn btn-success' id='addComment' value="+ID+">Submit</button></div></div></div></div></div>";
			$(".share").after(boarddiv); 
			Msnry('.pro_body','.post',435);
			$('img.userImg').userTips();
	}
//function fecthPostsBytype
	function fecthPostsByType(type){
		$.ajax({
			url:'../../GuitarWebApp/app/post/fetchByType/'+type+'/0/5',
			type:'get',
			success:function(data){
				var dataR = data.reverse();
				$.each(dataR,function(index,jsonPostShortCut){
					var flag=0;
					$.each(jsonPostShortCut.likerIDs,function(index,likerID){
						if(likerID==userID){flag=1;}
					});
					if(flag==0){
						addPost(jsonPostShortCut.ownerID,jsonPostShortCut.ownerNickName,jsonPostShortCut.publishDate,jsonPostShortCut.content,jsonPostShortCut.id,jsonPostShortCut.likeNum);
					}
					if(flag==1){
						addPostS(jsonPostShortCut.ownerID,jsonPostShortCut.ownerNickName,jsonPostShortCut.publishDate,jsonPostShortCut.content,jsonPostShortCut.id,jsonPostShortCut.likeNum);
					}
				});
			}
		});
	};

//function fetchPostsByUserID

	function fetchPostsByUserID(){
		$.ajax({
			url:'../../GuitarWebApp/app/post/fetchByUserID/'+userID+'/0/5',// /post/fetchByUserID/'+id
			type:'get',
			success:function(data){
				//var jsondata = $.parseJSON(data);
				var dataR = data.reverse();
				$.each(dataR,function(index,jsonPostShortCut){
					addPost(jsonPostShortCut.ownerID,jsonPostShortCut.ownerNickName,jsonPostShortCut.publishDate,jsonPostShortCut.content,jsonPostShortCut.id,jsonPostShortCut.likeNum);
				});
			}
		});
	};
	//fetchPostByIDs
	function fetchPostByIDs(container){
		var response = FetchPostByIDs(container);
		$.each(response,function(n,dataString){
			addPost(dataString.owner.ID,dataString.owner.attributes.nickName,dataString.publishDate,dataString.attributes.content,dataString.ID,dataString.likerIDs.length);
		});
	}
	//function getUserRepresentation
	function getUserRepresentation(){
		$.ajax({
			url:'../../GuitarWebApp/app/user/getRepresentation/'+userID,
			type:'get',
			success:function(data){
				$('.Anickname').html(data.nickName);
				$('.Aemail').html(data.email);
				$('.Arelationship').html(data.relationship);
				$('.Atelenum').html(data.telnum);
				$('.Aaddress').html(data.dorm);
				$('.Alooking').html(data.lookingFor);
			}
		});
	}
	
	/*function getUserRepresentation(){
		$.ajax({
			url:'../../GuitarWebApp/app/user/getRepresentation/2011052405',
			type:'get',
			success:function(data){
				UserID = data.ID;
				AuthType = data.authType;
				ImageLinks = data.imageLinks;
				FolloweesID = data.followeesID;
				Nickname = data.nickName;
				Gender = data.gender;
				Birth = data.birthday;
				Relationship = data.relationship;
				Campus = data.campus;
				Dorm = data.dorm;
				DormNum = data.dormNum;
				LookingFor = data.lookingFor;	
				alert(Nickname);
			}
		});
	}
	//funtion aboutUpdata
	function aboutUpdata(){
		$('.Anickname').html(Nickname);
		$('.Agender').html(Gender);
		$('.Abirth').html(Birth);
		$('.Arelationship').html(Relationship);
		$('.Acampus').html(Campus);
		$('.Aaddress').html("#"+Dorm+" "+DormNum);
		$('.Alooking').html(LookingFor);
	}*/


//function userTip
	(function($){  
		$.fn.userTips = function () {
			// Speed of the animations in milliseconds - 1000 = 1 second.
			var animSpeed = 300;			
			var tinyTip;		
			// When we hover over the element that we want the tooltip applied to	
			$(this).hover(function() {	
				var pos = $(this).offset();
				var nPos = pos;
				nPos.top = pos.top + 20;
				nPos.left = pos.left + 40;
				var userid = $(this).next().val();
				$.ajax({
					url:'../../GuitarWebApp/app/user/getRepresentationShortCut/'+userid,
					type:'get',
					success:function(data){
						//var tipFrame = '<div class="popTip"><div class="content"><div class="urserBgShort"><img src="images/urseBgShort.jpg" /></div><div class="urserInfShort"><img src="images/user_img4.jpg" /><p><h1>Bond</h1></p><p> a good guy</p><button id="followBtn">Follow</button></div></div></div>';
						var tipFrame = '<div class="popTip"><div class="content"><div class="urserBgShort"><img src="images/urseBgShort.jpg" /></div><div class="urserInfShort"><img src="images/user_img4.jpg" /><p><h1>'+data.nickName+'</h1></p><p>'+data.lookingFor+'</p><button id="followBtn">Follow</button></div></div></div>';
						$('body').append(tipFrame);
						var divTip = 'div.popTip';
						tinyTip = $(divTip);
						tinyTip.hide();

						// Make sure that the tooltip has absolute positioning and a high z-index, 
						// then place it at the correct spot and fade it in.
						tinyTip.css('position', 'absolute').css('z-index', '1000');
						tinyTip.css(nPos).fadeIn(animSpeed);
						tinyTip.hover(function(){
							clearTimeout(window.timer);
						},function(){
							tinyTip.fadeOut(animSpeed, function() {
								$(this).remove();
							});
						});
					},
				});
			}, function() {
				// Fade the tooltip out once the mouse moves away and then remove it from the DOM.	
				window.timer = setTimeout(function(){
					tinyTip.fadeOut(animSpeed, function() {
					$(this).remove();
				});
					}, 200);

			});				
		};
	})(jQuery);
	$('img.userImg').userTips();
//function collectPost and cancelCollcet
$(document).ready(function(){
	$('body').on('click','.post_collect',function(){
		var id = $(this).find("input").attr("value");
		if($(this).find("span").attr("class") == "glyphicon glyphicon-star-empty"){
			CollectPost("2011052407",id);
			var inputID = $("input[value='"+id+"'][id='collectID']");
			inputID.next().attr("class","glyphicon glyphicon-star");
			return 0;
		}
		if($(this).find("span").attr("class") == "glyphicon glyphicon-star"){
			CancelCollectPost("2011052407",id);
			var inputID = $("input[value='"+id+"'][id='collectID']");
			inputID.next().attr("class","glyphicon glyphicon-star-empty");
			return 0;
		}
	});
//function likePost and cancelLike
	$('body').on('click','.post_like',function(){
		var id = $(this).find("input").attr("value");
		if($(this).find("span").attr("class") == "glyphicon glyphicon-heart-empty"){
			LikePost("2011052407",id);
			var inputID = $("input[value='"+id+"'][id='likeID']");
			inputID.next().attr("class","glyphicon glyphicon-heart");
			return 0;
		}
		if($(this).find("span").attr("class") == "glyphicon glyphicon-heart"){
			CancelLikePost("2011052407",id);
			var inputID = $("input[value='"+id+"'][id='likeID']");
			inputID.next().attr("class","glyphicon glyphicon-heart-empty");
			return 0;
		}
	});

//function addComment
		$('body').on('click','#addComment',function(){
			var d = new Date();
        	var publishDateN = d.getFullYear() + "/" +(d.getMonth()+1) + "/" + d.getDate();
        	var date = new Date(publishDateN);
        	var id = this.getAttribute("value");
        	var inputID = "commentText"+id;
			var jcontent = $("input[id='"+inputID+"']").val();
			var jCommentType = "COMMENT";
			var jpublishDate = $("#publishDate").val();
			var jsonString = {content:jcontent,commentType:jCommentType};
			var jsonData = $.toJSON(jsonString);	

			$.ajax({
    			type:"POST",
    			url:'../../GuitarWebApp/app/comment/add/'+userID+'/'+id,//'../../GuitarWebApp/app/comment/add/2011052405/'+id
    			data:jsonData,
    			contentType: "application/json"
    		});
		});
//function follow
		$('body').on('click','#followBtn',function(){
			//get post owner
			if($(this).text()=="Follow"){
				$.ajax({
					url:'../../GuitarWebApp/app/user/follow/'+userID+'/2011052406',//'../../GuitarWebApp/app/user/follow/2011052405/'+id
					type:'put'
				});
			}
			if($(this).text()=="Following"){
				$.ajax({
					url:'../../GuitarWebApp/app/user/cancelFollow/'+userID+'/2011052406',//'../../GuitarWebApp/app/user/follow/2011052405/'+id
					type:'put'
				});
			}
		});		
});

	
	
