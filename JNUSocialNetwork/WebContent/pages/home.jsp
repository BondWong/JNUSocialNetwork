<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>

<%@ include file="parts/head.jsp"%>

<body>
	<div class="header">
		<div class="header-contain">
			<div class="navbar-wrapper">
				<div class="container">
					<div class="navbar navbar-inverse navbar-static-top"
						role="navigation">
						<div class="container">
							<%@ include file="parts/navLeft.jsp"%>
							<div class="navbar-collapse collapse">
								<%@ include file="parts/communityDropDown.jsp"%>
								<%@ include file="parts/navRight.jsp"%>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- <div class="header">
		<div class="header-contain">
			<div class='logo-contain'>
				<a class='logo'></a>
			</div>
			<div class='header-right'>
				<ul>
					<li class='right-item'><a href="aboutUs.jsp">Campusite</a></li>
					<li class='right-item'><a href="login.jsp">登录</a></li>
					<li class='right-item'><a href="register.jsp">注册</a></li>
				</ul>
			</div>
			<ul class="head-mid">
				<li class='right-item'><a href="community.jsp">社区</a></li>
				<li class='right-item'><a href="circle.jsp">朋友圈</a></li>
			</ul>

		</div>
	</div> -->
	<div class="band">
		<div class="band-bg"></div>

		<div class="band-contain">
			<div class="band-text">
				<h1 class="band-title"></h1>
				<div class="btn-inner">
					<a class="btn btn-danger btnFind" href="register.jsp"></a>
				</div>
			</div>
		</div>
	</div>
	<div class="characters">
		<div class="characters-container">
			<span class="char-icon1"></span> <span class="char-icon2"></span> <span
				class="char-icon3"></span>
		</div>
	</div>
	<div class="intro1">
		<div class="intro1-wrap">
			<div class="intro1-img"></div>
			<div class="intro1-text"></div>
		</div>
	</div>
	<div class="intro2">
		<div class="intro2-wrap">
			<div class="intro2-text"></div>
			<div class="intro2-img"></div>
		</div>
	</div>
	<div class="intro3">
		<div class="intro3-wrap">
			<div class="intro3-img"></div>
			<div class="intro3-text"></div>
		</div>
	</div>
	<div class="intro4">
		<div class="intro4-wrap">
			<div class="intro4-text"></div>
			<div class="intro4-img"></div>
		</div>
	</div>
	<div class="process">
		<ul>
			<li class="i1"></li>
			<li class="i2"></li>
			<li class="i3"></li>
			<li class="i4"></li>
		</ul>
	</div>
	<div class="icommunity">
		<div class="icommunity-contain">
			<h1 class="icommunity-title"></h1>
			<ul class="icommunity-container">
				<li class="communityBoard"></li>
				<li class='communityShowItem'>
					<div class="community_container">
						<a>
							<div class="img_container">
								<input type="hidden" value="1409916593799"> <img
									width="265" height="265" style=""
									onload="javascript:auto_resize(267, 267, this)"
									src="images/default/default-community-card.png">
							</div>
						</a>
						<div class="content_info">
							<div class="conten_head">qwq</div>
							<div class="content_count">0 members</div>
						</div>
					</div>
				</li>
				<li class='communityShowItem'>
					<div class="community_container">
						<a>
							<div class="img_container">
								<input type="hidden" value="1409916593799"> <img
									width="265" height="265" style=""
									onload="javascript:auto_resize(267, 267, this)"
									src="images/default/default-community-card.png">
							</div>
						</a>
						<div class="content_info">
							<div class="conten_head">qwq</div>
							<div class="content_count">0 members</div>
						</div>
					</div>
				</li>
				<li class='communityShowItem'>
					<div class="community_container">
						<a>
							<div class="img_container">
								<input type="hidden" value="1409916593799"> <img
									width="265" height="265" style=""
									onload="javascript:auto_resize(267, 267, this)"
									src="images/default/default-community-card.png">
							</div>
						</a>
						<div class="content_info">
							<div class="conten_head">qwq</div>
							<div class="content_count">0 members</div>
						</div>
					</div>
				</li>
				<li class='communityShowItem'>
					<div class="community_container">
						<a>
							<div class="img_container">
								<input type="hidden" value="1409916593799"> <img
									width="265" height="265" style=""
									onload="javascript:auto_resize(267, 267, this)"
									src="images/default/default-community-card.png">
							</div>
						</a>
						<div class="content_info">
							<div class="conten_head">qwq</div>
							<div class="content_count">0 members</div>
						</div>
					</div>
				</li>
				<li class='communityShowItem'>
					<div class="community_container">
						<a>
							<div class="img_container">
								<input type="hidden" value="1409916593799"> <img
									width="265" height="265" style=""
									onload="javascript:auto_resize(267, 267, this)"
									src="images/default/default-community-card.png">
							</div>
						</a>
						<div class="content_info">
							<div class="conten_head">qwq</div>
							<div class="content_count">0 members</div>
						</div>
					</div>
				</li>
				<li class='communityShowItem'>
					<div class="community_container">
						<a>
							<div class="img_container">
								<input type="hidden" value="1409916593799"> <img
									width="265" height="265" style=""
									onload="javascript:auto_resize(267, 267, this)"
									src="images/default/default-community-card.png">
							</div>
						</a>
						<div class="content_info">
							<div class="conten_head">qwq</div>
							<div class="content_count">0 members</div>
						</div>
					</div>
				</li>
				<li class='communityShowItem'>
					<div class="community_container">
						<a>
							<div class="img_container">
								<input type="hidden" value="1409916593799"> <img
									width="265" height="265" style=""
									onload="javascript:auto_resize(267, 267, this)"
									src="images/default/default-community-card.png">
							</div>
						</a>
						<div class="content_info">
							<div class="conten_head">qwq</div>
							<div class="content_count">0 members</div>
						</div>
					</div>
				</li>
				<li class='communityShowItem'>
					<div class="community_container">
						<a>
							<div class="img_container">
								<input type="hidden" value="1409916593799"> <img
									width="265" height="265" style=""
									onload="javascript:auto_resize(267, 267, this)"
									src="images/default/default-community-card.png">
							</div>
						</a>
						<div class="content_info">
							<div class="conten_head">qwq</div>
							<div class="content_count">0 members</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="icommunity-footer">
			<a href="community.jsp">全部社区</a>
		</div>
	</div>

	<div class="joinCampusite">
		<h1 class="hide-text"></h1>
		<div class="btn-inner-join">
			<a class="btn btn-danger btnFind btnFind2" href="community.jsp"></a>
		</div>
	</div>

	<div class="footer-home">
		<div class="footer-wrap">
			<a class="footer-weibo"></a> <a class="footer-weixin"></a> <a
				class="footer-qqbo"></a> <a class="footer-qqzone"></a>
		</div>
		<div class="footer-link">
			<a>关于我们</a> <a>加入我们</a> <a>联系我们</a> <a>意见反馈</a> <a>友情链接</a>
		</div>
		<div class="footer-copyright">© 2014 campusite.com.cn
			粤ICP备13046642号</div>
	</div>
	<script src="js/jquery-1.10.2.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="js/EventAPI.js"></script>
	<script src="js/home.js"></script>
	<script type="text/javascript">
		$(".band-bg").animate({
			opacity : 1
		}, 500);
		$(".band-text").delay(500).animate({
			top : 330,
			opacity : 1
		}, 233);
		$(".header").delay(633).animate({
			top : 0,
			opacity : 1
		}, 267);
		fetchHotCommunity();
	</script>
</body>
</html>