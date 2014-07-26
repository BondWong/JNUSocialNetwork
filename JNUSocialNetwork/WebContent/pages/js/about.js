//function editProfileInfro
		$('body').on('click','.aEditbtn',function(){
			$("span[class='Anickname']").html("<input id='focusedInput' class='nicknameE' type='text' value='Winson_Lau' />");
			$("span[class='Alooking']").html("<input class='lookingforE' id='focusedInput' type='text' value='Make friends' />");
			$("span[class='Atelenum']").html("<input class='telenumE' id='focusedInput' type='text' value='13750046461' />");
			$("span[class='Arelationship']").html("<select class='relationshipnE'><option value='single'>single</option><option value='loving'>loving</option></select>");
			var campusC = $('.Acampus').html();
			if(campusC=="珠海校区"){campus="ZhuhaiCampus";}
			if(campusC=="华文校区"){campus="HuawenCampus";}
			if(campusC=="深圳校区"){campus="ShenzhenCampus";}
			if(campusC=="校本部"){campus="GuangzhouCampus";}
			
			$.ajax({
				url:'../../GuitarWebApp/app/dormInfo/getInfo/'+campus,
				type:'get',
				success:function(data){		
					var option="";
					$.each(data,function(index,dorm){
						 option=option+"<option value='"+dorm+"'>"+dorm+"</option>";
					});
					$("span[class='Aaddress']").html("<select class='addressE'>"+option+"</select>");
				}
			});
			
			$("span[class='Aemail']").html("<input class='emailE' id='focusedInput' type='text' value='306941426@qq.com' />");
			$(this).text("Save");
			$(this).attr("class","btn btn-primary aSavebtn");
		});
		//function saveProfileInfro
		$('body').on('click','.aSavebtn',function(){
			var nickName = $('.nicknameE').val();
			var telenum = $('.telenumE').val();
			var relationship = $('.relationshipnE').val();
			var lookingfor = $('.lookingforE').val();
			var email = $('.emailE').val();
			var dorm = $('.addressE').val();
			//var lookingfor = $('.nicknameE').val();
			$.ajax({
				type:'put',
				url:'../../GuitarWebApp/app/user/updateProfile/'+userID+'/'+nickName+'/'+lookingfor+'/'+relationship+'/'+telenum+'/'+email+'/'+dorm,
				success:function(){
					getUserRepresentation();
				}
			});
			$(this).text("Edit");
			$(this).attr("class","btn btn-primary aEditbtn");
		});
		//function avatarImgBtn
		$('body').on("click",".avatarImgBtn",function(){
			var formData = new FormData($('.avatarForm')[0]);
			$.ajax({
				type:'POST',
				url:'../../GuitarWebApp/app/fileUploader',
				success:function(data){
					$.ajax({
						type:'PUT',
						url:'../../GuitarWebApp/app/user/changeAvatar/'+userID+'?avatarLink='+data
					});
				},
				// Form data
		        data: formData,
		        //Options to tell jQuery not to process data or worry about content-type.
		        cache: false,
		        contentType: false,
		        processData: false
			});
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
		//function getUserInfor
		function getUserInfo(){
			$.ajax({
				url:'../../GuitarWebApp/app/user/getRepresentation/2011052395',
				type:'get',
				success:function(data){
					$('.Agender').html(data.gender);
					$('.Ainstitution').html(data.institution);
					$('.Amajor').html(data.major);
					var d = new Date(data.birthday);
					$('.Abirth').html(d.getFullYear() + "/" +(d.getMonth()+1) + "/" + d.getDate());
					$('.Acampus').html(data.campus);
				}
			});
		}
		function fetchPostsByOwner(){
			var response = FetchPostsByOwner("2011052407","0","5");
			$.each(response.reverse(),function(n,dataString){
				addPost(dataString.owner.ID,dataString.owner.attributes.nickName,dataString.publishDate,dataString.attributes.content,dataString.ID,dataString.likerIDs.length);
			});
		}