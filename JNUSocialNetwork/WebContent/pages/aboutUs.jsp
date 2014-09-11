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
<link href="styles/about-us.css" rel="stylesheet" type="text/css" />
<link href="styles/custom.css" rel="stylesheet">
<link href="styles/footer.css" rel="stylesheet">
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

	});
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
		<li><a href="home.jsp" class="white"><span
				class="glyphicon glyphicon-home"></span> </a></li>
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
				<h2 class="palegreen">Team</h2>
				<div>
					<img src="images/founder-avatar/hjb.JPG" class="round icon-like" />
					<p class="palegreen intro">
						<span>黃俊邦</span>
					</p>
					<p class="palegreen rank">
						<span>创始人</span> <span>|</span> <span>架构师</span> <span>|</span> <span>服务端工程师</span>
					</p>
				</div>
				<div>
					<img src="images/founder-avatar/lwx.jpg" class="round icon-like" />
					<p class="palegreen intro">
						<span>刘威雄</span>
					</p>
					<p class="palegreen rank">
						<span>创始人</span> <span>|</span> <span>前端设计师</span> <span>|</span>
						<span>前端工程师</span>
					</p>
				</div>
				<div>
					<img src="images/founder-avatar/hzy.JPG" class="round icon-like" />
					<p class="palegreen intro">
						<span>黄子阳</span>
					</p>
					<p class="palegreen rank">
						<span>创始人</span> <span>|</span> <span>公关</span> <span>|</span> <span>推广</span>
					</p>
				</div>
				<div>
					<img src="images/founder-avatar/hhc.jpeg" class="round icon-like" />
					<p class="palegreen intro">
						<span>胡海城</span>
					<p class="palegreen rank">
						<span>创始人</span> <span>|</span> <span>公关</span> <span>|</span> <span>推广</span>
					</p>
				</div>
				<div>
					<img src="images/founder-avatar/del.JPG" class="round icon-like" />
					<p class="palegreen intro">
						<span>邓恩临</span>
					<p class="palegreen rank">
						<span>创始人</span> <span>|</span> <span>公关</span> <span>|</span> <span>推广</span>
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
				<h2 class="lightgrey">Who We Are</h2>
				<p class="intro lightgrey">我们来自暨南大学</p>
				<p class="intro lightgrey">我们追求优质应用</p>
				<p class="intro lightgrey">我们致力于服务大学生</p>
			</div>
		</div>
		<!--.story-->
	</div>
	<!--#third-->

	<div id="fifth">
		<div class="story">
			<h2>Join Us</h2>
			<h3>
				发简历到<a href="mailto:campusite@outlook.com" style="">官方邮箱</a>，并注明申请职位
			</h3>

			<ul class="list-group short">
				<li class="list-group-item list-group-heading blue">技术类</li>
				<li class="list-group-item">IOS开发</li>
				<li class="list-group-item">Android开发</li>
				<li class="list-group-item">Web前端开发</li>
				<li class="list-group-item">Java服务端开发</li>
				<li class="list-group-item">平面设计</li>
			</ul>

			<ul class="list-group short">
				<li class="list-group-item list-group-heading green">市场类</li>
			</ul>

			<ul class="list-group short">
				<li class="list-group-item list-group-heading red">文书类</li>
				<li class="list-group-item">秘书</li>
			</ul>

		</div>
		<!--.story-->
	</div>
	<!--#fifth-->
	<%@ include file="parts/footer.jsp"%>
</body>
</html>
