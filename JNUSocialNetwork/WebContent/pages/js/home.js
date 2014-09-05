var animateBlock={
		isVisiable:function(el,wh,st,delta){
			delta=delta||200;
			//console.log($(el).offset().top,wh,st,delta)
			return $(el).offset().top<wh+st-delta;
		},
		animations:{
			band:function(wh,st){
				var $el=$("#band");
				if(animateBlock.isVisiable($el,wh,st)){
					//background:time:0-500.o
					//text:time:500-733.o.p:10px;
					//menu:time:633-900.o.p:-10px;
					$(".band-bg").animate({opacity:1},500);
				    $(".band-text").delay(500).animate({top:330,opacity:1},233);
				    $(".header").delay(633).animate({top:0,opacity:1},267);
					delete animateBlock.animations.band;
				}
			},
			character:function(wh,st){
				var $el=$("#characters");
				if(animateBlock.isVisiable($el,wh,st)){
					$el.find(".char-icon1").animate({top:50,opacity:1},333);
					$el.find(".char-icon2").delay(200).animate({top:50,opacity:1},533);
					$el.find(".char-icon3").delay(400).animate({top:50,opacity:1},733);

					delete animateBlock.animations.character;
				}
			},
			intro1:function(wh,st){
				var $el=$("#intro1");
				if(animateBlock.isVisiable($el,wh,st)){
					//console.log("trigger intro1 animate");
					$el.find(".intro1-video").animate({
						"bottom":0,
						opacity:1
					},500);
					$el.find(".intro1-text").delay(167).animate({opacity:1},500);
					$el.find(".intro1-star").delay(333).animate({opacity:1},333);
					delete animateBlock.animations.intro1;
				}
			},
			intro2:function(wh,st){
				var $el=$("#intro2");
				if(animateBlock.isVisiable($el,wh,st)){
					//console.log("trigger intro2 animate");
					$el.find(".intro2-computer1").animate({
						"top":-30,
						opacity:1
					},500);
					$el.find(".intro2-computer2").delay(500).animate({
						opacity:1
					},167);
					$el.find(".intro2-text").delay(167).animate({opacity:1},500);
					delete animateBlock.animations.intro2;
				}
			},
			intro3:function(wh,st){
				var $el=$("#intro3");
				if(animateBlock.isVisiable($el,wh,st)){
					//console.log("trigger intro3 animate");
					$el.find(".intro3-calendar").animate({
						"top":-31,
						opacity:1
					},333);
					$el.find(".intro3-rockets").delay(233).animate({
						"top":-46,
						opacity:1
					},267);
					$el.find(".intro3-smoke").delay(333).animate({
						"top":-31,
						opacity:1
					},334);
					$el.find(".intro3-text").delay(167).animate({opacity:1},500);
					delete animateBlock.animations.intro3;
				}
			},
			intro4:function(wh,st){
				var $el=$("#intro4");
				if(animateBlock.isVisiable($el,wh,st)){
					//console.log("trigger intro4 animate");
					$el.find(".intro4-hand").animate({
						"top":-30,
						opacity:1
					},500);
					$el.find(".intro4-icon").delay(333).animate({
						opacity:1
					},333);
					$el.find(".intro4-text").delay(167).animate({opacity:1},500);
					delete animateBlock.animations.intro4;
				}
			}
		}
	};

	$(window).on("scroll",function(){
		var animations,
			name,
			winHeight=$(window).height(),
			scrollTop=$(window).scrollTop();

		animations=animateBlock.animations;
		for(name in animations){
			animations[name](winHeight,scrollTop);
		}
	});
	if($(window).height()>500){
		$(document).trigger("scroll");
	}
