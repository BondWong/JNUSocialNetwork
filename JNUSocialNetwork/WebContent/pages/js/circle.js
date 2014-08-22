$(document)
		.ready(
				function() {
					// funtion fileupload
					$('#fileupload')
							.fileupload(
									{
										url : '../../JNUSocialNetwork/app/fileUploader',
										beforeSend : function(request) {
											request.setRequestHeader("ID",
													USERID);
										},
										success : function(data) {
											for (var i = 0; i < data.length; i++) {
												var dataString = data[i];
												fileDri.push(dataString);
											}
										},
										acceptFileTypes : /(\.|\/)(gif|jpe?g|png)$/i,
										maxFileSize : 5000000
									// 5 MB
									})
							.on(
									'fileuploadadd',
									function(e, data) {
										data.context = $('<div/>').appendTo(
												'#files')
												.addClass('myfileItem');
										$
												.each(
														data.files,
														function(index, file) {
															var node = $('<p/>')
																	.append(
																			$(
																					'<span/>')
																					.text(
																							file.name));
															if (!index) {
																node
																		.append('<br>');
															}
															node
																	.appendTo(data.context);
														});
									})
							.on(
									'fileuploadprocessalways',
									function(e, data) {
										var index = data.index, file = data.files[index], node = $(data.context
												.children()[index]);
										if (file.preview) {
											node.prepend('<br>').prepend(
													file.preview);
										}
										if (file.error) {
											node
													.append('<br>')
													.append(
															$(
																	'<span class="text-danger"/>')
																	.text(
																			file.error));
										}
										if (index + 1 === data.files.length) {
											data.context.find('button').text(
													'Upload').prop('disabled',
													!!data.files.error);
										}
									})
							.on(
									'fileuploadprogressall',
									function(e, data) {
										$('#progress .progress-bar').css(
												'width', '0%');
										var progress = parseInt(data.loaded
												/ data.total * 100, 10);
										$('#progress .progress-bar').css(
												'width', progress + '%');
									})
							.on(
									'fileuploadfail',
									function(e, data) {
										$
												.each(
														data.files,
														function(index, file) {
															var error = $(
																	'<span class="text-danger"/>')
																	.text(
																			'File upload failed.');
															$(
																	data.context
																			.children()[index])
																	.append(
																			'<br>')
																	.append(
																			error);
														});
									}).prop('disabled', !$.support.fileInput)
							.parent().addClass(
									$.support.fileInput ? undefined
											: 'disabled');
					// function addPost
					$('#btn_share').click(function(e) {
						e.preventDefault();
						// var formData = new FormData($('.photofom'));

						var post = {
							postType : 'NORMAL',
							attributes : {
								content : $('#share_txt2').val()
							},
							imageLinks : fileDri
						};
						var json = $.toJSON(post);
						AddPost(USERID, json);
						$('#addPostModal').modal('hide');

					});
				});
// function fectchPostByFollowee
function fetchByFolloweeOrOwner() {
	var response = FetchByFolloweeOrOwner(USERID, "0", "15");
	$.each(response.reverse(), function(n, dataString) {
		addPost(dataString.owner.ID, dataString.owner.attributes.name,
				dataString.publishDate, dataString.attributes.content,
				dataString.ID, dataString.likerIDs, dataString.collectorIDs);
	});
}
// function fectchHeatPost
function fectchHeatPost() {
	var response = FetchHeatPost("0", "5");
	$.each(response.reverse(), function(n, dataString) {
		addPost(dataString.owner.ID, dataString.owner.attributes.name,
				dataString.publishDate, dataString.attributes.content,
				dataString.ID, dataString.likerIDs, dataString.collectorIDs);
	});
}
// function fetchPostsByIDs
$('body').on('click', '.alertCust', function() {
	fetchPostByIDs(postIdContainer);
	$(this).css("display", "none");
	postIdContainer = [];
});
$('body').on('click', '.deletePostBtn', function() {
	var id = $(this).find("input").attr("value");
	DeletePost(id);
});
$(window).scroll(
		function() {
			if ($(window).scrollTop() == $(document).height()
					- $(window).height()) {
				$('div#infinite_loader').show();
				winsdow.startIndex = $('.post').length-1;
				
				if(startIndex >= 15){
					var response = FetchByFolloweeOrOwner(USERID, startIndex, "15");
					$.each(response.reverse(), function(n, dataString) {
						addPost(dataString.owner.ID, dataString.owner.attributes.name,
								dataString.publishDate, dataString.attributes.content,
								dataString.ID, dataString.likerIDs, dataString.collectorIDs);
					});
					startIndex += response.length;
				}
			}
		});