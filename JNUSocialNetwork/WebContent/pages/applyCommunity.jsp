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
	<div class="">
		<div class="layer">
			<div class="regTop">
				<a href="home.jsp" class="btn btn-primary btn-sm" role="button"><span>Back
						to home page</span></a> <a href="#" class="btn btn-primary btn-sm"
					role="button"><span>About us</span></a>
			</div>
			<div class="containerApp" style="display: block">
				<div class="appBox">
					<form action="../security/CORegServlet" role="form" method="post"
						class="form-signin">
						<p>
							<input type="text" pattern="[0-9]{11}" class="form-control"
								name="applicationID" placeholder="请输入手机作为ID" id="appTele"
								autocomplete="off" required />
						</p>
						<p>
							<input type="password" class="form-control" name="password"
								pattern="[A-Za-z0-9]{8,16}" placeholder="请输入密码" id="appPassword"
								autocomplete="off" required />
						</p>
						<p>
							<input type="email" class="form-control" placeholder="请输入联系邮箱"
								name="email" id="appMail" autofocus autocomplete="off" required />
						</p>
						<p>
							<textarea type="text" class="form-control" placeholder="请输申请理由"
								name="reason" id="appReasons" autofocus required maxLength="200"
								style="resize: none;"></textarea>
						</p>
						<input type="hidden" name="hiddenCode"
							value="${sessionScope.hiddenCode }" />
						<button class="btn btn-lg btn-success btn-block"
							id="appcommunityCreate" type="submit">Apply</button>
					</form>
					<div class="alert alert-success" id="coregister_success"
						style="display: none">申请成功，请留意邮箱批准信息</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /container -->

	<!-- Bootstrap core JavaScript
    ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/jquery.json.min.js"></script>
	<script src="js/EventAPI.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="http://cdn.bootcss.com/holder/2.0/holder.min.js"></script>
	<c:choose>
		<c:when test='${param.success == "true"}'>
			<script type="text/javascript">
				$("#coregister_success").fadeIn("fast");
				setTimeout('$("#coregister_success").fadeOut("slow")', 5000);
			</script>
		</c:when>
	</c:choose>
</body>
</html>
