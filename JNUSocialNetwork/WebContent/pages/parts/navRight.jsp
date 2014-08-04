<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:choose>
	<c:when
		test="${sessionScope.ID eq null or sessionScope.ID eq ''}">
		<form class="navbar-form navbar-costom" role="form" method="post"
			action="../security/Login">
			<div class="form-group">
				<input type="text" placeholder="ID" class="form-control"
					name="ID" required>
			</div>
			<div class="form-group">
				<input type="password" placeholder="password" class="form-control"
					name="password" id="mad5Password" required>
			</div>
			<input type="hidden" name="userType" value="MEMBER" />
			<button class="btn btn-success signInBtn" type="submit">Sign
				in</button>
			<script src="js/jquery-1.10.2.js"></script>
			<script src="js/md5.js"></script>
			<script>
				$('body').on("click", ".signInBtn", function() {
					var pass = $("#mad5Password").val();
					if (pass.length > 0) {
						$("#mad5Password").val(md5(pass));
					}
				});
			</script>
		</form>
	</c:when>

	<c:otherwise>
		<%@ include file="navRightProfile.jsp"%>
	</c:otherwise>
</c:choose>
