$(document)
		.ready(
				function() {
					photosfileDri = [];
					// funtion fileupload
					$('#fileuploadPhoto')
							.fileupload(
									{
										url : '../../app/fileUploader',
										beforeSend : function(request) {
											request.setRequestHeader("ID",
													USERID);
										},
										success : function(data) {
											for (var i = 0; i < data.length; i++) {
												var dataString = data[i];
												photosfileDri
														.push(encodeURIComponent(dataString));
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
					$('body').on('click', '.Btnshare', function() {
						$('.postForm').get(0).reset();
					});
					$('body').on('click', '.share_txt', function() {
						$('.postForm').get(0).reset();
					});
					$('body')
							.on(
									'click',
									'.close',
									function() {
										$('.progress-bar').remove();
										$('.files').remove();
										$('.progress')
												.append(
														"<div class='progress-bar progress-bar-success'></div>");
										$('.progress')
												.after(
														"<div id='files' class='files'></div>");
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
function aboutClickEvent() {
	// function editProfileInfro
	$('body')
			.on(
					'click',
					'.aEditbtn',
					function() {
						var userInfo = FetchUserByID(userID);
						$("span[class='Alooking']").html(
								"<input class='lookingforE' id='focusedInput' type='text' value='"
										+ userInfo.attributes.lookingFor
										+ "' maxLength='20'/>");
						if (userInfo.userType == 'COMMUNITYOWNER') {
							$("span[class='Anickname']").html(
									"<input class='nameE' id='focusedInput' type='text' value='"
											+ userInfo.attributes.name
											+ "' maxLength='20'/>");
						}

						$("span[class='Atelenum']").html(
								"<input class='telenumE' id='focusedInput' type='text' value='"
										+ userInfo.attributes.telnum
										+ "' maxLength='20'/>");
						$("span[class='Arelationship']")
								.html(
										"<select class='relationshipnE'><option value='single'>single</option><option value='loving'>loving</option></select>");
						if ($('.Acampus').html() == "珠海校区") {
							campus = "ZhuhaiCampus";
						}
						if ($('.Acampus').html() == "华文校区") {
							campus = "HuawenCampus";
						}
						if ($('.Acampus').html() == "深圳旅游学院") {
							campus = "ShenzhenCampus";
						}
						if ($('.Acampus').html() == "校本部") {
							campus = "GuangzhouCampus";
						}

						var dormInfo = GetDormInfo("HuawenCampus");
						var option = "";
						$.each(dormInfo, function(index, dorm) {
							option = option + "<option value='" + dorm + "'>"
									+ dorm + "</option>";
						});
						$("span[class='Aaddress']").html(
								"<select class='addressE'>" + option
										+ "</select>");
						$("span[class='Aemail']").html(
								"<input class='emailE' id='focusedInput' type='text' value='"
										+ userInfo.attributes.email + "' />");

						$(this).text("Save");
						$(this).attr("class", "btn btn-primary aSavebtn");
					});
	// function saveProfileInfro
	$('body').on('click', '.aSavebtn', function() {
		var datajson = {
			lookingFor : $('.lookingforE').val(),
			relationship : $('.relationshipnE').val(),
			telenum : $('.telenumE').val(),
			email : $('.emailE').val(),
			dorm : $('.addressE').val(),
		};
		if ($('.nameE').val() != null) {
			datajson = {
				lookingFor : $('.lookingforE').val(),
				relationship : $('.relationshipnE').val(),
				telenum : $('.telenumE').val(),
				email : $('.emailE').val(),
				dorm : $('.addressE').val(),
				name : $('.nameE').val()
			};
		}

		var json = $.toJSON(datajson);
		UpdateUserProfile(userID, json);
		fetchUserByID();
		$(this).text("Edit");
		$(this).attr("class", "btn btn-primary aEditbtn");
	});
	// function avatarImgBtn
	$('body')
			.on(
					"click",
					".avatarImgBtn",
					function() {
						var datajson = {
							avatarLink : FileUpload(new FormData(
									$('.avatarForm')[0]))[0],
						};
						var json = $.toJSON(datajson);
						var userNew = UpdateUserProfile(userID, json);
						$('.profile_user_img').find('img').attr("src",
								$.parseJSON(userNew.attributes.avatarLink).src);
						$('#myModal').modal('hide');
						$('.avatarForm').get(0).reset();

					});
	// change Background
	$('body').on(
			"click",
			".changeBg",
			function() {
				var datajson = {
					profileImageLink : FileUpload(new FormData(
							$('.changBgForm')[0]))[0],
				};
				var json = $.toJSON(datajson);
				var userNew = UpdateUserProfile(userID, json);
				;
				$('#myModalB').modal('hide');
				$('.profile_img').find('img').attr("src",
						$.parseJSON(userNew.attributes.profileImageLink).src);
				$('.changBgForm').get(0).reset();
			});
	// function addPhoto
	$('body')
			.on(
					"click",
					".addPhoto",
					function() {
						AddImages(userID, photosfileDri);
						$('#myModalPhoto').modal('hide');
						$
								.each(
										photosfileDri,
										function(index, imageLink) {
											var photoContainer = "<div class='photo'><img width='280' height='"
													+ getHeight(
															280,
															$
																	.parseJSON(decodeURIComponent(imageLink)).width,
															$
																	.parseJSON(decodeURIComponent(imageLink)).height)
													+ "' src='"
													+ $
															.parseJSON(decodeURIComponent(imageLink)).src
													+ "' /></div>";
											$('.photoAddBtn').after(
													photoContainer);
											Msnry('.pro_body', '.photo', 280);
										});
						photosfileDri = [];
						$('.progress-bar').remove();
						$('.files').remove();
						$('.progress')
								.append(
										"<div class='progress-bar progress-bar-success'></div>");
						$('.progress').after(
								"<div id='files' class='files'></div>");
					});
}

// show photos
function showPhotos() {
	var response = FetchUserByID(userID);
	$.each(response.imageLinks, function(index, imageLink) {
		var photoContainer = "<div class='photo'><img width='280' height='"
				+ getHeight(280, $.parseJSON(imageLink).width, $
						.parseJSON(imageLink).height) + "' src='"
				+ $.parseJSON(imageLink).src + "' /></div>";
		$('.photoAddBtn').after(photoContainer);
		Msnry('.pro_body', '.photo', 280);
	});
}
// show followees
function showFollowees() {

	var response = FetchFollowees(userID, "0", "10");
	$
			.each(
					response,
					function(index, followee) {
						var followeeDiv = "<img class='img-circle userImg userImgA' onload='javascript:auto_resize( 50, 50, this)' src='"
								+ $.parseJSON(followee.attributes.avatarLink).src
								+ "' style='display: none'></img><input type='hidden' name='userID' value='"
								+ followee.ID + "'/>";
						$('.userImgA').userTips();
						$('.followeeShow').append(followeeDiv);
					});
}
// show followers
function showFollowers() {
	var response = FetchFollowers(userID, "0", "10");
	$
			.each(
					response,
					function(index, follower) {
						var followerDiv = "<img class='img-circle userImg userImgA' onload='javascript:auto_resize( 50, 50, this)' src='"
								+ $.parseJSON(follower.attributes.avatarLink).src
								+ "'style='display: none'></img><input type='hidden' name='userID' value='"
								+ follower.ID + "'/>";

						$('.followerShow').append(followerDiv);
						$('.userImgA').userTips();
					});
}
var pageSize = 15;
// function fetchPostsByOwner()
function fetchPostsByOwner() {
	var response = FetchPostsByOwner(userID, 0, pageSize);
	$.each(response.reverse(), function(n, dataString) {
		if (dataString.postType == "NORMAL") {
			addPost(dataString.owner.ID, dataString.owner.attributes.name,
					dataString.publishDate, dataString.attributes.content,
					dataString.ID, dataString.likerIDs,
					dataString.collectorIDs, dataString.imageLinks,
					dataString.owner.attributes.avatarLink);
		}
	});
}

// fetchUserByID
function fetchUserByID() {
	var userInfo = FetchUserByID(userID);
	if (userID == USERID) {
		$('.photoAddBtn').css("display", "inline");
		$('.aEditbtn').css("display", "inline");
		// function profileBg
		$('.profile_img')
				.hover(
						function() {
							var changeBtn = "<div class='changeBtnGroup'><button class='btn btn-success profileImgBtn' data-toggle='modal' data-target='#myModalB'>Change BlackgroundImg</button></div>";
							$('.profileImgDiv').after(changeBtn);
							$('.changeBtnGroup').hide();
							$('.changeBtnGroup').fadeIn(300);
						}, function() {
							$('.changeBtnGroup').fadeOut(300, function() {
								$(this).remove();
							});
						});

		// function profileImg
		$('.profile_user_img')
				.hover(
						function() {
							var pos = $(this).offset();
							var nPos = pos;
							nPos.top = pos.top;
							nPos.left = pos.left + 10;
							var changeBtn = "<div class='img-circle profileImg'><span class='glyphicon glyphicon-camera ' data-toggle='modal' data-target='#myModal'></span></div>";
							$(this).append(changeBtn);
							$('.profileImg').css(nPos);
							$('.profileImg').hide();
							$('.profileImg').fadeIn(300);
						}, function() {
							$('.profileImg').fadeOut(1, function() {
								$(this).remove();
							});
						});
	}
	$('.profile_user_img').find('img').attr("src",
			$.parseJSON(userInfo.attributes.avatarLink).src);
	$('.profile_img').find('img').attr("src",
			$.parseJSON(userInfo.attributes.profileImageLink).src);
	$('.profileAvatar').attr("src",
			$.parseJSON(userInfo.attributes.avatarLink).src);
	$('.profile_user_name').html(userInfo.attributes.name);
	$('.Agender').html(userInfo.attributes.gender);
	$('.Ainstitution').html(userInfo.attributes.institution);
	$('.Amajor').html(userInfo.attributes.major);
	$('.Acampus').html(userInfo.attributes.campus);
	$('.Anickname').html(userInfo.attributes.name);
	$('.Aemail').html(userInfo.attributes.email);
	$('.Arelationship').html(userInfo.attributes.relationship);
	$('.Atelenum').html(userInfo.attributes.telnum);
	$('.Aaddress').html(userInfo.attributes.dorm);
	$('.Alooking').html(userInfo.attributes.lookingFor);
	if (userInfo.attributes.birthday != "") {
		var d = new Date(userInfo.attributes.birthday);
		$('.Abirth').html(
				d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate());
	}
}
