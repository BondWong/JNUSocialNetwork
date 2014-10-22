<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<jsp:scriptlet>String uri = request.getRequestURI();
			boolean isHome = uri.contains("home.jsp");
			boolean needChatRoom = !(uri.contains("aboutUs.jsp")
					|| uri.contains("register.jsp")
					|| uri.contains("applyCommunity.jsp")
					|| uri.contains("login.jsp") || uri.contains("home.jsp"));
			boolean isProfile = uri.contains("profile.jsp");
			request.setAttribute("isHome", isHome);
			request.setAttribute("isProfile", isProfile);
			request.setAttribute("needChatRoom", needChatRoom);</jsp:scriptlet>

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- <meta http-equiv="pragma" content="no-cache">
<meta http-equiv="Cache-Control"
	content="no-cache, no-store, must-revalidate">
<meta http-equiv="expires" content="Wed, 26 Feb 1997 08:21:57 GMT"> -->
<!-- 由于国内浏览器 -->
<meta name="renderer" content="webkit" />
<link rel="shortcut icon" href="images/favicon.ico">
<title>CampuSite</title>
<!-- Bootstrap core CSS -->
<link href="styles/bootstrap-3.2.0-dist/css/bootstrap.css"
	rel="stylesheet">

<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.0/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

<!-- Custom styles for this template -->
<link href="styles/footer.css" rel="stylesheet">
<link href="styles/nav.css" rel="stylesheet">
<c:choose>
	<c:when test="${requestScope.isHome}">
		<link href="styles/home.css" rel="stylesheet">
	</c:when>
	<c:when test="${requestScope.isProfile }">
		<link rel="stylesheet" href="styles/cropper.min.css">
        <link rel="stylesheet" href="styles/crop-avatar.css">
		<link href="styles/custom.css" rel="stylesheet">
	</c:when>
	<c:otherwise>
		<link href="styles/custom.css" rel="stylesheet">
	</c:otherwise>
</c:choose>
<c:if test="${requestScope.needChatRoom}">
	<link href="styles/instant-chat.css" rel="stylesheet">
</c:if>

<!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
<link rel="stylesheet" href="styles/jquery.fileupload.css">
<link href="styles/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
<script type="text/javascript">
	window.USERID = '${sessionScope.ID}';
	window.windowHeight = "innerHeight" in window ? window.innerHeight
			: document.documentElement.offsetHeight;
</script>
<script type="text/javascript" src="js/civem.js"></script>
<script type="text/javascript" src="js/eventsource.js"></script>
<!-- <script>
	// detect what kind of EventSource we have
	var isPolyfill = EventSource.isPolyfill;

	switch (isPolyfill) {

	case undefined:

		alert("Browser supports EventSource natively");
		break;

	case "XHR":

		// IE >= 10, Android, old IPhone...
		alert("Browser loaded polyfill EventSource...");
		break;

	case "IE_8-9":

		// IE8, IE9
		alert("Browser loaded polyfill EventSource for IE8-9");
		break;

	default:

		alert("Browser loaded unexpected EventSource...");
	}
</script> -->