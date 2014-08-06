	function PinCommon(){
		var users = RecommendateViaFollowee("2011052407");
		$.each(users,function(n,user){
			AddUser(user.attributes.nickName,user.attributes.lookingFor);
		});
	}
	function pCampus(){
		var users = RecommendateViaCampus("2011052407");
		$.each(users,function(n,user){
			AddUser(user.attributes.nickName,user.attributes.lookingFor);
		});
	}
	function pMajor(){
		var users = RecommendateViaMajor("2011052407");
		$.each(users,function(n,user){
			AddUser(user.attributes.nickName,user.attributes.lookingFor);
		});
	}
	function pSeason(){
		var users = RecommendateViaSession("2011052407");
		$.each(users,function(n,user){
			AddUser(user.attributes.nickName,user.attributes.lookingFor);
		});
	}
	function pClass(){
		var users = RecommendateViaClass("2011052407");
		$.each(users,function(n,user){
			AddUser(user.attributes.nickName,user.attributes.lookingFor);
		});
	}
	
	function AddUser(name,looking){
		var boarddiv ="<div class='userCard'><img src='images/userRecomm.jpg' width='200px'><p class='recommendName'>"+name+"</p><p class='recommendLooking'>"+looking+"</p><div class='recommendBtn'><button class='btn btn-default recommendAdd'>+<span class='glyphicon glyphicon-user' >&nbsp;Add</span></button></div></div>";
		$(".recommendBord").after(boarddiv); 
		Msnry('.userContainer', '.userCard', 200);
	}