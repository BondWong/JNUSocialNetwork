<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- Placed at the end of the document so the pages load faster -->
<script src="js/jquery-1.10.2.js"></script>
<script src="js/noti-sound/jquery.playSound.js"></script>
<script src="js/jquery.json.min.js"></script>
<script src="styles/bootstrap-3.0.3-dist/dist/js/bootstrap.min.js"></script>
<script src="js/masonry.pkgd.min.js"></script>
<script src="js/imagesloaded.pkgd.min.js"></script>
 <script src="js/bootstrap-datetimepicker.min.js"></script>
<script src="js/global-initialization.js"></script>
<script src="js/EventAPI.js"></script>
<script src="js/function.js"></script>
<script src="js/activity.js"></script>
 <script src="js/activityCre.js"></script>
<script src="js/EventHandle.js"></script>
<%@ include file="loginJavaScript.jsp"%>
<script>
$(document)
.ready(
		function() {
			if (USERID != null && USERID != "") {
				login_initialization(USERID);
				clickEvent();
				activityClickAEvent();
				if ($.parseJSON(sessionStorage.getItem("user")).userType == 'COMMUNITYOWNER'
					&& $.parseJSON(sessionStorage.getItem("user")).communityIDNameTuples.length >=1) {
				$('.othersA').after("<a class='peopeleType' id='createActivityABtn' class='btn btn-primary' data-toggle='modal' data-target='#activityCommunity'>创建活动</a>");
			}
			} else {
				clickOffEvent();
			}
			$('.activityHome').css({
				"color":"#fff",
				"border-bottom":"1px solid #BE3948"
			});
		});
</script>
<c:choose>
	<c:when test="${param.nav eq 'myactivity' }">
		<script type="text/javascript">
			fetchJoinedActivities();
			fetchActivitiesByOwner();
			$(window)
			.scroll(
					function() {
						if ($(window).scrollTop() == $(document).height()
								- window.windowHeight) {
							var startIndex = $('.activity').length;
							$('div#infinite_loader').show();
							var response = FetchJoinedActivities(USERID,
									startIndex, pageSize);
							if (response.length != 0) {
								$
										.each(
												response,
												function(n, dataString) {
													if (dataString.available == true
															&& $("div[class='activity post"
																	+ dataString.ID
																	+ "']").length == 0) {
														var boarddiv = activity(
																dataString.ID,
																dataString.attributes.activityName,
																dataString.attributes.activityTime,
																dataString.attributes.activityAddr,
																dataString.attributes.activityMore,
																dataString.attributes.background,
																dataString.owner.attributes.avatarLink,
																dataString.owner.ID,
																dataString.participantIDs,
																dataString.attributes.startDate,
																dataString.attributes.limitation,
																dataString.attributes.ifUpload,dataString.attributes.inquery);
														$(".activityBody").append(
																boarddiv);
														Msnry('.activityBody',
																'.activity', 330);
													}
												});
							}

							if (response.length == pageSize) {
								$('div#infinite_loader').hide();
							} else {
								$('div#infinite_loader')
										.replaceWith(
												'<div id="no_more_infinite_load"><span>no more</span></div>');
								$(window).unbind("scroll");
							}
						}
					});
		</script>
	</c:when>
	<c:when test="${param.nav eq 'hit' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.hitActivity').css("background-color", "#f6f6f6");
			$('.hitActivity').css("border-left", "2px solid #4285f4");
			fetchHeatActivities("0", "16");
			$(window)
			.scroll(
					function() {
						if ($(window).scrollTop() == $(document).height()
								- window.windowHeight) {
							var startIndex = $('.activity').length;
							$('div#infinite_loader').show();
							var response = FetchHeatActivities(
									startIndex, pageSize);
							if (response.length != 0) {
								$
										.each(
												response,
												function(n, dataString) {
													if (dataString.available == true
															&& $("div[class='activity post"
																	+ dataString.ID
																	+ "']").length == 0) {
														var boarddiv = activity(
																dataString.ID,
																dataString.attributes.activityName,
																dataString.attributes.activityTime,
																dataString.attributes.activityAddr,
																dataString.attributes.activityMore,
																dataString.attributes.background,
																dataString.owner.attributes.avatarLink,
																dataString.owner.ID,
																dataString.participantIDs,
																dataString.attributes.startDate,
																dataString.attributes.limitation,
																dataString.attributes.ifUpload,dataString.attributes.inquery);
														$(".activityBody").append(
																boarddiv);
														Msnry('.activityBody',
																'.activity', 330);
													}
												});
							}

							if (response.length == pageSize) {
								$('div#infinite_loader').hide();
							} else {
								$('div#infinite_loader')
										.replaceWith(
												'<div id="no_more_infinite_load"><span>no more</span></div>');
								$(window).unbind("scroll");
							}
						}
					});
		</script>
	</c:when>
	<c:when test="${param.nav eq 'discovery' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.discoveryActivity').css("background-color", "#f6f6f6");
			$('.discoveryActivity').css("border-left", "2px solid #4285f4");
			fetchAllActivities("0", "16");
			$(window)
			.scroll(
					function() {
						if ($(window).scrollTop() == $(document).height()
								- window.windowHeight) {
							var startIndex = $('.activity').length;
							$('div#infinite_loader').show();
							var response = FetchAllActivities(
									startIndex, pageSize);
							if (response.length != 0) {
								$
										.each(
												response,
												function(n, dataString) {
													if (dataString.available == true
															&& $("div[class='activity post"
																	+ dataString.ID
																	+ "']").length == 0) {
														var boarddiv = activity(
																dataString.ID,
																dataString.attributes.activityName,
																dataString.attributes.activityTime,
																dataString.attributes.activityAddr,
																dataString.attributes.activityMore,
																dataString.attributes.background,
																dataString.owner.attributes.avatarLink,
																dataString.owner.ID,
																dataString.participantIDs,
																dataString.attributes.startDate,
																dataString.attributes.limitation,
																dataString.attributes.ifUpload,dataString.attributes.inquery);
														$(".activityBody").append(
																boarddiv);
														Msnry('.activityBody',
																'.activity', 330);
													}
												});
							}

							if (response.length == pageSize) {
								$('div#infinite_loader').hide();
							} else {
								$('div#infinite_loader')
										.replaceWith(
												'<div id="no_more_infinite_load"><span>no more</span></div>');
								$(window).unbind("scroll");
							}
						}
					});
		</script>
	</c:when>
	<c:when test="${param.nav eq 'entertainment' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.entertainmentA').css("background-color", "#f6f6f6");
			$('.entertainmentA').css("border-left", "2px solid #4285f4");
			fetchActivitiesByType("ENTERTAINMENT","0", "16");
			$(window)
			.scroll(
					function() {
						if ($(window).scrollTop() == $(document).height()
								- window.windowHeight) {
							var startIndex = $('.activity').length;
							$('div#infinite_loader').show();
							var response = FetchActivitiesByType("ENTERTAINMENT",
									startIndex, pageSize);
							if (response.length != 0) {
								$
										.each(
												response,
												function(n, dataString) {
													if (dataString.available == true
															&& $("div[class='activity post"
																	+ dataString.ID
																	+ "']").length == 0) {
														var boarddiv = activity(
																dataString.ID,
																dataString.attributes.activityName,
																dataString.attributes.activityTime,
																dataString.attributes.activityAddr,
																dataString.attributes.activityMore,
																dataString.attributes.background,
																dataString.owner.attributes.avatarLink,
																dataString.owner.ID,
																dataString.participantIDs,
																dataString.attributes.startDate,
																dataString.attributes.limitation,
																dataString.attributes.ifUpload,dataString.attributes.inquery);
														$(".activityBody").append(
																boarddiv);
														Msnry('.activityBody',
																'.activity', 330);
													}
												});
							}

							if (response.length == pageSize) {
								$('div#infinite_loader').hide();
							} else {
								$('div#infinite_loader')
										.replaceWith(
												'<div id="no_more_infinite_load"><span>no more</span></div>');
								$(window).unbind("scroll");
							}
						}
					});
		</script>
	</c:when>
	<c:when test="${param.nav eq 'others' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.othersA').css("background-color", "#f6f6f6");
			$('.othersA').css("border-left", "2px solid #4285f4");
			fetchActivitiesByType("OTHERS","0", "16");
			$(window)
			.scroll(
					function() {
						if ($(window).scrollTop() == $(document).height()
								- window.windowHeight) {
							var startIndex = $('.activity').length;
							$('div#infinite_loader').show();
							var response = FetchActivitiesByType("OTHERS",
									startIndex, pageSize);
							if (response.length != 0) {
								$
										.each(
												response,
												function(n, dataString) {
													if (dataString.available == true
															&& $("div[class='activity post"
																	+ dataString.ID
																	+ "']").length == 0) {
														var boarddiv = activity(
																dataString.ID,
																dataString.attributes.activityName,
																dataString.attributes.activityTime,
																dataString.attributes.activityAddr,
																dataString.attributes.activityMore,
																dataString.attributes.background,
																dataString.owner.attributes.avatarLink,
																dataString.owner.ID,
																dataString.participantIDs,
																dataString.attributes.startDate,
																dataString.attributes.limitation,
																dataString.attributes.ifUpload,dataString.attributes.inquery);
														$(".activityBody").append(
																boarddiv);
														Msnry('.activityBody',
																'.activity', 330);
													}
												});
							}

							if (response.length == pageSize) {
								$('div#infinite_loader').hide();
							} else {
								$('div#infinite_loader')
										.replaceWith(
												'<div id="no_more_infinite_load"><span>no more</span></div>');
								$(window).unbind("scroll");
							}
						}
					});
		</script>
	</c:when>
	<c:when test="${param.nav eq 'academic' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.academicA').css("background-color", "#f6f6f6");
			$('.academicA').css("border-left", "2px solid #4285f4");
			fetchActivitiesByType("ACADEMIC","0", "16");
			$(window)
			.scroll(
					function() {
						if ($(window).scrollTop() == $(document).height()
								- window.windowHeight) {
							var startIndex = $('.activity').length;
							$('div#infinite_loader').show();
							var response = FetchActivitiesByType("ACADEMIC",
									startIndex, pageSize);
							if (response.length != 0) {
								$
										.each(
												response,
												function(n, dataString) {
													if (dataString.available == true
															&& $("div[class='activity post"
																	+ dataString.ID
																	+ "']").length == 0) {
														var boarddiv = activity(
																dataString.ID,
																dataString.attributes.activityName,
																dataString.attributes.activityTime,
																dataString.attributes.activityAddr,
																dataString.attributes.activityMore,
																dataString.attributes.background,
																dataString.owner.attributes.avatarLink,
																dataString.owner.ID,
																dataString.participantIDs,
																dataString.attributes.startDate,
																dataString.attributes.limitation,
																dataString.attributes.ifUpload,dataString.attributes.inquery);
														$(".activityBody").append(
																boarddiv);
														Msnry('.activityBody',
																'.activity', 330);
													}
												});
							}

							if (response.length == pageSize) {
								$('div#infinite_loader').hide();
							} else {
								$('div#infinite_loader')
										.replaceWith(
												'<div id="no_more_infinite_load"><span>no more</span></div>');
								$(window).unbind("scroll");
							}
						}
					});
		</script>
	</c:when>
	<c:when test="${param.nav eq 'athletic' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.athleticA').css("background-color", "#f6f6f6");
			$('.athleticA').css("border-left", "2px solid #4285f4");
			fetchActivitiesByType("ATHLETIC","0", "16");
			$(window)
			.scroll(
					function() {
						if ($(window).scrollTop() == $(document).height()
								- window.windowHeight) {
							var startIndex = $('.activity').length;
							$('div#infinite_loader').show();
							var response = FetchActivitiesByType("ATHLETIC",
									startIndex, pageSize);
							if (response.length != 0) {
								$
										.each(
												response,
												function(n, dataString) {
													if (dataString.available == true
															&& $("div[class='activity post"
																	+ dataString.ID
																	+ "']").length == 0) {
														var boarddiv = activity(
																dataString.ID,
																dataString.attributes.activityName,
																dataString.attributes.activityTime,
																dataString.attributes.activityAddr,
																dataString.attributes.activityMore,
																dataString.attributes.background,
																dataString.owner.attributes.avatarLink,
																dataString.owner.ID,
																dataString.participantIDs,
																dataString.attributes.startDate,
																dataString.attributes.limitation,
																dataString.attributes.ifUpload,dataString.attributes.inquery);
														$(".activityBody").append(
																boarddiv);
														Msnry('.activityBody',
																'.activity', 330);
													}
												});
							}

							if (response.length == pageSize) {
								$('div#infinite_loader').hide();
							} else {
								$('div#infinite_loader')
										.replaceWith(
												'<div id="no_more_infinite_load"><span>no more</span></div>');
								$(window).unbind("scroll");
							}
						}
					});
		</script>
	</c:when>
</c:choose>