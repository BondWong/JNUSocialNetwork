<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<ul class="nav navbar-nav nav_cust">
	<li class="dropdown"><a href="#" class="dropdown-toggle"
		data-toggle="dropdown"><span class="glyphicon glyphicon-user"
			id="nav-bar-user"> 用户</span><b class="caret"></b></a>
		<ul class="dropdown-menu">
			<li><a href="profile.jsp?nav=post&${sessionScope.ID}"><span
					class="glyphicon glyphicon-home">&nbsp;个人中心</span></a></li>
			<li><a href="../security/UserLogoutServlet" id="lougout_button"><span
					class="glyphicon glyphicon-th">&nbsp;退出</span></a></li>
		</ul></li>
	<li><a href="javaScript:void(0);" id="remind-bell"><span
			class="glyphicon glyphicon-bell mentionBell" style="font-size: 18px"></span></a></li>
	<li><img src="" onload="javascript:auto_resize(30, 30, this)"
		class="img-circle img_cust" id="nav-bar-avatar" style="display: none"></li>

</ul>
<div class="mentionBody bottom" id="onclickMentionBody">
	<div class="arrowBack"><span class="glyphicon glyphicon-chevron-left" id="arrowBack" style="font-size:12px;">&nbsp;</span></div>
	<div class="mentionBody-title">
		<div class="arrowBack"></div>
		消息提醒
		<div class="glyphicon glyphicon-remove mentionClose"></div>
	</div>
	<div class="mentionBody-content"></div>
</div>
