<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>JNU Social Network</title>
<link href="../styles/bootstrap-3.0.3-dist/dist/css/bootstrap.css" rel="stylesheet">
<link href="../styles/custom.css" rel="stylesheet">
<script src="../js/jquery-1.10.2.js"></script>
<script src="../js/jquery.json.min.js"></script>
</head>

<body>
<ul class="nav navbar-nav nav_cust">
	<li class="dropdown"><a href="#" class="dropdown-toggle"
		data-toggle="dropdown"><span class="glyphicon glyphicon-user"> User</span><b
			class="caret"></b></a>
		<ul class="dropdown-menu">
			<li><a href="profile.jsp"><span
					class="glyphicon glyphicon-home">&nbsp;profile</span></a></li>
			<li><a href="../security/UserLogoutServlet"><span
					class="glyphicon glyphicon-th">&nbsp;Logout</span></a></li>
		</ul></li>
	<li><a><span class="glyphicon glyphicon-bell mentionBell"
			style="font-size: 18px"></span></a></li>
	<li><button type="button" class="btn btn-success btn_cust">Share</button></li>
	<li><img src="images/1.jpg" class="img-circle img_cust"></li>
	
</ul>
<div class="mentionBody bottom">
	<div class="arrow"></div>
	<h3 class="mentionBody-title">Popover title</h3>
	<div class="mentionBody-content">  position: absolute;
  top: 0;
  left: 0;
  display: none;</div>
</div>

<script type="text/javascript">
$(document).ready(function(){
$('body').on("click",".mentionBell",function(){
	var animSpeed = 300;			
	var tinyTip;	
	var pos = $(this).offset();
	var nPos = pos;
	nPos.top = pos.top + 20;
	nPos.left = pos.left -250;
	var divTip = 'div.mentionBody';
	tinyTip = $(divTip);
	tinyTip.hide();

	// Make sure that the tooltip has absolute positioning and a high z-index, 
	// then place it at the correct spot and fade it in.
	tinyTip.css('position', 'absolute').css('z-index', '1000');
	tinyTip.css(nPos).fadeIn(animSpeed);
});
});
</script>
</body>
</html>