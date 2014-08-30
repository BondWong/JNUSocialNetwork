<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="pro_body">
			<div class="photo photoAddBtn">
				<button class='btn btn-success addphotoBtn' data-toggle='modal'
					data-target='#myModalPhoto'>Add photos</button>
				<!-- Modal -->
				<div class="modal fade" id="myModalPhoto" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title" id="myModalLabel">Add photos</h4>
							</div>
							<form class="photoForm" enctype="multipart/form-data">
								<div class="modal-body modalBody">
								
									<!-- The fileinput-button span is used to style the file input field as button -->
									<span class="btn btn-success fileinput-button photoAdd"> <i
										class="glyphicon glyphicon-plus"></i> <span>Add
											photos...</span> <!-- The file input field used as target for the file upload widget -->
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
										data-dismiss="modal">Close</button>
									<button type="button" class="btn btn-primary addPhoto"
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
		</div>