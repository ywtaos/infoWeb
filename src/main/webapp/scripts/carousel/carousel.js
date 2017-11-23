/**
 * Copyright (c) 2017, curiator.com, All rights reserved.
 * JavaScript ver. 2.5
 */

$(document).ready(function() {
   
    new SlideCarousel;
    initializePage()
});
function initializePage() {
    var currentFeed = $("#sticky-bar").attr("data-feed");
    var sort = $("#sticky-bar").attr("data-sort");
    var feeds = {
        "staff-picks": {
            "name": "Staff Picks",
            "sort": {
                "947": "随机",
                "882": "最新",
                "883": "估值由低到高",
                "884": "估值由高到低",
                "885": "年代由近到远",
                "943": "年代由远到近",
            }
        },
        "new": {
            "name": "Recently Added",
            "sort": false
        },
        "popular": {
            "name": "Popular Art",
            "sort": {
                "week": "This Week",
                "month": "This Month",
                "year": "This Year",
                "all": "All Time"
            }
        },
        "random": {
            "name": "Random",
            "sort": false
        }
    };
    new StickyBar({
        "currentFeed": currentFeed,
        "feeds": feeds,
        "sort": sort
    });
  /*  new MasonryGridSetup({
        "currentFeed": currentFeed,
        "feeds": feeds,
        "sort": sort,
        "getUrl": getUrl,
        "margTop": -20
    })*/
}
function getUrl(type) {
    var url = [];
    if (type != "visible") url.push("load");
    url.push("scroll-forever");
    if (this.currentFeed) url.push(this.currentFeed);
    if (type == "ajax") url.push(0);
    var sortParam = type != "visible" && type != "count" && this.sort ? "?sort=" + this.sort: "";
    return "/" + url.join("/") + sortParam
};
function SlideCarousel() {
    this.skew = false;
    this.spd = 1E3;
    this.autoInterval = 5E3;
    this.easing = "easeOutCubic";
    this.init()
}
SlideCarousel.prototype.init = function() {
    this.carousel = $("#carousel");
    this.slides = this.carousel.find(".slide-wrap");
    this.loadbar = this.carousel.find(".loadbar");
    this.allowAuto = true;
    this.forceAuto = false;
    this.createBullets();
    this.updateFocus();
    this.updateBullets();
    this.focusSlideWrap.width("100%");
   /* $(document).keydown($.proxy(function(e) {
        if (keyIsNext(e)) {
            this.go("next");
            this.disableAuto()
        } else if (keyIsPrev(e)) {
            this.go("prev");
            this.disableAuto()
        }
    },
    this));*/
    this.carousel.find(".prev").click($.proxy(function() {
        this.go("prev");
        return false
    },
    this));
    this.carousel.find(".next").click($.proxy(function() {
        this.go("next");
        return false
    },
    this));
    this.initAutoSlide()
};
SlideCarousel.prototype.go = function(to) {
    if (this.focusSlideWrap.is(":animated") || to == this.nr) return false;
    var forward = true;
    if ($.isNumeric(to)) {
        var currentSlideNr = this.nr;
        var newSlideNr = to;
        if (newSlideNr < currentSlideNr) forward = false
    } else if (to == "prev") forward = false;
    this.setZIndex(to);
    this.updateFocus(to);
    this.updateBullets();
    if (forward) this.animateForward();
    else this.animateBackward()
};
SlideCarousel.prototype.animateBackward = function() {
    if (this.skew) this.focusSlideWrap.addClass("skew").css({
        "margin-left": -40 - $("#carousel").width() / 10
    });
    this.focusSlideWrap.animate({
        "margin-left": this.skew ? -40 : 0,
        "width": "100%"
    },
    {
        "duration": this.spd,
        "easing": this.easing,
        "complete": $.proxy(function() {
            this.focusSlideWrap.removeClass("skew").css("margin-left", 0);
            this.nextSlide.trigger("mouseleave.dim")
        },
        this)
    });
    this.focusSlideWrap.find(".table").css({
        "left": -($("#carousel").width() / 10)
    }).animate({
        "left": 0
    },
    {
        "duration": this.spd,
        "easing": this.easing
    })
};
SlideCarousel.prototype.animateForward = function() {
    if (this.skew) this.focusSlideWrap.addClass("skew").css({
        "right": -40 - $("#carousel").width() / 10
    });
    this.focusSlideWrap.children(".slide").css({
        "margin-left": -$("#carousel").width()
    }).animate({
        "margin-left": 0
    },
    {
        "duration": this.spd,
        "easing": this.easing
    });
    this.focusSlideWrap.css({
        "margin-left": 0,
        "left": "auto"
    }).animate({
        "width": "100%",
        "right": this.skew ? -40 : 0
    },
    {
        "duration": this.spd,
        "easing": this.easing,
        "complete": $.proxy(function() {
            this.focusSlideWrap.removeClass("skew").css("right", "auto");
            this.prevSlide.trigger("mouseleave.dim")
        },
        this)
    });
    this.focusSlideWrap.find(".table").css({
        "left": $("#carousel").width() / 10
    }).animate({
        "left": 0
    },
    {
        "duration": this.spd,
        "easing": this.easing
    })
};
SlideCarousel.prototype.updateFocus = function(slideNr) {
    if (slideNr == "next") {
        this.prevNr = this.nr;
        this.nr = this.nextNr;
        this.nextNr = (this.nextNr + 1) % this.slides.length
    } else if (slideNr == "prev") {
        this.nextNr = this.nr;
        this.nr = this.prevNr;
        this.prevNr = (this.nr - 1 + this.slides.length) % this.slides.length
    } else if (slideNr == parseInt(slideNr)) {
        this.prevNr = (slideNr - 1 + this.slides.length) % this.slides.length;
        this.nr = slideNr;
        this.nextNr = (slideNr + 1) % this.slides.length
    } else {
        this.prevNr = this.slides.length - 1;
        this.nr = 0;
        this.nextNr = 1 % this.slides.length
    }
    this.prevSlide = this.slides.eq(this.prevNr);
    this.focusSlideWrap = this.slides.eq(this.nr);
    this.nextSlide = this.slides.eq(this.nextNr);
    this.slides.removeClass("focus");
    this.focusSlideWrap.addClass("focus")
};
SlideCarousel.prototype.setZIndex = function(to) {
    if (to == "prev") {
        this.nextSlide.removeAttr("style");
        this.focusSlideWrap.css("z-index", 1);
        this.prevSlide.removeAttr("style").css("z-index", 2)
    } else if (to == "next") {
        this.prevSlide.removeAttr("style");
        this.focusSlideWrap.css("z-index", 1);
        this.nextSlide.removeAttr("style").css("z-index", 2)
    } else if (to == parseInt(to)) {
        this.slides.not(this.focusSlideWrap).removeAttr("style");
        this.focusSlideWrap.css("z-index", 1);
        this.slides.eq(to).css("z-index", 2)
    }
};
SlideCarousel.prototype.createBullets = function() {
    var bullet = this.carousel.find(".bullet");
    for (var i = 1; i < this.slides.length; i++) bullet.clone().insertAfter(bullet);
    this.carousel.find(".bullet").click($.proxy(function(e) {
        var newBulletNr = $(e.target).index("#carousel .bullet");
        this.go(newBulletNr)
    },
    this))
};
SlideCarousel.prototype.updateBullets = function() {
    this.carousel.find(".bullet.sel").removeClass("sel");
    this.carousel.find(".bullet").eq(this.nr).addClass("sel")
};
SlideCarousel.prototype.initAutoSlide = function() {
    this.autoNextSlide(true);
    $("#carousel .viewport").bind("mouseenter.autoslide", $.proxy(function() {
        clearTimeout(this.to);
        this.resetLoadbar()
    },
    this)).bind("mouseleave.autoslide", $.proxy(function() {
        if (this.forceAuto) {
            this.forceAuto = false;
            this.allowAuto = true
        } else if (this.allowAuto) this.autoNextSlide(true)
    },
    this));
    this.carousel.find(".next, .prev, .bullet").click($.proxy(this.disableAuto, this));
    this.carousel.find(".play-pause").click($.proxy(function(e) {
        if ($(e.target).hasClass("paused")) {
            $(e.target).removeClass("paused");
            this.autoNextSlide(true);
            this.forceAuto = true
        } else this.disableAuto()
    },
    this))
};
SlideCarousel.prototype.resetLoadbar = function(notnow) {
    this.loadbar.stop().animate({
        "width": 0
    },
    {
        "duration": Math.max(this.loadbar.width() / 1.5, 200),
        "easing": "easeOutCubic"
    })
};
SlideCarousel.prototype.autoNextSlide = function(notnow) {
    this.to = setTimeout($.proxy(this.autoNextSlide, this), this.autoInterval);
    if (!notnow) this.go("next");
    if (this.loadbar.is(":visible")) if (this.loadbar.width() > 500) this.loadbar.stop(true, true).css({
        "left": "auto",
        "right": 5
    }).animate({
        "width": 0
    },
    {
        "duration": this.autoInterval,
        "easing": "linear"
    });
    else this.loadbar.stop(true, true).css({
        "left": 5,
        "right": "auto"
    }).animate({
        "width": 1903
    },
    {
        "duration": this.autoInterval,
        "easing": "linear"
    })
};
SlideCarousel.prototype.disableAuto = function(e) {
    clearTimeout(this.to);
    this.allowAuto = false;
    this.carousel.find(".play-pause").addClass("paused");
    this.resetLoadbar()
};