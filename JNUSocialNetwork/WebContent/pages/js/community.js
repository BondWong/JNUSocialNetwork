$(document).ready(function(){
	$('body').on('click','#communityCreate',function(){
		
		var community = {
				tags:[],
				attributes:{
					name:$('#communityName').val(),
					introduct:$('#communityIntro').val(),
					communityCard:FileUpload(new FormData($('.communityForm')[0]))
				},
				communityType:$('#communityType').val()
		};
		var json = $.toJSON(community);
		var community = AddCommunity("2011052405",json);
		fetchCommunityByID(community.ID);
		$('#createCommunity').modal('hide');
	});
});
	
	//fetchCommunityByID
	function fetchCommunityByID(communityID){
		var community = FetchCommunityByID(communityID);
		addCommunity(community.attributes.name,community.memberIDs.length);
	}
	//fetchCommunity()
	function fetchCommunity(){
		var communities = FetchCommunity("0","5");
		$.each(communities,function(n,community){
			addCommunity(community.attributes.name,community.memberIDs.length);
		});
	}
	//增加社区
	function addCommunity(name,memberNum){
		var boarddiv = "<div class='content_container'><a href='show.jsp'><div class='img_container'><img src='images/i2.jpg' /></div></a><div class='content_info'><div class='conten_head'>"+name+"</div><div class='content_count'>"+memberNum+" members</div><a><div class='content_join'>Join</div></a></div></div>"; 
		$(".communityBord").after(boarddiv); 
		Msnry('.containerDiscovery', '.content_container', 265);
	}
	