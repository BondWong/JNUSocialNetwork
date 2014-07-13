<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<jsp:scriptlet>synchronized (session) {
				session.setAttribute("hiddenCode", System.currentTimeMillis()
						+ "");
			}</jsp:scriptlet>
<div>
	<input name="hiddenCode" value="${sessionScope.hiddenCode }"
		type="hidden" /> <input name="userID" value="${sessionScope.userID }"
		type="hidden" />
</div>