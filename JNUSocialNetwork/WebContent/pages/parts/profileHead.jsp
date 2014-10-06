<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<div class="profile_head">
	<div class="profile_info">
		<div class="profile_container">
			<div class="profile_user_img avatar-view">
				<img class="img-circle profileAvatar"
					onload="javascript:auto_resize( 120, 120, this)" src=""
					alt="Generic placeholder image"  style="display: none">
			</div>
			<div class="profile_user_name">
				<strong></strong>
			</div>
			<div class='followBtnA'><button class='btn btn-danger followBtnAB'>Follow</button></div>
			<div class='followInfo'><span class='followNum'>4</span><span>&nbsp;粉丝</span><span>&nbsp;|&nbsp;</span><span>123</span><span>&nbsp;赞</span></div>
		</div>
	</div>
	<div class="profile_img  avatar-view">
		<img class="profileImgDiv" src=""
			onload="javascript:auto_resize( 620, 300, this)"
			style="display: none" />
	</div>
	
	    <!-- Cropping avatar modal -->
        <div class="modal fade" id="avatar-modal" tabindex="-1" role="dialog" aria-labelledby="avatar-modal-label" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form class="avatar-form" method="post" action="/app/fileUploader" enctype="multipart/form-data">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title" id="avatar-modal-label">更换头像</h4>
                        </div>
                        <div class="modal-body">
                            <div class="avatar-body">

                                <!-- Upload image and data -->
                                <div class="avatar-upload">
                                    <input class="avatar-src" name="avatar_src" type="hidden">
                                    <input class="avatar-data" name="crop_data" type="hidden">
                                    <span class="btn btn-primary fileinput-button">
                                        <i class="glyphicon glyphicon-folder-open"></i><span>&nbsp;&nbsp;browse...</span>
                                    <input class="avatar-input" id="avatarInput" type="file" name="avatar_file" accept="image/jpeg,image/png">
                                    </span>
                                    <span>&nbsp;&nbsp;图片文件大小请勿超过2MB！</span>
                                </div>

                                <!-- Crop and preview -->
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="avatar-wrapper"></div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="avatar-preview preview-lg"></div>
                                        <div class="avatar-preview preview-md img-circle"></div>
                                        <div class="avatar-preview preview-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" type="button" data-dismiss="modal">取消</button>
                            <button type="submit" class="btn btn-success avatar-save" value="upload"><i class="glyphicon glyphicon-upload"></i>&nbsp;保存</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- /.modal -->
        
        <!-- Loading state -->
        <div class="loading" tabindex="-1" role="img" aria-label="Loading"></div>
	
	    <!-- Cropping userbackgroud modal -->
        <div class="modal fade" id="userbg-modal" tabindex="-1" role="dialog" aria-labelledby="userbg-modal-label" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <form class="avatar-form" method="post" action="/app/fileUploader" enctype="multipart/form-data">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title" id="userbg-modal-label">更换装饰背景</h4>
                        </div>
                        <div class="modal-body">
                            <div class="avatar-body">

                                <!-- Upload image and data -->
                                <div class="avatar-upload">
                                    <input class="avatar-src" name="avatar_src" type="hidden">
                                    <input class="avatar-data" name="crop_data" type="hidden">
                                    <span class="btn btn-primary fileinput-button">
                                        <i class="glyphicon glyphicon-folder-open"></i><span>&nbsp;&nbsp;browse...</span>
                                    <input class="avatar-input" id="avatarInput" type="file" name="avatar_file" accept="image/jpeg,image/png">
                                    </span>
                                    <span>&nbsp;&nbsp;图片文件大小请勿超过5MB！</span>
                                </div>

                                <!-- Crop and preview -->
                                <div class="row">
                                        <div class="avatar-wrapper"></div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" type="button" data-dismiss="modal">取消</button>
                            <button type="submit" class="btn btn-success avatar-save" value="upload"><i class="glyphicon glyphicon-upload"></i>&nbsp;保存</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- /.modal -->
</div>