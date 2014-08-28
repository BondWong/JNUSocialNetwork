<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>

<%@ include file="parts/head.jsp"%>

<body>
	<div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
		<div class="container">
			<%@ include file="parts/navLeft.jsp"%>
			<div class="collapse navbar-collapse">
				<%@ include file="parts/communityDropDown.jsp"%>

				<%@ include file="parts/navRightProfile.jsp"%>
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
								placeholder="share anything you what to share"
								data-toggle='modal' data-target='#addPostModal' />
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
										<h4 class="modal-title" id="myModalLabel">Share Post</h4>
									</div>
									<form class="photoForm" enctype="multipart/form-data">
										<div class="modal-body modalBody">
											<textarea class="form-control share_txt2" id="share_txt2"
												type="text" style="resize: none;"></textarea>
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
											<button type="button" class="btn btn-primary" id="btn_share"
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
	</c:otherwise>
	</c:choose>
	<!-- CHATROOM -->
	<%@ include file="parts/chatRoom.jsp"%>
	<!-- Bootstrap core JavaScript
    ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<%@ include file="parts/profileJavaScript.jsp"%>
	<%@ include file="parts/loginJavaScript.jsp"%>
</body>
</html>
