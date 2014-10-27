<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>

<head>
<link href="styles/guidance.css" rel="stylesheet">
<%@ include file="parts/head.jsp"%>
<style type="text/css">
/* flexslider */
.flexslider {
	margin-top: -81px;
	margin-left: -40px;
	min-height: 680px;
	overflow: hidden;
	min-width: 1200px;
	background: url(images/loading.gif) 50% no-repeat;
}

.slides {
	position: relative;
	z-index: 1;
}

.slides li {
	height: 680px
}

.flex-control-nav {
	position: absolute;
	top: 640px;
	z-index: 2;
	width: 100%;
	text-align: center;
}

.flex-control-nav li {
	display: inline-block;
	width: 14px;
	height: 14px;
	margin: 0 5px;
	*display: inline;
	zoom: 1;
}

.flex-control-nav a {
	display: inline-block;
	width: 14px;
	height: 14px;
	line-height: 40px;
	overflow: hidden;
	background: url(images/dot.png) right 0 no-repeat;
	cursor: pointer;
}

.flex-control-nav .flex-active {
	background-position: 0 0;
}

.flex-direction-nav {
	position: absolute;
	z-index: 3;
	width: 100%;
	top: 320px;
}

.flex-direction-nav li a {
	display: block;
	width: 50px;
	height: 50px;
	overflow: hidden;
	cursor: pointer;
	position: absolute;
}

.flex-direction-nav li a.flex-prev {
	left: 80px;
	background: url(images/prev.png) center center no-repeat;
	top: 45%;
}

.flex-direction-nav li a.flex-next {
	right: 40px;
	background: url(images/next.png) center center no-repeat;
	top: 45%;
}
</style>
</head>

<body data="home">
	<div class="mask" id="guide_mask" content-image-data="6">
		<div  class="guide_step" data="1">
			<img class="guide_image" src="./images/guidance/activity.png" data="1"/>
			<button type="button" class="guide_next_btn" data="1" style="left:321px;top:373px;width:80px;height:26px"></button>
			<button type="button" class="guide_exit_btn" data="1" style="left:500px;top:200px"></button>
		</div>
		<div  class="guide_step" data="2">
			<img class="guide_image" src="./images/guidance/social.png" data="2"/>
			<button type="button" class="guide_next_btn" data="2" style="left:375px;top:583px;width:115px;height:40px"></button>
			<button type="button" class="guide_exit_btn" data="2" style="left:590px;top:300px"></button>
		</div>
		<div  class="guide_step" data="3">
			<img class="guide_image" src="./images/guidance/friend.png" data="3"/>
			<button type="button" class="guide_next_btn" data="3" style="left:425px;top:585px;width:110px;height:35px"></button>
			<button type="button" class="guide_exit_btn" data="3" style="left:655px;top:370px"></button>
		</div>
		<div  class="guide_step" data="4">
			<img class="guide_image" src="./images/guidance/find.png" data="4"/>
			<button type="button" class="guide_next_btn" data="4" style="left:435px;top:600px;width:110px;height:35px"></button>
			<button type="button" class="guide_exit_btn" data="4" style="left:705px;top:405px"></button>
		</div>
		<div  class="guide_step" data="5">
			<img class="guide_image" src="./images/guidance/q&a.png" data="5"/>
			<button type="button" class="guide_next_btn" data="5" style="left:425px;top:645px;width:120px;height:40px"></button>
			<button type="button" class="guide_exit_btn" data="5" style="left:655px;top:361px"></button>
		</div>
		<!--
		<div  class="guide_step" data="5">
			<img class="guide_image" src="./images/guidance/personal.png" data="5"/>
			<button type="button" class="guide_next_btn" data="5" style="left:257px;top:635px;width:106px;height:35px"></button>
			<button type="button" class="guide_exit_btn" data="5" style="left:445px;top:370px"></button>
		</div>
		-->
		<div  class="guide_step" data="6">
			<img class="guide_image" src="./images/guidance/done.png" data="6"/>
			<button type="button" class="guide_next_btn" data="6" style="left:240px;top:300px;width:108px;height:38px"></button>
		</div>
	</div>
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
	<div class="flexslider">
		<ul class="slides">
			<li>
				<div class="band">
					<div class="band-bg"></div>
					<div class="band-contain">
						<div class="band-text">
							<h1 class="band-title"></h1>
							<div class="btn-inner">
								<a class="btn btn-danger btnFind" href="account.jsp?nav=regTab"></a>
							</div>
						</div>
					</div>
				</div>
			</li>
			<li><img src="images/about-us/campus.jpg" /></li>
		</ul>
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

			</ul>
		</div>
		<div class="icommunity-footer">
			<a href="community.jsp?nav=discovery">全部社区</a>
		</div>
	</div>

	<div class="joinCampusite">
		<h1 class="hide-text"></h1>
		<div class="btn-inner-join">
			<a class="btn btn-danger btnFind btnFind2" href="community.jsp"></a>
		</div>
	</div>

	<%@ include file="parts/footer.jsp"%>
	<script src="js/jquery-1.10.2.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="js/EventAPI.js"></script>
	<script src="js/EventHandle.js"></script>
	<script src="js/global-initialization.js"></script>
	<%@ include file="parts/loginJavaScript.jsp"%>
	<script type="text/javascript" src="js/home-initialization.js"></script>
	<script src="js/home.js"></script>
	<script type="text/javascript" src="js/jquery.flexslider-min.js"></script>
	<script src="js/guidance.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			$(".header").delay(633).animate({
				top : 0,
				opacity : 1
			}, 267);
			$(".band-bg").animate({
				opacity : 1
			}, 500);
			$(".band-text").delay(500).animate({
				top : 330,
				opacity : 1
			}, 233);
			$('.flexslider').flexslider({
				directionNav : true,
				pauseOnAction : true
			});
			fetchHotCommunity();
		});
	</script>
	<%@ include file="parts/baidu.jsp"%>

</body>
</html>