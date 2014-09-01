<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:if test="${sessionScope.isIE && sessionScope.ieRedirect}">
	<jsp:scriptlet>synchronized (session) {
					session.setAttribute("ieRedirect", false);
				}</jsp:scriptlet>
	<script>
		window.location.reload(true);
	</script>
</c:if>