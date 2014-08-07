<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<%@ include file="parts/head.jsp"%>

<body>
	<div class="regBody">
		<div class="regTop">
			<span>這個位置完本地Watch有什麼用</span> <span>這個Join呢</span>
		</div>
		<div class="regTitle">Sign In</div>
		<div class="regTitle">這個是幹嘛的</div>
		<div class="containerReg" style="display: block">
			<div class="regBox">
				<form class="form-signin" role="form" method="post"
					action="../security/Login">
					<p>
						<input type="text" class="form-control" placeholder="ID" name="ID"
							required autofocus>
					</p>
					<p>
						<input type="password" class="form-control" placeholder="Password"
							name="password" id="md5Password" required>
					</p>
					<input type="hidden" name="userType" value="MEMBER" />
					<button class="btn btn-lg btn-success btn-block signInBtn"
						type="submit">Sign in</button>
					<h4>
						Have no account?<span class="btn signUp">Sign up</span>
					</h4>
				</form>
				<div id="login_fail_popover" class="alert alert-danger"
					style="display: none">Sign In Unsuccessfully</div>
				<div class="alert alert-success" id="register_success"
					style="display: none">Sign Up Successfully, Please Sign In</div>
			</div>
		</div>
		<!-- /container -->
		<div class="containerSign" style="display: none"></div>
	</div>
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
			var pass = $("#md5Password").val();
			if (pass.length > 0) {
				$("#md5Password").val(md5(pass));
			}
		});
		$("h4 span.signUp").click(function() {
			location.href = "register.jsp";
		});
	</script>
	<c:choose>
		<c:when test="${ param.success eq false}">
			<script type="text/javascript">
				$('#login_fail_popover').fadeIn("fast");
				setTimeout('$("#login_fail_popover").fadeOut("slow")', 3000);
			</script>

		</c:when>
		<c:when test="${param.register}">

			<script type="text/javascript">
				$('#register_success').fadeIn("fast");
				setTimeout('$("#register_success").fadeOut("slow")', 3000);
			</script>

		</c:when>
	</c:choose>
	<%@ include file="parts/securityCode.jsp"%>
	<script src="js/initialization.js"></script>
</body>
</html>
