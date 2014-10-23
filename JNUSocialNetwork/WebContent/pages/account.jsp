<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
  <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <jsp:scriptlet>synchronized (session) { session.setAttribute("hiddenCode", System.currentTimeMillis() + ""); }
    </jsp:scriptlet>
    <!DOCTYPE html>
    <html>

    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="unifined account entrance">
      <meta name="keywords" content="account register login applyCommunity">
      <meta name="author" content="Saint Scott">

      <title>统一账户入口</title>
      <%@ include file="parts/head.jsp" %>
      <!-- Bootstrap core CSS -->
      <!--  <link href="http://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">-->
      <!-- <link href="styles/bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet"> -->
      <link href="styles/account.css" rel="stylesheet">

      <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
      <!--[if lt IE 9]>
<script src="//cdn.bootcss.com/html5shiv/3.7.0/html5shiv.js"></script>
<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

    </head>

    <body>

      <div class="regBody">
        <div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
          <div class="container">
            <%@ include file="parts/navLeft.jsp" %>
            <div class="collapse navbar-collapse">
              <%@ include file="parts/communityDropDown.jsp" %>
            </div>
            <!-- /.nav-collapse -->
          </div>
          <!-- /.container -->
        </div>

        <div class="account-box col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6 col-lg-offset-4 col-lg-4">
          <h1 class="camp-logo hide-text">Campusite</h1>
          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist" id="accountTabs">
            <li class="active onethird"><a class="text-center" href="#login" id="loginTab" role="tab" data-toggle="tab">登录</a>
            </li>
            <li class="onethird"><a class="text-center" href="#common-reg" id="regTab" role="tab" data-toggle="tab">注册</a>
            </li>
            <li class="onethird"><a class="text-center" href="#community-reg" id="comRegTab" role="tab" data-toggle="tab">社区申请</a>
            </li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content container-fluid">
            <!-- login tab -->
            <div class="tab-pane fade in active" id="login">
              <form class="form-signin" role="form" method="post" action="../security/Login">
                <input type="text" class="form-control no-bottom-radius" placeholder="请输入ID" name="ID" pattern="\d{10}\d?" data-errormessage-pattern-mismatch="ID格式不正确" data-errormessage-value-missing="请输入ID" maxlength="11" required autofocus />
                <input type="password" class="form-control no-top-radius" placeholder="请输入密码" name="bPassword" id="md5Password" pattern="\S{6}\S*" data-errormessage-value-missing="请输入密码" data-errormessage-pattern-mismatch="密码格式不正确,不允许空字符" required maxlength="20" />
                <input type="hidden" name="hiddenCode" value="${sessionScope.hiddenCode}" />
                <input type="hidden" name="origin" value="" />
                <input type="hidden" name="password" value="" id="rPassword" />
                <div class="form-group btn-box">
                  <button class="btn btn-lg btn-success btn-block LoginInBtn" type="submit">登录</button>
                </div>
              </form>
            </div>
            <!-- common-reg tab -->
            <div class="tab-pane fade" id="common-reg">
              <form class="form-signin form" role="form" method="post" action="../security/RegServlet">
                <input class="form-control no-bottom-radius" type="text" placeholder="请输入学号" name="ID" pattern="\d{10}" maxlength="10" data-errormessage-value-missing="请输入教务处学号" data-errormessage-pattern-mismatch="学号格式不正确" required autofocus />
                <input class="form-control  no-radius" type="password" placeholder="请输入教务系统密码" name="password" pattern="\S{6}\S*" maxlength="20" data-errormessage-value-missing="请输入教务处密码" data-errormessage-pattern-mismatch="密码格式不正确,不允许空字符" required />
                <div class="input-group">
                  <input type="text" class="form-control no-top-radius" placeholder="请输入验证码" name="valCode" maxlength="4" pattern="[A-Za-z0-9]{4}" data-errormessage-value-missing="请输入验证码" data-errormessage-pattern-mismatch="验证码错误" required />
                  <div class="input-group-addon no-top-radius">
                    <img src="../security/RegServlet" onload="javascript:finish_loading_valcode();" id="register_valcode_image" alt="realcode" style="display: none" />
                    <img src="images/register_loading_valcode.gif" alt="loading" id="register_loadingvalcode_image" />
                  </div>
                </div>
                <input type="hidden" name="hiddenCode" value="${sessionScope.hiddenCode}" />
                <input type="hidden" name="origin" value="" />
                <div class="form-group declaration">
                  <input type="checkbox" name="statement" value="agree" checked required /> <a class="agree" data-toggle='modal' data-target='#declare'>我同意责任申明</a>
                </div>
                <div class="form-group btn-box">
                  <button class="btn btn-lg btn-success btn-block regBtn" type="submit">注册</button>
                </div>
              </form>
            </div>
            <!-- community-reg tab -->
            <div class="tab-pane fade" id="community-reg">
              <form action="../security/CORegServlet" role="form" method="post" class="form-signin">
                <input type="text" class="form-control no-bottom-radius" name="applicationID" placeholder="请输入手机号码作为ID" id="appTele" autocomplete="off" pattern="[0-9]{11}" data-errormessage-value-missing="请输入手机号码作为ID" data-errormessage-pattern-mismatch="请输入正确的手机号码" required autofocus maxlength="11" />
                <input type="password" class="form-control no-radius" name="password" maxlength="20" pattern="\S{6}\S*" placeholder="请输入密码" id="appPassword" autocomplete="off" data-errormessage-value-missing="请输入密码" data-errormessage-pattern-mismatch="密码规范：长度6-20,不允许空字符" required />
                <input class="form-control no-radius" type="email" placeholder="请输入联系邮箱" name="email" id="appMail" data-errormessage-value-missing="请输入联系邮箱" data-errormessage-type-mismatch="请输入联系邮箱" autocomplete="off" required />
                <textarea class="form-control no-top-radius" placeholder="请填写申请理由" name="reason" id="appReasons" data-errormessage-value-missing="请填写申请理由" data-errormessage-too-long="不能超过200字" maxlength="200" required style="resize: vertical"></textarea>
                <div class="form-group declaration">
                  <input type="checkbox" name="statement" value="agree" checked required /> <a class="agree" data-toggle='modal' data-target='#declare'>我同意责任申明</a>
                </div>
                <input type="hidden" name="hiddenCode" value="${sessionScope.hiddenCode}" />
                <div class="form-group btn-box">
                  <button class="btn btn-lg btn-success btn-block" id="appcommunityCreate" type="submit">申请</button>
                </div>
              </form>
            </div>
          </div>

          <!-- /Tab panes -->
          <div id="account-alert" class="" style="display: none"></div>
        </div>
      </div>

      <!-- declare modal -->
      <div class="modal fade" id="declare" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              <h4 class="modal-title" id="myModalLabel">责任申明</h4>
            </div>
            <div class="modal-body modalBody">
              <div class="declare">
                <span style="margin-bottom: 10px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;广大同学与各大组织须知，加入CampuSite校园社区须遵守以下条例，文明社交，共创和谐社区。</span>
                <ul>
                  <li>个人以及社区用户不得在校园社区内传播不良信息，包括黄色淫秽信息、传销组织信息、邪教信息等；</li>
                  <li>个人以及社区组织应平等和谐相处，不得相互进行人身攻击以及诽谤行为；</li>
                  <li>用户在社区上要注意提放欺诈信息，注意财产安全，最好不要涉及有与财产相关的账号，密码在公众社区上传播；</li>
                  <li>个人以及社区用户不能再校园社区上发布虚假活动，或者是欺骗同学们的信息，活动消息有更改，请及时通知大家；</li>
                  <li>校园社区应是言论自由，但涉及敏感话题请个人和社区用户有所注意，否则责任自负；</li>
                  <li>个人及社区用户不得发起非法聚集活动，同学们在参与活动时应该留意活动主题，时间，地点以及内容，防止参与不良活动。</li>
                </ul>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;个人或社区应当准守以上条例，如有违反者，会进行消息警告。若有情节严重者以及多次违反者，则进行封号处理。希望各位用户遵守社区跳跃，共同建设一个和谐、快乐、属于暨南人的校园社区。</span>
                <br />
                <br /> <strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;社区网站最终解释权归CampuSite团队所有。</strong>
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

      <%@ include file="parts/footer.jsp" %>
        <!-- ========================== scripts ======================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <!--<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
        <script src="http://cdn.bootcss.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>-->
        <script src="js/jquery-1.11.1.min.js"></script>
        <script src="styles/bootstrap-3.2.0-dist/js/bootstrap.min.js"></script>
        <script src="js/md5.js"></script>

        <script>
          $(function () {
            var target = getUrlParam("nav");
            if(target){
              $('#'+target).tab('show');
            }

            $(".LoginInBtn").click(function () {
              var pass = $("#md5Password").val();
              if (pass.length > 0) {
                $("#md5Password").attr("disabled", "true");
                $("#rPassword").val(md5(pass));
              }
            });

            $('input[name="origin"]').val(localStorage.getItem("url"));
            localStorage.removeItem('url');
          });

          /*
		displayAccountAlert("alert alert-danger","验证码错误");
		displayAccountAlert("alert alert-success","验证码错误");      
		 */
          function finish_loading_valcode() {
            $("#register_loadingvalcode_image").hide();
            $("#register_valcode_image").show();
          }

          function displayAccountAlert(classes, msg) {
            $("#account-alert").attr("class", classes).text(msg);
            $("#account-alert").fadeIn(500);
            setTimeout(function () {
              $("#account-alert").fadeOut(500);
            }, 4000);
          }
          
          function getUrlParam(name)
          {
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)", "i"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r) return unescape(r[2]); return null; //返回参数值
          } 
        </script>
        <script type="text/javascript">
          /* login scripts */
          <c:choose>
          <c:when test='${param.error == "VALCODEERROR"}'>
          displayAccountAlert("alert alert-danger", "验证码错误！");
          </c:when>
          <c:when test='${param.error == "IDORPAERROR"}'>
          displayAccountAlert("alert alert-danger", "ID或者密码错误！");
          </c:when>
          <c:when test="${param.agree eq false}">
          displayAccountAlert("alert alert-danger", "请阅读并同意责任申明！");
          </c:when>
          </c:choose>
          /* register scripts */
          <c:choose>
          <c:when test="${ param.success eq false}">
          displayAccountAlert("alert alert-danger", "登录失败！");
          </c:when>
          <c:when test="${param.register}">
          displayAccountAlert("alert alert-success", "注册成功，请登录！");
          </c:when>
          <c:when test="${param.registerExist}">
          displayAccountAlert("alert alert-warning", "已有账号，请登录！");
          </c:when>
          <c:when test="${param.changePassword}">
          displayAccountAlert("alert alert-success", "修改密码成功，请重新登录！");
          </c:when>
          </c:choose>
          /* apply community scripts */
          <c:choose>
          <c:when test='${param.success == "true"}'>
            displayAccountAlert("alert alert-danger", "申请成功，请留意邮箱批准信息！");
          </c:when>
          <c:when test='${param.ID == "exist"}'>
            displayAccountAlert("alert alert-danger", "ID已经存在！");
          </c:when>
          <c:when test='${param.agree eq false}'>
            displayAccountAlert("alert alert-danger", "请阅读并同意责任申明！");
          </c:when>
          </c:choose>
        </script>
        <%@ include file="parts/baidu.jsp" %>
    </body>

    </html>
