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
							<h4 class="modal-title" id="myModalLabel">编辑社区</h4>
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
									<i class="glyphicon glyphicon-plus"></i> <span>添加图片</span> <input
									id="fileuploadEdit" type="file" name="files[]">
								</span>
								<!-- The container for the uploaded files -->
								<div id="files" class="files"></div>
								<br>
							</div>
							<br></br>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">取消</button>
								<button type="submit" class="btn btn-primary" id="saveCommunity"
									value="upload">保存</button>
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
				<img onload="javascript:auto_resize(220, 220, this)" src=""
					style="display: none" />
			</div>
			<div class="cardA">
				 <span class="activityHref">社区活动</span> <span class="showHref">社区帖子</span> <span class="ownerHref">社区介绍</span>
			</div>
			<div class="memberList">
				<h1>社区成员</h1>
				<span class="memberHref">所有成员</span>
			</div>
		</div>
		<div class="member_body pro_body_community">

			<h4>社区成员</h4>
			<h5 class="containBord"></h5>
			<div class="membersContainer">
				<div class="membersBord"></div>


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
	<script src="js/EventAPI.js"></script>
	<script src="js/function.js"></script>
	<script src="js/communityMember.js"></script>
	<script src="js/EventHandle.js"></script>
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
							Msnry('.membersContainer', '.member', 215);
							fetchMembers();
							showCommunityInfo();
							if (USERID != null && USERID != "") {
								login_initialization(USERID);
								clickEvent();
								var memberIDs = [];
								$.each(community.members, function(n, member) {
									memberIDs.push(member.ID);
								});
								if ($.inArray(USERID, memberIDs) != -1
										&& USERID != community.attributes.userID) {
									$('#leaveCommunityBtn').css("display",
											"inline");
								}
								var communities = FetchCommunityByOwner(USERID,
										"0", "5");
								var communityIDs = [];
								$.each(communities, function(n, c) {
									communityIDs.push(c.ID);
								});
								if ($.parseJSON(sessionStorage.getItem("user")).userType == 'COMMUNITYOWNER'
										|| $.inArray(USERID, memberIDs) != -1) {
									$('.cardSetter').css("display", "inline");
								}
								if (communityIDs == communityID
										&& $.parseJSON(sessionStorage
												.getItem("user")).userType == 'COMMUNITYOWNER') {
									$('.memberRemoveBtn').css("display",
											"inline");
								}
								if ($.parseJSON(sessionStorage.getItem("user")).userType == 'COMMUNITYOWNER'
										&& USERID == community.attributes.userID) {
									$('#editCommunityBtn').css("display",
											"inline");
									$('#editMembersBtn').css("display",
											"inline");
									$('#deleteCommunityBtn').css("display",
											"inline");
									$('.editActivity').css("display", "inline");
								}
							} else {
								clickOffEvent();
							}

						});
	</script>
	<%@ include file="parts/baidu.jsp"%>
</body>
</html>
