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
		<div class="alert alert-success alertCust alertCustC">New Post!</div>
		<div class="communityCard">
			<div class="cardSetter glyphicon glyphicon-cog"></div>
			<div class=communityCardInfo>
				<h1>Joke of the Day</h1>
				<p>Funny quotes, jokes, memes, photos, and good humor!</p>
			</div>
			<div class="communityPic"></div>
			<div class="cardA">
				<span>All posts</span>
				<span>Activities</span>
			</div>
			<div class="memberList">
				<h1>Members</h1><a>see all</a>
				
			</div>
		</div>
		<div class="pro_body pro_body_community">
			<div class="activityHeader">
				<span>Community Activities</span>
				<button role="button" class="btn btn-success" data-toggle='modal' data-target='#activityCommunity'>Create Activity</button>
			</div>
			<div class="modal fade" id="activityCommunity" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title" id="myModalLabel">Create Activity</h4>
							</div>
							<form class="activityForm" enctype="multipart/form-data">
							<div class="modal-body modalBody">
								<p>
									<span>活动名：</span>
									<input type="text" class="form-control"
										placeholder="" id="activityName" required
										autofocus />
								</p>
								<p>
									<span>活动时间：</span>
									<input type="text" class="form-control"
										placeholder="" id="activityTime" required
										autofocus />
								</p>
								<p>
									<span>活动地点：</span>
									<input type="text" class="form-control"
										placeholder="" id="activityAddr" required
										autofocus />
								</p>
								<p>
									<span>活动细节：</span>
									<input type="text" class="form-control"
										placeholder="" id="activityMore" required
										autofocus />
								</p>
								<span>活动图片</span>
								<span class="btn btn-success fileinput-button">
									        <i class="glyphicon glyphicon-plus"></i>
									        <span>Add photos...</span>
									        <!-- The file input field used as target for the file upload widget -->
									        <input id="fileupload" type="file" name="files[]">
								</span>
								 <!-- The container for the uploaded files -->
									    <div id="files" class="files">
									    	
									    </div>
								 <br>
							</div>
							<br></br>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary" id="activityCreate" value="upload">Create</button>
							</div>
							</form>
						</div>
						<!-- /.modal-content -->
					</div>
					<!-- /.modal-dialog -->
				</div>
			<div class="activityBody">
				<div class="activityBord"></div>
				<div class="activity">
					<div class="activityBg"><img src="images/activityBgS.jpg" /></div>
					<div class="user_img activityAvatar">
						<img class="userImg" src="images/user_img.jpg" />
					</div>
					<div class="activityName"><span>Activity</span></div>
					<div class="activityTime">
						<span class="glyphicon glyphicon-time">&nbsp;Fri,Aug 1,4:00 AM - 5:00 AM</span>
					</div>
					<div class="activityaddre">
						<span class="glyphicon glyphicon-flag">&nbsp;Hangouts On Air</span>
					</div>
					<div class="activityD">
						<span>asd</span>
					</div>
					<div class="activityAsk">
					<span>Are you going to join in?</span>
						<select class="btn btn-default">
							<option>Maybe</option>
							<option class="activityJoin">Yes</option>
							<option class="leaveactivityJoin">No</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	</div>
	<%@ include file="parts/securityCode.jsp"%>
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
	<script src="js/EventHandle.js"></script>
	<script src="js/activity.js"></script>
	<script type="text/javascript">
		Msnry('.activityBody', '.activity', 435);
		fetchPostByCommunity();
	</script>
</body>
</html>
