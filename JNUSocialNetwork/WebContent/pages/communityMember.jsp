<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>

<%@ include file="parts/head.jsp"%>
<!-- Generic page styles -->
<body>
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
	<div id="light" class="white_content">
		<div class="row">
			<div class="col-xs-9" style="background-color: #222222;">
				<div class="row" style="height: 30px; margin-bottom: 0px;">
					<div class="col-md-5"></div>
					<div class="col-md-5">
						<nav class="navbar navbar-inverse" role="navigation"
							style="border: none;">
							<div>
								<ul class="nav navbar-nav">
									<li><a href="#">分 享</a></li>
									<li><a href="#">幻灯片</a></li>
									<li class="dropdown"><a href="#" class="dropdown-toggle"
										data-toggle="dropdown"> 更多 <b class="caret"></b>
									</a>
										<ul class="dropdown-menu">
											<li><a href="#">举报图片</a></li>
											<li><a href="#">......</a></li>
										</ul></li>
								</ul>
							</div>
						</nav>
					</div>
					<div class="deletePostBtn"
						style="margin-right: 10px; margin-top: 10px">
						<a href="javascript:void(0)"
							onclick="document.getElementById('light').style.display='none';"><input
							id="deleteImg" type='hidden' value="1405950973690" /><span
							class="glyphicon glyphicon-remove" style="font-size: 14px"></span></a>
					</div>
				</div>
				<div class="row">
					<div class="imgBox">
						<img src="images/2.jpg"
							style="max-width: 1000px; min-height: 500px;" />
					</div>
				</div>
				<div class="row"
					style="height: 30px; margin: o auto; text-align: center;">
					<input type="button" value="信息中的照片" class="btn btn-link"
						style="color: white;"> <input type="button" value="被查看次数"
						class="btn btn-link" style="color: white;"><span>111</span>
				</div>
			</div>
			<div class="col-xs-3">
				<div class="row">
					<div class="col-md-2">
						<div class="user_img">
							<img class="userImg" src="images/user_img.jpg" />
						</div>
					</div>
					<div class="col-md-6">
						<div class="user_name">
							<strong>Winson_Lau</strong>
						</div>
						<div class="user_info">Yesterday 21:23pm</div>
					</div>
				</div>
				<p>This is not a new article in PNAS, but it details results
					from a unique study and I have wanted to write about it for a
					while.</p>
				<div class="row">
					<input type="button" value="赞" class="btn btn-default"
						style="margin-left: 10px;"> <input type="button"
						value="转发" class="btn btn-default">
				</div>
				<div class="act_content">
					<div class="row">
						<div class="col-lg-1">
							<img src="images/user_img2.jpg" />
						</div>
						<div class="col-lg-10">
							<div class="ures_name">
								<strong>Winson_Lau</strong>
							</div>
							<div class="user_info">Yesterday 21:23pm</div>
						</div>
					</div>
					<div class="act_comment">There's an extension that whenever
						you choose something that has a shortcut it has a toast popup that
						tells you what the shortcut would have been. I used it briefly a
						long time ago. But it turned out to be really annoying. Still it
						was a great idea.﻿</div>
				</div>
				<div class="act_content">
					<div class="row">
						<div class="col-lg-1">
							<img src="images/user_img2.jpg" />
						</div>
						<div class="col-lg-10">
							<div class="ures_name">
								<strong>Winson_Lau</strong>
							</div>
							<div class="user_info">Yesterday 21:23pm</div>
						</div>
					</div>
					<div class="act_comment">There's an extension that whenever
						you choose something that has a shortcut it has a toast popup that
						tells you what the shortcut would have been. I used it briefly a
						long time ago. But it turned out to be really annoying. Still it
						was a great idea.﻿</div>
				</div>
			</div>
		</div>
	</div>
	<!-- Pop-up layer -->
	<div class="container container_custom">
		<div class="communityCard">

			<div class="dropdown">
				<div class="cardSetter glyphicon glyphicon-cog" type="button"
					id="dropdownMenu1" data-toggle="dropdown"></div>
				<ul class="dropdown-menu pull-right" role="menu"
					aria-labelledby="dropdownMenu1">
					<li role="presentation"><a role="menuitem" tabindex="-1"
						class="editCommunity" data-toggle='modal'
						data-target='#editCommunity'>Edit community</a></li>
					<li role="presentation"><a role="menuitem" tabindex="-1"
						href="#">Manage members</a></li>
					<li role="presentation"><a role="menuitem" tabindex="-1"
						href="#">Leave community</a></li>
				</ul>
			</div>
			<div class="modal fade" id="editCommunity" tabindex="-1"
				role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">Edit community</h4>
						</div>
						<form class="communityForm" enctype="multipart/form-data">
							<div class="modal-body modalBody">
								<!--  <div class="pubCreate" id="createBlock">Public</div>
								<div class="priCreate" id="createBlock">Private</div>
								-->
								<p>
									<span>社区名：</span> <input type="text" class="form-control"
										placeholder="" id="communityName" required autofocus />
								</p>
								<p>
									<span>社区介绍：</span> <input type="text" class="form-control"
										placeholder="" id="communityIntro" required autofocus />
								</p>
								<span>社区名片</span> <span class="btn btn-success fileinput-button">
									<i class="glyphicon glyphicon-plus"></i> <span>Add
										photos...</span> <input id="fileupload" type="file" name="files[]">
								</span>
								<!-- The container for the uploaded files -->
								<div id="files" class="files"></div>
								<br>
							</div>
							<br></br>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary" id="saveCommunity"
									value="upload">Save</button>
							</div>
						</form>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
			</div>
			<div class=communityCardInfo>
				<h1 class="cName">Joke of the Day</h1>
				<p class="cIntro">Funny quotes, jokes, memes, photos, and good
					humor!</p>
			</div>
			<div class="communityPic"></div>
			<div class="cardA">
				<span>All posts</span> <span class="activityHref">Activities</span>
			</div>
			<div class="memberList">
				<h1>Members</h1>
				<a>see all</a>

			</div>
		</div>
		<div class="pro_body pro_body_community">
			<div class="col-lg-9">
				<h4>Members</h4>
				<h5 class="containBord">Members in this community</h5>
				<div class="userContainer">
					<div class="recommendBord"></div>
					<div class="userCard">
						<img src="images/userRecomm.jpg" width="200px">
						<p class="recommendName">Clars</p>
						<p class="recommendLooking">(?), National Autonomous
							University of Mexico</p>
						<div class="recommendBtn">
							<button class="btn btn-default ">
								+<span class="glyphicon glyphicon-user">&nbsp;Follow</span>
							</button>
						</div>
					</div>
					<div class="userCard">
						<img src="images/userRecomm.jpg" width="200px">
						<p class="recommendName">Clars</p>
						<p class="recommendLooking">(?), National Autonomous
							University of Mexico</p>
						<div class="recommendBtn">
							<button class="btn btn-default ">
								+<span class="glyphicon glyphicon-user">&nbsp;Follow</span>
							</button>
						</div>
					</div>
					<div class="userCard">
						<img src="images/userRecomm.jpg" width="200px">
						<p class="recommendName">Clars</p>
						<p class="recommendLooking">(?), National Autonomous
							University of Mexico</p>
						<div class="recommendBtn">
							<button class="btn btn-default ">
								+<span class="glyphicon glyphicon-user" id="followBtn">&nbsp;Follow</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- CHATROOM -->
	<%@ include file="parts/chatRoom.jsp"%>

	<!-- Bootstrap core JavaScript
    ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/jquery.json.min.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="js/masonry.pkgd.min.js"></script>
	<script src="js/imagesloaded.pkgd.min.js"></script>
	<script src="js/jquery.ui.widget.js"></script>
	<!-- The Load Image plugin is included for the preview images and image resizing functionality -->
	<script src="js/load-image.min.js"></script>
	<!-- The Canvas to Blob plugin is included for image resizing functionality -->
	<script src="js/canvas-to-blob.min.js"></script>
	<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
	<script src="js/jquery.iframe-transport.js"></script>
	<!-- The basic File Upload plugin -->
	<script src="js/jquery.fileupload.js"></script>
	<!-- The File Upload processing plugin -->
	<script src="js/jquery.fileupload-process.js"></script>
	<!-- The File Upload image preview & resize plugin -->
	<script src="js/jquery.fileupload-image.js"></script>
	<!-- The File Upload video preview plugin -->
	<script src="js/jquery.fileupload-video.js"></script>
	<!-- The File Upload validation plugin -->
	<script src="js/jquery.fileupload-validate.js"></script>
	<script src="js/function.js"></script>
	<script src="js/EventAPI.js"></script>
	<script src="js/communityCircle.js"></script>
	<script src="js/EventHandle.js"></script>
	<%@ include file="parts/loginJavaScript.jsp"%>
	<script src="js/global-initialization.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			if (USERID != null && USERID != "") {
				login_initialization(USERID);
				clickEvent();
			} else {
				clickOffEvent();
			}
			Msnry('.userContainer', '.userCard', 200);

		});
	</script>
</body>
</html>