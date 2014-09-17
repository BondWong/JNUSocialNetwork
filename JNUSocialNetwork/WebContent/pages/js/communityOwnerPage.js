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
																			'上次失败');
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
					// function addPostToCommunity
					$('body').on('click', '.Btnshare', function() {
						$('.postForm').get(0).reset();
					});
					$('body').on('click', '.share_txt', function() {
						$('.postForm').get(0).reset();
					});
					$('#btn_shareC')
							.click(
									function() {
										// var formData = new
										// FormData($('.photofom'));
										var post = {
											postType : 'NORMAL',
											attributes : {
												content : $('#share_txt2')
														.val(),
												communityName : community.attributes.name,
												communityID : community.ID.toString()
											},
											imageLinks : fileDri
										};
										var json = $.toJSON(post);
										if ($('.postForm')[0].checkValidity()) {
											AddPostToCommunity(USERID,
													community.ID, json);
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
// function fetchPostByCommunity
var pageSize = 20;
function fetchPostByCommunity() {
	var response = FetchByCommunity(community.ID, 0, pageSize);
	$.each(response.reverse(), function(n, dataString) {
		if (dataString.available == true) {
			addPost(dataString.owner.ID, dataString.owner.attributes.name,
					dataString.publishDate, dataString.attributes.content,
					dataString.ID, dataString.likerIDs,
					dataString.collectorIDs, dataString.imageLinks,
					dataString.owner.attributes.avatarLink);
		}
	});
}
function showCommunityInfo() {
	$('.cName').html(community.attributes.name);
	$('.cIntro').html(community.attributes.introduct);
	$('.communityPic').find('img').attr("src",
			$.parseJSON(community.attributes.communityCard).src);
}

$(window)
		.scroll(
				function() {
					if ($(window).scrollTop() == $(document).height()
							- window.windowHeight) {
						var startIndex = $('.post').length - 1;
						$('div#infinite_loader').show();
						var response = FetchByCommunity(communityID,
								startIndex, pageSize);
						$
								.each(
										response.reverse(),
										function(n, dataString) {
											if (dataString.available == true) {
												var boarddiv = post(
														dataString.owner.ID,
														dataString.owner.attributes.name,
														dataString.publishDate,
														dataString.attributes.content,
														dataString.ID,
														dataString.likerIDs,
														dataString.collectorIDs,
														dataString.imageLinks,
														dataString.owner.attributes.avatarLink);
												$(".pro_body").append(boarddiv);
												$('img.userImg').userTips();
												Msnry('.pro_body', '.post', 435);
											}
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
