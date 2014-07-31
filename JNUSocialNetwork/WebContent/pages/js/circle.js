$(document).ready(function(){
	
//function addPost
	$('#btn_share').click(function(e){
		e.preventDefault();
			//var formData = new FormData($('.photofom'));
			
			var post={
					postType:'NORMAL',
					attributes:{
						content:$('#share_txt2').val()
					},
					imageLinks:fileDri
			};
			var json = $.toJSON(post);
			AddPost("2011052407",json);
			
		    $('#addPostModal').modal('hide');
		    
	});
});
//function fectchPostByFollowee
	function fetchByFolloweeOrOwner(){
		var response = FetchByFolloweeOrOwner("2011052407","0","5");
		$.each(response.reverse(),function(n,dataString){
			addPost(dataString.owner.ID,dataString.owner.attributes.nickName,dataString.publishDate,dataString.attributes.content,dataString.ID,dataString.likerIDs.length);
		});
		
	}
	//function fetchPostsByIDs
	var postIdContainer = [];
	
	$('body').on('click','.alertCust',function(){
		fetchPostByIDs(postIdContainer);
		$(this).css("display","none");
		postIdContainer = [];
	});
	$('body').on('click','.deletePostBtn',function(){
		var id = $(this).find("input").attr("value");
		DeletePost(id);
	});