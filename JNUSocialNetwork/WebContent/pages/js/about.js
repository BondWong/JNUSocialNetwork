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
											$('.layer2').fadeIn(300);
											$('#infinite_loader2').fadeIn(300);
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
$('body').on("click",".communityPostSpan",function(){
	window.location.href = "communityShow.jsp?"+$(this).attr('id');
});
$('body').on("click",".deletePostFromCBtn",function(){
	var id = $(this).find("input").attr("value");
	DeletePostFromCommunity($(this).attr('id'),id);
});
function aboutClickEvent() {
	//function addTags
	$('body').on("click",".addTag",function(){
		addTag();
	});
	
	$('body').on("click","#tagSpan",function(){
		if($('.tagItem').length >= 20 ){
			alert("添加太多标签咯！");
		}else{
			AddLookingForTag(USERID,$(this).attr("title"));
			var tag ="<span class='tagItem'>"+$(this).attr("title")+"</span>";
			$('.tagBoard').after(tag);
			$(".tagItem").hover(function(){
				$(this).css("background-color","#357EBD");
			},function(){
				$(this).css("background-color","#428BCA");
			});	
		}		
	});
	$('body').on('keydown','.tagInput',function(event){
		if(event.keyCode == 13){
			addTag();
		}
	});
	//标签组提示
	var tagA = ["篮球","足球","网球","台球","羽毛球","游泳","网球","吉他","钢琴","唱K","爬山","吃！吃！吃！","我只喜欢睡觉"];
	$('body').on("click",".changeTag",function(){
		$('.tagName').text("你有什么爱好？");
		$('.tagContainer').remove();
		var tagArray = "";
		$.each(tagA,function(n,tag){
			tagArray += "<span id='tagSpan' title='"+tag+"'>"+tag+"</span>";
		});
		var tagContainer = "<div class='tagContainer'>"+tagArray+"<br clear='all' /> </div>";
		$('.tagHead').after(tagContainer);
		$(this).attr("class","btn btn-xs btn-default changeTagB");
	});
	var tagB = ["小清新","乐活族","重口味","外貌协会","技术宅","购物狂","文艺青年","相信缘分","我就是我,是不一样的烟火"];
	$('body').on("click",".changeTagB",function(){
		$('.tagName').text("你来自哪一派？");
		$('.tagContainer').remove();
		var tagArray = "";
		$.each(tagB,function(n,tag){
			tagArray += "<span id='tagSpan' title='"+tag+"'>"+tag+"</span>";
		});
		var tagContainer = "<div class='tagContainer'>"+tagArray+"<br clear='all' /></div>";
		$('.tagHead').after(tagContainer);
		$(this).attr("class","btn btn-xs btn-default changeTagC");
	});
	var tagC = ["白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","射手座","天蝎座","摩羯座","水瓶座","双鱼座"];
	$('body').on("click",".changeTagC",function(){
		$('.tagName').text("你是什么星座？");
		$('.tagContainer').remove();
		var tagArray = "";
		$.each(tagC,function(n,tag){
			tagArray += "<span id='tagSpan' title='"+tag+"'>"+tag+"</span>";
		});
		var tagContainer = "<div class='tagContainer'>"+tagArray+"<br clear='all' /></div>";
		$('.tagHead').after(tagContainer);
		$(this).attr("class","btn btn-xs btn-default changeTagD");
	});
	var tagD = ["幽默","乐观","低调","完美主义","三分钟热度","善良","阳光","直率","执着","体贴","内敛","温柔","自信","呆萌","纠结"];
	$('body').on("click",".changeTagD",function(){
		$('.tagName').text("你的性格是？");
		$('.tagContainer').remove();
		var tagArray = "";
		$.each(tagD,function(n,tag){
			tagArray += "<span id='tagSpan' title='"+tag+"'>"+tag+"</span>";
		});
		var tagContainer = "<div class='tagContainer'>"+tagArray+"<br clear='all' /></div>";
		$('.tagHead').after(tagContainer);
		$(this).attr("class","btn btn-xs btn-default changeTagE");
	});
	var tagE = ["周杰伦","林俊杰","王力宏","五月天","孙燕姿","邓紫棋","李敏浩","金秀贤","汤姆汉克斯","梁朝伟","吴彦祖","莱昂纳多","C罗"];
	$('body').on("click",".changeTagE",function(){
		$('.tagName').text("你是谁的粉？");
		$('.tagContainer').remove();
		var tagArray = "";
		$.each(tagE,function(n,tag){
			tagArray += "<span id='tagSpan' title='"+tag+"'>"+tag+"</span>";
		});
		var tagContainer = "<div class='tagContainer'>"+tagArray+"<br clear='all' /></div>";
		$('.tagHead').after(tagContainer);
		$(this).attr("class","btn btn-xs btn-default changeTagF");
	});
	var tagF = ["看书","好好学习","我要做学霸","我要做技术大牛","泡妹子","推倒帅哥","旅行","放空ing"];
	$('body').on("click",".changeTagF",function(){
		$('.tagName').text("你最想做什么？");
		$('.tagContainer').remove();
		var tagArray = "";
		$.each(tagF,function(n,tag){
			tagArray += "<span id='tagSpan' title='"+tag+"'>"+tag+"</span>";
		});
		var tagContainer = "<div class='tagContainer'>"+tagArray+"<br clear='all' /></div>";
		$('.tagHead').after(tagContainer);
		$(this).attr("class","btn btn-xs btn-default changeTagG");
	});
	var tagG = ["摇滚!","电台情歌","流行音乐","jazz","泡沫","旅行的意义","光辉岁月","爱我别走","小苹果","我的滑板鞋","海阔天空"];
	$('body').on("click",".changeTagG",function(){
		$('.tagName').text("什么音乐让你痴迷");
		$('.tagContainer').remove();
		var tagArray = "";
		$.each(tagG,function(n,tag){
			tagArray += "<span id='tagSpan' title='"+tag+"'>"+tag+"</span>";
		});
		var tagContainer = "<div class='tagContainer'>"+tagArray+"<br clear='all' /></div>";
		$('.tagHead').after(tagContainer);
		$(this).attr("class","btn btn-xs btn-default changeTagH");
	});
	var tagH = ["LOL","DOTA","剑网2","魔兽","使命召唤","手游","老子从来不玩游戏"];
	$('body').on("click",".changeTagH",function(){
		$('.tagName').text("你是那种游戏控？");
		$('.tagContainer').remove();
		var tagArray = "";
		$.each(tagH,function(n,tag){
			tagArray += "<span id='tagSpan' title='"+tag+"'>"+tag+"</span>";
		});
		var tagContainer = "<div class='tagContainer'>"+tagArray+"<br clear='all' /></div>";
		$('.tagHead').after(tagContainer);
		$(this).attr("class","btn btn-xs btn-default changeTagI");
	});
	var tagI = ["单身待解救","奋斗ing","幸福ing","成长ing","缺爱ing","静待缘分","心如止水","寂寞ing","求职ing","考研ing","备战雅思","备战托福","我是小鲜肉"];
	$('body').on("click",".changeTagI",function(){
		$('.tagName').text("你现在的状态？");
		$('.tagContainer').remove();
		var tagArray = "";
		$.each(tagI,function(n,tag){
			tagArray += "<span id='tagSpan' title='"+tag+"'>"+tag+"</span>";
		});
		var tagContainer = "<div class='tagContainer'>"+tagArray+"<br clear='all' /></div>";
		$('.tagHead').after(tagContainer);
		$(this).attr("class","btn btn-xs btn-default changeTag");
	});
	// function editProfileInfro
	$('body').on(
			'click',
			'.aEditbtn',
			function() {
				$('.selectAbout').css("display", "inline");
				var userInfo = FetchUserByID(userID);
				$("span[class='Atelenum']").html(
						"<input class='telenumE' id='focusedInput' type='text' value='"
								+ userInfo.attributes.telnum
								+ "' maxLength='11'/>");
				$("span[class='Awechat']").html(
						"<input class='wechatE' id='focusedInput' type='text' value='"
								+ userInfo.attributes.wechat
								+ "' maxLength='20'/>");
				var campus = "";
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

				var dormInfo = GetDormInfo(campus);
				var option = "<option value=''>请选择</option>";
				$.each(dormInfo, function(index, dorm) {
					option = option + "<option value='" + dorm + "'>" + dorm
							+ "</option>";
				});
				$("span[class='Aaddress']").html(
						"<select class='addressE'>" + option + "</select>");
				$("option[value='"+userInfo.attributes.dorm+"']").attr("selected","selected");
				$("span[class='Aemail']").html(
						"<input class='emailE' id='focusedInput' type='text' value='"
								+ userInfo.attributes.email
								+ "' maxLength='25' />");
				if (userInfo.attributes.selectEmail == "公开") {
					$('.selectEmail').val("公开");
				}
				if (userInfo.attributes.selectWechat == "公开") {
					$('.selectWechat').val("公开");
				}
				if (userInfo.attributes.selectTele == "公开") {
					$('.selectTele').val("公开");
				}
				if (userInfo.attributes.selectAddre == "公开") {
					$('.selectAddre').val("公开");
				}
				if (userInfo.attributes.selectBirth == "公开") {
					$('.selectBirth').val("公开");
				}

				$(this).text("保存");
				$(this).attr("class", "btn btn-primary aSavebtn");
			});
	$('body')
			.on(
					"click",
					".aEditbtn2",
					function() {

						var userInfo = FetchUserByID(userID);
						$("span[class='Alooking']").html(
								"<textarea class='lookingforE' maxLength='30'>"
										+ userInfo.attributes.introduce
										+ "</textarea>");
						$("span[class='Arelationship']")
								.html(
										"<select class='relationshipnE' val='as'><option value=''>请选择</option><option value='没有目标'>没有目标</option><option value='单身'>单身</option><option value='有暗恋对象'>有暗恋对象</option><option value='恋爱中'>恋爱中</option><option value='准备分手'>准备分手</option><option value='已经分手'>已经分手</option></select>");
						$("option[value='"+userInfo.attributes.relationship+"']").attr("selected","selected");
						$(this).text("保存");
						$(this).attr("class", "btn btn-primary aSavebtn2");
					});
	$('body')
	.on(
			"click",
			".aEditbtn3",
			function() {
				var userInfo = FetchUserByID(userID);
				$("span[class='Cintro']").html(
						"<textarea class='cintroE' id='focusedInput' type='text' value='' maxLength='30'>"
								+ userInfo.attributes.introduce
								+ "</textarea>");
				$("span[class='Cnickname']").html(
						"<input class='cnicknameE' id='focusedInput' type='text' value='"
								+ userInfo.attributes.name
								+ "' maxLength='20'/>");
				$("span[class='Cinstitution']").html(
						"<input class='cinstitutionE' id='focusedInput' type='text' value='"
								+ userInfo.attributes.Cinstitution
								+ "' maxLength='20'/>");
				$("span[class='Ccontact']").html(
						"<input class='ccontactE' id='focusedInput' type='text' value='"
								+ userInfo.attributes.Ccontact
								+ "' maxLength='25'/>");
				
				$(this).text("保存");
				$(this).attr("class", "btn btn-primary aSavebtn3");
			});
	// function saveProfileInfro
	$('body').on('click', '.aSavebtn', function() {
		$('.selectAbout').css("display", "none");
		var datajson = {
			telnum : $('.telenumE').val(),
			email : $('.emailE').val(),
			dorm : $('.addressE').val(),
			wechat : $('.wechatE').val(),
			selectTele : $('.selectTele').val(),
			selectEmail : $('.selectEmail').val(),
			selectWechat : $('.selectWechat').val(),
			selectAddre : $('.selectAddre').val(),
			selectBirth : $('.selectBirth').val()
		};

		var json = $.toJSON(datajson);
		var userInfo = UpdateUserProfile(USERID, json);
		$('.Aemail').html(userInfo.attributes.email);
		$('.Awechat').html(userInfo.attributes.wechat);
		$('.Atelenum').html(userInfo.attributes.telnum);
		$('.Aaddress').html(userInfo.attributes.dorm);
		$('.Abirth').html(
				userInfo.attributes.year + "/" + userInfo.attributes.month + "/"
						+ userInfo.attributes.date);
		$(this).text("编辑");
		$(this).attr("class", "btn btn-primary aEditbtn");
	});
	$('body').on('click', '.aSavebtn2', function() {
		$('.selectAbout').css("display", "none");
		var datajson = {
			introduce : $('.lookingforE').val(),
			relationship : $('.relationshipnE').val(),
		};
		if ($('.nameE').val() != null) {
			datajson = {
				introduce : $('.lookingforE').val(),
				relationship : $('.relationshipnE').val(),
			};
		}

		var json = $.toJSON(datajson);
		var data = UpdateUserProfile(USERID, json);
		$('.Arelationship').html(data.attributes.relationship);
		$('.Alooking').html(data.attributes.introduce);
		$(this).text("编辑");
		$(this).attr("class", "btn btn-primary aEditbtn2");
	});
	$('body').on('click', '.aSavebtn3', function() {
		$('.selectAbout').css("display", "none");
		var datajson = {
				name : $('.cnicknameE').val(),
				introduce : $('.cintroE').val(),
				Cinstitution : $('.cinstitutionE').val(),
				Ccontact : $('.ccontactE').val(),
		};

		var json = $.toJSON(datajson);
		var userInfo = UpdateUserProfile(USERID, json);
		communityShow(userInfo.attributes.name,userInfo.attributes.introduce,userInfo.attributes.Cinstitution,userInfo.attributes.Ccontact);
		$(this).text("编辑");
		$(this).attr("class", "btn btn-primary aEditbtn3");
	});
	 (function () {
        $(function () {
            var cropper1 = new CropAvatar($("#crop-avatar"));

            var cropper2 = new CropAvatar($("#crop-userbg"), {
                aspectRatio: 2.067,
                imgPreferredSize: 5,
                imgUrlAttrName: 'profileImageLink',
                targetView: ".profile_img"
            });

        });
    })(jQuery);
    /*
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
	*/
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

	var response = FetchFollowees(userID, "0", "30");
	$
			.each(
					response,
					function(index, followee) {
						var followeeDiv = addFollow(followee.ID,followee.attributes.avatarLink,followee.attributes.name);
						
						$('.followeeBoard').after(followeeDiv);
						Msnry('.followeeContainer', '.member', 215);
						$('.followName').userTips();
					});
}
// show followers
function showFollowers() {
	var response = FetchFollowers(userID, "0", "30");
	$
			.each(
					response,
					function(index, follower) {
						var followeeDiv = addFollow(follower.ID,follower.attributes.avatarLink,follower.attributes.name);
						$('.followerBoard').after(followeeDiv);
						Msnry('.followerContainer', '.member', 215);
						$('.followName').userTips();
					});
}
function addFollow(id,avatarLink,name){
	var followDiv = "<div class='follow' id='"
		+ id
		+ "'><img width='50' height='50'  class='userMember' src='"
		+ $.parseJSON(avatarLink).src
		+ "' /><span class='followName'><a style='cursor:pointer;color:#404040'>"
		+ name + "</a></span><input type='hidden' value='" + id
		+ "' name='userID'/></div>";
	return followDiv;
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
			if (dataString.attributes.communityName != null) {
				var board = "<a class='communityPostSpan' id = '"
						+ dataString.attributes.communityID
						+ "'><span class='glyphicon glyphicon-th-large'></span>&nbsp;"
						+ dataString.attributes.communityName
						+ "</a> ";
				$(".postComm" + dataString.ID).children('.deletePostBtn').attr('class','deletePostFromCBtn').attr('id',dataString.attributes.communityID);
				$(".postComm"+dataString.ID).append(board);
			}
		}
	});
}
function addTag(){
	if($('.tagInput').val() != ""){
		if($('.tagItem').length >= 15 ){
			alert("添加太多标签咯！");
		}else{
			AddLookingForTag(USERID,$('.tagInput').val());
			var tag ="<span class='tagItem'>"+$('.tagInput').val()+"</span>";
			$('.tagBoard').after(tag);
			$('.tagInput').val("");
			$(".tagItem").hover(function(){
				$(this).css("background-color","#357EBD");
			},function(){
				$(this).css("background-color","#428BCA");
			});
		}
}
}
// function communitydetail
function communityInfo() {
	var userInfo = FetchUserByID(userID);
	if (userInfo.userType == 'COMMUNITYOWNER') {
		$('.about').remove();
		$('.about_body')
				.append(
						"<div class='post about'><div class='aboutBlue'><div><span class='aboutTitle'>社团信息<button class='btn btn-primary aEditbtn3'>编辑</button></span></div><div class='InforItem'><span class='Atitle'>名称</span><span class='Cnickname'></span></div><div class='InforItem'><span class='Atitle'>所属校区</span><span class='Cinstitution'></span></div><div class='InforItem'><span class='Atitle'>联系方式</span><span class='Ccontact'></span></div><div class='InforItem'><span class='Atitle'>简短介绍</span><span class='Cintro'></span></div></div></div>");
		if (userID == USERID) {
			$('.aEditbtn3').css("display", "inline");
		}
		 communityShow(userInfo.attributes.name,userInfo.attributes.introduce,userInfo.attributes.Cinstitution,userInfo.attributes.Ccontact);
	}
}
function communityShow(Cnickname,Cintro,Cinstitution,Ccontact){
	$('.Cnickname').html(Cnickname);
	$('.Cintro').html(Cintro);
	$('.Cinstitution').html(Cinstitution);
	$('.Ccontact').html(Ccontact);
}

$('body').on('click', '.followBtnAB', function() {
	if ($(this).text() == "Follow") {
		Follow(USERID, userID);

	}
	if ($(this).text() == "Following") {
		CancelFollow(USERID, userID);
		$(this).text('Follow');
	}
});
// fetchUserByID
function fetchUserByID() {
	var userInfo = FetchUserByID(userID);
	if ($.inArray(USERID, userInfo.followerIDs) != -1) {
		$('.followBtnA').find('button').text("Following");
	}
	if (USERID == userID) {
		$('.followBtnA').remove();
		$('.selectTags').fadeIn(300);
	}
	$(".followNum").text(userInfo.followerIDs.length);
	if (userID == USERID) {
		$('body').on("click",".tagItem",function(){
			var con = confirm('您确定要删除吗？');
			if(con == true){
				if(RemoveLookingForTag(USERID,$(this).text()) == "success"){
					$(this).remove();
				};
			}
		});
		$('.photoAddBtn').css("display", "inline");
		$('.aEditbtn').css("display", "inline");
		$('.aEditbtn2').css("display", "inline");
		// function profileBg
		$('.profile_img')
				.hover(
						function() {
							var changeBtn = "<div class='changeBtnGroup'><button class='btn btn-success profileImgBtn' data-toggle='modal' data-target='#userbg-modal'>Change BlackgroundImg</button></div>";
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
							var changeBtn = "<div class='img-circle profileImg'><span class='glyphicon glyphicon-camera ' data-toggle='modal' data-target='#avatar-modal'></span></div>";
							$(this).append(changeBtn);
							$('.profileImg').css(nPos);
							$('.profileImg').hide();
							$('.profileImg').fadeIn(300);
						}, function() {
							$('.profileImg').fadeOut(1, function() {
								$(this).remove();
							});
						});
		$('.Aemail').html(userInfo.attributes.email);
		$('.Awechat').html(userInfo.attributes.wechat);
		$('.Atelenum').html(userInfo.attributes.telnum);
		$('.Aaddress').html(userInfo.attributes.dorm);
		$('.Abirth').html(
				userInfo.attributes.year + "/" + userInfo.attributes.month + "/"
						+ userInfo.attributes.date);
	}
	$.each(userInfo.lookingForTags,function(n,tag){
		var tagS = "<span class='tagItem'>"+tag+"</span>";
		$('.tagBoard').after(tagS);
		if(USERID == userID){
			$(".tagItem").hover(function(){
				$(this).css("background-color","#357EBD");
			},function(){
				$(this).css("background-color","#428BCA");
			});	
		}
	});
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
	$('.Aseason').html(userInfo.attributes.season);
	if (userInfo.attributes.selectBirth == "公开") {
		$('.Abirth').html(
				userInfo.attributes.year + "/" + userInfo.attributes.month + "/"
						+ userInfo.attributes.date);
	}
	if (userInfo.attributes.selectEmail == "公开") {
		$('.Aemail').html(userInfo.attributes.email);
	}
	if (userInfo.attributes.selectWechat == "公开") {
		$('.Awechat').html(userInfo.attributes.wechat);
	}
	if (userInfo.attributes.selectTele == "公开") {
		$('.Atelenum').html(userInfo.attributes.telnum);
	}
	if (userInfo.attributes.selectAddre == "公开") {
		$('.Aaddress').html(userInfo.attributes.dorm);
	}
	$('.Arelationship').html(userInfo.attributes.relationship);
	$('.Alooking').html(userInfo.attributes.introduce);
	
}
