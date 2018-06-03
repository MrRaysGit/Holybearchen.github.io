$(function () {
    pageSliderInit();
})


function pageSliderInit() {
    //banner初始化
    $('.pagePicSlider').flexslider({
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
    });
}