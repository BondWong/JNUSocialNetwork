<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!DOCTYPE html>
    <html>
    <jsp:scriptlet>synchronized (session) { session.setAttribute("hiddenCode", System.currentTimeMillis() + ""); }
    </jsp:scriptlet>

    <head>
      <%@ include file="parts/head.jsp" %>
        <link href="styles/account.css" rel="stylesheet">
    </head>

    <body>
      <div class="regBody">
        <div class="layer">
          <div class="regTop">
            <a href="profile.jsp?nav=about&${sessionScope.ID }" class="btn btn-primary btn-sm rl-button-span" role="button"><span>返回</span></a>
          </div>
          <div class="account-box col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4">
            <h1 class="title text-center">修改密码</h1>
            <form class="form-signin" role="form" method="post" action="/security/ChangePasswordServlet">
              <input type="password" class="form-control no-bottom-radius" placeholder="请输入旧密码" name="oldPassword" id="md5OldPassword" pattern="\S{6}\S*" data-errormessage-value-missing="请输入旧密码" data-errormessage-pattern-mismatch="密码格式不正确" required autofocus maxLength="20" />
              <input type="password" class="form-control  no-top-radius" placeholder="请输入新密码" name="newPassword" id="md5NewPassword" maxLength="20" pattern="\S{6}\S*" data-errormessage-value-missing="请输入新密码,长度为6-20" data-errormessage-pattern-mismatch="密码格式不正确" required autofocus/>
              <input type="hidden" name="hiddenCode" value="${sessionScope.hiddenCode }" />
              <div class="form-group btn-box">
                <button class="btn btn-lg btn-success btn-block LogInBtn" type="submit">确认</button>
              </div>
            </form>
            <div id="changePassword_popover" class="alert alert-danger" style="display: none">旧密码错误</div>
          </div>
        </div>
      </div>
      <%@ include file="parts/footer.jsp" %>
        <!-- /container -->

        <!-- Bootstrap core JavaScript
    ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="js/jquery-1.10.2.js"></script>
        <script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
        <script src="js/md5.js"></script>
        <script>
          $(".LogInBtn").click(function () {
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
              $('#changePassword_popover').fadeIn("fast");
              setTimeout('$("#changePassword_popover").fadeOut("slow")', 3000);
            </script>
          </c:when>
        </c:choose>
        <%@ include file="parts/baidu.jsp" %>
    </body>

    </html>