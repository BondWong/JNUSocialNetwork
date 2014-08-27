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
						style="cursor: pointer;"></span> <span class="searchUser">Search
						for anyone</span>
				</div>
				<span class="peopeleType peopeleTypeHover pinCommon">People
					in common</span> <span class="peopeleType pCampus">People in the
					same campus</span> <span class="peopeleType pMajor">People in the
					same major</span> <span class="peopeleType pSeason">People in the
					same season</span> <span class="peopeleType pClass">Find classmates</span>
			</div>
		</div>
		<div class="col-lg-9">
			<h4>Activity</h4>
			<h5 class="containBord">your activity</h5>
			<div class="activityBody">
				<div class="activityBord"></div>
				<div class="activity">
					<div class="activityHref">
						<div class="activityBg">
							<img src="images/activityBgS.jpg" />
						</div>
						<div class="user_img activityAvatar">
							<img class="userImg" src="images/user_img.jpg" />
						</div>
						<div class="activityName">
							<span>Activity</span>
						</div>
						<div class="activityTime">
							<span class="glyphicon glyphicon-time">&nbsp;Fri,Aug
								1,4:00 AM - 5:00 AM</span>
						</div>
						<div class="activityaddre">
							<span class="glyphicon glyphicon-flag">&nbsp;Hangouts On
								Air</span>
						</div>
						<div class="activityD">
							<span>asd</span>
						</div>
					</div>
					<div class="activityAsk">
						<span>Are you going to join in?</span> <select
							class="btn btn-default">
							<option>Maybe</option>
							<option class="activityJoin">Yes</option>
							<option class="leaveactivityJoin">No</option>
						</select>

					</div>
				</div>
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
				clickEvent();
			} else {
				clickOffEvent();
			}
			Msnry('.activityBody', '.activity', 435);
			;

		});
	</script>
	<%@ include file="parts/loginJavaScript.jsp"%>
</body>
</html>
