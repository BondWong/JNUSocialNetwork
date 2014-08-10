<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="js/jquery-1.10.2.js"></script>
<script src="js/jquery.json.min.js"></script>
<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
<script src="js/masonry.pkgd.min.js"></script>
<script src="js/imagesloaded.pkgd.min.js"></script>
<script src="js/EventAPI.js"></script>
<script src="js/function.js"></script>
<script src="js/about.js"></script>
<script src="js/EventHandle.js"></script>
<script src="js/global-initialization.js"></script>
<script type="text/javascript">
	var url = window.location.search;
	window.userID = url.substr(url.indexOf("&") + 1);
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
				Msnry('.pro_body', '.post', 435);
				fetchUserByID();
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
				} else {
					clickOffEvent();
				}
				Msnry('.pro_body', '.post', 435);
				fetchPostsByOwner();

			});
		</script>
	</c:otherwise>
</c:choose>