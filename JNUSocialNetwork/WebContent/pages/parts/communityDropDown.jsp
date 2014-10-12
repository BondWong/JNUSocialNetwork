<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<ul class="nav navbar-nav home-nav">
	<li><a href="home.jsp"><span>主页</span></a>
		<ul class='nav home-bar show-bar'>
			<li class='hrefIntro'>关于我们</li>
		</ul></li>
	<li class='navbar-community'><a href="community.jsp?nav=discovery" style='cursor: pointer;'><span>社区</span></a>
		<ul class='nav community-bar show-bar'>
			<li class='communityD'>热门社区</li>
			<li class="applyCommunity">申请社区</li>
		</ul></li>
	<li><a href="activity.jsp?nav=discovery" style='cursor: pointer;'><span>动态圈</span></a>
		<ul class='nav activity-bar show-bar'>
			<li class='activityA'>活动圈</li>
			<li class='activityC'>朋友圈</li>
		</ul></li>
	<li><a href="people.jsp"><span>寻找伙伴</span></a></li>
</ul>