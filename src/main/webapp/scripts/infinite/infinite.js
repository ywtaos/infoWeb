(function ($) {
    $.fn.infiniteJscroll = function () {

        var $win = this;
        var options = $.extend({
            offset:100,
            topOfPage: function () {
            },
            bottomOfPage: function () {
            },
            pageInit: function () {
            }
        }, arguments[0] || {});

        $(document).ready(function () {
            options.pageInit.call(this);
        });

        $win.scroll(function () {
            if ($win.scrollTop() == 0) {
                options.topOfPage.call(this);
            }
            else if ($win.scrollTop() + options.offset >= $(document).height() - window.screen.height) {
            	
                options.bottomOfPage.call(this);
            }
           
        });
    };
}(jQuery));