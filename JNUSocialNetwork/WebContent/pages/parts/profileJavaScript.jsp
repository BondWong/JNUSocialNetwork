<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

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
<script src="js/layer.min.js"></script>
<script src="js/layer.ext.js"></script>
<script src="js/EventAPI.js"></script>
<script src="js/function.js"></script>
<script src="js/about.js"></script>
<script src="js/EventHandle.js"></script>
<script src="js/global-initialization.js"></script>
<script type="text/javascript">
	var url = window.location.search;
	window.userID = url.substr(url.indexOf("&") + 1);
	window.fileDri = [];
	window.postIdContainer = [];
	$('body').on('click', '.aboutNav', function() {
		window.location.href = "profile.jsp?nav=about&" + userID;
	});
	$('body').on('click', '.postNav', function() {
		window.location.href = "profile.jsp?nav=post&" + userID;
	});
	$('body').on('click', '.photoNav', function() {
		window.location.href = "profile.jsp?nav=photo&" + userID;
	});
	$('body').on('click', '.circleNav', function() {
		window.location.href = "profile.jsp?nav=circle&" + userID;
		
	});
	fetchUserByID();
</script>
<c:choose>
	<c:when test="${param.nav eq 'about' }">
		<script type="text/javascript">
			$(document).ready(function() {
				if (USERID != null && USERID != "") {
					login_initialization(USERID);
					aboutClickEvent();
					clickEvent();
				} else {
					clickOffEvent();
				}
				Msnry('.about_body', '.post', 435);
			});
		</script>
	</c:when>
	<c:when test="${param.nav eq 'photo' }">
		<script type="text/javascript">
			$(document).ready(function() {
				if (USERID != null && USERID != "") {
					login_initialization(USERID);
					aboutClickEvent();
					clickEvent();
				} else {
					clickOffEvent();
				}
				Msnry('.pro_body', '.photo', 280);
				showPhotos();

			});
		</script>
	</c:when>
	<c:when test="${param.nav eq 'circle' }">
		<script type="text/javascript">
			$(document).ready(function() {
				if (USERID != null && USERID != "") {
					login_initialization(USERID);
					aboutClickEvent();
					clickEvent();
				} else {
					clickOffEvent();
				}
				Msnry('.pro_body', '.post', 435);
				showFollowees();
				showFollowers();

			});
		</script>
	</c:when>
	<c:otherwise>
		<script type="text/javascript">
			$(document).ready(function() {
				if (USERID != null && USERID != "") {
					login_initialization(USERID);
					aboutClickEvent();
					clickEvent();
					if(USERID == userID){
						$('.sharePro').css("display","block");
					}
				} else {
					clickOffEvent();
				}
				Msnry('.pro_body', '.post', 435);
				fetchPostsByOwner();

			});
		</script>
		<%@ include file="contentScroll.jsp"%>
	</c:otherwise>
</c:choose>
