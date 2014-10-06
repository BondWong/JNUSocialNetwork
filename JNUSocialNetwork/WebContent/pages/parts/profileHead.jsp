<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="profile_head">
	<div class="profile_info">
		<div class="profile_container">
			<div class="profile_user_img">
				<img class="img-circle profileAvatar"
					onload="javascript:auto_resize( 120, 120, this)" src=""
					alt="Generic placeholder image"  style="display: none">
			</div>
			<div class="profile_user_name">
				<strong></strong>
			</div>
			<div class='followBtnA'><button class='btn btn-danger followBtnAB'>Follow</button></div>
			<div class='followInfo'><span class='followNum'>4</span><span>&nbsp;粉丝</span></div>
		</div>
	</div>
	<div class="profile_img">
		<img class="profileImgDiv" src=""
			onload="javascript:auto_resize( 620, 300, this)"
			style="display: none" />
	</div>
	<!-- Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">换头像</h4>
				</div>
				<form class="avatarForm" enctype="multipart/form-data">
					<div class="modal-body">
						<input type="file" name="file" />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary avatarImgBtn"
							value="upload">保存</button>
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
					<h4 class="modal-title" id="myModalLabel">换背景</h4>
				</div>
				<form class="changBgForm" enctype="multipart/form-data">
					<div class="modal-body">
						<input type="file" name="file" />
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary changeBg"
							value="upload">保存</button>
					</div>
				</form>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal-dialog -->
	</div>
	<!-- /.modal -->
</div>