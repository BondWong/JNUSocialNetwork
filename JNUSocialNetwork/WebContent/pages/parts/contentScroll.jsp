<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div id="infinite_loader">
	<img src="images/contentScroll.GIF" />
</div>

<script type="text/javascript">
	$(window).scroll(
			function() {
				if ($(window).scrollTop() == $(document).height()
						- $(window).height()) {
					//$('div#infinite_loader').show();
					$.ajax({
						//数post个数作为startIndex，pageSize规定好
						url : "",
						success : function(data) {

							//1.添加數據
							//2.append數據
							//3.判讀數據個數時候小於pageSize
							//	若沒有小於，$('div#infinite_loader').hide();
							//	若小於，替換裏面img成no more 提示，刪除div的ID使得次監聽實效

						}
					});
				}
			});
</script>
