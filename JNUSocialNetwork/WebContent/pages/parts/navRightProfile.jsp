<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<ul class="nav navbar-nav nav_cust">
	<li class="dropdown"><a href="#" class="dropdown-toggle"
		data-toggle="dropdown"><span class="glyphicon glyphicon-user"
			id="nav-bar-user"> User</span><b class="caret"></b></a>
		<ul class="dropdown-menu">
			<li><a href="profile.jsp?nav=post&${sessionScope.ID}"><span
					class="glyphicon glyphicon-home">&nbsp;profile</span></a></li>
			<li><a href="../security/UserLogoutServlet"><span
					class="glyphicon glyphicon-th">&nbsp;Logout</span></a></li>
		</ul></li>
	<li><a href="javaScript:void(0);" id="remind-bell"><span
			class="glyphicon glyphicon-bell mentionBell" style="font-size: 18px"></span></a></li>
	<li><img src="" class="img-circle img_cust" id="nav-bar-avatar"></li>

</ul>
<div class="mentionBody bottom">
	<div class="arrow"></div>
	<div class="mentionBody-title">
		<div class="arrowBack"></div>
		Notifications
		<div class="glyphicon glyphicon-remove mentionClose"></div>
	</div>
	<div class="mentionBody-content">
		<!-- <div class="NotiItem commentItem">
			<div class="col-lg-3">
				<div><img src="images/type.jpg" /></div>
			</div>
			<div class="col-lg-6">
				<div>i want to fuck you!</div>
			</div>
		</div>
		<div class="NotiItem">
			<div class="col-lg-3">
				<div><img src="images/type.jpg" /></div>
			</div>
			<div class="col-lg-6">
				<div>i want to fuck you!</div>
			</div>
		</div>
		<div class="NotiItem">
			<div class="col-lg-3">
				<div><img src="images/type.jpg" /></div>
			</div>
			<div class="col-lg-6">
				<div>i want to fuck you!</div>
			</div>
		</div> -->
	</div>
</div>
