<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- <meta http-equiv="pragma" content="no-cache">
<meta http-equiv="Cache-Control"
	content="no-cache, no-store, must-revalidate">
<meta http-equiv="expires" content="Wed, 26 Feb 1997 08:21:57 GMT"> -->

<title>CampuSite</title>
<!-- Bootstrap core CSS -->
<link href="styles/bootstrap-3.0.3-dist/dist/css/bootstrap.css"
	rel="stylesheet">

<!-- Just for debugging purposes. Don't actually copy this line! -->
<!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.0/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

<!-- Custom styles for this template -->
<link href="styles/custom.css" rel="stylesheet">
<link href="styles/instant-chat.css" rel="stylesheet">
<!-- CSS to style the file input field as button and adjust the Bootstrap progress bars -->
<link rel="stylesheet" href="styles/jquery.fileupload.css">
<link href="styles/bootstrap-datetimepicker.min.css" rel="stylesheet"
	media="screen">
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
</head>