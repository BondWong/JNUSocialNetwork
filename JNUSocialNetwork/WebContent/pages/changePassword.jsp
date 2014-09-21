<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<jsp:scriptlet>synchronized (session) {
				session.setAttribute("hiddenCode", System.currentTimeMillis()
						+ "");
			}</jsp:scriptlet>
<%@ include file="parts/head.jsp"%>

<body>
	<div class="regBody">
		<div class="layer">
			<div class="regTop">
				<a href="profile.jsp?nav=about&${sessionScope.ID }"
					class="btn btn-primary btn-sm rl-button-span" role="button"><span>返回</span></a>
			</div>
			<div class="regTitle">修改密码</div>
			<div class="containerReg" style="display: block">
				<div class="regBox">
					<form class="form-signin" role="form" method="post"
						action="../security/ChangePasswordServlet">
						<p>
							<input type="password" class="form-control" placeholder="请输入旧密码"
								name="oldPassword" id="md5OldPassword"
								data-errormessage-value-missing="请输入旧密码" required autofocus
								maxLength="40" />
						</p>
						<p>
							<input type="password" class="form-control" placeholder="请输入新密码"
								name="newPassword" id="md5NewPassword"
								data-errormessage-value-missing="请输入新密码,长度为8-16" required
								autofocus maxLength="40" />
						</p>
						<input type="hidden" name="hiddenCode"
							value="${sessionScope.hiddenCode }" />
						<button class="btn btn-lg btn-success btn-block signInBtn"
							type="submit">确认</button>
					</form>
					<div id="changePassword_popover" style="display: none"></div>
				</div>
			</div>
			<!-- /container -->
			<div class="containerSign" style="display: none"></div>
		</div>
	</div>
	<%@ include file="parts/footer.jsp"%>
	<!-- /container -->

	<!-- Bootstrap core JavaScript
    ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="js/jquery-1.10.2.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="http://cdn.bootcss.com/holder/2.0/holder.min.js"></script>
	<script src="js/md5.js"></script>
	<script>
		$('body').on("click", ".signInBtn", function() {
			var pass = $("#md5OldPassword").val();
			if (pass.length > 0) {
				$("#md5OldPassword").val(md5(pass));
			}
			pass = $("#md5NewPassword").val();
			if (pass.length >= 8 && pass.length <= 16) {
				$("#md5NewPassword").val(md5(pass));
			} else {
				$("#md5NewPassword").val("");
			}
		});
	</script>
	<c:choose>
		<c:when test="${ param.oldPasswordError eq true}">
			<script type="text/javascript">
				$('#changePassword_popover')
						.replaceWith(
								'<div id="changePassword_popover" class="alert alert-danger" style="display: none">旧密码错误</div>');
				$('#changePassword_popover').fadeIn("fast");
				setTimeout('$("#changePassword_popover").fadeOut("slow")', 3000);
			</script>
		</c:when>
	</c:choose>
</body>
</html>