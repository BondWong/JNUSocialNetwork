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
				<div>
					<span class="glyphicon glyphicon-search glyphicon-search-custom"></span>
					<span class="searchUser">Search for anyone</span>
				</div>
				<span class="peopeleTypeHover"><a href="#">People in common</a></span>
				<span class="peopeleTypeA"><a href="pCampus.jsp">People in the same campus</a></span>
				<span class="peopeleTypeA"><a href="pMajor.jsp">People in the same major</a></span>
				<span class="peopeleTypeA"><a href="pSeason.jsp">People in the same season</a></span>
				<span class="peopeleTypeA"><a href="pClass.jsp">Find classmates</a></span>
			</div>
		</div>
		<div class="col-lg-9">
			<h4>Suggestions</h4>
			<h5>People you may know on Google+</h5>
			<div class="userContainer">
				<div class="recommendBord"></div>
				<div class="userCard">
					<img src="images/userRecomm.jpg" width="200px">
					<p class="recommendName">Clars</p>
					<p class="recommendLooking">(?), National Autonomous University of Mexico</p>
					<div class="recommendBtn"><button class="btn btn-default ">
						+<span class="glyphicon glyphicon-user" >&nbsp;Add</span></button>
					</div>
				</div>
				<div class="userCard">
					<img src="images/userRecomm.jpg" width="200px">
					<p class="recommendName">Clars</p>
					<p class="recommendLooking">(?), National Autonomous University of Mexico</p>
					<div class="recommendBtn"><button class="btn btn-default ">
						+<span class="glyphicon glyphicon-user" >&nbsp;Add</span></button>
					</div>
				</div>
				<div class="userCard">
					<img src="images/userRecomm.jpg" width="200px">
					<p class="recommendName">Clars</p>
					<p class="recommendLooking">(?), National Autonomous University of Mexico</p>
					<div class="recommendBtn"><button class="btn btn-default ">
						+<span class="glyphicon glyphicon-user" >&nbsp;Add</span></button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<%@ include file="parts/securityCode.jsp"%>
	<%@ include file="parts/peopleJavaScript.jsp"%>
</body>
</html>
