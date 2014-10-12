<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,user-scalable=no">
    <meta name="description" content="CampuSite活动-快捷加入">

    <title>CampuSite活动-快捷加入</title>
    <link rel="shortcut icon" href="images/favicon.ico">
    <!-- Bootstrap core CSS -->
    <link href="http://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
<script src="//cdn.bootcss.com/html5shiv/3.7.0/html5shiv.js"></script>
<script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
    <style>
        html,
        body {
            margin: 0;
            padding: 0;
            border: 0;
            background-color: #EAE6E0;
        }
        h1 {
            font-size: 1em;
            margin: 0.6em 0;
            color: #679cff;
            text-shadow: 1px 1px 20px #4226dd;
        }
        header {
            text-align: center;
        }
        /*special*/
        #header {
            width: 100%;
            text-align: center;
            position: fixed;
            padding: 0;
            color: rgba(255, 255, 255, 0.8);
            background-color: rgba(0, 0, 0, 0.88);
            z-index: 50;
        }
        #header {
            top: 0;
        }
        ul {
            list-style: none;
        }
        .acitivity {
            border: 1px solid #dedede;
            margin-top: 10px;
            padding-top: 10px;
            padding-bottom: 10px;
            background-color: #FAF9F7;
        }
        .act-img {
            width: 100%;
            display: block;
            padding: 0.2em;
            border: 1px solid #dedede;
            -moz-box-shadow: 0.5px 0.5px 0.5px #e5e5e5;
            box-shadow: 0.5px 0.5px 0.5px #e5e5e5;
        }
        .table {
            margin: 10px 0;
        }
        .join-btn {
            float: right;
        }
        .react-alert {
            position: fixed;
            bottom: 10%;
            z-index: 200;
            display: none;
            text-align: center;
            font-size: 1.2em;
            font-family: "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
        }
        .react-alert span {
            padding: 0 0.1em;
            color: #5199ed;
            text-shadow: 1px 1px 1px #868686;
        }
        #successAlert {
            -moz-box-shadow: 0 0 10px rgba(150, 235, 96, 0.68);
            box-shadow: 0 0 10px rgba(150, 235, 96, 0.68);
        }
        #errorAlert {
            -moz-box-shadow: 0 0 10px rgba(237, 115, 115, 0.68);
            box-shadow: 0 0 10px rgba(237, 115, 115, 0.68);
        }
        .modal-dialog {
            margin-top: 50%;
        }
        .btn-long {
            padding-left: 30px;
            padding-right: 30px;
        }
    </style>
    <script>
        window.USERID = '${sessionScope.ID}';
    </script>
</head>

<body>
    <header id="header">
        <h1>CampuSite活动-快捷加入 </h1>
    </header>
    <header style="visibility:hidden">
        <h1>CampuSite活动-快捷加入 </h1>
    </header>

    <!-- Modal -->
    <div class="modal fade" id="remindModal" tabindex="-1" role="dialog" aria-labelledby="remindModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                    </button>
                    <h4 class="modal-title" id="remindModalLabel">亲！你还没登录哦！</h4>
                </div>
                <div class="modal-body container">
                    <div class="col-xs-6 text-center"><a class="btn btn-primary btn-long" href="register.jsp">注册</a>
                    </div>
                    <div class="col-xs-6 text-center"><a class="btn btn-success btn-long" href="login.jsp">登录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/template" id="li-template">
        <li class="acitivity col-xs-12 col-sm-12 col-md-6 col-lg-6">
            <img class="act-img" src="<%=imgsrc%>" alt="activity.img" />
            <table class="table table-striped">
                <tr>
                    <td class="col-xs-3 ">活动名称:</td>
                    <td><%=activityName%></td>
                </tr>
                <tr>
                    <td>活动时间:</td>
                    <td><%=activityTime%></td>
                </tr>
                <tr>
                    <td>活动地址:</td>
                    <td><%=activityAddr%></td>
                </tr>
                <tr>
                    <td>活动细节:</td>
                    <td><%=activityMore%></td>
                </tr>
            </table>
            <button type="submit" class="btn btn-success join-btn" value="submit" data-postid="<%=ID%>">åå </button>
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
        <p>未知错误，加入失败，抱歉！</p>
    </div>

    <!-- ========================== scripts ======================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!--<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
        <script src="http://cdn.bootcss.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>-->
    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="styles/bootstrap-3.2.0-dist/js/bootstrap.min.js"></script>
    <script src="//cdn.bootcss.com/underscore.js/1.7.0/underscore.js"></script>
    <script src="js/join.js"></script>

</body>

</html>
