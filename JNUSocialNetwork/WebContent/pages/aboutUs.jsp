<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>CampuSite</title>
<link href="styles/bootstrap-3.0.3-dist/dist/css/bootstrap.css"
	rel="stylesheet">
<link href="styles/parallex-scrolling.css" rel="stylesheet"
	type="text/css" />
<link href="styles/custom.css" rel="stylesheet">
<script type="text/javascript"
	src="//upcdn.b0.upaiyun.com/libs/jquery/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="js/jquery.parallax-1.1.3.js"></script>
<script type="text/javascript" src="js/jquery.localscroll-1.2.7-min.js"></script>
<script type="text/javascript" src="js/jquery.scrollTo-1.4.2-min.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		$('#nav').localScroll(800);

		//.parallax(xPosition, speedFactor, outerHeight) options:
		//xPosition - Horizontal position of the element
		//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
		//out"/Users/bondwong/Downloads/firstBG.jpg"erHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
		$('#intro').parallax("50%", 0.1);
		$('#second').parallax("50%", 0.1);
		$('.bg').parallax("50%", 0.4);
		$('#third').parallax("50%", 0.3);

	})
</script>
</head>

<body>
	<ul id="nav">
		<li><a href="#intro" title="Next Section"><img
				src="images/about-us/dot.png" alt="Link" /></a></li>
		<li><a href="#second" title="Next Section"><img
				src="images/about-us/dot.png" alt="Link" /></a></li>
		<li><a href="#third" title="Next Section"><img
				src="images/about-us/dot.png" alt="Link" /></a></li>
		<li><a href="#fifth" title="Next Section"><img
				src="images/about-us/dot.png" alt="Link" /></a></li>
		<li><a href="home.jsp"><span class="glyphicon glyphicon-home"></span>
		</a></li>
	</ul>

	<div id="intro">
		<div class="story">
			<div class="float-left">
				<h2>CampuSite</h2>
				<p class="intro">介绍</p>
			</div>
		</div>
		<!--.story-->
	</div>
	<!--#intro-->

	<div id="second">
		<div class="story">
			<div class="bg"></div>
			<div class="float-right">
				<h2 class="palegreen">团队</h2>
				<div>
					<img src="images/default/default-user-avartar.png"
						class="round icon-like" />
					<p class="palegreen intro">
						<span>黃俊邦</span>
					</p>
					<p class="palegreen rank">
						<span>创始人</span> <span>|</span> <span>架构师</span> <span>|</span> <span>服务端工程师</span>
					</p>
				</div>
				<div>
					<img src="images/default/default-user-avartar.png"
						class="round icon-like" />
					<p class="palegreen intro">
						<span>刘威雄</span>
					</p>
					<p class="palegreen rank">
						<span>创始人</span> <span>|</span> <span>前端设计师</span> <span>|</span>
						<span>前端工程师</span>
					</p>
				</div>
				<div>
					<img src="images/default/default-user-avartar.png"
						class="round icon-like" />
					<p class="palegreen intro">
						<span>帅哥</span>
					</p>
					<p class="palegreen rank">
						<span>联合创始人</span>
					</p>
				</div>
				<div>
					<img src="images/default/default-user-avartar.png"
						class="round icon-like" />
					<p class="palegreen intro">
						<span>帅哥</span>
					<p class="palegreen rank">
						<span>联合创始人</span>
					</p>
				</div>
				<div>
					<img src="images/default/default-user-avartar.png"
						class="round icon-like" />
					<p class="palegreen intro">
						<span>帅哥</span>
					<p class="palegreen rank">
						<span>联合创始人</span>
					</p>
				</div>
			</div>
		</div>
		<!--.story-->

	</div>
	<!--#second-->

	<div id="third">
		<div class="story">
			<div class="float-left">
				<h2 class="lightgrey">我们在做什么？</h2>
				<p class="intro lightgrey">不告诉你</p>
			</div>
		</div>
		<!--.story-->
	</div>
	<!--#third-->

	<div id="fifth">
		<div class="story">
			<h2>加入我们</h2>

			<ul>
				<li class="">IOS开发</li>
				<li class="">Android开发</li>
				<li class="">Web前端开发</li>
				<li class="">服务端开发</li>
			</ul>
			<h2>
				发简历到<a href="mailto:campusite@outlook.com">官方邮箱</a>，并注明申请职位
			</h2>
		</div>
		<!--.story-->
	</div>
	<!--#fifth-->
	<%@ include file="parts/footer.jsp"%>
</body>
</html>
