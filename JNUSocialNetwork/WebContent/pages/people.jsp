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
		<div class="col-lg-3">
			<div class="peopleType">
				<div class="searchBody">
					<span class="glyphicon glyphicon-search glyphicon-search-custom"
						style="cursor: pointer;"></span> <span class="searchUser">寻找小伙伴</span>
				</div>
				<span class="peopeleType peopeleTypeHover pinCommon">同兴趣伙伴</span>
				 <span class="peopeleType pCampus">同学院伙伴</span> 
					<span class="peopeleType pMajor">同专业伙伴</span> 
					<span class="peopeleType pSeason">同年级伙伴</span>
					 <span class="peopeleType pClass">同班同学</span>
			</div>
		</div>
		<div class="col-lg-9">
			<h4>推荐</h4>
			<h5 class="containBord">给你推荐可能认识的小伙伴</h5>
			<div class="userContainer">
				<div class="recommendBord"></div>
			</div>
		</div>
	</div>
	<!-- CHATROOM -->
	<%@ include file="parts/chatRoom.jsp"%>

	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/jquery.json.min.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="js/masonry.pkgd.min.js"></script>
	<script src="js/imagesloaded.pkgd.min.js"></script>
	<script src="js/EventAPI.js"></script>
	<script src="js/function.js"></script>
	<script src="js/community.js"></script>
	<script src="js/EventHandle.js"></script>
	<script src="js/people.js"></script>
	<script src="js/global-initialization.js"></script>
	<script type="text/javascript">
		$(document).ready(function() {
			if (USERID != null && USERID != "") {
				login_initialization(USERID);
				peopleClickEvent();
				clickEvent();
			} else {
				clickOffEvent();
			}
			pHot();
			Msnry('.userContainer', '.userCard', 170);

		});
	</script>
	<%@ include file="parts/loginJavaScript.jsp"%>
</body>
</html>
