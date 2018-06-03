$.fn.pageReady=function(callback){
	return this.each(function(){
		$.isFunction(callback)&&callback.call(this);
	});
};

$(function(){
	publicInit();
})


$('#index-header').pageReady(function(){
	indexInit();
})
$('#page-header').pageReady(function(){
	pageInit();
	lightboxInit();
})




function publicInit(){
	searchInit();
	pageSliderInit();
	scrollInit();
	jumpTopInit();
}
// 搜索框显示以及隐藏
function searchInit(){
	var btn=$("#searchBtn");
	var btnIcon=btn.find('i');
	var deSearchBtn=$("#deSearchBtn");
	btn.find('i').click(function(){
		if(btn.hasClass("active")){
			$("#searchForm").submit();
		}
		else{
			btn.addClass("active");
			$(this).hide();
			btn.animate({left:'0'});
			setTimeout(function(){
			 	$("#searchBtn input").fadeIn(500);
			 	btnIcon.fadeIn(200);
			 	deSearchBtn.fadeIn(200);		 	
			},300)
			deSearchBtn.css("opacity",1);
			deSearchBtn.css("z-index",0);
		} 
	});
	deSearchBtn.click(function(){
		$("#searchBtn input").hide();
		btn.animate({left:'37px'}).removeClass("active");
		$(this).css("opacity",0);
		deSearchBtn.css("z-index",0);
	});
	// var btn=$("#searchBtn");
	// var searchInput=$(".searchArea");
	// var searchForm=$('#searchForm');
	// btn.click(function(){
	// 	if(searchInput.css("display")=="none"){
	// 		searchInput.animate({top:'60px'});
	// 		searchInput.show();
	// 	}
	// 	else{
	// 		searchInput.animate({top:'-160px'});
	// 		// searchInput.hide();
	// 		setTimeout(function(){searchInput.hide();}, 500 );
	// 	} 
	// });
	$('#J_smallTopNav').click(function(){
		$('.phoneNav').show();
	});
	$('#J_phoneNavClose').click(function(){
		$('.phoneNav').hide();
	});
	$(".phoneNav").on('click','.navList li',function(){
		$('.phoneNav').hide();
	})
}
function pageSliderInit(){
	//banner初始化
	$('.pagePicSlider').flexslider({
		animation: "slide",
	    slideshow:true,
	    controlNav: false, 
	    itemMargin: 20,
	    itemWidth:280,
	    minItems:1,
	    move:1,
	    directionNav: true, //Boolean:  (true/false)是否显示左右控制按钮
	    prevText: "", //String: 上一项的文字
        nextText: "", //String: 下一项的文字
        animationLoop: true,
	});
	if($(".detailSlider .flex-viewport")){
		if($(window).width()>768){
				$(".detailSlider .flex-viewport").css("overflow","visible");
			}
			$(window).resize(function(){
				if($(window).width()>768){
					console.log($(window).width());
					$(".detailSlider .flex-viewport").css("overflow","visible");
				}
				else{
					console.log($(window).width());
					$(".detailSlider .flex-viewport").css("overflow","hidden");
				}
			})
	}
}
// 滚动函数，判断是否出现回到顶部
function scrollInit(){
	$(window).scroll(function(){
		 if (document.documentElement.scrollTop + document.body.scrollTop > 100) {
        	$(".jump-top-box").fadeIn(500);
	    }
	    else {
	        $(".jump-top-box").fadeOut(500);
	    }
	})
}
function jumpTopInit(){
	$(".jump-top-box").click(function () {
        var speed=500;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        return false;
	});
}