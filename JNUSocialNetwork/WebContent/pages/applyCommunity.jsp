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
								autocomplete="off" data-errormessage-value-missing="请输入手机号码作为ID"
								data-errormessage-pattern-mismatch="请输入正确的手机号码" required
								autofocus maxLength="11" />
						</p>
						<p>
							<input type="password" class="form-control" name="password"
								pattern="[A-Za-z0-9]{8,16}" placeholder="请输入密码" id="appPassword"
								autocomplete="off" data-errormessage-value-missing="请输入密码"
								data-errormessage-pattern-mismatch="请输入密码，长度：8-16，内容可为英文大写或小写或数字"
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
								required /><span class="agree" data-toggle='modal'
								data-target='#declare'>我同意责任申明</span>
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
	<script src="js/noti-sound/jquery.playSound.js"></script>
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
	<%@ include file="parts/baidu.jsp"%>
</body>
</html>
