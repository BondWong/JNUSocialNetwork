<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<jsp:scriptlet>synchronized (session) {
				session.setAttribute("hiddenCode", System.currentTimeMillis()
						+ "");
			}</jsp:scriptlet>
<%@ include file="parts/head.jsp"%>

<body style="overflow-x: hidden; overflow-y: hidden;">
	<div class="regBody">
		<div class="layer">
			<div class="regTop">
				<a href="home.jsp" class="btn btn-primary btn-sm" role="button"><span>回到首页</span></a>
				<a href="aboutUs.jsp" class="btn btn-primary btn-sm" role="button"><span>关于我们</span></a>
			</div>
			<div class="regTitle">注册</div>
			<div class="containerReg" style="display: block">
				<div class="regBox">
					<form class="form-signin" role="form" method="post"
						action="../security/RegServlet">
						<p>
							<input type="text" class="form-control" placeholder="请输入教务系统ID"
								name="ID" data-errormessage-value-missing="请输入教务处学号" required
								autofocus maxLength="20" />
						</p>
						<p>
							<input type="password" class="form-control"
								placeholder="请输入教务系统密码" name="password"
								data-errormessage-value-missing="请输入教务处密码" required
								maxLength="20" />
						</p>
						<div class="form-cust">
							<input type="text" class="form-control form-control-cust"
								placeholder="请输入验证码" name="valCode" pattern="[A-Za-z0-9]{4}"
								data-errormessage-value-missing="请输入验证码"
								data-errormessage-pattern-mismatch="验证码错误" required
								maxLength="4" />
							<div class="form-cust-img">
								<img src="../security/RegServlet"
									onload="javascript:finish_loading_valcode();"
									id="register_valcode_image" style="display: none" /> <img
									src="images/register_loading_valcode.gif"
									id="register_loadingvalcode_image" />
							</div>
						</div>
						<input type="hidden" name="hiddenCode"
							value="${sessionScope.hiddenCode }" />
						<p style="float: left;">
							<input type="checkbox" name="statement" value="agree" checked
								required /><span>我同意责任申明</span>
						</p>
						<button class="btn btn-lg btn-success btn-block signUpBtn"
							type="submit">注册</button>
						<h4>
							已有账号？<span class="btn signIn">登录</span>
						</h4>
					</form>
					<div id="register_fail" class="alert alert-danger"
						style="display: none"></div>
				</div>
			</div>
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
		function finish_loading_valcode() {
			$("#register_loadingvalcode_image").hide();
			$("#register_valcode_image").show();
		}
	</script>
	<script>
		$("h4 span.signIn").click(function() {
			location.href = "login.jsp";
		});
	</script>
	<c:choose>
		<c:when test='${param.error == "VALCODEERROR"}'>
			<script type="text/javascript">
				$("#register_fail").text("验证码错误");
				$("#register_fail").fadeIn("fast");
				setTimeout('$("#regiter_fail").fadeOut("slow")', 3000);
			</script>
		</c:when>
		<c:when test='${param.error == "IDORPAERROR"}'>
			<script type="text/javascript">
				$("#register_fail").text("ID或者密码错误");
				$("#register_fail").fadeIn("fast");
				setTimeout('$("#register_fail").fadeOut("slow")', 3000);
			</script>
		</c:when>
		<c:when test="${param.agree eq false }">
			<script type="text/javascript">
				$("#register_fail").text("请同意责任申明");
				$("#register_fail").fadeIn("fast");
				setTimeout('$("#register_fail").fadeOut("slow")', 3000);
			</script>
		</c:when>
	</c:choose>
</body>
</html>
