<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<ul class="nav navbar-nav nav_cust">
	<li><a href="profile.jsp?nav=post&${sessionScope.ID}"><span
			class="glyphicon glyphicon-home" style="font-size: 24px"></span></a></li>
	<li><a href="javaScript:void(0);" id="remind-bell"><span
			class="glyphicon glyphicon-bell mentionBell" style="font-size: 24px"></span></a></li>
	<li class="dropdown"><a href="#" class="dropdown-toggle"
		data-toggle="dropdown"><img src=""
			onload="javascript:auto_resize( 40, 40, this)"
			class="img-circle img_cust" id="nav-bar-avatar" style="display: none"></a>
		<ul class="dropdown-menu pull-right">
			<li><a href="profile.jsp?nav=about&${sessionScope.ID}"><span
					class="glyphicon glyphicon-credit-card">&nbsp;<span>个人信息</span></span></a></li>
			<li><a href="profile.jsp?nav=photo&${sessionScope.ID}"><span
					class="glyphicon glyphicon-picture">&nbsp;<span>我的相册</span></span></a></li>
			<li><a href="profile.jsp?nav=circle&${sessionScope.ID}"><span
					class="glyphicon glyphicon-user">&nbsp;<span>我的小伙伴</span></span></a></li>
			<li><a href="community.jsp?nav=mycommunity"><span
					class="glyphicon glyphicon-th-large">&nbsp;<span id="">我的社区</span></span></a></li>
			<li><a href="activity.jsp?nav=myactivity"><span
					class="glyphicon glyphicon-flag">&nbsp;<span id="">我的活动</span></span></a></li>
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
