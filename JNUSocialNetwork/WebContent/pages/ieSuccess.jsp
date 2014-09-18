<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:scriptlet>synchronized (session) {
				session.setAttribute("ieRedirect", true);
			}</jsp:scriptlet>
<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="refresh" content="1; url=${param.target }">
<title>CampuSite</title>
</head>
<body>redirecting...
</body>
</html>