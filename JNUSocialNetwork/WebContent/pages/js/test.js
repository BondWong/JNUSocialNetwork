//addPost
$(document).ready(function(){
	$('#btn_share').click(function(e){
		e.preventDefault();
		var formData = new FormData($('.photofom'));
		
		var post={
				postType:'NORMAL',
				attributes:{
					content:$('#share_txt2').val()
				},
				imageLinks:FileUpload(formData)
		};
		var json = $.toJSON(post);
		AddPost("2011052407",json);
	});
});
//collectPost
$(document).ready(function(){
	$('.post_collect').click(function(e){
		var id = $(this).find("input").attr("value");
		CollectPost("2011052407",id);
	});
});
//function fetchPostsByIDs
var postIdContainer = [];
function fetchPostByIDs(){
	var response = FetchPostByIDs(postIdContainer);
	var dataString="";
	$.each(response,function(n,value){
		dataString = $.parseJSON(value);
	});
		
	addPost(dataString.owner.ID,dataString.owner.attributes.nickName,dataString.publishDate,dataString.attributes.content,dataString.ID,dataString.likerIDs,dataString.collectorIDs);
}