//funtion fileupload
	var fileDri = [];
	$('#fileupload').fileupload({
		url:'../../GuitarWebApp/app/fileUploader',
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
/*.on('fileuploaddone', function (e, data) {
        $.each(data.result.files, function (index, file) {
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url);
                $(data.context.children()[index])
                    .wrap(link);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
    })*/
//function addPost
		$('body').on("click","#btn_share",function(){
			//get urls
		   var d = new Date();
		   var publishDateN = d.getFullYear() + "/" +(d.getMonth()+1) + "/" + d.getDate();
		   var date = new Date(publishDateN);
		   var jtopic = $("#topic").val();
		   var jcontent = $("#share_txt2").val();
		   var jtype = $("#type").val();
		   var jpublishDate = $("#publishDate").val();
		   var jstartDate = $("#startDate").val();
		   
		   var jsonString = {mediaLocation:fileDri,topic:jtopic,content:jcontent,postType:"DISCUSSION",publishDate:date,startDate:date};
		   var jsonData = $.toJSON(jsonString);
		   $.ajax({
		    	type:"POST",
		    	url:'../../GuitarWebApp/app/post/add/'+userID,
		    	data:jsonData,
		    	contentType: "application/json",
		    });
		    $('#addPostModal').modal('hide');
		});
		
		//function fetchPostsByIDs
		var postIdContainer = [];
		function fetchPostByIDs(){
			var Urls = '../../GuitarWebApp/app/post/getByIDs?';
			$.each(postIdContainer,function(n,value){
				if(n != postIdContainer.length-1){
					Urls = Urls +'postIDs='+ value+'&';
				}
				else{
					Urls = Urls +'postIDs='+ value;
					return true;
				}
			});
			$.ajax({
				url: Urls,// 
				type:'get',
				success:function(data){
					//var jsondata = $.parseJSON(data);
					var dataR = data.reverse();
					$.each(dataR,function(index,jsonPostShortCut){
						addPost(jsonPostShortCut.ownerID,jsonPostShortCut.ownerNickName,jsonPostShortCut.publishDate,jsonPostShortCut.content,jsonPostShortCut.id,jsonPostShortCut.likeNum);			
					});
				}
			});
		}
		$('body').on('click','.alertCust',function(){
			/*var jsondata = $.parseJSON(event.data);
			var jsonPostShortCut = jsondata.postRepresentationShortCut;
			addPost(jsonPostShortCut.ownerNickName,jsonPostShortCut.publishDate,jsonPostShortCut.content,jsonPostShortCut.ID,jsonPostShortCut.likeNum);*/
			fetchPostByIDs();
			$(this).css("display","none");
			postIdContainer = [];
		});
		