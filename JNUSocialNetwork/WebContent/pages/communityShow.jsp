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
		<div class="alert alert-success alertCust alertCustC">New Post!</div>
		<div class="communityCard">

			<div class="dropdown">
				<div class="cardSetter glyphicon glyphicon-cog" type="button" id="dropdownMenu1"
					data-toggle="dropdown"></div>
				<ul class="dropdown-menu pull-right" role="menu" aria-labelledby="dropdownMenu1">
					<li role="presentation"><a role="menuitem" tabindex="-1"
						class="editCommunity" data-toggle='modal' data-target='#editCommunity'>Edit community</a></li>
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
										photos...</span> 
									<input id="fileupload" type="file" name="files[]">
								</span>
								<!-- The container for the uploaded files -->
								<div id="files" class="files"></div>
								<br>
							</div>
							<br></br>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary"
									id="saveCommunity" value="upload">Save</button>
							</div>
						</form>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
			</div>
			<div class=communityCardInfo>
				<h1 class="cName">Joke of the Day</h1>
				<p class="cIntro">Funny quotes, jokes, memes, photos, and good humor!</p>
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
			<div class="share post">
				<form enctype="multipart/form-data">
					<input class="form-control share_txt" type="text"
						placeholder="share anything you what to share" data-toggle='modal'
						data-target='#addPostModal' />
					<div class="shareBtnGroup">
						<div role="button" class="Btnshare btnMotion" data-toggle='modal'
							data-target='#addPostModal'>
							<div class="Iconshare"
								style="background-image: url(images/motion.png);"></div>
							<div>Motion</div>
						</div>
						<div role="button" class="Btnshare btnPhoto" data-toggle='modal'
							data-target='#addPostModal'>
							<div class="Iconshare"
								style="background-image: url(images/photo.png);"></div>
							<div>Photos</div>
						</div>
						<div role="button" class="Btnshare btnVideo" data-toggle='modal'
							data-target='#addPostModal'>
							<div class="Iconshare"
								style="background-image: url(images/video.png);"></div>
							<div>Videos</div>
						</div>
						<div role="button" class="Btnshare btnShare" data-toggle='modal'
							data-target='#addPostModal'>
							<div class="Iconshare"
								style="background-image: url(images/share.png);"></div>
							<div class="Fontshare">Share</div>
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
								<h4 class="modal-title" id="myModalLabel">Share Post</h4>
							</div>
							<form class="photoForm" enctype="multipart/form-data">
								<div class="modal-body modalBody">
									<input class="form-control share_txt2" id="share_txt2"
										type="text" placeholder="share anything you what to share" />
									<br>
									<!-- The fileinput-button span is used to style the file input field as button -->
									<span class="btn btn-success fileinput-button"> <i
										class="glyphicon glyphicon-plus"></i> <span>Add
											photos...</span> <!-- The file input field used as target for the file upload widget -->
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
										data-dismiss="modal">Close</button>
									<button type="button" class="btn btn-primary" id="btn_shareC"
										value="upload">Share</button>
								</div>
							</form>
						</div>
						<!-- /.modal-content -->
					</div>
					<!-- /.modal-dialog -->
				</div>
				<!-- /.modal -->
			</div>
			<div class="post">
				<div class="post_body">
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
					<div class="post_info">
						This is not a new article in PNAS, but it details results from a
						unique study and I have wanted to write about it for a while.
						NOTE: this is a
						<div class="post_more">
							<a>read more...</a>
						</div>
					</div>
					<div class="post_img">
						<a href="jovascript:void(0)"
							onclick="document.getElementById('light').style.display='block'">
							<img src="images/2.jpg" />
						</a>
					</div>
					<div class="row">
						<div class="col-md-1">
							<div class="post_like" style="cursor: pointer">
								<a><input id="likeID" type='hidden' value="1405950973690" /><span
									class="glyphicon glyphicon-heart-empty" style="font-size: 20px">0</span></a>
							</div>
						</div>
						<div class="col-md-1">
							<div class="post_collect" style="cursor: pointer">
								<a><input id="collectID" type='hidden' value="1405950973690" /><span
									class="glyphicon glyphicon-star-empty" style="font-size: 20px"></span></a>
							</div>
						</div>
						<div class="col-md-1">
							<div class="post_share" style="cursor: pointer">
								<a><span class="glyphicon glyphicon-share-alt"
									style="font-size: 20px"></span></a>
							</div>
						</div>
					</div>
					<div class="media_comm">
						<div class="row addCommentBtn">
							<div class="col-lg-8">

								<div class="form-group">
									<input type="text" placeholder="Add a comment"
										class="form-control" id="commentText12" />
								</div>
							</div>
							<div class="col-lg-4">

								<button type="button" class="btn btn-success" id="addComment"
									value="12">Submit</button>
							</div>
						</div>
						<div class="act_content">
							<div class="row">
								<div class="col-lg-1">
									<img src="images/user_img2.jpg" />
								</div>
								<div class="col-lg-11">
									<div class="ures_name">
										<strong>Winson_Lau</strong>
									</div>
									<div class="user_info">Yesterday 21:23pm</div>
								</div>
							</div>
							<div class="act_comment">There's an extension that whenever
								you choose something that has a shortcut it has a toast popup
								that tells you what the shortcut would have been. I used it
								briefly a long time ago. But it turned out to be really
								annoying. Still it was a great idea.﻿</div>
						</div>
						<div class="act_content">
							<div class="row">
								<div class="col-lg-1">
									<img src="images/user_img3.jpg" />
								</div>
								<div class="col-lg-11">
									<div class="ures_name">
										<strong>Thackoor Singh</strong>
									</div>
									<div class="user_info">Yesterday 21:23pm</div>
								</div>
							</div>
							<div class="act_comment">free!</div>
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
		<%@ include file="parts/securityCode.jsp"%>
	<script src="js/global-initialization.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			if (USERID != null && USERID != "") {
				login_initialization(USERID);
				window.fileDri = [];
				window.communityPostIdContainer = [];	
				clickEvent();
			} else {
				clickOffEvent();
			}
			var url = window.location.search;
			window.communityID = url.substr(url.indexOf("?")+1);
			window.community = FetchCommunityByID(communityID);
			Msnry('.pro_body', '.post', 435);
			fetchPostByCommunity();
			showCommunityInfo();
		});
	</script>
</body>
</html>
