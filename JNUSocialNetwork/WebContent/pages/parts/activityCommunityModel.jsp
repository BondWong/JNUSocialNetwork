<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="modal fade" id="activityCommunity" tabindex="-1"
    role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
     <div class="modal-content">
      <div class="modal-header">
       <button type="button" class="close" data-dismiss="modal"
        aria-hidden="true">&times;</button>
       <h4 class="modal-title" id="myModalLabel">举办活动</h4>
      </div>
      <form class="activityForm" id="newActivity"
       enctype="multipart/form-data" onsubmit="return false;"
       style="position: relative; overflow: hidden;">
       <div class="modal-body modalBody" style="height: 580px;">
        <div class="innerNav" style="display: none; visibility: hidden">
         <hr />
         <ul>
          <li class="active" id="go_page1"><span>基本信息</span></li>
          <li id="go_page2"><span>报名方式</span></li>
          <li id="go_page3"><span>上传报名表</span></li>
         </ul>
        </div>
        <div id="page1"
         style="position: absolute; top: 30px; left: 0px; width: 100%">
         <div class="activityItem">
          <span>活动名：</span> <input type="text"
           class="form-control activityInput" placeholder=""
           id="activityName" required autofocus maxLength="30" />
         </div>
         <div class="activityItem">
          <span>活动时间：</span>
          <div class="input-group date form_datetime1 col-lg-10"
           data-link-field="dtp_input1">
           <input type="text" class="form-control activityInput"
            id="activityTime" readonly required /> <span
            class="input-group-addon"><i
            class="glyphicon glyphicon-th"></i></span>
          </div>
         </div>
         <div class="activityItem">
          <span>提醒时间：</span>
          <div class="input-group date form_datetime2 col-lg-10"
           data-link-field="dtp_input1">
           <input type="text" class="form-control activityInput"
            id="activityRemind" readonly required /> <span
            class="input-group-addon"><i
            class="glyphicon glyphicon-th"></i></span>
          </div>
         </div>
         <div class="activityItem">
          <div id="fail_popover" class="alert alert-danger"
           style="width: 81%; margin-left: 80px; text-align: center; padding: 0px; display: none;">请输入时间！</div>
         </div>
         <div class="activityItem">
          <div id="fail_popover2" class="alert alert-danger"
           style="width: 81%; margin-left: 80px; text-align: center; padding: 0px; display: none;">提醒时间必须要比活动开始时间提前半个小时哦，亲</div>
         </div>
         <div class="activityItem">
          <span>活动地点：</span> <input class="form-control activityInput"
           placeholder="" id="activityAddr" required autofocus
           maxLength="100" style="resize: none;" />
         </div>
         <div class="activityItem">
          <span>活动细节：</span>
          <textarea class="form-control activityInput" placeholder=""
           id="activityMore" required autofocus maxLength="200"
           style="resize: none;"></textarea>
         </div>
         <div class="activityItem">
          <span>活动类型：</span> <select id="activityType">
           <option value="ENTERTAINMENT">娱乐类</option>
           <option value="ATHLETIC">体育类</option>
           <option value="ACADEMIC">学术类</option>
          </select>
         </div>
         <div class="activityItem">
          <span>联系电话：</span><input type="text"
           class="form-control activityInput" placeholder=""
           id="inquery" pattern="[0-9]{11}"
           data-errormessage-pattern-mismatch="请输入手机号码" required
           autofocus maxLength="11" />
         </div>
         <div class="activityItem">
          <span>人数上限：</span><input type="text"
           class="form-control activityInput" placeholder=""
           id="activityNum" pattern="[0-9]{1,3}"
           data-errormessage-pattern-mismatch="请输入参与人数，最大999" required
           autofocus maxLength="3" />
         </div>
         <div class="activityItem">
          <span>活动图片</span> <span
           class="btn btn-success fileinput-button" style="width: auto;">
           <i class="glyphicon glyphicon-plus"></i> <span>添加图片:</span> <!-- The file input field used as target for the file upload widget -->
           <input id="fileuploadA" type="file" name="file">
          </span>
         </div>
         <span
          style="display: block; font-size: 12px; margin-top: 30px;">[请上传长宽比例1140*300的海报头，否则影响显示效果]</span>
         <!-- The container for the uploaded files -->
        </div>
      </form>
      <div id="page2"
       style="position: absolute; top: 30px; left: 700px; height: 400px; width: 100%;">
       <div class="form-group">
        <div class="col-sm-12">
         <label class="radio"> <input type="radio"
          name="optionsRadios" id="optionsRadios1" value="option1"
          checked> 默认报名：用户只需点击参加即可，无需填写报名表；
         </label> <label class="radio"> <input type="radio"
          name="optionsRadios" id="optionsRadios2" value="option2">
          上传报名表：用户需要下载报名表，填写报名表后上传。
         </label>
        </div>
       </div>
       <form class="regForm" id="newActivity"
        enctype="multipart/form-data">
        <div class="form-group" id="div_fileuploadB"
         style="display: none; float: left;">
         <label for="fileuploadB" class="col-sm-2 control-label"></label>
         <span class="btn btn-success fileinput-button"
          style="width: auto; margin-left: 10px"> <i
          class="glyphicon glyphicon-plus"></i> <span>添加报名表</span> <!-- The file input field used as target for the file upload widget -->
          <input id="fileuploadB" type="file" name="file" />
         </span>
        </div>
       </form>
       <div>
        <p>[只能上传后缀格式为.doc.wps.docx.xls.xlsx.et的文件]</p>
        <p>[上传报名表后不能修改，请小心上传！]</p>
        <p>
         <span id="fail_popover3"
          style="width: 90%; text-align: center; display: none;"
          class="alert alert-danger">请上传正确格式文件</span>
        </p>
       </div>
      </div>

      <div id="page3"
       style="position: absolute; top: 30px; left: 700px; height: 400px; width: 100%;">
       <form class="showFDetail">
        <table class="table">
         <caption style='font-size: 18px;'>确认信息</caption>
         <tr>
          <td>活动名</td>
          <td id="table_activityName" style="text-align: right"></td>
         </tr>
         <tr>
          <td>活动时间</td>
          <td id="table_activityTime" style="text-align: right"></td>
         </tr>
         <tr>
          <td>提醒时间</td>
          <td id="table_activityRemind" style="text-align: right"></td>
         </tr>
         <tr>
          <td>活动地点</td>
          <td id="table_activityAddr" style="text-align: right"></td>
         </tr>
         <tr>
          <td>活动细节</td>
          <td id="table_activityMore" style="text-align: right"></td>
         </tr>
         <tr>
          <td>人数上限</td>
          <td id="table_activityNum" style="text-align: right"></td>
         </tr>
         <tr>
          <td>报名方式</td>
          <td id="table_activitySign" style="text-align: right"></td>
         </tr>
         <tr>
          <td>已上传活动图片</td>
          <td id="table_fileuploadA" style="text-align: right"></td>
         </tr>
         <tr>
          <td>已上传报名表</td>
          <td id="table_fileuploadB" style="text-align: right"></td>
         </tr>
        </table>
       </form>
      </div>
     </div>

     <div class="modal-footer">
      <a href="#" class="btn btn-success" id="go_pre"
       style="display: none; width: 70px">上一步</a> <a href="#"
       class="btn btn-success" id="go_next" style="width: 70px">下一步</a>
      <input type="submit" class="btn btn-success" value="完成"
       style="display: none; width: 70px" id="go_submit" />
     </div>

    </div>
    <!-- /.modal-content -->
   </div>