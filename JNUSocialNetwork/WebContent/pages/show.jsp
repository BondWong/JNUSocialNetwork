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
				
				<%@ include file="parts/navRight.jsp"%>
			</div>
			<!-- /.nav-collapse -->
		</div>
		<!-- /.container -->
	</div>
	<!-- /.navbar -->
	<div class="container container_custom">
		<div class="row">
			<div class="col-lg-8">
				<div class="media_show">
					<div class="row">
						<div class="col-lg-7">
							<img src="images/2.jpg" />
						</div>
						<div class="col-lg-5">
							<div class="row">
								<div class="col-lg-2">
									<div class="user_img">
										<img src="images/user_img.jpg" />
									</div>
								</div>
								<div class="col-lg-10">
									<div class="user_name">
										<strong>Winson_Lau</strong>
									</div>
									<div class="user_info">Yesterday 21:23pm</div>
								</div>
							</div>
							<div class="post_title">
								<strong>Repinning a friendly reminder</strong>
							</div>
							<div class="act_time">时间：05月11日 周日 10:00-12:00</div>
							<div class="act_place">地点:暨南大学珠海校区 教503</div>
							<div class="act_fee">费用：免费</div>
							<div class="act_person">主办方:吉他协会</div>
							<div class="row">
								<div class="col-md-1">
									<div class="post_like" style="cursor: pointer">
										<a><input id="likeID" type='hidden' value="1" /><span
											class="glyphicon glyphicon-heart-empty"
											style="font-size: 20px">0</span></a>
									</div>
								</div>
								<div class="col-md-1">
									<div class="act_join" id="activityJoin" style="cursor: pointer">
										<a><span class="glyphicon glyphicon-ok"
											style="font-size: 20px"></span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="act_info">
						<div class="act_head">活动详情</div>
						<div class="act_detail">
							<p>一、参赛资格：</p>
							<p>除玩易团队的老师之外，凡是玩易论坛的注册会员均可参加此次大赛！</p>
							<p>二、大赛起止时间：</p>
							<p>2014年3月1日至2014年12月31日</p>
							<p>三、参赛作品形式：</p>
							<p>1、本次大赛仅限于视频作品，音频作品不得参赛。</p>
							<p>四、比赛规则：</p>
							<p>1、所有参赛的视频作品均应由参赛会员本人提供，不得由他人代为报名参赛；</p>
						</div>
					</div>
				</div>

			</div>
			<div class="col-lg-4">
				<div class="media_comm">
					<div class="row addCommentBtn">
						<div class="col-lg-8">

							<div class="form-group">
								<input type="text" placeholder="Add a comment"
									class="form-control" id="commentText5" />
							</div>
						</div>
						<div class="col-lg-4">

							<button type="button" class="btn btn-success" id="addComment"
								value="5">Submit</button>
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
							briefly a long time ago. But it turned out to be really annoying.
							Still it was a great idea.﻿</div>
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
	</div>
	</div>
	<%@ include file="parts/securityCode.jsp"%>
	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/jquery.json.min.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="js/function.js"></script>
	<script src="js/EventHandle.js"></script>
</body>
</html>
