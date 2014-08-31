<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
<c:if test="${sessionScope.isIE }">
	<script type="text/javascript" src="js/jquery.eventsource.js"></script>
	<script type="text/javascript">
		var loc = window.location;
		var url = "";
		url = loc.protocol + "//" + loc.hostname + ":8080";
		$.eventsource({

			// Assign a label to this event source

			label : "event-source-label",

			// Set the file to receive data from the server

			url : url,

			// Set the type of data you expect to be returned
			// text, json supported

			dataType : "json",

			// Set a callback to fire when the event source is opened
			// `onopen`
			open : function(data) {
				alert(data);
			},

			// Set a callback to fire when a message is received
			// `onmessage`
			message : function(data) {
				alert(data);
				console.log(data);
			}
		});
	</script>
</c:if>
</head>