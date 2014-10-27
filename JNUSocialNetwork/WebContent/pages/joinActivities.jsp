<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
    <meta name="description" content="CampuSite活动-快捷加入">

    <title>CampuSite活动-快捷加入</title>
    <link rel="shortcut icon" href="images/favicon.ico">
    <!-- Bootstrap core CSS -->
    <link href="styles/bootstrap-3.2.0-dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="styles/join.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
<script src="//cdn.bootcss.com/html5shiv/3.7.0/html5shiv.js"></script>
<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
    <script>
        window.USERID = '${sessionScope.ID}';
    </script>
</head>

<body>
    <header id="header">
        <h1>CampuSite活动-快捷加入</h1>
    </header>
    <header style="visibility:hidden">
        <h1>CampuSite活动-快捷加入</h1>
    </header>

    <!-- Modal -->
    <div class="modal fade" id="remindModal" tabindex="-1" role="dialog" aria-labelledby="remindModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="remindModalLabel">亲！您还没登录哦！</h4>
                </div>
                <div class="modal-body container">

                    <div class="col-xs-6 text-center"><a class="btn btn-primary btn-long account-link" href="account.jsp?nav=regTab">注册</a>
                    </div>
                    <div class="col-xs-6 text-center"><a class="btn btn-success btn-long account-link" href="account.jsp">登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addPhoneModal" tabindex="-1" role="dialog" aria-labelledby="addPhoneModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="addPhoneModalLabel">亲！你还没登记手机号哦！</h4>
                </div>
                <div class="modal-body container">
                    <form class="form-inline text-center" role="form">
                        <input id="telnum" type="tel" class="form-control" maxlength="11" autofocus />
                        <button id="checkTN" class="btn btn-success">登记</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script type="text/template" id="li-template">
        <li class="acitivity col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <img class="act-img" src="<@=imgsrc@>" alt="activity.img" />
            <table class="table table-striped">
                <tr>
                    <td class="col-xs-4">活动名称:</td>
                    <td><@=activityName@></td>
                </tr>
                <tr>
                    <td>活动时间:</td>
                    <td><@=activityTime@></td>
                </tr>
                <tr>
                    <td>活动地址:</td>
                    <td><@=activityAddr@></td>
                </tr>
                <tr>
                    <td>活动细节:</td>
                    <td><@=activityMore@></td>
                </tr>
            </table>
            <button type="submit" class="btn btn-success join-btn" value="submit" data-postid=<@=ID@>>参加</button>
        </li>
    </script>

    <ul class="activity-list container" id="activity-list">

    </ul>

    <div id="successAlert" class="col-xs-10 col-md-8 col-xs-offset-1 col-md-offset-2 alert alert-success alert-dismissible container react-alert" role="alert">
        <button type="button" class="close" data-dismiss="alert">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
        </button>
        <p>亲！你已成功加入该活动</p>
    </div>

    <div id="errorAlert" class="col-xs-10 col-md-8 col-xs-offset-1 col-md-offset-2 alert alert-danger alert-dismissible container react-alert" role="alert">
        <button type="button" class="close" data-dismiss="alert">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
        </button>
        <p>未知错误，加入失败，抱歉！</p>
    </div>

    <!-- ========================== scripts ======================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!--<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
        <script src="http://cdn.bootcss.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>-->
    <script src="js/jquery-1.10.2.js"></script>
    <script src="styles/bootstrap-3.2.0-dist/js/bootstrap.min.js"></script>
    <script src="js/underscore-min.js"></script>
    <script src="js/join.js"></script>

</body>

</html>
