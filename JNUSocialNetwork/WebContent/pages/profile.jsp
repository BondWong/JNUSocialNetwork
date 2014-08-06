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
					<div class="share post">
						<form enctype="multipart/form-data">
							<input class="form-control" id="share_txt" type="text"
								placeholder="share anything you what to share" />
							<div class="share_button_group btn-group">

								<button type="button" class="btn btn-default" id="btn_motion">表情</button>
								<button type="button" class="btn btn-default" id="btn_pic"
									data-toggle="popover" data-placement="bottom"
									data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">图片</button>
								<button type="button" class="btn btn-default" id="btn_video">视频</button>
								<button type="button" class="btn btn-success" value="upload">分享</button>
								<input type="file" name="file" />

							</div>
						</form>
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
	<%@ include file="parts/securityCode.jsp"%>
	<script src="js/initialization.js"></script>
</body>
</html>
