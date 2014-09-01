<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<jsp:scriptlet>synchronized (session) {
				session.setAttribute("ieRedirect", true);
			}</jsp:scriptlet>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="refresh" content="1; url=${param.target }">
<title>CampuSite</title>
</head>
<body>redirecting...
</body>
</html>