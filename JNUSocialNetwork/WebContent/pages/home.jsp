<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>

<head>
<%@ include file="parts/head.jsp"%>
</head>

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
	<div id="Carousel" class="carousel slide"  data-ride="carousel" style="position: relative;min-height: 680px;overflow: hidden;margin-top: -81px;min-width: 1200px;background-color: #000">
		<ol class="carousel-indicators">
 			<li data-target="#Carousel" data-slide-to="0" class="active" id="carousel_slide_to_0"></li>
 			<li data-target="#Carousel" data-slide-to="1" id="carousel_slide_to_1"></li>
 			<li data-target="#Carousel" data-slide-to="2" id="carousel_slide_to_2"></li>
 			<li data-target="#Carousel" data-slide-to="3" id="carousel_slide_to_3"></li>
 			<li data-target="#Carousel" data-slide-to="4" id="carousel_slide_to_4"></li>
 		</ol>
		<div class="carousel-inner">
    		<div class="active item" id="carousel_slide_0">
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
			</div>
			<div class="item" id="carousel_slide_1">
				<img src="images/about-us/campus.jpg" id="test1" style="opacity:0"/>
				<div class="carousel-caption">Page2 test</div>
			</div>
    		<div class="item" id="carousel_slide_2">
    			<img src="images/about-us/campus.jpg" id="test2" style="opacity:0"/>
    			<div class="carousel-caption">Page3 test</div>
    		</div>
    		<div class="item" id="carousel_slide_3">
    			<img src="images/about-us/campus.jpg" id="test3" style="opacity:0"/>
    			<div class="carousel-caption">Page4 test</div>
    		</div>
    		<div class="item" id="carousel_slide_4">
    			<img src="images/about-us/campus.jpg" id="test4" style="opacity:0"/>
    			<div class="carousel-caption">Page5 test</div>
    		</div>
		</div>
		<a class="left carousel-control" href="#Carousel" data-slide="prev" id="carousel_slide_to_prev">
 			<span class="glyphicon glyphicon-chevron-left"></span></a>
 		<a class="right carousel-control" href="#Carousel" data-slide="next" id="carousel_slide_to_next">
 			<span class="glyphicon glyphicon-chevron-right"></span></a>
	</div>
	
	<div id="test"></div>
	
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
	<script type="text/javascript">
	
	//carousel_slide_to_x功能是翻到第x页的时候页面完成的动画，reset功能是将其它页重置
	function carousel_slide_to_0(){
		$(".band-bg").animate({
			opacity : 1
		}, 500);
		$(".band-text").delay(500).animate({
			top : 330,
			opacity : 1
		}, 233,function(){
			carousel_slide_to_1_reset();
			carousel_slide_to_2_reset();
			carousel_slide_to_3_reset();
			carousel_slide_to_4_reset();
		});
		
	};
	function carousel_slide_to_1(){
		$("#test1").animate({
			opacity : 1
		}, 500,function(){
			carousel_slide_to_0_reset();
			carousel_slide_to_2_reset();
			carousel_slide_to_3_reset();
			carousel_slide_to_4_reset();
		});
	};
	function carousel_slide_to_2(){
		$("#test2").animate({
			opacity : 1
		}, 500,function(){
			carousel_slide_to_1_reset();
			carousel_slide_to_0_reset();
			carousel_slide_to_3_reset();
			carousel_slide_to_4_reset();
		});
	};
	function carousel_slide_to_3(){
		$("#test3").animate({
			opacity : 1
		}, 500,function(){
			carousel_slide_to_1_reset();
			carousel_slide_to_2_reset();
			carousel_slide_to_0_reset();
			carousel_slide_to_4_reset();
		});
	};
	function carousel_slide_to_4(){
		$("#test4").animate({
			opacity : 1
		}, 500,function(){
			carousel_slide_to_1_reset();
			carousel_slide_to_2_reset();
			carousel_slide_to_3_reset();
			carousel_slide_to_0_reset();
		});
	};
	function carousel_slide_to_0_reset(){
		$(".band-bg").css({
			opacity:0
		});
		$(".band-text").css({
			top : 330,
			opacity : 0
		});
	};
	function carousel_slide_to_1_reset(){
		$("#test1").animate({
			opacity : 0
		});
	};
	function carousel_slide_to_2_reset(){
		$("#test2").animate({
			opacity : 0
		});
	};
	function carousel_slide_to_3_reset(){
		$("#test3").animate({
			opacity : 0
		});
	};
	function carousel_slide_to_4_reset(){
		$("#test4").animate({
			opacity : 0
		});
	};
	$('#Carousel').on('slide.bs.carousel', function (event) {
		switch(event.relatedTarget.id){
		case ('carousel_slide_0'):
			carousel_slide_to_0();
			break;
		case ('carousel_slide_1'):
			carousel_slide_to_1();
			break;
		case ('carousel_slide_2'):
			carousel_slide_to_2();
			break;
		case ('carousel_slide_3'):
			carousel_slide_to_3();
			break;
		case ('carousel_slide_4'):
			carousel_slide_to_4();
			break;
		};
	});
	$(document).ready(function(){
		$(".header").delay(633).animate({
			top : 0,
			opacity : 1
		}, 267);
		carousel_slide_to_0();
		fetchHotCommunity();
	});
	
	</script>
	<%@ include file="parts/baidu.jsp"%>
	
</body>
</html>