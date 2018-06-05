function pageInit() {
    selectInit();
    $(".hideIcon .btn-circle").click(function () {
        if (!$(this).hasClass("like")) {
            $(this).parent(".hideIcon").removeClass("hideIcon");
            $(this).addClass("like");
        } else {
            $(this).parent(".img-icon").addClass("hideIcon");
            $(this).removeClass("like");
        }

    });
}
function selectInit() {
    var selectBtn = $(".selectArea");
    var selectList = $(".phSelectList");
    var banner = $(".pageBanner");
    var bannerH = banner.height();
    selectBtn.click(function () {
        if (selectList.css("display") == "none") {
            selectList.show();
            selectList.animate({top: '36px'});
            $(".phMask").show();
        }
        else {
            selectList.animate({top: '-200px'});
            setTimeout(function () {
                selectList.hide();
            }, 500);
            $(".phMask").hide();
        }
    });
    $(window).scroll(function () {
        var y = banner.offset().top + bannerH - $(window).scrollTop();
        if (y <= 62) {//如果选择条滚到顶部，则一直固定在顶部
            selectBtn.css({"position": "fixed", "top": "61px"});
        } else {
            selectBtn.css({"position": "relative", "top": "0"});
        }
    });
}