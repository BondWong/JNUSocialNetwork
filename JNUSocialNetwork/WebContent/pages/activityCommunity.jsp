<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>

<%@ include file="parts/head.jsp"%>
<!-- Generic page styles -->
<body>
	<div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
		<div class="container">
			<%@ include file="parts/navLeft.jsp"%>
			<div class="collapse navbar-collapse">
				<%@ include file="parts/communityDropDown.jsp"%>

				<%@ include file="parts/navRight.jsp"%>
			</div>
			<!-- /.nav-collapse -->
		</div>
		<!-- /.container -->
	</div>
	<!-- /.navbar -->
	<div class="container container_custom">
		<div class="communityCard">
			<div class="dropdown">
				<div class="cardSetter glyphicon glyphicon-cog" type="button"
					id="dropdownMenu1" data-toggle="dropdown"></div>
				<ul class="dropdown-menu pull-right" role="menu"
					aria-labelledby="dropdownMenu1">
					<li role="presentation"><a role="menuitem" tabindex="-1"
						class="editCommunity" data-toggle='modal'
						data-target='#editCommunity' id="editCommunityBtn">管理社区</a></li>
					<li role="presentation"><a role="menuitem" tabindex="-1"
						id="editMembersBtn">管理成员</a></li>
					<li role="presentation"><a id="leaveCommunityBtn"
						role="menuitem" tabindex="-1" href="#">退出社区</a></li>
					<li role="presentation"><a id="deleteCommunityBtn"
						role="menuitem" tabindex="-1" href="#">删除社区</a></li>
				</ul>
			</div>
			<div class="modal fade" id="editCommunity" tabindex="-1"
				role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">编辑社区</h4>
						</div>
						<form class="editCommunityForm" enctype="multipart/form-data"
							onsubmit="return false;">
							<div class="modal-body modalBody">
								<!--  <div class="pubCreate" id="createBlock">Public</div>
								<div class="priCreate" id="createBlock">Private</div>
								-->
								<p>
									<span>社区名：</span> <input type="text" class="form-control"
										placeholder="" id="communityName" required autofocus
										maxLength="20" />
								</p>
								<p>
									<span>社区介绍：</span>
									<textarea class="form-control" placeholder=""
										id="communityIntro" required autofocus maxLength="90"
										style="resize: none;"></textarea>
								</p>
								<span>社区名片:</span> <span
									class="btn btn-success fileinput-button"> <i
									class="glyphicon glyphicon-plus"></i> <span>社区封面:</span> <input
									id="fileuploadEdit" type="file" name="files[]">
								</span>
								<!-- The container for the uploaded files -->
								<div id="files" class="files"></div>
								<br>
							</div>
							<br></br>
							<div class="modal-footer">
								<button type="button" class="btn btn-default"
									data-dismiss="modal">关闭</button>
								<button type="submit" class="btn btn-primary" id="saveCommunity"
									value="upload">保存</button>
							</div>
						</form>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
			</div>
			<div class=communityCardInfo>
				<h1 class="cName"></h1>
				<p class="cIntro"></p>
			</div>
			<div class="communityPic">
				<img onload="javascript:auto_resize(220, 220, this)" src=""
					style="display: none" />
			</div>
			<div class="cardA">
				<span>社区活动</span> <span class="showHref">社区帖子</span> <span
					class="ownerHref">社区介绍</span>
			</div>
			<div class="memberList">
				<h1>社区成员</h1>
				<span class="memberHref">所有成员</span>
			</div>
		</div>
		<div class="pro_body pro_body_community">
			<div class="activityHeader">
				<span>社区活动</span>
				<button role="button" id="createActivityBtn" class="btn btn-primary"
					data-toggle='modal' data-target='#activityCommunity'>举办活动</button>
			</div>
			<div
				style="background-color: #247EEC; color: white; text-align: center; padding-top: 10px; padding-bottom: 10px; margin-top: 15px;">
				<h1>～～社区活动详情～～</h1>
				<p>快来参加来认识认识一些小伙伴吧</p>
			</div>
			<div class="modal fade" id="activityCommunity" tabindex="-1"
				role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="myModalLabel">举办活动</h4>
						</div>
						<form class="activityForm" id="newActivity" enctype="multipart/form-data"
							onsubmit="return false;"
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
										<span>活动地点：</span>
										<input class="form-control activityInput" placeholder=""
											id="activityAddr" required autofocus maxLength="100"
											style="resize: none;" />
									</div>
									<div class="activityItem">
										<span>活动细节：</span>
										<textarea class="form-control activityInput" placeholder=""
											id="activityMore" required autofocus maxLength="200"
											style="resize: none;"></textarea>
									</div>
									<div class="activityItem">
										<span>活动类型：</span>
										<select id="activityType">
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
									<form class="regForm" id="newActivity" enctype="multipart/form-data">
									<div class="form-group" id="div_fileuploadB"
										style="display: none; float: left;">
										<label for="fileuploadB" class="col-sm-2 control-label"></label>
										<span class="btn btn-success fileinput-button"
											style="width: auto; margin-left: 10px"> <i
											class="glyphicon glyphicon-plus"></i> <span>添加报名表</span> <!-- The file input field used as target for the file upload widget -->
											<input id="fileuploadB" type="file" name="file"/>
										</span>
									</div>
									</form>
									<div>
										<p>[只能上传后缀格式为.doc.wps.docx.xls.xlsx.et的文件]</p>
										<p>[上传报名表后不能修改，请小心上传！]</p>
										<p><span id="fail_popover3" style="width: 90%; text-align: center;display:none;" class="alert alert-danger">请上传正确格式文件</span></p>
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
									style="display: none; width: 70px"
									id="go_submit" />
							</div>
						
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
			</div>
			<div class="activityBody">
				<div class="activityBord"></div>
			</div>
		</div>
	</div>
	<!-- CHATROOM -->
	<%@ include file="parts/chatRoom.jsp"%>
	<!-- Bootstrap core JavaScript
    ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/jquery.json.min.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="js/masonry.pkgd.min.js"></script>
	<script src="js/imagesloaded.pkgd.min.js"></script>
	<script src="js/jquery.ui.widget.js"></script>
	<!-- The Load Image plugin is included for the preview images and image resizing functionality -->
	<script src="js/load-image.min.js"></script>
	<!-- The Canvas to Blob plugin is included for image resizing functionality -->
	<script src="js/canvas-to-blob.min.js"></script>
	<!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
	<script src="js/jquery.iframe-transport.js"></script>
	<!-- The basic File Upload plugin -->
	<script src="js/jquery.fileupload.js"></script>
	<!-- The File Upload processing plugin -->
	<script src="js/jquery.fileupload-process.js"></script>
	<!-- The File Upload image preview & resize plugin -->
	<script src="js/jquery.fileupload-image.js"></script>
	<!-- The File Upload video preview plugin -->
	<script src="js/jquery.fileupload-video.js"></script>
	<!-- The File Upload validation plugin -->
	<script src="js/jquery.fileupload-validate.js"></script>
	<script src="js/bootstrap-datetimepicker.min.js"></script>
	<script src="js/EventAPI.js"></script>
	<script src="js/function.js"></script>
	<script src="js/activityCommunity.js"></script>
	<script src="js/EventHandle.js"></script>

	<%@ include file="parts/loginJavaScript.jsp"%>
	<script src="js/global-initialization.js"></script>
	<script type="text/javascript">
		$(document)
				.ready(
						function() {
							var url = window.location.search;
							window.communityID = url
									.substr(url.indexOf("?") + 1);
							window.community = FetchCommunityByID(communityID);
							Msnry('.activityBody', '.activity', 435);
							fetchActivitiesByCommunity();
							showCommunityInfo();
							if (USERID != null && USERID != "") {
								login_initialization(USERID);
								activityClickEvent();
								clickEvent();
								var memberIDs = [];
								$.each(community.members, function(n, member) {
									memberIDs.push(member.ID);
								});
								if ($.parseJSON(sessionStorage.getItem("user")).userType == 'COMMUNITYOWNER'
										|| $.inArray(USERID, memberIDs) != -1) {
									$('.cardSetter').css("display", "inline");
								}
								if ($.inArray(USERID, memberIDs) != -1
										&& USERID != community.attributes.userID) {
									$('#leaveCommunityBtn').css("display",
											"inline");
								}
								if ($.parseJSON(sessionStorage.getItem("user")).userType == 'COMMUNITYOWNER'
										&& USERID == community.attributes.userID) {
									$('#createActivityBtn').css("display",
											"inline");
									$('#editCommunityBtn').css("display",
											"inline");
									$('#editMembersBtn').css("display",
											"inline");
									$('#deleteCommunityBtn').css("display",
											"inline");
									$('.editActivity').css("display", "inline");
								}
							} else {
								clickOffEvent();
							}
						});
	</script>
	<%@ include file="parts/contentScroll.jsp"%>
	<%@ include file="parts/baidu.jsp"%>
</body>
</html>
