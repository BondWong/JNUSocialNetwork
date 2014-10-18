<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="parts/head.jsp"%>
</head>

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
	<div class="container container_actvity">
		<div class="activityHead">
			<div class="activityPh">
				<img alt="" width="100%"
					onload="javascript:auto_resize(1140, getHeight(1140,this.width,this.height), this)"
					src="" style="display: none">
			</div>
			<div class="activityInfo">
				<p class="activityShowName"></p>
				<div class="activityShare">

					<button class="btn btn-default joinSActivity">参加活动</button>
					<button class="btn btn-default editActivity" data-toggle='modal'
						data-target='#editActivity'>管理活动</button>
					<button class="btn btn-default activityPhoto" data-toggle='modal'
						data-target='#addActivityPhoto'>添加活动图片</button>
					<div class="downLoadList">
						<a class="btn btn-default" target="_blank"
							id="download-name-list-button">下载参与列表</a>
					</div>
					<button class="btn btn-default backActivity">查看社区活动列表</button>
					<button class="btn btn-default backActivityA">查看活动圈</button>
				</div>
			</div>
		</div>
		<div class="modal fade" id="editActivity" tabindex="-1" role="dialog"
			aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">编辑活动</h4>
					</div>
					<form class="activityForm" enctype="multipart/form-data"
						onsubmit="return false;">
						<div class="modal-body modalBody">
							<div class="activityItem">
								<span>活动名：</span> <input type="text"
									class="form-control activityInput" placeholder=""
									id="activityName" required autofocus maxLength="30" />
							</div>
							<div class="activityItem activitySpan">
								<span>活动时间：</span>
								<div class="input-group date form_datetime1 col-lg-10"
									data-link-field="dtp_input1">
									<input type="text" class="form-control activityInput"
										id="activityTime" readonly required /> <span
										class="input-group-addon"><i
										class="glyphicon glyphicon-th"></i></span>
								</div>
							</div>
							<div class="activityItem activitySpan">
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
									style="width: 81%; text-align: center; padding: 0px; display: none;">请输入时间！</div>
							</div>
							<div class="activityItem">
								<div id="fail_popover2" class="alert alert-danger"
									style="width: 81%; margin-left: 80px; text-align: center; padding: 0px; display: none;">提醒时间必须要比活动开始时间提前半个小时哦，亲</div>
							</div>
							<div class="activityItem">
								<span>活动地点：</span> <input class="form-control activityInput"
									placeholder="" id="activityAddr" required autofocus
									maxLength="150" style="resize: none;" />
							</div>
							<div class="activityItem">
								<span>活动细节：</span>
								<textarea type="text" class="form-control activityInput"
									placeholder="" id="activityMore" required autofocus
									maxLength="200" style="resize: none;"></textarea>
							</div>
							<div class="activityItem">
								<span>活动类型：</span> <select class="activityType">
									<option value="ENTERTAINMENT">娱乐类</option>
									<option value="ATHLETIC">体育类</option>
									<option value="ACADEMIC">学术类</option>
								</select>
							</div>
							<div class="activityItem">
								<span>联系电话：</span><input type="text"
									class="form-control activityInput" placeholder="" id="inquery"
									pattern="[0-9]{11}"
									data-errormessage-pattern-mismatch="请输入手机号码" required autofocus
									maxLength="11" />
							</div>
							<div class="activityItem">
								<span>人数上限：</span><input type="text"
									class="form-control activityInput" placeholder=""
									id="activityNum" pattern="[0-9]{1,3}"
									data-errormessage-pattern-mismatch="请输入参与人数，最大999" required
									autofocus maxLength="3" />
							</div>
							<div class="activityItem">
								<span>活动图片</span> <span class="btn btn-success fileinput-button"
									style="width: auto;"> <i
									class="glyphicon glyphicon-plus"></i> <span>添加图片:</span> <!-- The file input field used as target for the file upload widget -->
									<input id="fileupload" type="file" name="files[]">
								</span>
							</div>
						</div>
						<br></br>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">取消</button>
							<button type="sumbit" class="btn btn-primary" id="saveActivity"
								value="upload">保存</button>
						</div>
					</form>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>
		<div class="modal fade" id="addActivityPhoto" tabindex="-1"
			role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"
							aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel">添加图片</h4>
					</div>
					<form class="activityPhotoForm" enctype="multipart/form-data">
						<div class="modal-body modalBody">

							<!-- The fileinput-button span is used to style the file input field as button -->
							<span class="btn btn-success fileinput-button photoAdd"> <i
								class="glyphicon glyphicon-plus"></i> <span>添加图片</span> <!-- The file input field used as target for the file upload widget -->
								<input id="fileuploadPhoto" type="file" name="files[]" multiple>
							</span> <br> <br>
							<!-- The global progress bar -->
							<div id="progress" class="progress progressCust">
								<div class="progress-bar progress-bar-success"></div>
							</div>
							<!-- The container for the uploaded files -->
							<div id="files" class="files"></div>
							<br>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">取消</button>
							<button type="button" class="btn btn-primary addActivityPhoto"
								value="upload">保存</button>
						</div>
					</form>
				</div>
				<!-- /.modal-content -->
			</div>
			<!-- /.modal-dialog -->
		</div>
		<div class="activityBody">
			<div class="aBodyLeft">
				<div class="activityDetail">
					<span class="activityTitle">活动细节</span>
					<div class="detailBody">
						<div>
							<span class="glyphicon glyphicon-time activityShowTime">&nbsp;</span><span
								class="aT"></span>
						</div>
						<div>
							<span class="glyphicon glyphicon-phone activityShowTime">&nbsp;</span><span
								class="aI"></span>
						</div>
						<div>
							<span class="glyphicon glyphicon-flag activityShowAddre">&nbsp;</span><span
								class='aA'></span>
						</div>
						<div class="detailTxt activityShowD"></div>
					</div>
				</div>
				<div class="activityPhotos">
					<div id="myCarousel" class="carousel slide" data-ride="carousel">
						<!-- Indicators -->
						<div class="carousel-inner"></div>
						<a class="left carousel-control" href="#myCarousel"
							data-slide="prev"><span
							class="glyphicon glyphicon-chevron-left"></span></a> <a
							class="right carousel-control" href="#myCarousel"
							data-slide="next"><span
							class="glyphicon glyphicon-chevron-right"></span></a>
					</div>
				</div>
				<div class="aBodyComment commentBtn">
					<div class="aCommentItem">
						<img class="aCommentI img-circle"
							onload="javascript:auto_resize(50, 50, this)" alt="" src="">
						<div class="col-lg-6">
							<input type="text" placeholder="发条评论" class="form-control acBtn"
								id="commentText1407032926865" />
						</div>
						<div class="col-lg-3">
							<button type="button" class="btn btn-success" id="addComment"
								value="">发送</button>
						</div>
					</div>
				</div>
			</div>
			<div class="aBodyRight">
				<div class="aBodyCard">
					<div class="communityBS">
						<img alt="" src="">
					</div>
					<div class="cBcontent">
						<p>举办方:</p>
						<h1 class="communityName"></h1>
						<p class="communityNum"></p>
						<button class="btn btn-danger activityAddCommunity">添加社区</button>
					</div>
				</div>
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
	<script src="js/EventHandle.js"></script>
	<script src="js/activityShow.js"></script>
	<script src="js/global-initialization.js"></script>
	<script type="text/javascript">
		$(document)
				.ready(
						function() {
							var url = window.location.search;
							var activityID = url.substr(url.indexOf("&") + 1);
							window.activity = FetchPostByID(activityID);
							var communityID = url.substr(url.indexOf("?") + 1,
									url.indexOf("&") - url.indexOf("?") - 1);
							window.community = FetchCommunityByID(communityID);
							showImages();

							if (USERID != null && USERID != "") {
								login_initialization(USERID);
								clickEvent();
								if ($.parseJSON(sessionStorage.getItem("user")).userType == 'COMMUNITYOWNER'
										&& USERID == community.attributes.userID) {
									$('.joinSActivity').remove();
									$('.editActivity').css("display", "inline");
									$('.downLoadList').css("display", "inline");
									$('.activityPhoto')
											.css("display", "inline");
									$('#activityLike').css("display", "none");
									$('.activityAddCommunity').css("display",
											"none");
								}
								var now = new Date();
								if (activity.participantIDs.length >= activity.attributes.limitation) {
									$('.joinSActivity').remove();
									$('.ulR').remove();
									$('.aUB').remove();
									$('.activityShare')
											.append(
													"<button class='btn btn-default' style='float: right;'>已经满人</button>");
								}
								if (activity.attributes.startDate
										- now.getTime() <= 0) {
									$('.joinSActivity').remove();
									$('.ulR').remove();
									$('.aUB').remove();
									$('.activityShare')
											.append(
													"<button class='btn btn-default' style='float: right;'>已经过期</button>");
								}
								var now = new Date();
								if (activity.attributes.startDate
										- now.getTime() <= 0
										|| activity.attributes.reminded != "false") {
									$('.editActivity').remove();
								}
								$('.aCommentI')
										.attr(
												"src",
												$
														.parseJSON($
																.parseJSON(sessionStorage
																		.getItem("user")).attributes.avatarLink).src);
							} else {
								clickOffEvent();
							}

							showActivityDetail(activity, community);
						});
	</script>
	<%@ include file="parts/loginJavaScript.jsp"%>
</body>
</html>
