<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<script src="js/jquery-1.10.2.js"></script>
<script src="js/jquery.json.min.js"></script>
<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
<script src="js/masonry.pkgd.min.js"></script>
<script src="js/imagesloaded.pkgd.min.js"></script>
<script src="js/function.js"></script>
<script src="js/EventHandle.js"></script>
<c:choose>
	<c:when test="${param.nav eq 'about' }">
		<script type="text/javascript">
			Msnry('.pro_body', '.post', 435);
			getUserRepresentation();
			//aboutUpdata();
		</script>
	</c:when>
	<c:when test="${param.nav eq 'photo' }">
		<script type="text/javascript">
			Msnry('.pro_body', '.photo', 280);
			showPhotos();
		</script>
	</c:when>
	<c:when test="${param.nav eq 'circle' }">
		<script type="text/javascript">
			Msnry('.pro_body', '.post', 435);
			showFollowees();
		</script>
	</c:when>
	<c:otherwise>
		<script type="text/javascript">
			Msnry('.pro_body', '.post', 435);
			fetchPostsByUserID();
		</script>
	</c:otherwise>
</c:choose>