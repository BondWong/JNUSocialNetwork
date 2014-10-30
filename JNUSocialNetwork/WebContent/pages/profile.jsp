<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>

<head>
<link href="styles/guidance.css" rel="stylesheet">
<%@ include file="parts/head.jsp"%>
</head>

<body data="profile">
	<div class="mask" id="guide_mask" content-image-data="4">
	
		<div  class="guide_step" data="1">
			<img class="guide_image" src="./images/guidance/welcome.png" data="1"/>
			<button type="button" class="guide_next_btn" data="1" style="left: 340px;top: 523px;width:135px;height:45px"></button>
			
		</div>
		<div  class="guide_step" data="2">
			<img class="guide_image" src="./images/guidance/u500Bu4EBAu8CC7u6599.png" data="2"/>
			<button type="button" class="guide_next_btn" data="2" style="left: 167px;top: 517px;width:100px;height:32px"></button>
			
		</div>
		<div  class="guide_step" data="3">
			<img class="guide_image" src="./images/guidance/u500Bu4EBAu7167u7247.png" data="3"/>
			<button type="button" class="guide_next_btn" data="3" style="left: 390px;top: 435px;width:90px;height:30px"></button>
			
		</div>
		<div  class="guide_step" data="4">
			<img class="guide_image" src="./images/guidance/u6A19u7C3D.png" data="4"/>
			<button type="button" class="guide_next_btn" data="4" style="left: 746px;top: 445px;width:110px;height:35px"></button>
			
		</div>
		
	</div>
	<div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
		<div class="container">
			<%@ include file="parts/navLeft.jsp"%>
			<div class="collapse navbar-collapse">
				<%@ include file="parts/communityDropDown.jsp"%>

				<%@ include file="parts/navRight.jsp"%>
			</div>
			<!-- /.nav-collapse -->
		</div>
		<!-- /.container -->
	</div>
	<!-- /.navbar -->
	<div class="container container_custom">
		<%@ include file="parts/profileHead.jsp"%>

		<%@ include file="parts/profileNav.jsp"%>

		<c:choose>
			<c:when test="${param.nav eq 'about' }">
				<%@ include file="parts/profileAbout.jsp"%>
			</c:when>
			<c:when test="${param.nav eq 'circle' }">
				<%@ include file="parts/profileCircle.jsp"%>
			</c:when>
			<c:when test="${param.nav eq 'photo' }">
				<%@ include file="parts/profilePhoto.jsp"%>
			</c:when>
			<c:otherwise>
				<div class="pro_body">
					<div class="share post sharePro">
						<form enctype="multipart/form-data">
							<input class="form-control share_txt" type="text"
								placeholder="说些什么？...." data-toggle='modal'
								data-target='#addPostModal' />
							<div class="shareBtnGroup">
								<div role="button" class="Btnshare btnMotion"
									data-toggle='modal' data-target='#addPostModal'>
									<div class="Iconshare"
										style="background-image: url(images/motion.png);"></div>
									<div></div>
								</div>
								<div role="button" class="Btnshare btnPhoto" data-toggle='modal'
									data-target='#addPostModal'>
									<div class="Iconshare"
										style="background-image: url(images/photo.png);"></div>
									<div></div>
								</div>
								<div role="button" class="Btnshare btnVideo" data-toggle='modal'
									data-target='#addPostModal'>
									<div class="Iconshare"
										style="background-image: url(images/video.png);"></div>
									<div></div>
								</div>
								<div role="button" class="Btnshare btnShare" data-toggle='modal'
									data-target='#addPostModal'>
									<div class="Iconshare"
										style="background-image: url(images/share.png);"></div>
									<div class="Fontshare"></div>
								</div>

							</div>
						</form>
						<!-- Modal -->
						<div class="modal fade" id="addPostModal" tabindex="-1"
							role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal"
											aria-hidden="true">&times;</button>
										<h4 class="modal-title" id="myModalLabel">发帖分享</h4>
									</div>
									<form class="postForm" enctype="multipart/form-data"
										onsubmit="return false;">
										<div class="modal-body modalBody">
											<textarea class="form-control share_txt2" id="share_txt2"
												type="text" style="resize: none;" required></textarea>
											<br>
											<!-- The fileinput-button span is used to style the file input field as button -->
											<span class="btn btn-success fileinput-button"> <i
												class="glyphicon glyphicon-plus"></i> <span>添加图片</span> <!-- The file input field used as target for the file upload widget -->
												<input id="fileupload" type="file" name="files[]" multiple>
											</span> <br> <br>
											<!-- The global progress bar -->
											<div id="progress" class="progress progressCust">
												<div class="progress-bar progress-bar-success"></div>
											</div>
											<!-- The container for the uploaded files -->
											<div id="files" class="files"></div>
											<br>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-default"
												data-dismiss="modal">取消</button>
											<button type="submit" class="btn btn-primary" id="btn_share"
												value="upload">分享</button>
										</div>
									</form>
								</div>
								<!-- /.modal-content -->
							</div>
							<!-- /.modal-dialog -->
						</div>
						<!-- /.modal -->
					</div>

				</div>
	</div>
	</c:otherwise>
	</c:choose>
	<!-- CHATROOM -->
	<%@ include file="parts/chatRoom.jsp"%>
	<!-- Bootstrap core JavaScript
    ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<%@ include file="parts/profileJavaScript.jsp"%>
	<%@ include file="parts/contentScroll.jsp"%>
	<%@ include file="parts/loginJavaScript.jsp"%>
	<%@ include file="parts/baidu.jsp"%>
	<script src="js/guidance.js"></script>
	<script src="js/rgbaster.min.js"></script>
	<script>
	$(document).ready(function(){
		var img = document.getElementById('profile_background_image');
		RGBaster.colors(img, {
				success: function(payload) {
			   $("#profile_info").css("background-color", payload.secondary);
			}
		});
	});
	
	</script>
</body>
</html>
