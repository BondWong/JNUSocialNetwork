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
	<div class="container container_custom">
		<div class="activityHead">
			<img alt="" width="100%" src="images/activityHead.jpg">
			<div class="activityInfo">
				<p class="activityShowName">草地吉他弹唱会</p>
				<div class="activityShare">
					<span class="glyphicon glyphicon-heart-empty" style="font-size: 20px"></span>
					<span class="glyphicon glyphicon-share-alt" style="font-size: 20px"></span>
				</div>
			</div>
		</div>
		<div class="activityBody">
			<div class="aBodyLeft">
				<div class="activityDetail">
					<span class="activityTitle">Detail</span>
					<div class="detailBody">
						<span class="glyphicon glyphicon-user activityShowOwner">&nbsp;Create By WinsonLau</span>
						<span class="glyphicon glyphicon-time activityShowTime">&nbsp;Fri, Aug 1, 4:00 AM - 5:00 AM</span>
						<span class="glyphicon glyphicon-flag activityShowAddre">&nbsp;Hangouts On Air</span>
						<div class="detailTxt activityShowD">Please join +Tony Darnell as he discusses an amazing technique developed by Dr. Rémi Soummer and his team at STScI to extract hidden planetary disks from Hubble data.  The technique involves systematically removing bright light from a star, eventually revealing the disk hidden in its glare.</div>
					</div>
				</div>
				<div class="aBodyComment commentBtn">
					<div class="aCommentItem">
						
							<img alt=""  src="images/user_img.jpg">
						
						<div class="col-lg-6">								
									<input type="text" placeholder="Add a comment"
										class="form-control" id="commentText12" />
						</div>
						<div class="col-lg-3">
							<button type="button" class="btn btn-success" id="addComment"
								value="12">Submit</button>
						</div>
					</div>
				</div>
				<div class="aBodyComment">
					<div class="aCommentItem">
						<img alt=""  src="images/user_img.jpg">
						<div class="user_name">
							<strong>Winson_Lau</strong>
						</div>
						<div class="user_info">Yesterday 21:23pm</div>
						<br>
						<div>Please join +Tony Darnell as he discusses an amazing technique developed by</div>
					</div>
				</div>
				<div class="aBodyComment">
					<div class="aCommentItem">
						<img alt=""  src="images/user_img.jpg">
						<div class="user_name">
							<strong>Winson_Lau</strong>
						</div>
						<div class="user_info">Yesterday 21:23pm</div>
						<br>
						<div>Please join +Tony Darnell as he discusses an amazing technique developed by</div>
					</div>
				</div>
			</div>
			<div class="aBodyRight">
				<div class="aBodyCard">
					<div class="communityBS"><img alt="" src="images/communityBgSm.jpg"></div>
					<div class="cBcontent">
						<img src="images/user_img4.jpg" />
						<p>Hosted by:</p>
						<h1>Hubble Space Telescope</h1>
						<p>2,569,262 have them in circles</p>
						<button class="btn btn-danger">Add community</button>
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
	<%@ include file="parts/securityCode.jsp"%>
	<script src="js/jquery-1.10.2.js"></script>
	<script src="js/jquery.json.min.js"></script>
	<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
	<script src="js/masonry.pkgd.min.js"></script>
	<script src="js/imagesloaded.pkgd.min.js"></script>
	<script src="js/function.js"></script>
	<script src="js/EventHandle.js"></script>
	<script src="js/EventAPI.js"></script>
	<script src="js/activityShow.js"></script>
	<script type="text/javascript">
		showActivityDetail();
	</script>
</body>
</html>
