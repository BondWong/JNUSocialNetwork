$(document).ready(function(){
	$('body').on('click','#communityCreate',function(){
		var community = {
				tags:$('#communityTag').val(),
				attributes:{
					name:$('#communityName').val(),
					introduct:$('#communityIntro').val(),
					communityCard:FileUpload(new FormData($('.communityForm')[0]))
				},
				communityType:$('#communityType').val()
		};
		var json = $.toJSON(community);
		AddCommunity("2011052407",json);
	});
});