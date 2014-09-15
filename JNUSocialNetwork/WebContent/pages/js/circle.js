$(document)
		.ready(
				function() {
					// funtion fileupload
					$('#fileupload')
							.fileupload({
								url : '../../app/fileUploader',
								beforeSend : function(request) {
									request.setRequestHeader("ID", USERID);
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
																			'上传失败');
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
					$('body').on('click', '.Btnshare', function() {
						$('.postForm').get(0).reset();
					});
					$('body').on('click', '.share_txt', function() {
						$('.postForm').get(0).reset();
					});
					$('#btn_share')
							.click(
									function() {
										// var formData = new
										// FormData($('.photofom'));
										var post = {
											postType : 'NORMAL',
											attributes : {
												content : $('#share_txt2')
														.val()
											},
											imageLinks : fileDri
										};
										var json = $.toJSON(post);
										if ($('.postForm')[0].checkValidity()) {
											AddPost(USERID, json);
											$('#addPostModal').modal('hide');
											fileDri = [];
											$('.progress-bar').remove();
											$('.files').remove();
											$('.progress')
													.append(
															"<div class='progress-bar progress-bar-success'></div>");
											$('.progress')
													.after(
															"<div id='files' class='files'></div>");
										}

									});
				});
// function fectchPostByFollowee
var pageSize = 15;
function fetchByFolloweeOrOwner() {
	var response = FetchByFolloweeOrOwner(USERID, 0, pageSize);
	$
			.each(
					response.reverse(),
					function(n, dataString) {
						if (dataString.postType == "NORMAL"
								&& dataString.available == true) {
							addPost(dataString.owner.ID,
									dataString.owner.attributes.name,
									dataString.publishDate,
									dataString.attributes.content,
									dataString.ID, dataString.likerIDs,
									dataString.collectorIDs,
									dataString.imageLinks,
									dataString.owner.attributes.avatarLink);
							if (dataString.attributes.communityName != null) {
								var board = "<a class='communityPostSpan' id = '"
										+ dataString.attributes.communityID
										+ "'><span class='glyphicon glyphicon-th-large'></span>&nbsp;"
										+ dataString.attributes.communityName
										+ "</a> ";
								$(".postComm"+dataString.ID).append(board);
							}
						}
					});
}
$('body').on("click",".communityPostSpan",function(){
	window.location.href = "communityShow.jsp?"+$(this).attr('id');
});
// function fectchHeatPost

function fectchHeatPost() {
	var response = FetchHeatPost(0, pageSize);
	if (response.length != 0) {
		$.each(response.reverse(),
				function(n, dataString) {
					if (dataString.postType == "NORMAL"
							&& dataString.available == true) {
						addPost(dataString.owner.ID,
								dataString.owner.attributes.name,
								dataString.publishDate,
								dataString.attributes.content, dataString.ID,
								dataString.likerIDs, dataString.collectorIDs,
								dataString.imageLinks,
								dataString.owner.attributes.avatarLink);
					}
				});

	}
}
// function fetchPostsByIDs
$('body').on('click', '.alertCust', function() {
	fetchPostByIDs(postIdContainer);
	$(this).css("display", "none");
	postIdContainer = [];
});

$('body').on("click", ".post_more", function() {
	var id = $(this).attr('id');
	$("div[id='postImg" + id + "']").find('img').click();
});
$(window)
		.scroll(
				function() {
					if ($(window).scrollTop() == $(document).height()
							- window.windowHeight) {
						var startIndex = $('.post').length - 1;
						$('div#infinite_loader').show();
						var response = [];
						if (USERID == null || USERID == "")
							response = FetchHeatPost(startIndex, pageSize);
						else
							response = FetchByFolloweeOrOwner(USERID,
									startIndex, pageSize);
						$.each(response, function(n, dataString) {
							var boarddiv = post(dataString.owner.ID,
									dataString.owner.attributes.name,
									dataString.publishDate,
									dataString.attributes.content,
									dataString.ID, dataString.likerIDs,
									dataString.collectorIDs,
									dataString.imageLinks,
									dataString.owner.attributes.avatarLink);
							$(".pro_body").append(boarddiv);
							Msnry('.pro_body', '.post', 435);
						});
						if (response.length == pageSize) {
							$('div#infinite_loader').hide();
						} else {
							$('div#infinite_loader')
									.replaceWith(
											'<div id="no_more_infinite_load"><span>no more</span></div>');
							$(window).unbind("scroll");
						}
					}
				});
