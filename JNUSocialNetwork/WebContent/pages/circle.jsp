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

	<div class="container container_custom">
		<div class="alert alert-success alertCust">新消息!</div>
		<div class="pro_body">
			<div class="share post">
				<form enctype="multipart/form-data">
					<input class="form-control share_txt" type="text"
						placeholder="分享你所想、所见" data-toggle='modal'
						data-target='#addPostModal' maxLength="200" />
					<div class="shareBtnGroup">
						<div role="button" class="Btnshare btnMotion" data-toggle='modal'
							data-target='#addPostModal'>
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
								<h4 class="modal-title" id="myModalLabel">分享有趣事儿</h4>
							</div>
							<form class="postForm" enctype="multipart/form-data" onsubmit="return false;">
								<div class="modal-body modalBody">
									<textarea class="form-control share_txt2" id="share_txt2"
										type="text" style="resize: none;" maxLength="200" required></textarea>
									<br>
									<!-- The fileinput-button span is used to style the file input field as button -->
									<span class="btn btn-success fileinput-button"> <i
										class="glyphicon glyphicon-plus"></i> <span>添加照片</span> <!-- The file input field used as target for the file upload widget -->
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
										data-dismiss="modal">关闭</button>
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
	<script src="js/EventAPI.js"></script>
	<script src="js/function.js"></script>
	<script src="js/circle.js"></script>
	<script src="js/EventHandle.js"></script>
	<%@ include file="parts/loginJavaScript.jsp"%>
	<script type="text/javascript">
		$(document)
				.ready(
						function() {
							if (USERID != null && USERID != "") {
								login_initialization(USERID);
								window.fileDri = [];
								window.postIdContainer = [];
								clickEvent();
								if ($.parseJSON(sessionStorage.getItem("user")).followeeIDs != null) {
									fetchByFolloweeOrOwner();
								} else {
									fectchHeatPost();
								}
							} else {
								clickOffEvent();
								fectchHeatPost();
							}
							Msnry('.pro_body', '.post', 435);

						});
	</script>
	<%@ include file="parts/contentScroll.jsp"%>
	<script src="js/global-initialization.js"></script>
	<%@ include file="parts/baidu.jsp"%>
</body>
</html>
