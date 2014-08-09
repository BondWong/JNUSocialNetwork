<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<%@ include file="parts/head.jsp"%>

<body style="overflow-x: hidden; overflow-y: hidden;">
	<div class="regBody">
		<div class="layer">
			<div class="regTop">
				<span>這個位置完本地Watch有什麼用</span> <span>這個Join呢</span>
			</div>
			<div class="regTitle">Sign Up</div>
			<div class="regTitle">這個是幹嘛的</div>
			<div class="containerReg" style="display: block">
				<div class="regBox">
					<form class="form-signin" role="form" method="post"
						action="../security/RegServlet">
						<p>
							<input type="text" class="form-control"
								placeholder="ID of academic affairs system" name="ID" required
								autofocus />
						</p>
						<p>
							<input type="password" class="form-control"
								placeholder="Password of academic affairs system"
								name="password" required />
						</p>
						<div class="form-cust">
							<input type="text" class="form-control form-control-cust"
								placeholder="validation Code" name="valCode" required />
							<div class="form-cust-img">
								<img src="../security/RegServlet" />
							</div>
						</div>
						<button class="btn btn-lg btn-success btn-block signUpBtn"
							type="submit">Sign up</button>
						<h4>
							Have a account?<span class="btn signIn">Sign in</span>
						</h4>
					</form>
					<div id="register_fail" class="alert alert-danger"
						style="display: none"></div>
				</div>
			</div>
		</div>
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
		$("h4 span.signIn").click(function() {
			location.href = "login.jsp";
		});
	</script>

	<c:choose>
		<c:when test='${param.error == "VALCODEERROR"}'>
			<script type="text/javascript">
				$("#register_fail").text("Validation Code Error!");
				$("#register_fail").fadeIn("fast");
				setTimeout('$("#regiter_fail").fadeOut("slow")', 3000);
			</script>
		</c:when>
		<c:when test='${param.error == "IDORPAERROR"}'>
			<script type="text/javascript">
				$("#register_fail").text("ID or Password Error!");
				$("#register_fail").fadeIn("fast");
				setTimeout('$("#register_fail").fadeOut("slow")', 3000);
			</script>
		</c:when>
	</c:choose>
	<%@ include file="parts/securityCode.jsp"%>
</body>
</html>
