<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- Placed at the end of the document so the pages load faster -->
<script src="js/jquery-1.10.2.js"></script>
<script src="js/jquery.json.min.js"></script>
<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
<script src="js/masonry.pkgd.min.js"></script>
<script src="js/imagesloaded.pkgd.min.js"></script>
<script src="js/global-initialization.js"></script>
<script src="js/EventAPI.js"></script>
<script src="js/function.js"></script>
<script src="js/activity.js"></script>
<script src="js/EventHandle.js"></script>
<%@ include file="loginJavaScript.jsp"%>
<script>
$(document)
.ready(
		function() {
			if (USERID != null && USERID != "") {
				login_initialization(USERID);
				clickEvent();
			} else {
				clickOffEvent();
			}
		});
</script>
<c:choose>
	<c:when test="${param.nav eq 'myactivity' }">
		<script type="text/javascript">
			fetchJoinedActivities();
			fetchActivitiesByOwner();
		</script>
	</c:when>
	<c:when test="${param.nav eq 'hit' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.hitActivity').css("background-color", "#f6f6f6");
			$('.hitActivity').css("border-left", "2px solid #4285f4");
			fetchHeatActivities("0", "16");
		</script>
	</c:when>
	<c:when test="${param.nav eq 'discovery' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.discoveryActivity').css("background-color", "#f6f6f6");
			$('.discoveryActivity').css("border-left", "2px solid #4285f4");
			fetchAllActivities("0", "16");
		</script>
	</c:when>
	<c:when test="${param.nav eq 'entertainment' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.entertainmentA').css("background-color", "#f6f6f6");
			$('.entertainmentA').css("border-left", "2px solid #4285f4");
			fetchActivitiesByType("ENTERTAINMENT","0", "16");
		</script>
	</c:when>
	<c:when test="${param.nav eq 'others' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.othersA').css("background-color", "#f6f6f6");
			$('.othersA').css("border-left", "2px solid #4285f4");
			fetchActivitiesByType("OTHERS","0", "16");
		</script>
	</c:when>
	<c:when test="${param.nav eq 'academic' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.academicA').css("background-color", "#f6f6f6");
			$('.academicA').css("border-left", "2px solid #4285f4");
			fetchActivitiesByType("ACADEMIC","0", "16");
		</script>
	</c:when>
	<c:when test="${param.nav eq 'athletic' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.athleticA').css("background-color", "#f6f6f6");
			$('.athleticA').css("border-left", "2px solid #4285f4");
			fetchActivitiesByType("ATHLETIC","0", "16");
		</script>
	</c:when>
</c:choose>