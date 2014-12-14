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
	<div class="mask" id="guide_mask" content-image-data="5">
		<div class="guide_step" data="1">
			<img class="guide_image" src="./images/guidance/activity.png"
				data="1" />
			<button type="button" class="guide_next_btn" data="1"
				style="left: 338px; top: 470px; width: 100px; height: 35px"></button>
			<button type="button" class="guide_exit_btn" data="1"
				style="left: 575px; top: 235px;"></button>
		</div>
		<div class="guide_step" data="2">
			<img class="guide_image" src="./images/guidance/social.png" data="2" />
			<button type="button" class="guide_next_btn" data="2"
				style="left: 375px; top: 583px; width: 115px; height: 40px"></button>
			<button type="button" class="guide_exit_btn" data="2"
				style="left: 590px; top: 300px"></button>
		</div>
		<div class="guide_step" data="3">
			<img class="guide_image" src="./images/guidance/friend.png" data="3" />
			<button type="button" class="guide_next_btn" data="3"
				style="left: 425px; top: 585px; width: 110px; height: 35px"></button>
			<button type="button" class="guide_exit_btn" data="3"
				style="left: 655px; top: 370px"></button>
		</div>
		<div class="guide_step" data="4">
			<img class="guide_image" src="./images/guidance/find.png" data="4" />
			<button type="button" class="guide_next_btn" data="4"
				style="left: 435px; top: 600px; width: 110px; height: 35px"></button>
			<button type="button" class="guide_exit_btn" data="4"
				style="left: 705px; top: 405px"></button>
		</div>
		<div class="guide_step" data="5">
			<img class="guide_image" src="./images/guidance/finish2.png" data="5" />
			<button type="button" class="guide_next_btn" data="5"
				style="left: 295px; top: 600px; width: 108px; height: 30px;"></button>
		</div>
	</div>
	
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