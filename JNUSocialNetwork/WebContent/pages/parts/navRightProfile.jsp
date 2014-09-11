<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<ul class="nav navbar-nav nav_cust">

	<li><a href="javaScript:void(0);" id="remind-bell"><span
			class="glyphicon glyphicon-bell mentionBell" style="font-size: 18px"></span></a></li>
	<li class="dropdown"><a href="#" class="dropdown-toggle"
		data-toggle="dropdown"><img src=""
			onload="javascript:auto_resize(30, 30, this)"
			class="img-circle img_cust" id="nav-bar-avatar" style="display: none"></a>
		<ul class="dropdown-menu pull-right">
			<li><a href="profile.jsp?nav=post&${sessionScope.ID}"><span
					class="glyphicon glyphicon-home">&nbsp;<span
						id="nav-bar-user">个人资料</span></span></a></li>
			<li><a href="../security/UserLogoutServlet" id="lougout_button"><span
					class="glyphicon glyphicon-log-out">&nbsp;登出</span></a></li>
		</ul></li>
	<li></li>

</ul>
<div class="mentionBody bottom" id="onclickMentionBody">
	<div class="arrowBack">
		<span class="glyphicon glyphicon-chevron-left" id="arrowBack"
			style="font-size: 12px;">&nbsp;</span>
	</div>
	<div class="mentionBody-title">
		<div class="arrowBack"></div>
		消息提醒
		<div class="glyphicon glyphicon-remove mentionClose"></div>
	</div>
	<div class="mentionBody-content"></div>
</div>
