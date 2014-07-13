<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

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
		<div class="alert alert-success alertCust">New Post!</div>
		<div class="pro_body">
			<div class="share post">
				<form enctype="multipart/form-data">
					<input class="form-control" id="share_txt" type="text"
						placeholder="share anything you what to share" />
					<div class="share_button_group btn-group">

						<button type="button" class="btn btn-default" id="btn_motion">Motion</button>
						<button type="button" class="btn btn-default" id="btn_pic"
							data-toggle="popover" data-placement="bottom"
							data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">Pictures</button>
						<button type="button" class="btn btn-default" id="btn_video">Video</button>
						<button type="button" class="btn btn-success" id="btn_share"
							value="upload">Share</button>
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
						<img src="images/12.png" />
					</div>
					<div class="row">
						<div class="col-md-1">
							<div class="post_like" style="cursor: pointer">
								<a><input id="likeID" type='hidden' value="1" /><span
									class="glyphicon glyphicon-heart-empty" style="font-size: 20px">0</span></a>
							</div>
						</div>
						<div class="col-md-1">
							<div class="post_collect" style="cursor: pointer">
								<a><input id="collectID" type='hidden' value="1" /><span
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
						<img src="images/13.png" />
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
				<img src="images/3.jpg" />
			</div>
			<div class="post">
				<img src="images/2.jpg" />
			</div>
		</div>
	</div>
	<%@ include file="parts/securityCode.jsp"%>
	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/jquery.json.min.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="js/masonry.pkgd.min.js"></script>
	<script src="js/imagesloaded.pkgd.min.js"></script>
	<script src="js/function.js"></script>
	<script src="js/EventHandle.js"></script>
	<script type="text/javascript">
		Msnry('.pro_body', '.post', 435);
		fetchPostByFollowee();
	</script>
</body>
</html>
