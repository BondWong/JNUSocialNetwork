<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<p id="security-code-user-ID" style="display: none">${sessionScope.ID }</p>
<script type="text/javascript">
	window.USERID = $("#security-code-user-ID").text();
</script>
<c:if test='${sessionScope.ID != null && sessionScope.ID != ""}'>
	<script src="js/friend-list.js"></script>
	<script src="js/chatroomAPI.js"></script>
	<script src="js/oriented-event.js"></script>
</c:if>