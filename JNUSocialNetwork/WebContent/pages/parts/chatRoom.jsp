<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:if test='${sessionScope.ID != null && sessionScope.ID != ""}'>
	<div class="panel panel-default contact-list" id="contact-list">
		<div class="panel-body contact-list-body">
			<ul class="nav nav-tabs contact-list-nav-bar" role="tablist">
				<li role="presentation" class="active" ><a id="contact-button" href="#contact"
					role="tab" data-toggle="tab"><i></i></a></li>
				<li role="presentation"><a href="#history" role="tab" data-toggle="tab"
					id="history-button"><i></i></a></li>
			</ul>
			<div class="tab-content contact-list-content">
				<div class="tab-pane active" id="contact">
					<div class="friends-tree-node">
						<a href="javaScript:void(0);" class="friends-tree-node-button"><span
							class="glyphicon glyphicon-chevron-right">&nbsp;Friends</span></a>
					</div>
				</div>
				<div class="tab-pane" id="history"></div>
			</div>
		</div>
		<div class="panel-footer contant-list-footer">
			<a href="javaScript:void(0);" class="open_button"><span
				class="glyphicon glyphicon-chevron-left open_button"></span></a>
		</div>
	</div>
	<!-- <div class="dropdown" id="unreadmessages">
		<button class="btn btn-default dropdown-toggle" type="button"
			id="dropdownMenu1" data-toggle="dropdown">
			Messages <span class="caret"></span>
		</button>
		<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
		</ul>
	</div> -->
</c:if>