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
	<div class="container container_custom">
		<div class="alert alert-success alertCust alertCustC">New Post!</div>
		<div class="communityCard">

			<div class="dropdown">
				<div class="cardSetter glyphicon glyphicon-cog" type="button"
					id="dropdownMenu1" data-toggle="dropdown"></div>
				<ul class="dropdown-menu pull-right" role="menu"
					aria-labelledby="dropdownMenu1">
					<li role="presentation"><a role="menuitem" tabindex="-1"
						class="editCommunity" data-toggle='modal'
						data-target='#editCommunity' id="editCommunityBtn">管理社区</a></li>
					<li role="presentation"><a role="menuitem" tabindex="-1"
						href="#" id="editMembersBtn">管理成员</a></li>
					<li role="presentation"><a id="leaveCommunityBtn"
						role="menuitem" tabindex="-1" href="#">离开社区</a></li>
					<li role="presentation"><a id="deleteCommunityBtn"
						role="menuitem" tabindex="-1" href="#">删除社区</a></li>
				</ul>
			</div>
			<div class="modal fade" id="editCommunity" tabindex="-1"
				role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">管理社区</h4>
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
			<div class="communityPic">
				<img onload="javascript:auto_resize(221, 267, this)" src="" />
			</div>
			<div class="cardA">
				<span>All posts</span>
				<span class="activityHref">Activities</span>
			</div>
			<div class="memberList">
				<h1>Members</h1>
				<span class="memberHref">see all</span>
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
	<script src="js/layer.min.js"></script>
	<script src="js/layer.ext.js"></script>
	<script src="js/function.js"></script>
	<script src="js/EventAPI.js"></script>
	<script src="js/communityCircle.js"></script>
	<script src="js/EventHandle.js"></script>
	<%@ include file="parts/loginJavaScript.jsp"%>
	<script src="js/global-initialization.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			var url = window.location.search;
			window.communityID = url.substr(url.indexOf("?") + 1);
			window.community = FetchCommunityByID(communityID);
			Msnry('.pro_body', '.post', 435);
			fetchPostByCommunity();
			showCommunityInfo();
			if (USERID != null && USERID != "") {
				login_initialization(USERID);
				window.fileDri = [];
				window.communityPostIdContainer = [];
				clickEvent();
				if ($.inArray(USERID, community.memberIDs) != -1) {
					$('#leaveCommunityBtn').css("display", "inline");
				}
			} else {
				clickOffEvent();
			}
		});
	</script>
	<%@ include file="parts/contentScroll.jsp"%>
</body>
</html>