    function waterFall() {
        var ghostNode = $('#masonry_ghost').find('.thumbnail'), i, ghostIndexArray = [];
        var ghostCount = ghostNode.length;
        for (i = 0; i < ghostCount; i++) {
            ghostIndexArray[i] = i;
        }
        ghostIndexArray.sort(function (a, b) {
            if (Math.random() > 0.5) {
                return a - b;
            } else {
                return b - a;
            }
        });
        var currentIndex = 0;
        var masNode = $('#masonry');
        var imagesLoading = false;
        initMasonry();
        function getNewItems() {
            var newItemContainer = $('<div/>');
            for (var i = 0; i < 8; i++) {
                if (currentIndex < ghostCount) {
                    newItemContainer.append(ghostNode.get(ghostIndexArray[currentIndex]));
                    currentIndex++;
                }
            }
            return newItemContainer.find('.thumbnail');
    }

    function processNewItems(items) {
        items.each(function () {
            var $this = $(this);
            var imgsNode = $this.find('.images');
            var imgNames = imgsNode.find('input[type=hidden]').val().split(',');
            //瀑布流item的类型
            var imgType = imgsNode.find('input[type=hidden]').attr("title");
            var imgSrc = imgsNode.find('input[type=hidden]').attr("src");
            console.log(imgType);
            console.log(imgSrc);
            $.each(imgNames, function (index, item) {
                if (item != "noPic") {
                    if (imgType == "light") {
                        //灯箱浏览图片
                        imgsNode.append('<a rel="gallery-1" class="swipebox" href="./images/' + item + '" ><img src="./images/' + item + '" alt="image"></a>');
                        // imgsNode.append('<a href="./images/'+item+'"data-lightbox="roadtrip"><img src="./images/'+item+'" alt=""></a>');
                    }
                    else if (imgType == "accommo") {
                        //住宿，跳到住宿详情？
                        imgsNode.append('<img src="./images/' + item + '" alt="">');
                    }
                    else if (imgType == "cele") {
                        //节日，跳到节日详情？
                        imgsNode.append('<img src="./images/' + item + '" alt="">');
                    }
                    else if (imgType == "explore") {
                        //户外探索，跳到探索详情
                        imgsNode.append('<img src="./images/' + item + '" alt="">');
                    }
                    else if (imgType == "exBanfu") {
                        //探索班夫，跳到户外探险
                        imgsNode.append('<img src="./images/' + item + '" alt="">');
                    }
                    else {
                        imgsNode.append('<a><img src="./images/' + item + '" alt=""></a>');
                    }
                }
                else {
                    imgsNode.append('<a></a>');
                }
            });
        });
    }


    function initMasonry() {
        var items = getNewItems().css('opacity', 0);
        console.log(items);
        processNewItems(items);
        masNode.append(items);
        imagesLoading = true;
        items.imagesLoaded(function () {
            imagesLoading = false;
            items.css('opacity', 1);
            masNode.masonry({
                itemSelector: '.thumbnail',
                isFitWidth: true
            });
        });
    }

    function appendToMasonry() {
        var items = getNewItems().css('opacity', 0);
        processNewItems(items);
        masNode.append(items);

        imagesLoading = true;
        items.imagesLoaded(function () {
            imagesLoading = false;
            items.css('opacity', 1);
            masNode.masonry('appended', items);
        });
    }

    $(window).scroll(function () {

        if ($(document).height() - $(window).height() - $(document).scrollTop() < 10) {

            if (!imagesLoading) {
                appendToMasonry();
            }

        }

    });
    $(window).resize(function () {
        if ($(window).width() <= 768) {
            $("#masonry").css("width", "90%")
        }
        console.log($("#masonry").width());
    });

}

