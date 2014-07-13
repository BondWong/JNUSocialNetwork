<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<%@ include file="parts/head.jsp"%>

<body>
<div class="regBody">
	<div class="regTop">
		<span>Watch</span>
		<span>Join</span>
	</div>
	<div class="regTitle">Social</div>
	<div class="regTitle">Your videos will love it here</div>
	<div class="containerReg" style="display: block">
	  <div class="regBox">
		<form class="form-signin" role="form" method="post"
			action="../security/RegServlet">
			<p>
				<input type="text" class="form-control"
					placeholder="ID of academic affairs system" name="userID" required
					autofocus />
			</p>
			<p>
				<input type="password" class="form-control"
					placeholder="Password of academic affairs system" name="password"
					required />
			</p>
			<p>
				<div class="form-cust">
				<input type="text" class="form-control form-control-cust"
					placeholder="validation Code" name="valCode" required />
					<div class="form-cust-img"><img src="../security/RegServlet" /></div>
				</div>
			</p>
			<button class="btn btn-lg btn-success btn-block" type="submit">Sign
				up</button>
			<h4>
				Have a account?<span class="btn signIn">Sign in</span>
			</h4>
		</form>
	  </div>
	</div>
	<!-- /container -->
	<div class="containerSign" style="display: none">

		<form class="form-signin" role="form" method="post"
			action="../security/LoginServlet">
			<h2 class="form-signin-heading">Sign in</h2>
			<p>
				<input type="text" class="form-control" placeholder="UserID"
					name="userID" required autofocus>
			</p>
			<p>
				<input type="password" class="form-control" placeholder="Password"
					name="password" id="md5Password" required>
			</p>

			<button class="btn btn-lg btn-success btn-block signInBtn"
				type="submit">Sign in</button>
			<h4>
				Have no account?<span class="btn signUp">Sign up</span>
			</h4>
		</form>
	</div>
</div>
	<c:choose>
		<c:when test="${ param.invalid}">
			<script type="text/javascript">
			alert("UserID or Password error!");
		</script>
		</c:when>
		<c:when test="${ param.error !=null}">
			<script type="text/javascript">
			alert("${param.error}");
		</script>
		</c:when>
	</c:choose>
	<%@ include file="parts/securityCode.jsp"%>
	<!-- /container -->

	<!-- Bootstrap core JavaScript
    ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="js/jquery-1.10.2.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="http://cdn.bootcss.com/holder/2.0/holder.min.js"></script>
	<script src="js/regAndLogin.js"></script>
	<script src="js/md5.js"></script>
	<script>
		$('body').on("click",".signInBtn",function(){
			var pass = $("#md5Password").val();
			if(pass.length >0){
				$("#md5Password").val(md5(pass));
			}
		});
	</script>
</body>
</html>
