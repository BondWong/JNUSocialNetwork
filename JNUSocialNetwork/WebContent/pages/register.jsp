<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<jsp:scriptlet>synchronized (session) {
				session.setAttribute("hiddenCode", System.currentTimeMillis()
						+ "");
			}</jsp:scriptlet>
<head>
<%@ include file="parts/head.jsp"%>
</head>

<body style="overflow-x: hidden;">
	<div class="regBody">
		<div class="layer">
			<div class="regTop">
				<a href="home.jsp" class="btn btn-primary btn-sm" role="button"><span>回到首页</span></a>
				<a href="aboutUs.jsp" class="btn btn-primary btn-sm" role="button"><span>关于我们</span></a>
			</div>
			<div class="displayBody">
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
								value="${sessionScope.hiddenCode }" /> <input type="hidden"
								name="origin" value="" />
							<p style="float: left;">
								<input type="checkbox" name="statement" value="agree" checked
									required /><span class="agree" data-toggle='modal'
									data-target='#declare'>我同意责任申明</span>
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

	</div>
	<div class="modal fade" id="declare" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">责任申明</h4>
				</div>
				<div class="modal-body modalBody">
					<div class="declare">
						<span style="margin-bottom: 10px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;广大同学与各大组织须知，加入CampuSite校园社区须遵守以下条例，文明社交，共创和谐社区。</span>
						<ul>
							<li>个人以及社区用户不得在校园社区内传播不良信息，包括黄色淫秽信息、传销组织信息、邪教信息等；</li>
							<li>个人以及社区组织应平等和谐相处，不得相互进行人身攻击以及诽谤行为；</li>
							<li>用户在社区上要注意提放欺诈信息，注意财产安全，最好不要涉及有与财产相关的账号，密码在公众社区上传播；</li>
							<li>个人以及社区用户不能再校园社区上发布虚假活动，或者是欺骗同学们的信息，活动消息有更改，请及时通知大家；</li>
							<li>校园社区应是言论自由，但涉及敏感话题请个人和社区用户有所注意，否则责任自负；</li>
							<li>个人及社区用户不得发起非法聚集活动，同学们在参与活动时应该留意活动主题，时间，地点以及内容，防止参与不良活动。</li>
						</ul>
						<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;个人或社区应当准守以上条例，如有违反者，会进行消息警告。若有情节严重者以及多次违反者，则进行封号处理。希望各位用户遵守社区跳跃，共同建设一个和谐、快乐、属于暨南人的校园社区。</span>
						<div>
							<strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;社区网站最终解释权归CampuSite团队所有。</strong>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					</div>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
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
		$('.displayBody').animate({
			opacity : 1
		}, 300);
		$('input[name="origin"]').val(localStorage.getItem("url"));
		localStorage.removeItem('url');
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
	<%@ include file="parts/baidu.jsp"%>
</body>
</html>
