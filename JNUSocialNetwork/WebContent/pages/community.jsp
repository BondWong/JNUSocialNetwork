<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>

<%@ include file="parts/head.jsp"%>

<body>
	<%@ include file="parts/ieReload.jsp"%>
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
	<div class="communitySideBar">
		<ul class="nav nav-pills nav-stacked" role="tablist">
			<li><a class='myCommunityBtn'
				href='community.jsp?nav=mycommunity'>我的社区</a></li>
			<li><a href='community.jsp?nav=official'>官方社区</a></li>
			<li><a href='community.jsp?nav=student'>社团组织</a></li>
			<li><a href='community.jsp?nav=folk'>个人社区</a></li>
			<li><a href='community.jsp?nav=discovery'>热门社区</a></li>
			<li><a class='searchCommunityBtn'>搜索社区</a></li>
			<li><a class="appCom" href="applyCommunity.jsp">申请社区</a></li>
			<li><a role="button" class="createCom" data-toggle='modal'
				data-target='#createCommunity' id="createCommunityBtn">创建社区</a></li>
		</ul>
	</div>
	<div class="container container_community">
		<c:choose>
			<c:when test="${param.nav eq 'official' }">
				<%@ include file="parts/communityOfficial.jsp"%>
			</c:when>
			<c:when test="${param.nav eq 'mycommunity' }">
				<%@ include file="parts/communityMy.jsp"%>
			</c:when>
			<c:when test="${param.nav eq 'student' }">
				<%@ include file="parts/communityStudent.jsp"%>
			</c:when>
			<c:when test="${param.nav eq 'folk' }">
				<%@ include file="parts/communityFolk.jsp"%>
			</c:when>
			<c:when test="${param.nav eq 'discovery' }">
				<%@ include file="parts/communityDiscovery.jsp"%>
			</c:when>
			<c:otherwise>
				<script>
					if (EventSource.isPolyfill != undefined) {
						window.location.href = 'ieSuccess.jsp'
								+ "?target=community.jsp?nav=mycommunity";
					} else {
						window.location.href = 'community.jsp?nav=mycommunity';
					}
				</script>
			</c:otherwise>
		</c:choose>
	</div>
	<div class="modal fade" id="createCommunity" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">创建社区</h4>
				</div>
				<form class="communityForm" enctype="multipart/form-data">
					<div class="modal-body modalBody">
						<!--  <div class="pubCreate" id="createBlock">Public</div>
								<div class="priCreate" id="createBlock">Private</div>
								-->
						<p>
							<span>社区名：</span> <input type="text" class="form-control"
								placeholder="" id="communityName"
								data-errormessage-value-missing="请输入社区名" required autofocus
								autocomplete="off" required maxLength="20" />
						</p>
						<p>
							<span>社区介绍：</span>
							<textarea class="form-control" placeholder="" id="communityIntro"
								required autofocus data-errormessage-value-missing="请输入社区介绍"
								maxLength="100" style="resize: none;"></textarea>
						</p>
						<p>
							<span>社区类型：</span> <select id="communityType">
								<option value="SCHOOLUNION">社团组织</option>
								<option value="FOLK">个人社区</option>
							</select>
						</p>
						<span>社区名片</span> <span class="btn btn-success fileinput-button">
							<i class="glyphicon glyphicon-plus"></i> <span>添加图片:</span> <input
							id="fileupload" type="file" name="files">
						</span> <span style="font-size: 12px; margin-top: 10px;">[请上传长宽比例1:1的图片，否则影响显示效果]</span>
						<!-- The container for the uploaded files -->
						<div id="files" class="files"></div>
						<br>
					</div>
					<br />
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="submit" class="btn btn-primary" id="communityCreate"
							value="upload">创建</button>
					</div>
				</form>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
	<!-- CHATROOM -->
	<%@ include file="parts/chatRoom.jsp"%>
	<!-- Bootstrap core JavaScript
    ================================================== -->
	<%@ include file="parts/communityJavaScript.jsp"%>
	<%@ include file="parts/contentScroll.jsp"%>
</body>
</html>
