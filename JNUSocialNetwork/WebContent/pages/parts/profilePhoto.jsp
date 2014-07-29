<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="pro_body">
			<div class="photo photoAddBtn">
				<button class='btn btn-success' data-toggle='modal'
					data-target='#myModal2'>add</button>
				<!-- Modal -->
				<div class="modal fade" id="myModal2" tabindex="-1" role="dialog"
					aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal"
									aria-hidden="true">&times;</button>
								<h4 class="modal-title" id="myModalLabel">Add photos</h4>
							</div>
							<form class="photoForm" enctype="multipart/form-data">
								<div class="modal-body">
									<input type="file" name="file" multiple="multiple" />
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
			<div class="photo">
				<img src="images/photo.jpg" />
			</div>
			<div class="photo">
				<img src="images/photo.jpg" />
			</div>
			<div class="photo">
				<img src="images/photo3.jpg" />
			</div>
			<div class="photo">
				<img src="images/photo.jpg" />
			</div>
			<div class="photo">
				<img src="images/photo3.jpg" />
			</div>
			<div class="photo">
				<img src="images/photo.jpg" />
			</div>
		</div>
	</div>