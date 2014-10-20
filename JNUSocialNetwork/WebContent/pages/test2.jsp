<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <title>test</title>
   <link href="styles/bootstrap-3.0.3-dist/dist/css/bootstrap.css" rel="stylesheet">
   <link rel="stylesheet" href="styles/jquery.fileupload.css">
	<link href="styles/bootstrap-datetimepicker.min.css" rel="stylesheet" media="screen">
    <script src="js/jquery-1.10.2.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="js/bootstrap-datetimepicker.min.js"></script>

  <script type="text/javascript" language="JavaScript">
        $(document).ready(function () {
            var easingtime = 300;
            var go_page = [$('#go_page1'), $('#go_page2'), $('#go_page3')];
            var page = [$('#page1'), $('#page2'), $('#page3')];
            var go_pre = $('#go_pre');
            var go_next = $('#go_next');
            var go_submit=$('#go_submit');
            var current_page = 0;
            go_page[0].click(function (event) {
                page[2].animate({left: '700px'}, easingtime);
                page[1].animate({left: '700px'}, easingtime);
                page[0].animate({left: '0px'}, easingtime);
                go_page[0].addClass('active');
                go_page[1].removeClass();
                go_page[2].removeClass();
                go_pre.css('display', 'none');
                go_next.css('display', '');
                go_submit.css('display', 'none');
                current_page = 0;
            });
            go_page[1].click(function (event) {
                page[0].animate({left: '-700px'}, easingtime);
                page[1].animate({left: '0px'}, easingtime);
                page[2].animate({left: '700px'}, easingtime);
                go_page[1].addClass('active');
                go_page[0].removeClass();
                go_page[2].removeClass();
                go_pre.css('display', '');
                go_next.css('display', '');
                go_submit.css('display', 'none');
                current_page = 1;
            });
            go_page[2].click(function (event) {
                page[0].animate({left: '-700px'}, easingtime);
                page[1].animate({left: '-700px'}, easingtime);
                page[2].animate({left: '0px'}, easingtime);
                go_page[2].addClass('active');
                go_page[0].removeClass();
                go_page[1].removeClass();
                go_pre.css('display', '');
                go_next.css('display', 'none');
                go_submit.css('display', '');
                current_page = 2;
            });
            go_pre.click(function (event) {
                if (current_page > 0) {
                    go_page[--current_page].click();
                }
            });
            go_next.click(function (event) {
                if ($('#activityTime').val() == '' || $('#activityName').val() == '' || $('#activityNum').val() == '' || $('#activityMore').val() == '' || $('#activityRemind').val() == '' || $('#activityAddr').val == '') {
                    go_submit.click();
                    return;
                }
                else if (current_page < page.length - 1) {
                    go_page[++current_page].click();
                    if(current_page==2){
                        $('#table_activityName').html($('#activityName').val());
                        $('#table_activityTime').html($('#activityTime').val());
                        $('#table_activityRemind').html($('#activityRemind').val());
                        $('#table_activityAddr').html($('#activityAddr').val().length>30?$('#activityAddr').val().substring(0,30)+'......':$('#activityAddr').val());
                        $('#table_activityMore').html($('#activityMore').val().length>30?$('#activityMore').val().substring(0,30)+'......':$('#activityMore').val());
                        $('#table_activityNum').html($('#activityNum').val());
                        $('#table_activitySign').html($('#optionsRadios1').is(':checked')?'默认方式':'上传报名表');
                        $('#table_fileuploadA').html($('#fileuploadA').val()==''?'否':$('#fileuploadA').val());
                        $('#table_fileuploadB').html($('#fileuploadB').val()==''?'否':$('#fileuploadB').val());
                    }
                }
            });
            $('#datetimepicker1').datetimepicker({
                format: 'yyyy-mm-dd hh:ii'
            });
            $('#datetimepicker2').datetimepicker({
                format: 'yyyy-mm-dd hh:ii'
            });
            $('#optionsRadios1').click(function(event){
                $('#div_fileuploadB').fadeOut(easingtime);
            });
            $('#optionsRadios2').click(function(event){
                $('#div_fileuploadB').fadeIn(easingtime);
            });

        });
    </script>

</head>
<body>


<br/>

<p><a data-toggle="modal" href="#example" class="btn btn-primary btn-large">Launch demo modal</a></p>


<div id="example" class="modal modal-content fade"
     style="overflow:hidden;display: none; background-color: #ffffff;width: 700px;margin: 0 auto">
    <form class="form-horizontal" role="form">
        <div class="modal-header">
            <a class="close" data-dismiss="modal">×</a>
            <h4>举办活动</h4>
        </div>
        <div class="modal-body" style="min-height: 400px">
            <div class="innerNav" style="display: none;visibility: hidden">
                <hr/>
                <ul>
                    <li class="active" id="go_page1"><span>基本信息</span></li>
                    <li id="go_page2"><span>报名方式</span></li>
                    <li id="go_page3"><span>上传报名表</span></li>
                </ul>
            </div>
            <div id="page1"
                 style="position:absolute;top:30px;left:0px;height: 400px;width:650px;padding-left: 50px">
                <div class="form-group">
                    <label for="activityName" class="col-sm-2 control-label">活动名：</label>

                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="activityName" required autofocus maxLength="30">
                    </div>
                </div>
                <div class="form-group input-append date" id="datetimepicker1" data-date-format="yyyy-mm-dd hh:ii">
                    <label for="activityTime" class="col-sm-2 control-label">活动时间：</label>

                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="activityTime" placeholder="点击以选取日期"
                               required style="cursor: pointer;background-color: white"/>
                        <span class="add-on"><i class="icon-th"></i></span>
                    </div>
                </div>
                <div class="form-group input-append date" id="datetimepicker2" data-date-format="yyyy-mm-dd hh:ii">
                    <label for="activityRemind" class="col-sm-2 control-label">提醒时间：</label>

                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="activityRemind" placeholder="点击以选取日期"
                               required style="cursor: pointer;background-color: white"/>
                        <span class="add-on"><i class="icon-th"></i></span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="activityAddr" class="col-sm-2 control-label">活动地点：</label>

                    <div class="col-sm-9">
                        <textarea class="form-control" placeholder=""
                                  id="activityAddr" required autofocus maxLength="100"
                                  style="resize: none;"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label for="activityMore" class="col-sm-2 control-label">活动细节：</label>

                    <div class="col-sm-9">
                        <textarea class="form-control" placeholder=""
                                  id="activityMore" required autofocus maxLength="100"
                                  style="resize: none;"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label for="activityNum" class="col-sm-2 control-label">人数上限：</label>

                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="activityNum" pattern="[0-9]{1,3}"
                               data-errormessage-pattern-mismatch="请输入参与人数，最大999" required autofocus maxLength="3">
                    </div>
                </div>
                <div class="form-group">
                    <label for="fileuploadA" class="col-sm-2 control-label">活动图片：</label>
                        <span class="btn btn-success fileinput-button" style="width: auto;margin-left: 10px">
							<i class="glyphicon glyphicon-plus"></i>
                            <span>添加图片</span> <!-- The file input field used as target for the file upload widget -->
							<input id="fileuploadA" type="file" name="files[]"/>
						</span>
                    <span style="display:inline;font-size:12px;margin-top: 30px;">[请上传长宽比例1140*300的海报头，否则影响显示效果]</span>

                </div>
            </div>
            <div id="page2"
                 style="position:absolute;top:30px;left:700px;height: 400px;width:650px;padding-left: 50px">
                <div class="form-group">
                    <div class="col-sm-9">
                        <label class="radio">
                            <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1">
                            默认报名：用户只需点击参加即可，无需填写报名表；
                        </label>
                        <label class="radio">
                            <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                            上传报名表：用户需要下载报名表，填写报名表后上传。
                        </label>
                    </div>

                </div>
                <div class="form-group" id="div_fileuploadB" style="display: none;margin-top: 50px">
                    <label for="fileuploadB" class="col-sm-2 control-label">报名表：</label>
                        <span class="btn btn-success fileinput-button" style="width: auto;margin-left: 10px">
							<i class="glyphicon glyphicon-plus"></i>
                            <span>添加报名表</span> <!-- The file input field used as target for the file upload widget -->
							<input id="fileuploadB" type="file" name="files[]"/>
						</span>
                </div>
            </div>
            <div id="page3"
                 style="position:absolute;top:30px;left:700px;height: 400px;width:650px;padding-left: 50px">
                    <table class="table">
                        <caption>确认信息</caption>
                        <tr><td>活动名</td><td id="table_activityName" style="text-align: right"></td></tr>
                        <tr><td>活动时间</td><td id="table_activityTime" style="text-align: right"></td></tr>
                        <tr><td>提醒时间</td><td id="table_activityRemind" style="text-align: right"></td></tr>
                        <tr><td>活动地点</td><td id="table_activityAddr" style="text-align: right"></td></tr>
                        <tr><td>活动细节</td><td id="table_activityMore" style="text-align: right"></td></tr>
                        <tr><td>人数上限</td><td id="table_activityNum" style="text-align: right"></td></tr>
                        <tr><td>报名方式</td><td id="table_activitySign" style="text-align: right"></td></tr>
                        <tr><td>已上传活动图片</td><td id="table_fileuploadA" style="text-align: right"></td></tr>
                        <tr><td>已上传报名表</td><td id="table_fileuploadB" style="text-align: right"></td></tr>
                    </table>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#" class="btn btn-success" id="go_pre" style="display: none;width: 70px">上一步</a>
            <a href="#" class="btn btn-success" id="go_next" style="width: 70px">下一步</a>
            <input type="submit" class="btn btn-success" value="完成" style="display: none;width: 70px" id="go_submit"/>
        </div>
    </form>
</div>
</html>