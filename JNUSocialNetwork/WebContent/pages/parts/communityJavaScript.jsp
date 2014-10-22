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
<script src="js/EventAPI.js"></script>
<script src="js/function.js"></script>
<script src="js/community.js"></script>
<script src="js/EventHandle.js"></script>
<%@ include file="loginJavaScript.jsp"%>
<script src="js/global-initialization.js"></script>
<script>
	$(document)
			.ready(
					function() {
						if (USERID != null && USERID != "") {
							login_initialization(USERID);
							clickEvent();
							communityClickEvent();
							var ownLength = FetchCommunityByOwner(USERID, "0",
									"1").length;
							var joinLength = FetchCommunityByJoin(USERID, "0",
									"2").length;
							if ($.parseJSON(sessionStorage.getItem("user")).userType == 'COMMUNITYOWNER'
									&& ownLength < 1) {
								$('.createCom').css("display", "block");
							}

							if (joinLength + ownLength == 0) {
								$('.guideCommunity').css("display", "block");
							}
						} else {
							clickOffEvent();
							$('.myCommunityBtn').remove();
						}
						$('.communityHome').css({
							"color":"#fff",
							"border-bottom":"1px solid #BE3948"
						});
					});
</script>
<c:choose>
	<c:when test="${param.nav eq 'mycommunity' }">
		<script type="text/javascript">
			pageSize = 15;
			fetchCommunityByJoin(pageSize);
			fetchCommunityByOwner("1");
			$(window)
					.scroll(
							function() {
								if ($(window).scrollTop() == $(document)
										.height()
										- window.windowHeight) {
									$('div#infinite_loader').show();
									var response = FetchCommunityByJoin(USERID,
											$('.content_container').length,
											pageSize + 1);
									$
											.each(
													response.reverse(),
													function(n, community) {
														if (community.available == true
																&& $("input[value='"
																		+ community.ID
																		+ "']").length == 0) {
															var boarddiv = communities(
																	community.ID,
																	community.attributes.name,
																	community.members.length,
																	community.communityType,
																	community.attributes.communityCard,
																	community.members,
																	community.attributes.userID);
															$(".containerMy")
																	.append(
																			boarddiv);
															Msnry(
																	'.containerMy',
																	'.content_container',
																	265);
														}
													});
									if (response.length == "15") {
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
			$('.athleticC').css("background-color", "#f6f6f6");
			$('.athleticC').css("border-left", "2px solid #4285f4");
			pageSize = 16;
			fetchCommunityByType("ATHLETIC", pageSize);
			$(window)
					.scroll(
							function() {
								if ($(window).scrollTop() == $(document)
										.height()
										- window.windowHeight) {
									$('div#infinite_loader').show();
									var response = FetchCommunityByType(
											"ATHLETIC",
											$('.content_container').length,
											pageSize);
									$
											.each(
													response.reverse(),
													function(n, community) {
														if (community.available == true
																&& $("input[value='"
																		+ community.ID
																		+ "']").length == 0) {
															var boarddiv = communities(
																	community.ID,
																	community.attributes.name,
																	community.members.length,
																	community.communityType,
																	community.attributes.communityCard,
																	community.members,
																	community.attributes.userID);
															$(
																	".containerOffical")
																	.append(
																			boarddiv);
															Msnry(
																	'.containerOffical',
																	'.content_container',
																	265);
														}
													});
									if (response.length == "15") {
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
			$('.entertainmentC').css("background-color", "#f6f6f6");
			$('.entertainmentC').css("border-left", "2px solid #4285f4");
			pageSize = 16;
			fetchCommunityByType("ENTERTAINMENT", pageSize);
			$(window)
					.scroll(
							function() {
								if ($(window).scrollTop() == $(document)
										.height()
										- window.windowHeight) {
									$('div#infinite_loader').show();
									var response = FetchCommunityByType(
											"ENTERTAINMENT",
											$('.content_container').length,
											pageSize);
									$
											.each(
													response.reverse(),
													function(n, community) {
														if (community.available == true
																&& $("input[value='"
																		+ community.ID
																		+ "']").length == 0) {
															var boarddiv = communities(
																	community.ID,
																	community.attributes.name,
																	community.members.length,
																	community.communityType,
																	community.attributes.communityCard,
																	community.members,
																	community.attributes.userID);
															$(
																	".containerEntertainment")
																	.append(
																			boarddiv);
															Msnry(
																	'.containerEntertainment',
																	'.content_container',
																	265);
														}
													});
									if (response.length == "15") {
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
			$('.othersC').css("background-color", "#f6f6f6");
			$('.othersC').css("border-left", "2px solid #4285f4");
			pageSize = 16;
			fetchCommunityByType("OTHERS", pageSize);
			$(window)
					.scroll(
							function() {
								if ($(window).scrollTop() == $(document)
										.height()
										- window.windowHeight) {
									$('div#infinite_loader').show();
									var response = FetchCommunityByType(
											"OTHERS",
											$('.content_container').length,
											pageSize);
									$
											.each(
													response.reverse(),
													function(n, community) {
														if (community.available == true
																&& $("input[value='"
																		+ community.ID
																		+ "']").length == 0) {
															var boarddiv = communities(
																	community.ID,
																	community.attributes.name,
																	community.members.length,
																	community.communityType,
																	community.attributes.communityCard,
																	community.members,
																	community.attributes.userID);
															$(
																	".containerOthers")
																	.append(
																			boarddiv);
															Msnry(
																	'.containerOthers',
																	'.content_container',
																	265);
														}
													});
									if (response.length == "15") {
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
	<c:when test="${param.nav eq 'student' }">
		<script type="text/javascript">
			$('.peopeleType').css("background-color", "#fff");
			$('.peopeleType').css("border-left", "#4285f4");
			$('.studentC').css("background-color", "#f6f6f6");
			$('.studentC').css("border-left", "2px solid #4285f4");
			pageSize = 16;
			fetchCommunityByType("STUDENTUNION", pageSize);
			$(window)
					.scroll(
							function() {
								if ($(window).scrollTop() == $(document)
										.height()
										- window.windowHeight) {
									$('div#infinite_loader').show();
									var response = FetchCommunityByType(
											"STUDENTUNION",
											$('.content_container').length,
											pageSize);
									$
											.each(
													response.reverse(),
													function(n, community) {
														if (community.available == true
																&& $("input[value='"
																		+ community.ID
																		+ "']").length == 0) {
															var boarddiv = communities(
																	community.ID,
																	community.attributes.name,
																	community.members.length,
																	community.communityType,
																	community.attributes.communityCard,
																	community.members,
																	community.attributes.userID);
															$(
																	".containerSchool")
																	.append(
																			boarddiv);
															Msnry(
																	'.containerSchool',
																	'.content_container',
																	265);
														}
													});
									if (response.length == "15") {
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
			$('.discoveryC').css("background-color", "#f6f6f6");
			$('.discoveryC').css("border-left", "2px solid #4285f4");
			pageSize = 16;
			fetchHotCommunity(pageSize);
			$(window)
					.scroll(
							function() {
								if ($(window).scrollTop() == $(document)
										.height()
										- window.windowHeight) {
									$('div#infinite_loader').show();
									var response = FetchCommunity(
											$('.content_container').length,
											pageSize);
									$
											.each(
													response,
													function(n, community) {
														if (community.available == true
																&& $("input[value='"
																		+ community.ID
																		+ "']").length == 0) {
															var boarddiv = communities(
																	community.ID,
																	community.attributes.name,
																	community.members.length,
																	community.communityType,
																	community.attributes.communityCard,
																	community.members,
																	community.attributes.userID);
															$(
																	".containerDiscovery")
																	.append(
																			boarddiv);
															Msnry(
																	'.containerDiscovery',
																	'.content_container',
																	265);
														}
													});
									if (response.length == "15") {
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
			$('.academicC').css("background-color", "#f6f6f6");
			$('.academicC').css("border-left", "2px solid #4285f4");
			pageSize = 16;
			fetchCommunityByType("ACADEMIC", pageSize);
			$(window)
					.scroll(
							function() {
								if ($(window).scrollTop() == $(document)
										.height()
										- window.windowHeight) {
									$('div#infinite_loader').show();
									var response = FetchCommunityByType(
											"ACADEMIC",
											$('.content_container').length,
											pageSize);
									$
											.each(
													response,
													function(n, community) {
														if (community.available == true
																&& $("input[value='"
																		+ community.ID
																		+ "']").length == 0) {
															var boarddiv = communities(
																	community.ID,
																	community.attributes.name,
																	community.members.length,
																	community.communityType,
																	community.attributes.communityCard,
																	community.members,
																	community.attributes.userID);
															$(
																	".containerAcademic")
																	.append(
																			boarddiv);
															Msnry(
																	'.containerAcademic',
																	'.content_container',
																	265);
														}
													});
									if (response.length == "15") {
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