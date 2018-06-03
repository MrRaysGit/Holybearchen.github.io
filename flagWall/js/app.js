// 首页的js文件

function indexInit() {
    bannersliderInit();
    section4SliderInit();
    section5SliderInit();
    likeInit();
    // scrollInit();
    // $('.pcNav').onePageNav();
}
function bannersliderInit() {
    //banner初始化

    var w = $(window).width();
    var h = $(".indexbanner").outerHeight();

    $('.banner-slide').flexslider({
        animation: 'slide',
        slideshow: true,
        controlNav: true,
        direction: "horizontal",
        slideshowSpeed: 5000,
        animationSpeed: 600,
        pauseOnHover: false,
        //itemWidth:1010,
        itemMargin: 0,
        // controlNav:false,
        // minItems:1,
        // maxItems:5,
        // move:1
    });
    $(".banner-slide .flex-viewport li").height(h);
    // 滑动效果
    var slider = $(".banner-logo");
    $('body').on('click', '.banner-logo', function (e) {
    });

    $('body').on('touchstart', '.banner-logo', function (e) {
        var touch = e.originalEvent,
            startX = touch.changedTouches[0].pageX;
        startY = touch.changedTouches[0].pageY;
        slider.on('touchmove', function (e) {
            touch = e.originalEvent.touches[0] ||
                e.originalEvent.changedTouches[0];
            if (touch.pageX - startX > 10) {
                console.log("右划");
                $(".banner .flex-prev").click();
                slider.off('touchmove');
            } else if (touch.pageX - startX < -10) {
                console.log("左划");
                $(".banner .flex-next").click();
                slider.off('touchmove');
            }
            ;
            if (touch.pageY - startY > 10) {
                console.log("下划");
            } else if (touch.pageY - startY < -10) {
                console.log("上划");
            }
            ;
        });
        // return false;
    }).on('touchend', function () {
        slider.off('touchmove');
    });

    $('.flex-control-nav').css("z-index", "10000" );
}
function section4SliderInit() {
    $('.section4Slider').flexslider({
        animation: "slide",
        slideshow: true,
        itemMargin: 0,
        manualControls: ".slides-controller li",
        directionNav: true, //Boolean:  (true/false)是否显示左右控制按钮
        prevText: "", //String: 上一项的文字
        nextText: "", //String: 下一项的文字
        animationLoop: true,
        // mousewheel: true
    });
}
function section5SliderInit() {
    $('.section5Slider').flexslider({
        animation: "slide",
        slideshow: true,
        controlNav: false,
        itemMargin: 20,
        itemWidth: 280,
        minItems: 1,
        move: 1,
        directionNav: true, //Boolean:  (true/false)是否显示左右控制按钮
        prevText: "", //String: 上一项的文字
        nextText: "", //String: 下一项的文字
        animationLoop: true,
        // mousewheel: true
    });
}

// 判断浏览qi
function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    console.log(userAgent);
    if (isOpera) {
        return "Opera"
    }
    ; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return "IE";
    }
    ; //判断是否IE浏览器
    return ("dontknow");
}
$(window).resize(function () {
    var w = $(window).width();
    var h = $(".indexbanner").outerHeight();
    $(".banner-slide .flex-viewport li").height(h);
    if (myBrowser() == "IE") {
        //ie不兼容banner图片里的object-fix属性，用JS对其进行更改
        var imgh = $(".banner-slide").height();
        var imgw = $(".banner-slide").width();
        console.log(imgh);
        console.log(imgw);
        $(".banner-img").css("max-width", "1000000px");
        if (imgw / imgh > 1680 / 900) {
            //容器过宽，此时width100%,height:auto
            $(".banner-img").css("width", "100%");
            $(".banner-img").css("height", "auto");
        } else {
            $(".banner-img").css("height", "100%");
            $(".banner-img").css("width", "auto");
        }
    }
});

//喜欢按钮
function likeInit() {
    $(".likeBtn").click(function () {
        if ($(this).hasClass("like")) {
            $(this).removeClass("like");
        } else {
            $(this).addClass("like");
        }
    });
}
// 滑动到某id
function mScroll(id) {
    $("html,body").stop(true);
    $("html,body").animate({scrollTop: $("#" + id).offset().top}, 1000);
}
// 首页滚屏效果
function scrollInit() {
    var screen_width = $(window).width(),
        screen_height = $(window).height();

    var pcMinWidth = 768;//pc端最小屏幕的限制
    var TweenIng = false;
    $('#banner').on('mousewheel', function (event) {
        event.preventDefault();
        TweenIng = true;
        if (event.deltaY < 0) {//向下
            console.log(event.deltaY);
            TweenMax.to("body,html", 1, {
                scrollTop: $("#section1").offset().top,
                ease: Quad.easeInOut,
                onComplete: function () {
                    TweenIng = false;
                }
            });
        }
        return;
    });
    $('#section1').on('mousewheel', function (event) {
        //console.log('#section2',event.deltaX, event.deltaY, event.deltaFactor);
        event.preventDefault();
        if (screen_width > pcMinWidth && !TweenIng) {
            TweenIng = true;
            if (event.deltaY < 0) {
                TweenMax.to("body,html", 1, {
                    scrollTop: $("#section2").offset().top,
                    ease: Quad.easeInOut,
                    onComplete: function () {
                        TweenIng = false;
                    }
                });
            } else {
                TweenMax.to("body,html", 1, {
                    scrollTop: $("#banner").offset().top,
                    ease: Quad.easeInOut,
                    onComplete: function () {
                        TweenIng = false;
                    }
                });
            }
        }
    });
    $('#section2').on('mousewheel', function (event) {
        //console.log('#section2',event.deltaX, event.deltaY, event.deltaFactor);
        event.preventDefault();
        if (screen_width > pcMinWidth && !TweenIng) {
            TweenIng = true;
            if (event.deltaY < 0) {
                TweenMax.to("body,html", 1, {
                    scrollTop: $("#section3").offset().top,
                    ease: Quad.easeInOut,
                    onComplete: function () {
                        TweenIng = false;
                    }
                });
            } else {
                TweenMax.to("body,html", 1, {
                    scrollTop: $("#section1").offset().top,
                    ease: Quad.easeInOut,
                    onComplete: function () {
                        TweenIng = false;
                    }
                });
            }
        }
    });
    $('#section3').on('mousewheel', function (event) {
        //console.log('#section2',event.deltaX, event.deltaY, event.deltaFactor);
        event.preventDefault();
        if (screen_width > pcMinWidth && !TweenIng) {
            TweenIng = true;
            if (event.deltaY < 0) {
                TweenMax.to("body,html", 1, {
                    scrollTop: $("#section4").offset().top,
                    ease: Quad.easeInOut,
                    onComplete: function () {
                        TweenIng = false;
                    }
                });
            } else {
                TweenMax.to("body,html", 1, {
                    scrollTop: $("#section2").offset().top,
                    ease: Quad.easeInOut,
                    onComplete: function () {
                        TweenIng = false;
                    }
                });
            }
        }
    });
    $('#section4').on('mousewheel', function (event) {
        //console.log('#section2',event.deltaX, event.deltaY, event.deltaFactor);
        console.log("s4");
        console.log(event.deltaY);
        event.preventDefault();
        if (screen_width > pcMinWidth && !TweenIng) {
            TweenIng = true;
            if (event.deltaY < 0) {
                console.log(111111111);
                TweenMax.to("body,html", 1, {
                    scrollTop: $("#section5").offset().top,
                    ease: Quad.easeInOut,
                    onComplete: function () {
                        TweenIng = false;
                    }
                });
            } else {
                console.log(2222222);
                TweenMax.to("body,html", 1, {
                    scrollTop: $("#section3").offset().top,
                    ease: Quad.easeInOut,
                    onComplete: function () {
                        TweenIng = false;
                    }
                });
            }
        }
    });
    $('#section5').on('mousewheel', function (event) {
        console.log("s5");
        if (screen_width > pcMinWidth) {
            var thisOffsetTop = $('#section5').offset().top;
            var thisOuterHeight = $('#section5').outerHeight();
            var bodyScrollTop = $('body').scrollTop();
            var _thisOffsetTop = thisOffsetTop + (thisOuterHeight - screen_height) - $("#header").outerHeight();
            if (event.deltaY < 0) {
                // if(bodyScrollTop > _thisOffsetTop){
                // 	TweenMax.to("body,html", 1, { scrollTop: $("#section6").offset().top,ease: Quad.easeInOut});
                // }
            } else {
                if (bodyScrollTop < thisOffsetTop + $("#header").outerHeight()) {
                    event.preventDefault();
                    TweenIng = true;
                    TweenMax.to("body,html", 1, {
                        scrollTop: $("#section4").offset().top,
                        ease: Quad.easeInOut,
                        onComplete: function () {
                            TweenIng = false;
                        }
                    });
                }
            }
        }
    });
    $('#section6').on('mousewheel', function (event) {
        //console.log('#section2',event.deltaX, event.deltaY, event.deltaFactor);
    });

}
