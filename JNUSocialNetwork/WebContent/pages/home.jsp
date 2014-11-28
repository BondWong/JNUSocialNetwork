<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>

<head>
<link href="styles/guidance.css" rel="stylesheet">
<%@ include file="parts/head.jsp"%>
</head>

<body data="home">

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
	<div class="info-Bg">
		<div class="info-contener">
			<div class="move-ad">
				<div class="flexslider">
					<ul class="slides">
						<!-- Slide images' width:height must be 2:1 !important -->
						<li><a href="#"><img
								src="./images/about-us/activity.jpg" /></a></li>
						<li><a href="#"><img src="./images/about-us/community.jpg" /></a></li>
		
					</ul>
				</div>
			</div>
			<div class="texts-ad">
				<div class="texts-ad-title">推荐咨询</div><hr style="width:90%"/>
				<div class="texts-ad-body"></div>
				<div class="texts-ad-foot">
                    <ul id="texts-ad-pagination" class="pagination-custom-1-sm"></ul>
                </div>
                
			</div>
		</div>
		
	</div>
	<div class="icommunity-123">
		<div class="icommunity-contain">
			<div class="icommunity-title">
				<span>寂寞排行榜</span>
			</div>
			<div class="icommunity-container">
				<div class="userBoard">
					<div class="loneUserPlaceHolder" place="1" style="float:left;margin-left: 330px"></div>
					<div class="loneUserPlaceHolder" place="2" style="float:left"></div>
					<div class="loneUserPlaceHolder" place="3" style="float:left"></div>
					<div class="loneUserPlaceHolder" place="4" style="float:left"></div>
					<div class="loneUserPlaceHolder" place="5" style="float:left"></div>
					<div class="loneUserPlaceHolder" place="6" style="float:left;margin-left: 330px"></div>
					<div class="loneUserPlaceHolder" place="7" style="float:left"></div>
					<div class="loneUserPlaceHolder" place="8" style="float:left"></div>
					<div class="loneUserPlaceHolder" place="9" style="float:left"></div>
					<div class="loneUserPlaceHolder" place="10" style="float:left"></div>
				</div>
			</div>
		</div>
		<div class="icommunity-footer">
			<a href="community.jsp?nav=discovery">寻找朋友</a>
		</div>
	</div>
	<div class="icommunity">
		<div class="icommunity-contain">
			<div class="icommunity-title">
				<span>热门社区</span><a href="#">更多</a>
			</div>
			<ul class="icommunity-container">
				<li class="communityBoard"></li>

			</ul>
		</div>
		<div class="icommunity-footer">
			<a href="community.jsp?nav=discovery">全部社区</a>
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
	<div class="characters">
		<span class="icommunity-ty">CampuSite介绍</span>
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
			$('.flexslider').flexslider({
				animation : "fade",
				slideshowSpeed: 5000,
				animationDuration: 800,
				controlNav : true,
				directionNav : true,
				animationLoop : true,
				slideshow : true
			});
			fetchLonelySouls();
			fetchHotCommunity();
		});
	</script>
	<%@ include file="parts/baidu.jsp"%>

</body>
</html>