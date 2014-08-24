<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="profile_head">
	<div class="profile_info">
		<div class="profile_container">
			<div class="profile_user_img">
				<img class="img-circle" onload="javascript:auto_resize(120, 120, this)" src="images/user_img4.jpg"
					alt="Generic placeholder image">
			</div>
			<div class="profile_user_name">
				<strong>Zeonbong Wong</strong>
			</div>
		</div>
	</div>
	<div class="profile_img"><img src="images/about2.jpg" onload="javascript:auto_resize( 620, 300, this)"/></div>
	<!-- Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">Change Avatar</h4>
				</div>
				<form class="avatarForm" enctype="multipart/form-data">
					<div class="modal-body">
						<input type="file" name="file" />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary avatarImgBtn"
							value="upload">Save changes</button>
					</div>
				</form>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
	<!-- Modal -->
	<div class="modal fade" id="myModalB" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">Change Background</h4>
				</div>
				<form class="changBgForm" enctype="multipart/form-data">
					<div class="modal-body">
						<input type="file" name="file" />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary changeBg"
							value="upload">Save changes</button>
					</div>
				</form>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
</div>