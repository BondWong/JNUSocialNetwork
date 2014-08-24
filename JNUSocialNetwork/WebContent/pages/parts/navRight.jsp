<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<jsp:scriptlet>synchronized (session) {
				session.setAttribute("hiddenCode", System.currentTimeMillis()
						+ "");
			}</jsp:scriptlet>
<c:choose>
	<c:when test="${sessionScope.ID eq null or sessionScope.ID eq ''}">
		<form class="navbar-form navbar-costom" role="form" method="post"
			action="../security/Login">
			<div class="form-group">
				<input type="text" placeholder="请输入ID" class="form-control" name="ID"
					data-errormessage-value-missing="请输入ID" required>
			</div>
			<div class="form-group">
				<input type="password" placeholder="请输入密码" class="form-control"
					name="password" id="md5Password"
					data-errormessage-value-missing="请输入密码" required>
			</div>
			<input type="hidden" name="hiddenCode"
				value="${sessionScope.hiddenCode }" />
			<button class="btn btn-success signInBtn" type="submit">登陆</button>
			<script src="js/jquery-1.10.2.js"></script>
			<script src="js/md5.js"></script>
			<script>
				$('body').on("click", ".signInBtn", function() {
					var pass = $("#md5Password").val();
					if (pass.length > 0) {
						$("#md5Password").val(md5(pass));
					}
				});
			</script>
		</form>
	</c:when>

	<c:otherwise>
		<%@ include file="navRightProfile.jsp"%>
	</c:otherwise>
</c:choose>
