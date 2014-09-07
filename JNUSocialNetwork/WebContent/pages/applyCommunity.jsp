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

<body>
	<div class="coRegBody">
		<div class="layer">
			<div class="regTop">
				<a href="home.jsp" class="btn btn-primary btn-sm" role="button"><span>回到主页</span></a>
				<a href="aboutUs.jsp" class="btn btn-primary btn-sm" role="button"><span>关于我们</span></a>
			</div>
			<div class="regTitle">社区账号注册</div>
			<div class="containerApp" style="display: block">
				<div class="appBox">
					<form action="../security/CORegServlet" role="form" method="post"
						class="form-signin">
						<p>
							<input type="text" pattern="[0-9]{11}" class="form-control"
								name="applicationID" placeholder="请输入手机号码作为ID" id="appTele"
								autocomplete="off" data-errormessage-value-missing="请输入手机好吗作为ID"
								data-errormessage-pattern-mismatch="请输入手机号码作为ID" required
								autofocus maxLength="11" />
						</p>
						<p>
							<input type="password" class="form-control" name="password"
								pattern="[A-Za-z0-9]{8,16}" placeholder="请输入密码" id="appPassword"
								autocomplete="off" data-errormessage-value-missing="请输入密码"
								data-errormessage-pattern-mismatch="请输入密码，长度：8-16，内容可谓为英文大写或小写或数字"
								required maxLength="40" />
						</p>
						<p>
							<input type="email" class="form-control" placeholder="请输入联系邮箱"
								name="email" id="appMail"
								data-errormessage-value-missing="请输入联系邮箱"
								data-errormessage-type-mismatch="请输入联系邮箱" autocomplete="off"
								required />
						</p>
						<p>
							<textarea type="text" class="form-control" placeholder="请填写申请理由"
								name="reason" id="appReasons"
								data-errormessage-value-missing="请填写申请理由"
								data-errormessage-too-long="不能超过200字" required maxLength="200"
								style="resize: none;"></textarea>
						</p>
						<p>
							<input name="statement" value="agree" type="checkbox" checked
								required /><span>我同意责任申明</span>
						</p>
						<input type="hidden" name="hiddenCode"
							value="${sessionScope.hiddenCode }" />
						<button class="btn btn-lg btn-success btn-block"
							id="appcommunityCreate" type="submit">申请</button>
					</form>
					<br />
					<div id="coregister_status" style="display: none"></div>
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
	<script src="js/jquery.json.min.js"></script>
	<script src="js/EventAPI.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="http://cdn.bootcss.com/holder/2.0/holder.min.js"></script>
	<c:choose>
		<c:when test='${param.success == "true"}'>
			<script type="text/javascript">
				$("#coregister_status")
						.replaceWith(
								'<div class="alert alert-success" id="coregister_status" style="display: none">申请成功，请留意邮箱批准信息</div>');
				$("#coregister_status").fadeIn("fast");
				setTimeout('$("#coregister_status").fadeOut("slow")', 5000);
			</script>
		</c:when>
		<c:when test='${param.ID == "exist"}'>
			<script type="text/javascript">
				$("#coregister_status")
						.replaceWith(
								'<div class="alert alert-warning" id="coregister_status" style="display: none">ID已经存在</div>');
				$("#coregister_status").fadeIn("fast");
				setTimeout('$("#coregister_status").fadeOut("slow")', 5000);
			</script>
		</c:when>
		<c:when test='${param.agree eq false}'>
			<script type="text/javascript">
				$("#coregister_status")
						.replaceWith(
								'<div class="alert alert-warning" id="coregister_status" style="display: none">请同意责任申明</div>');
				$("#coregister_status").fadeIn("fast");
				setTimeout('$("#coregister_status").fadeOut("slow")', 5000);
			</script>
		</c:when>
	</c:choose>
</body>
</html>
