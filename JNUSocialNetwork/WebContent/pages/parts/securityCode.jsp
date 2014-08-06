<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<jsp:scriptlet>synchronized (session) {
				session.setAttribute("hiddenCode", System.currentTimeMillis()
						+ "");
			}</jsp:scriptlet>

<input name="hiddenCode" value="${sessionScope.hiddenCode }"
	type="hidden" />
<input name="ID" value="${sessionScope.ID }" type="hidden" id="security-code-user-ID"/>
<c:if test='${sessionScope.ID != null && sessionScope.ID != ""}'>
	<script src="js/friend-list.js"></script>
	<script src="js/chatroomAPI.js"></script>
</c:if>