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
						id="editMembersBtn">管理成员</a></li>
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
							<h4 class="modal-title" id="myModalLabel">Edit community</h4>
						</div>
						<form class="editCommunityForm" enctype="multipart/form-data"
							onsubmit="return false;">
							<div class="modal-body modalBody">
								<!--  <div class="pubCreate" id="createBlock">Public</div>
								<div class="priCreate" id="createBlock">Private</div>
								-->
								<p>
									<span>社区名：</span> <input type="text" class="form-control"
										placeholder="" id="communityName" required autofocus
										maxLength="20" />
								</p>
								<p>
									<span>社区介绍：</span>
									<textarea class="form-control" placeholder=""
										id="communityIntro" required autofocus maxLength="100"
										style="resize: none;"></textarea>
								</p>
								<span>社区名片</span> <span class="btn btn-success fileinput-button">
									<i class="glyphicon glyphicon-plus"></i> <span>Add
										photos...</span> <input id="fileuploadEdit" type="file"
									name="files[]">
								</span>
								<!-- The container for the uploaded files -->
								<div id="files" class="files"></div>
								<br>
							</div>
							<br></br>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
								<button type="submit" class="btn btn-primary" id="saveCommunity"
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
				<img onload="javascript:auto_resize(221, 267, this)" src=""
					style="display: none" />
			</div>
			<div class="cardA">
				<span class="communityHref">All posts</span> <span>Activities</span>
			</div>
			<div class="memberList">
				<h1>Members</h1>
				<span class="memberHref">see all</span>
			</div>
		</div>
		<div class="pro_body pro_body_community">
			<div class="activityHeader">
				<span>Community Activities</span>
				<button role="button" id="createActivityBtn" class="btn btn-primary"
					data-toggle='modal' data-target='#activityCommunity'>Create
					Activity</button>
			</div>
			<div
				style="background-color: #247EEC; color: white; text-align: center; padding-top: 10px; padding-bottom: 10px; margin-top: 15px;">
				<h1>Nothing here?Create an event for this community</h1>
				<p>Schedule your next community get-together or hangout</p>
			</div>
			<div class="modal fade" id="activityCommunity" tabindex="-1"
				role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">Create Activity</h4>
						</div>
						<form class="activityForm" enctype="multipart/form-data"
							onsubmit="return false;">
							<div class="modal-body modalBody">
								<div class="activityItem">
									<span>活动名：</span> <input type="text"
										class="form-control activityInput" placeholder=""
										id="activityName" required autofocus maxLength="30" />
								</div>
								<div class="activityItem">
									<span>活动时间：</span>
									<div class="input-group date form_datetime1 col-lg-10"
										data-link-field="dtp_input1">
										<input type="text" class="form-control activityInput"
											id="activityTime" readonly required /> <span
											class="input-group-addon"><i
											class="glyphicon glyphicon-th"></i></span>
									</div>
								</div>
								<div class="activityItem">
									<span>提醒时间：</span>
									<div class="input-group date form_datetime2 col-lg-10"
										data-link-field="dtp_input1">
										<input type="text" class="form-control activityInput"
											id="activityRemind" readonly required /> <span
											class="input-group-addon"><i
											class="glyphicon glyphicon-th"></i></span>
									</div>
								</div>
								<div class="activityItem">
									<div id="fail_popover" class="alert alert-danger"
									style="width: 97%;text-align:center;padding:0px;display:none;">请输入时间！</div>
								</div>
								<div class="activityItem">
									<span>活动地点：</span>
									<textarea class="form-control activityInput" placeholder=""
										id="activityAddr" required autofocus maxLength="100"
										style="resize: none;"></textarea>
								</div>
								<div class="activityItem">
									<span>活动细节：</span>
									<textarea class="form-control activityInput" placeholder=""
										id="activityMore" required autofocus maxLength="200"
										style="resize: none;"></textarea>
								</div>
								<div class="activityItem">
									<span>活动图片</span> <span
										class="btn btn-success fileinput-button" style="width: auto;">
										<i class="glyphicon glyphicon-plus"></i> <span>Add
											photos...</span> <!-- The file input field used as target for the file upload widget -->
										<input id="fileuploadA" type="file" name="files[]">
									</span>
								</div>
								<!-- The container for the uploaded files -->


							</div>
							<br></br>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
								<button type="type" class="btn btn-primary" id="activityCreate"
									value="upload">Create</button>
							</div>
						</form>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
			</div>
			<div class="activityBody">
				<div class="activityBord"></div>
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
	<script src="js/bootstrap-datetimepicker.min.js"></script>
	<script src="js/function.js"></script>
	<script src="js/EventAPI.js"></script>
	<script src="js/EventHandle.js"></script>
	<script src="js/activityCommunity.js"></script>
	<%@ include file="parts/loginJavaScript.jsp"%>
	<script src="js/global-initialization.js"></script>
	<script type="text/javascript">
		$(document)
				.ready(
						function() {
							var url = window.location.search;
							window.communityID = url
									.substr(url.indexOf("?") + 1);
							window.community = FetchCommunityByID(communityID);
							Msnry('.activityBody', '.activity', 435);
							fetchActivitiesByCommunity();
							showCommunityInfo();
							if (USERID != null && USERID != "") {
								login_initialization(USERID);
								activityClickEvent();
								clickEvent();
								var memberIDs = [];
								$.each(community.members, function(n, member) {
									memberIDs.push(member.ID);
								});
								if ($.parseJSON(sessionStorage.getItem("user")).userType == 'COMMUNITYOWNER'
										|| $.inArray(USERID, memberIDs) != -1) {
									$('.cardSetter').css("display", "inline");
								}
								if ($.parseJSON(sessionStorage.getItem("user")).userType != 'COMMUNITYOWNER'
										&& $.inArray(USERID, memberIDs) != -1) {
									$('#leaveCommunityBtn').css("display",
											"inline");
								}
							} else {
								clickOffEvent();
							}
						});
	</script>
	<%@ include file="parts/contentScroll.jsp"%>
</body>
</html>
