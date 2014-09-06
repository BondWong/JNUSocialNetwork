<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<%@ include file="parts/head.jsp"%>

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
			<img alt="" width="100%"
				onload="javascript:auto_resize(1170, 300, this)" src=""
				style="display: none">
			<div class="activityInfo">
				<p class="activityShowName">草地吉他弹唱会</p>
				<div class="activityShare">

					<span class="glyphicon glyphicon-heart-empty" id="activityLike"
						style="font-size: 20px"></span>
					<button class="btn btn-default editActivity" data-toggle='modal'
						data-target='#editActivity'>编辑</button>
					<div class="downLoadList"><a class="btn btn-default" target="_blank"
						id="download-name-list-button">下载活动名单</a></div>
					<script type="text/javascript">
						var url = window.location.search;
						var activityID = url.substr(url.indexOf("&") + 1);
						document.getElementById("download-name-list-button").href = "../app/fileDownloader?type=ACTIVITYNAMELIST&version=2007+&activityID="
								+ activityID;
					</script>
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
					<form class="activityForm" enctype="multipart/form-data">
						<div class="modal-body modalBody">
							<div class="activityItem">
								<span>活动名：</span> <input type="text"
									class="form-control activityInput" placeholder=""
									id="activityName" required autofocus maxLength="30" />
							</div>
							<div class="activityItem">
								<span>活动时间：</span>
								<div class="input-group date form_datetime col-lg-10"
									data-link-field="dtp_input1">
									<input type="text" class="form-control activityInput"
										id="activityTime" readonly /> <span class="input-group-addon"><i
										class="glyphicon glyphicon-th"></i></span>
								</div>
							</div>
							<div class="activityItem">
								<span>活动地点：</span>
								<textarea class="form-control activityInput" placeholder=""
									id="activityAddr" required autofocus maxLength="150"
									style="resize: none;"></textarea>
							</div>
							<div class="activityItem">
								<span>活动细节：</span>
								<textarea type="text" class="form-control activityInput"
									placeholder="" id="activityMore" required autofocus
									maxLength="200" style="resize: none;"></textarea>
							</div>
							<div class="activityItem">
								<span>活动图片</span> <span class="btn btn-success fileinput-button"
									style="width: auto;"> <i
									class="glyphicon glyphicon-plus"></i> <span>Add
										photos...</span> <!-- The file input field used as target for the file upload widget -->
									<input id="fileupload" type="file" name="files[]">
								</span>
							</div>
							<!-- The container for the uploaded files -->
							<div id="files" class="files"></div>
							<br>
						</div>
						<br></br>
						<div class="modal-footer">
							<button type="button" class="btn btn-default"
								data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary" id="saveActivity"
								value="upload">Save</button>
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
					<span class="activityTitle">Detail</span>
					<div class="detailBody">
						<div>
							<span class="glyphicon glyphicon-time activityShowTime">&nbsp;</span><span
								class="aT">Fri, Aug 1, 4:00 AM - 5:00 AM</span>
						</div>
						<div>
							<span class="glyphicon glyphicon-flag activityShowAddre">&nbsp;</span><span
								class='aA'>Hangouts On Air</span>
						</div>
						<div class="detailTxt activityShowD">Please join +Tony
							Darnell as he discusses an amazing technique developed by Dr.
							Rémi Soummer and his team at STScI to extract hidden planetary
							disks from Hubble data. The technique involves systematically
							removing bright light from a star, eventually revealing the disk
							hidden in its glare.</div>
					</div>
				</div>
				<div class="aBodyComment commentBtn">
					<div class="aCommentItem">
						<img alt="" src="images/user_img.jpg">
						<div class="col-lg-6">
							<input type="text" placeholder="Add a comment"
								class="form-control acBtn" id="commentText1407032926865" />
						</div>
						<div class="col-lg-3">
							<button type="button" class="btn btn-success" id="addComment"
								value="">Submit</button>
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
						<p>Hosted by:</p>
						<h1 class="communityName">Hubble Space Telescope</h1>
						<p class="communityNum">2,569,262 have them in circles</p>
						<button class="btn btn-danger activityAddCommunity">Add community</button>
					</div>
				</div>
				<div class="aBodyAsk">
					<h1>Are you going to join in?</h1>
					<select class="btn btn-default">
						<option>Maybe</option>
						<option class="activityJoin">Yes</option>
						<option class="leaveactivityJoin">No</option>
					</select>
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
	<script src="js/function.js"></script>
	<script src="js/EventHandle.js"></script>
	<script src="js/EventAPI.js"></script>
	<script src="js/activityShow.js"></script>
	<script src="js/global-initialization.js"></script>
	<script type="text/javascript">
		$(document).ready(
				function() {
					if (USERID != null && USERID != "") {
						login_initialization(USERID);
						clickEvent();
						if ($.parseJSON(sessionStorage.getItem("user")).userType == 'COMMUNITYOWNER') {
							$('.aBodyAsk').css("display", "none");
						}
					} else {
						clickOffEvent();
					}
					var url = window.location.search;
					var activityID = url.substr(url.indexOf("&") + 1);
					window.activity = FetchPostByID(activityID);
					var communityID = url.substr(url.indexOf("?") + 1, url
							.indexOf("&")
							- url.indexOf("?") - 1);
					window.community = FetchCommunityByID(communityID);
					showActivityDetail(activity, community);
				});
	</script>
	<%@ include file="parts/loginJavaScript.jsp"%>
</body>
</html>
