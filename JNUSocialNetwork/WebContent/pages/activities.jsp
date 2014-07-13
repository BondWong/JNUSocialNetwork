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
	<div class="communityGroupTitle"><h3>发现社区</h3></div>
	<div class="container containerDiscovery">
		<div class="content_container">
			<a href="show.jsp"><div class="img_container">
					<img src="images/i1.jpg" />
				</div></a>
			<div class="content_info">
				<div class="conten_head">Joke of the Day</div>
				<div class="content_count">268,123 members</div>
				<div class="content_join" id="activityJoin" style="cursor: pointer">
					<a><input id="joinID" type='hidden' value="1" />Join</a>
				</div>
			</div>
		</div>
		<div class="content_container">
			<a href="show.jsp"><div class="img_container">
					<img src="images/i2.jpg" />
				</div></a>
			<div class="content_info">
				<div class="conten_head">Joke of the Day</div>
				<div class="content_count">268,123 members</div>
				<a><div class="content_join">Join</div></a>
			</div>
		</div>
		<div class="content_container">
			<a href="show.jsp"><div class="img_container">
					<img src="images/i3.jpg" />
				</div></a>
			<div class="content_info">
				<div class="conten_head">Joke of the Day</div>
				<div class="content_count">268,123 members</div>
				<a><div class="content_join">Join</div></a>
			</div>
		</div>
		<div class="content_container">
			<a href="show.jsp"><div class="img_container">
					<img src="images/i2.jpg" />
				</div></a>
			<div class="content_info">
				<div class="conten_head">Joke of the Day</div>
				<div class="content_count">268,123 members</div>
				<a><div class="content_join">Join</div></a>
			</div>
		</div>
		<div class="content_container">
			<a href="show.jsp"><div class="img_container">
					<img src="images/i1.jpg" />
				</div></a>
			<div class="content_info">
				<div class="conten_head">Joke of the Day</div>
				<div class="content_count">268,123 members</div>
				<a><div class="content_join">Join</div></a>
			</div>
		</div>
		<div class="content_container">
			<a href="show.jsp"><div class="img_container">
					<img src="images/i2.jpg" />
				</div></a>
			<div class="content_info">
				<div class="conten_head">Joke of the Day</div>
				<div class="content_count">268,123 members</div>
				<a><div class="content_join">Join</div></a>
			</div>
		</div>
		<div class="content_container">
			<a href="show.jsp"><div class="img_container">
					<img src="images/i3.jpg" />
				</div></a>
			<div class="content_info">
				<div class="conten_head">Joke of the Day</div>
				<div class="content_count">268,123 members</div>
				<a><div class="content_join">Join</div></a>
			</div>
		</div>
	  </div>
	  <div class="createCommunity">
	  	<div role="button" class="btn btn-sm btn-success createCom" data-toggle='modal' data-target='#createCommunity'>Create community</div>
	  	<div class="modal fade" id="createCommunity" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title" id="myModalLabel">Create community</h4>
							</div>
							<form class="photoForm" enctype="multipart/form-data">
								<div class="modal-body modalBody">
									<div class="pubCreate" id="createBlock">Public</div>
									<div class="priCreate" id="createBlock">Private</div>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-default"
										data-dismiss="modal">Close</button>
									<button type="button" class="btn btn-primary" id="btn_share" value="upload">Share</button>
								</div>
							</form>
						</div>
						<!-- /.modal-content -->
					</div>
					<!-- /.modal-dialog -->
				</div>
				<!-- /.modal -->
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
	<script type="text/javascript">
		Msnry('.containerDiscovery', '.content_container', 265);
	</script>
</body>
</html>
