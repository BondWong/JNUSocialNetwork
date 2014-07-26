$(document).ready(function(){
	var fileDri = [];
	//funtion fileupload
	$('#fileupload').fileupload({
		url:'../../JNUSocialNetwork/app/fileUploader',
	    success:function(data){
	    	for(var i=0;i<data.length;i++){
	    		var dataString=data[i];
	    		fileDri.push(dataString);
	    		}
	    	},
	    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
	    maxFileSize: 5000000// 5 MB
	}).on('fileuploadadd', function (e, data) {
        data.context = $('<div/>')
        				.appendTo('#files')
        				.addClass('myfileItem');
        $.each(data.files, function (index, file) {
            var node = $('<p/>')
                    .append($('<span/>').text(file.name));
            if (!index) {
                node
                    .append('<br>');
            }
            node.appendTo(data.context);
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
    	$('#progress .progress-bar').css('width','0%');
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index, file) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');	
//function addPostToCommunity
	
	$('#btn_shareC').click(function(e){
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
			AddPostToCommunity("2011052407","1406356613315","MEMBER",json);
		    $('#addPostModal').modal('hide');
	});
});
//function fectchPostByFollowee

function fetchByCommunity(){
	var response = FetchByCommunity("1406356613315","0","5");
	$.each(response.reverse(),function(n,dataString){
		addPost(dataString.owner.ID,dataString.owner.attributes.nickName,dataString.publishDate,dataString.attributes.content,dataString.ID,dataString.likerIDs.length);
	});
	
}
var communityPostIdContainer = [];
$('body').on('click','.alertCustC',function(){
	fetchPostByIDs(communityPostIdContainer);
	$(this).css("display","none");
	communityPostIdContainer = [];
});
$('body').on('click','.deletePostBtn',function(){
	var id = $(this).find("input").attr("value");
	DeletePostFromCommunity("1406356613315",id);
});