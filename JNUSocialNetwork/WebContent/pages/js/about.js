$(document)
		.ready(
				function() {
					photosfileDri = [];
					// funtion fileupload
					$('#fileuploadPhoto')
							.fileupload({
								url : '../../app/fileUploader',
								beforeSend : function(request) {
									request.setRequestHeader("ID", USERID);
								},
								success : function(data) {
									for (var i = 0; i < data.length; i++) {
										var dataString = data[i];
										photosfileDri.push(dataString);
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
function aboutClickEvent() {
	// function editProfileInfro
	$('body')
			.on(
					'click',
					'.aEditbtn',
					function() {
						var userInfo = FetchUserByID(userID);
						$("span[class='Alooking']")
								.html(
										"<input class='lookingforE' id='focusedInput' type='text' value='"+userInfo.attributes.lookingFor+"' />");
						$("span[class='Atelenum']")
								.html(
										"<input class='telenumE' id='focusedInput' type='text' value='"+userInfo.attributes.telenum+"' />");
						$("span[class='Arelationship']")
								.html(
										"<select class='relationshipnE'><option value='single'>single</option><option value='loving'>loving</option></select>");
						var campus = "";
						if ($('.Acampus').html() == "珠海校区") {
							campus = "ZhuhaiCampus";
						}
						if ($('.Acampus').html() == "华文校区") {
							campus = "HuawenCampus";
						}
						if ($('.Acampus').html() == "深圳校区") {
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
						$("span[class='Aemail']")
								.html(
										"<input class='emailE' id='focusedInput' type='text' value='"+userInfo.attributes.email+"' />");

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
			dorm : $('.addressE').val()
		};
		var json = $.toJSON(datajson);
		UpdateUserProfile(userID, json);
		fetchUserByID();
		$(this).text("Edit");
		$(this).attr("class", "btn btn-primary aEditbtn");
	});
	// function avatarImgBtn
	$('body').on("click", ".avatarImgBtn", function() {
		var datajson = {
			avatarLink : FileUpload(new FormData($('.avatarForm')[0])),
		};
		var json = $.toJSON(datajson);
		UpdateUserProfile(userID, json);
		fetchUserByID();
		$('#myModal').modal('hide');
	});
	// change Background
	$('body').on("click", ".changeBg", function() {
		var datajson = {
			profileImageLink : FileUpload(new FormData($('.changBgForm')[0])),
		};
		var json = $.toJSON(datajson);
		UpdateUserProfile(userID, json);
		fetchUserByID();
		$('#myModalB').modal('hide');
	});
	// function addPhoto
	$('body').on(
			"click",
			".addPhoto",
			function() {
				AddImages(userID, photosfileDri);
				$('#myModalPhoto').modal('hide');
				$.each(photosfileDri, function(index, imageLink) {
					var photoContainer = "<div class='photo'><img src='"
							+ imageLink + "' /></div>";
					$('.photoAddBtn').after(photoContainer);
					Msnry('.pro_body', '.photo', 280);
				});
			});
}

// function profileBg
$('.profile_img')
		.hover(
				function() {
					var changeBtn = "<div class='changeBtnGroup'><form><button class='btn btn-success profileImgBtn' data-toggle='modal' data-target='#myModalB'>Change BlackgroundImg</button><input type='file' name='file' class='btn_file' style='display:none'/></form></div>";// <button
					// class='btn
					// btn-success
					// avatarImgBtn'>Change
					// Avatar</button>
					$('.profile_img').append(changeBtn);
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
					var changeBtn = "<button class='btn btn-success profileImg' data-toggle='modal' data-target='#myModal'>Change</button>";
					$(this).append(changeBtn);
					$('.profileImg').hide();
					$('.profileImg').fadeIn(300);
				}, function() {
					$('.profileImg').fadeOut(300, function() {
						$(this).remove();
					});
				});

// show photos
function showPhotos() {
	var response = FetchUserByID(userID);
	$.each(response.imageLinks, function(index, imageLink) {
		var photoContainer = "<div class='photo'><img src='" + imageLink
				+ "' /></div>";
		$('.photoAddBtn').after(photoContainer);
	});
}
// show followees
function showFollowees() {
	var response = FetchFollowees(userID, "0", "10");
	$.each(response, function(index, followee) {
		var followeeDiv = "<img src='" + followee.attributes.avatarLink
				+ "'></img>";
		$('.followeeShow').append(followeeDiv);
	});
}
// show followers
function showFollowers() {
	var response = FetchFollowers(userID, "0", "10");
	$.each(response, function(index, follower) {
		var followerDiv = "<img src='" + follower.attributes.avatarLink
				+ "'></img>";
		$('.followerShow').append(followerDiv);
	});
}
var pageSize = 5;
// function fetchPostsByOwner()
function fetchPostsByOwner() {
	var response = FetchPostsByOwner(userID, 0, pageSize);
	$.each(response.reverse(),
			function(n, dataString) {
				if (dataString.postType == "NORMAL") {
					addPost(dataString.owner.ID,
							dataString.owner.attributes.name,
							dataString.publishDate,
							dataString.attributes.content, dataString.ID,
							dataString.likerIDs, dataString.collectorIDs,dataString.imageLinks,dataString.owner.attributes.avatarLink);
				}
			});
}

// fetchUserByID
function fetchUserByID() {
	var userInfo = FetchUserByID(userID);
	if(userID == USERID){
		$('.aEditbtn').css("display","inline");
	}
	$('.profile_user_img').find('img').attr("src",userInfo.attributes.avatarLink);
	$('.profile_img').find('img').attr("src",userInfo.attributes.profileImageLink);
	$('.profileAvatar').attr("src",userInfo.attributes.avatarLink);
	$('.profile_user_name').html("<strong>"+userInfo.attributes.name+"</strong>");
	$('.Agender').html(userInfo.attributes.gender);
	$('.Ainstitution').html(userInfo.attributes.institution);
	$('.Amajor').html(userInfo.attributes.major);
	$('.Acampus').html(userInfo.attributes.campus);
	$('.Anickname').html(userInfo.attributes.name);
	$('.Aemail').html(userInfo.attributes.email);
	$('.Arelationship').html(userInfo.attributes.relationship);
	$('.Atelenum').html(userInfo.attributes.telenum);
	$('.Aaddress').html(userInfo.attributes.dorm);
	$('.Alooking').html(userInfo.attributes.lookingFor);
	if (userInfo.attributes.birthday != "") {
		var d = new Date(userInfo.attributes.birthday);
		$('.Abirth').html(
				d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate());
	}
}
