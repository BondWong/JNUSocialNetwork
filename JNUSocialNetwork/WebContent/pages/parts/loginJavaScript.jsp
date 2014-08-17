<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:if test='${sessionScope.ID != null && sessionScope.ID != ""}'>
	<script src="js/friend-list.js"></script>
	<script src="js/chatroomAPI.js"></script>
	<script src="js/oriented-event.js"></script>
</c:if>