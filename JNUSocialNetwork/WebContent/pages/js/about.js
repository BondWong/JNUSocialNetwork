//function editProfileInfro
		$('body').on('click','.aEditbtn',function(){
			$("span[class='Anickname']").html("<input id='focusedInput' class='nicknameE' type='text' value='Winson_Lau' />");
			$("span[class='Alooking']").html("<input class='lookingforE' id='focusedInput' type='text' value='Make friends' />");
			$("span[class='Atelenum']").html("<input class='telenumE' id='focusedInput' type='text' value='13750046461' />");
			$("span[class='Arelationship']").html("<select class='relationshipnE'><option value='single'>single</option><option value='loving'>loving</option></select>");
			var campus = "";
			if($('.Acampus').html()=="珠海校区"){campus="ZhuhaiCampus";}
			if($('.Acampus').html()=="华文校区"){campus="HuawenCampus";}
			if($('.Acampus').html()=="深圳校区"){campus="ShenzhenCampus";}
			if($('.Acampus').html()=="校本部"){campus="GuangzhouCampus";}
			
			var dormInfo = GetDormInfo("HuawenCampus");
			var option="";
			$.each(dormInfo,function(index,dorm){
				option=option+"<option value='"+dorm+"'>"+dorm+"</option>";
			});
			$("span[class='Aaddress']").html("<select class='addressE'>"+option+"</select>");	
			$("span[class='Aemail']").html("<input class='emailE' id='focusedInput' type='text' value='306941426@qq.com' />");
			
			$(this).text("Save");
			$(this).attr("class","btn btn-primary aSavebtn");
		});
		//function saveProfileInfro
		$('body').on('click','.aSavebtn',function(){
			var datajson={
				nickName:$('.nicknameE').val(),
				lookingFor:$('.lookingforE').val(),	
				relationship:$('.relationshipnE').val(),
				telenum:$('.telenumE').val(),
				email:$('.emailE').val(),
				dorm:$('.addressE').val()
			};
			var json = $.toJSON(datajson);
			UpdateUserProfile("2011052407",json);
			fetchUserByID();
			$(this).text("Edit");
			$(this).attr("class","btn btn-primary aEditbtn");
		});
		//function avatarImgBtn
		$('body').on("click",".avatarImgBtn",function(){
			var datajson={
					avatarLink:FileUpload(new FormData($('.avatarForm')[0])),
				};
			var json = $.toJSON(datajson);
			UpdateUserProfile("2011052407",json);
			fetchUserByID();
			$('#myModal').modal('hide');
		});
		//function addPhoto
		$('body').on("click",".addPhoto",function(){
			var formData = new FormData($('.photoForm')[0]);
			$.ajax({
				type:'POST',
				url:'../../GuitarWebApp/app/fileUploader',
				success:function(data){
					var Urls = '../../GuitarWebApp/app/user/addImages/'+userID+'?';
					$.each(data,function(n,photoUrl){
						if(n != data.length-1){
							Urls = Urls +'imageLinks='+ photoUrl+'&';
						}
						else{
							Urls = Urls +'imageLinks='+ photoUrl;
							return true;
						}
					});
					$.ajax({
						type:'PUT',
						url: Urls,
						success: function(){
							showPhotos();
						}
					});
				},
				// Form data
		        data: formData,
		        //Options to tell jQuery not to process data or worry about content-type.
		        cache: false,
		        contentType: false,
		        processData: false
			});
			$('#myModal2').modal('hide');
		});
		//function profileBg
		$('.profile_img').hover(function(){
			var changeBtn = "<div class='changeBtnGroup'><form><button class='btn btn-success profileImgBtn'>Change BlackgroundImg</button><input type='file' name='file' class='btn_file' style='display:none'/></form></div>";//<button class='btn btn-success avatarImgBtn'>Change Avatar</button>
			$('.profile_img').append(changeBtn);
			$('.changeBtnGroup').hide();
			$('.changeBtnGroup').fadeIn(300);
		},function(){
			$('.changeBtnGroup').fadeOut(300, function(){
				$(this).remove();
			});	
		});
	//function profileImg 
		$('.profile_user_img').hover(function(){
			var changeBtn = "<button class='btn btn-success profileImg' data-toggle='modal' data-target='#myModal'>Change</button>";
			$(this).append(changeBtn);
			$('.profileImg').hide();
			$('.profileImg').fadeIn(300);
		},function(){
			$('.profileImg').fadeOut(300, function(){
				$(this).remove();
			});	
		});
	//show followees
		function showFollowees(){
			FetchFollowees("2011052407","0","5");
			$.ajax({
				url:'../../GuitarWebApp/app/user/getRepresentation/'+userID,
				type:'get',
				success: function(data){
					var followeesIDs = data.followeesID;
					$.each(followeesIDs,function(index,followeesID){
						$.ajax({
							url:'../../GuitarWebApp/app/user/getRepresentationShortCut/'+followeesID,
							type:'get',
							success: function(followeesShortCut){
								var followee="<img src='"+followeesShortCut.avatarLink+"'></img>";
								$('.followeeShow').append(followee);
							}
						});
					});
				}
			});
		}
	//show photos
		function showPhotos(){
			$.ajax({
				url:'../../GuitarWebApp/app/user/getRepresentation/'+userID,
				type:'get',
				success: function(data){
					$.each(data.imageLinks,function(index,imageLink){
						var photoContainer="<div class='photo'><img src='"+imageLink+"' /></div>";
						$('.photoAddBtn').after(photoContainer);
					});
				}
			});
		}
		
		//function fetchPostsByOwner()
		function fetchPostsByOwner(){
			var response = FetchPostsByOwner("2011052407","0","5");
			$.each(response.reverse(),function(n,dataString){
				addPost(dataString.owner.ID,dataString.owner.attributes.nickName,dataString.publishDate,dataString.attributes.content,dataString.ID,dataString.likerIDs.length);
			});
		}

	//fetchUserByID
	function fetchUserByID(){
		var userInfo = FetchUserByID("2011052407");
		$('.Agender').html(userInfo.attributes.gender);
		$('.Ainstitution').html(userInfo.attributes.institution);
		$('.Amajor').html(userInfo.attributes.major);
		$('.Acampus').html(userInfo.attributes.campus);
		$('.Anickname').html(userInfo.attributes.nickName);
		$('.Aemail').html(userInfo.attributes.email);
		$('.Arelationship').html(userInfo.attributes.relationship);
		$('.Atelenum').html(userInfo.attributes.telenum);
		$('.Aaddress').html(userInfo.attributes.dorm);
		$('.Alooking').html(userInfo.attributes.lookingFor);
		if(userInfo.attributes.birthday!=""){
			var d = new Date(userInfo.attributes.birthday);
			$('.Abirth').html(d.getFullYear() + "/" +(d.getMonth()+1) + "/" + d.getDate());
		}
	}