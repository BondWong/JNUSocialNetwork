<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/noti-sound/jquery.playSound.js"></script>
<script src="js/jquery.json.min.js"></script>
<script src="styles/bootstrap-3.2.0-dist/js/bootstrap.min.js"></script>
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
<!-- cropper plugin -->
<script src="js/cropper.min.js"></script>
<script src="js/crop-avatar.js"></script>
<script src="js/about.js"></script>
<script src="js/EventHandle.js"></script>
<script src="js/global-initialization.js"></script>

<script type="text/javascript">
	var url = window.location.search;
	window.userID = url.substr(url.indexOf("&") + 1);
	window.userInfo = FetchUserByID(userID);
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
			$(document)
					.ready(
							function() {
								if (USERID != null && USERID != "") {
									login_initialization(USERID);
									aboutClickEvent();
									clickEvent();
								} else {
									clickOffEvent();
								}
								communityInfo();
								Msnry('.about_body', '.post', 435);
								var tags = FetchHeatLookingForTag("0", "20");
								$
										.each(
												tags.reverse(),
												function(n, tag) {
													var tagS = "<span title='" + tag.ID + "' id='tagSpan'>"
															+ tag.ID
															+ "</span>";
													$('.tagSB').after(tagS);
												});
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
				showPhotos();
				Msnry('.pro_body', '.photo', 280);
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
				Msnry('.about_body', '.post', 435);
				showFollowees();
				showFollowers();

			});
		</script>
	</c:when>
	<c:otherwise>
		<script type="text/javascript">
			$(document)
					.ready(
							function() {
								if (USERID != null && USERID != "") {
									login_initialization(USERID);
									aboutClickEvent();
									clickEvent();
									if (USERID == userID) {
										$('.sharePro').css("display", "block");
									}
								} else {
									clickOffEvent();
								}
								Msnry('.pro_body', '.post', 435);
								fetchPostsByOwner();
								$(window)
										.scroll(
												function() {
													if ($(window).scrollTop() == $(
															document).height()
															- window.windowHeight) {
														var startIndex = $('.post').length - 1;
														$('div#infinite_loader')
																.show();
														var url = window.location.search;
														var otherUserID = url
																.substr(url
																		.indexOf("&") + 1);
														var response = [];
														response = FetchPostsByOwner(
																otherUserID,
																startIndex,
																pageSize);
														$
																.each(
																		response,
																		function(
																				n,
																				dataString) {
																			if (dataString.postType == "NORMAL"
																					&& dataString.available == true
																					&& $("div[class='post "
																							+ dataString.ID
																							+ "']").length == 0) {
																				var boarddiv = post(
																						dataString.owner.ID,
																						dataString.owner.attributes.name,
																						dataString.publishDate,
																						dataString.attributes.content,
																						dataString.ID,
																						dataString.likerIDs,
																						dataString.collectorIDs,
																						dataString.imageLinks,
																						dataString.owner.attributes.avatarLink);
																				$(
																						".pro_body")
																						.append(
																								boarddiv);
																				Msnry(
																						'.pro_body',
																						'.post',
																						435);
																			}
																		});
														if (response.length == pageSize) {
															$(
																	'div#infinite_loader')
																	.hide();
														} else {
															$(
																	'div#infinite_loader')
																	.replaceWith(
																			'<div id="no_more_infinite_load"><span>no more</span></div>');
															$(window).unbind(
																	"scroll");
														}
													}
												});
							});
		</script>
		<%@ include file="contentScroll.jsp"%>
	</c:otherwise>
</c:choose>
