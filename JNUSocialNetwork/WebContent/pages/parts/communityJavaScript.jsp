<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- Placed at the end of the document so the pages load faster -->
<script src="js/jquery-1.10.2.js"></script>
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
							var ownLength = FetchCommunityByOwner(USERID, "0", "1").length;
							var joinLength  = FetchCommunityByJoin(USERID, "0", "2").length;
							if ($.parseJSON(sessionStorage.getItem("user")) != null
									&& $.parseJSON(sessionStorage
											.getItem("user")).userType == 'COMMUNITYOWNER') {
								if ( ownLength >= 1) {
									$('.createCom').remove();
								}
								$('.appCom').remove();
							}
							if ($.parseJSON(sessionStorage.getItem("user")).userType != 'COMMUNITYOWNER') {
								$('.createCom').remove();
							}
							if ( joinLength + ownLength  == 0) {
								$('.guideCommunity').css("display","block");
							}
						} else {
							clickOffEvent();
							$('.createCom').remove();
							$('.myCommunityBtn').remove();
						}
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
											pageSize+1);
									$
											.each(
													response.reverse(),
													function(n, community) {
														if (community.available == true && $("input[value='"+community.ID+"']").length == 0) {
															var boarddiv = communities(
																	community.ID,
																	community.attributes.name,
																	community.members.length,
																	community.communityType,
																	community.attributes.communityCard,
																	community.members,
																	community.attributes.userID);
															$(
																	".containerMy")
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
	<c:when test="${param.nav eq 'official' }">
		<script type="text/javascript">
			pageSize = 16;
			fetchCommunityByType("OFFICIAL", pageSize);
			$(window)
					.scroll(
							function() {
								if ($(window).scrollTop() == $(document)
										.height()
										- window.windowHeight) {
									$('div#infinite_loader').show();
									var response = FetchCommunityByType("OFFICIAL",
											$('.content_container').length,
											pageSize);
									$
											.each(
													response.reverse(),
													function(n, community) {
														if (community.available == true && $("input[value='"+community.ID+"']").length == 0) {
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
	<c:when test="${param.nav eq 'folk' }">
		<script type="text/javascript">
			pageSize = 16;
			fetchCommunityByType("FOLK", pageSize);
			$(window)
					.scroll(
							function() {
								if ($(window).scrollTop() == $(document)
										.height()
										- window.windowHeight) {
									$('div#infinite_loader').show();
									var response = FetchCommunityByType("FOLK",
											$('.content_container').length,
											pageSize);
									$
											.each(
													response.reverse(),
													function(n, community) {
														if (community.available == true && $("input[value='"+community.ID+"']").length == 0) {
															var boarddiv = communities(
																	community.ID,
																	community.attributes.name,
																	community.members.length,
																	community.communityType,
																	community.attributes.communityCard,
																	community.members,
																	community.attributes.userID);
															$(
																	".containerFolk")
																	.append(
																			boarddiv);
															Msnry(
																	'.containerFolk',
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
			pageSize = 16;
			fetchCommunityByType("SCHOOLUNION", pageSize);
			$(window)
					.scroll(
							function() {
								if ($(window).scrollTop() == $(document)
										.height()
										- window.windowHeight) {
									$('div#infinite_loader').show();
									var response = FetchCommunityByType(
											"SCHOOLUNION",
											$('.content_container').length,
											pageSize);
									$
											.each(
													response.reverse(),
													function(n, community) {
														if (community.available == true && $("input[value='"+community.ID+"']").length == 0) {
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
														if (community.available == true && $("input[value='"+community.ID+"']").length == 0) {
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

</c:choose>