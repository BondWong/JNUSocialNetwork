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
								<button type="button" class="btn btn-success" 
									value="upload">分享</button>
								<input type="file" name="file" />

							</div>
						</form>
					</div>
					<div class="post">
						<div class="post_body">
							<div class="row">
								<div class="col-md-2">
									<div class="user_img">
										<img src="images/user_img.jpg" />
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
								<img src="images/9.jpg" />
							</div>
							<div class="row">
								<div class="col-md-1">
									<div class="like">
										<a><span class="glyphicon glyphicon-heart-empty"
											style="font-size: 20px"></span></a>
									</div>
								</div>
								<div class="col-md-1">
									<div class="post_share">
										<a><span class="glyphicon glyphicon-share-alt"
											style="font-size: 20px"></span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="post">
						<div class="post_body">
							<div class="row">
								<div class="col-md-2">
									<div class="user_img">
										<img src="images/user_img.jpg" />
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
								<img src="images/12.png" />
							</div>
							<div class="row">
								<div class="col-md-1">
									<div class="like">
										<a><span class="glyphicon glyphicon-heart-empty"
											style="font-size: 20px"></span></a>
									</div>
								</div>
								<div class="col-md-1">
									<div class="post_share">
										<a><span class="glyphicon glyphicon-share-alt"
											style="font-size: 20px"></span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="post">
						<div class="post_body">
							<div class="row">
								<div class="col-md-2">
									<div class="user_img">
										<img src="images/user_img.jpg" />
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
								<img src="images/2.jpg" />
							</div>
							<div class="row">
								<div class="col-md-1">
									<div class="like">
										<a><span class="glyphicon glyphicon-heart-empty"
											style="font-size: 20px"></span></a>
									</div>
								</div>
								<div class="col-md-1">
									<div class="post_share">
										<a><span class="glyphicon glyphicon-share-alt"
											style="font-size: 20px"></span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="post">
						<div class="post_body">
							<div class="row">
								<div class="col-md-2">
									<div class="user_img">
										<img src="images/user_img.jpg" />
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
								<img src="images/4.jpg" />
							</div>
							<div class="row">
								<div class="col-md-1">
									<div class="like">
										<a><span class="glyphicon glyphicon-heart-empty"
											style="font-size: 20px"></span></a>
									</div>
								</div>
								<div class="col-md-1">
									<div class="post_share">
										<a><span class="glyphicon glyphicon-share-alt"
											style="font-size: 20px"></span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
	</div>
	</c:otherwise>
	</c:choose>
	<%@ include file="parts/securityCode.jsp"%>
	<%@ include file="parts/profileJavaScript.jsp"%>
	<script src="js/about.js"></script>
	<script>
		getUserInfo();
	</script>
</body>
</html>
