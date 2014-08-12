$(document)
		.ready(
				function() {
					// funtion fileupload
					$('#fileupload')
							.fileupload(
									{
										url : '../../JNUSocialNetwork/app/fileUploader',
										beforeSend : function(request) {
											request.setRequestHeader(
													"hiddenCode", $(
															'#hiddenCode')
															.text());
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
					// function addPostToCommunity

					$('#btn_shareC').click(
							function(e) {
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
								AddPostToCommunity(USERID, community.ID,
										"MEMBER", json);
								$('#addPostModal').modal('hide');
							});
				});
// function fectchPostByFollowee

function fetchPostByCommunity() {
	var response = FetchByCommunity(community.ID, "0", "5");
	$.each(response.reverse(), function(n, dataString) {
		if (dataString.available == "true") {
			addPost(dataString.owner.ID, dataString.owner.attributes.nickName,
					dataString.publishDate, dataString.attributes.content,
					dataString.ID, dataString.likerIDs.length);
		}
	});
}
function showCommunityInfo() {
	$('.cName').html(community.attributes.name);
	$('.cIntro').html(community.attributes.introduct);
}
$('body').on('click', '.alertCustC', function() {
	fetchPostByIDs(communityPostIdContainer);
	$(this).css("display", "none");
	communityPostIdContainer = [];
});
$('body').on('click', '.deletePostBtn', function() {
	var id = $(this).find("input").attr("value");
	DeletePostFromCommunity(community.ID, id);
});

// funtion sessionID
$('body')
		.on(
				"click",
				".activityHref",
				function() {
					window.location.href = 'http://localhost:8080/JNUSocialNetwork/pages/activity.jsp?'
							+ community.ID;
				});

