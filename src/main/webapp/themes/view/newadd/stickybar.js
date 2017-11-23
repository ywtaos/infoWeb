/**
 * Copyright (c) 2016, curiator.com, All rights reserved.
 * JavaScript ver. 2.5
 */

function StickyNavDropdown(settings) {
    this.settings = settings;
    if (!this.settings.element.length) return;
    this.currentOption = null;
    var selectedNr = this.settings.defaultOption;
    if (!this.settings.options) {
        this.settings.options = [];
        this.settings.element.children().each($.proxy(function(counter, elem) {
            var entry = {
                "value": $(elem).attr("value"),
                "id": $(elem).attr("data-id"),
                "star": $(elem).attr("data-star"),
                "optionName": $(elem).html(),
                "number": $(elem).attr("number"),
                "isPrivate": $(elem).attr("data-is-private"),
                "roomId": $(elem).attr("data-room-id")
            };
            this.settings.options.push(entry);
            if ($(elem).attr("selected") == "selected") {
                this.currentOption = entry;
                selectedNr = counter
            }
        },
        this))
    }
    if (!this.currentOption) if (typeof this.settings.defaultOption != "undefined" && this.settings.options[this.settings.defaultOption]) this.currentOption = this.settings.options[this.settings.defaultOption];
    else this.currentOption = this.settings.options[0];
    if (!this.settings.element.hasClass("crtr-dropdown")) this.settings.element.addClass("crtr-dropdown");
    if (this.settings.full) this.settings.element.addClass("full");
    if (this.settings.options.length) this.addElementsFromSettings();
    else {
        this.settings.element.hide();
        this.settings.element.next().hide()
    }
    if (selectedNr) this.settings.element.find(".option").first().before(this.settings.element.find(".option").eq(selectedNr));
    $(window).click($.proxy(function(e) {
        if (!$(e.target).closest(".crtr-dropdown").length) this.exitDropdowns()
    },
    this));
    this.setSize()
}
StickyNavDropdown.prototype.addOptionEventHandlers = function() {
    var elems = this.settings.full ? this.settings.element.find(".display .value") : this.settings.element.find(".display");
    elems.click($.proxy(this.expandDropdown, this));
    this.settings.element.find(".option").click($.proxy(this.collapseDropdown, this));
    this.settings.element.find(".option").mousemove($.proxy(function() {
        if (this.settings.element.hasClass("fresh")) this.settings.element.removeClass("fresh")
    },
    this))
};
StickyNavDropdown.prototype.addElementsFromSettings = function() {
    var listOptions = [];
    for (var i = 0; i < this.settings.options.length; i++) listOptions.push(this.getListElementHtml(this.settings.options[i], i));
    var label = "";
    if (this.settings.full && (getPage() == "user" || getPage() == "collection") && this.currentOption.optionName != "All Rooms") label = '<span class="room-label">Room:</span>';
    this.settings.element.html('<span class="options-wrap">' + '  <div class="display">' + (this.settings.title ? '<div class="title">' + this.settings.title + "</div>": "") + '    <div class="value" data-value="' + this.currentOption.value + '">' + label + this.currentOption.optionName + "</div>" + "  </div>" + listOptions.join("") + "</span>").data("value", this.currentOption.value);
    this.addOptionEventHandlers()
};
StickyNavDropdown.prototype.getListElementHtml = function(data, i) {
    var addStar = this.settings.stars && data.value && data.value != "uncategorized" && data.value != "mobile-uploads";
    return '<div class="option opt-' + i + '">' + (data.isPrivate ? '<div class="lock"></div>': "") + "  <span>" + '    <div class="value" data-value="' + data.value + (data.id ? '" data-id="' + data.id: "") + '">' + data.optionName + "</div>" + "  </span>" + (addStar ? '<span class="star' + (data.star == 1 ? " on": "") + '"><div></div></span>': "") + (data.number ? '<span class="nr">' + data.number + "</span>": "") + "</div>"
};
StickyNavDropdown.prototype.setSize = function() {
    optionsWrap = this.settings.element.find(".options-wrap");
    this.settings.element.addClass("measure");
    if (optionsWrap.find(".nr").length) optionsWrap.find(".nr").css({
        "min-width": 15
    });
    else optionsWrap.find(".option").css({
        "padding-right": 15
    });
    if (!optionsWrap.closest(".crtr-dropdown").hasClass("full")) optionsWrap.width(optionsWrap.width());
    optionsWrap.find(".nr").css({
        "min-width": "auto"
    });
    optionsWrap.find(".option").css({
        "padding-right": 0
    });
    this.settings.element.removeClass("measure")
};
StickyNavDropdown.prototype.expandDropdown = function(e) {
    closeAllDropdowns();
    var dropdown = $(e.target).closest(".crtr-dropdown");
    var wrap = dropdown.find(".options-wrap");
    var title = dropdown.find(".display .title").clone();
    this.settings.element.find(".option .title").remove();
    dropdown.find(".option").first().find(".value").parent().prepend(title);
    this.settings.element.removeClass("expand");
    dropdown.addClass("expand").addClass("fresh");
    this.maybeToggleScrollbar(dropdown)
};
StickyNavDropdown.prototype.collapseDropdown = function(e, value, noCallback) {
    this.maybeToggleScrollbar(this.settings.element, true);
    if (!e) for (var i in this.settings.options) {
        if (this.settings.options[i]["value"] == value) {
            var targetElem = this.settings.element.find(".opt-" + i);
            break
        }
    } else {
        this.settings.element.removeClass("expand");
        var targetElem = $(e.currentTarget);
        var value = targetElem.find(".value").attr("data-value");
        if (value == this.currentOption.value) return
    }
    var oldValue = this.currentOption ? this.currentOption.value: null;
    this.settings.element.find(".option .title").remove();
    var txt = targetElem ? targetElem.find(".value").html() : "";
    var optionText = this.settings.full && (getPage() == "user" || getPage() == "collection") && txt != "All Rooms" ? '<span class="room-label">Room:</span>' + txt: txt;
    this.settings.element.find(".display .value").html(optionText).attr("data-value", value);
    this.settings.element.data("value", value);
    this.settings.element.find(".display").after(targetElem);
    this.currentOption = {
        "value": value,
        "option": optionText
    };
    if (this.settings.callback && !noCallback) this.settings.callback(value)
};
StickyNavDropdown.prototype.maybeToggleScrollbar = function(dropdown, reset) {
    if (reset) dropdown.removeAttr("style");
    else if (dropdown.children(".options-wrap").height() > $(window).height() - 60) dropdown.css({
        "overflow-y": "auto",
        "height": $(window).height() - 60
    })
};
StickyNavDropdown.prototype.exitDropdowns = function() {
    this.settings.element.removeClass("expand")
};
StickyNavDropdown.prototype.setValues = function(options) {
    this.settings.options = options;
    this.currentOption = options[0];
    this.addElementsFromSettings();
    this.setSize()
};
StickyNavDropdown.prototype.set = function(value, noCallback) {
    if (!value) value = "";
    this.collapseDropdown(null, value, noCallback)
};
function closeAllDropdowns() {
    $(".crtr-dropdown").removeClass("expand")
};
function getPage(mode) {
    var loc = window.location.href;
    var cleanUrl = loc.indexOf("#") == -1 ? loc: loc.slice(0, loc.indexOf("#"));
    cleanUrl = loc.indexOf("?") == -1 ? cleanUrl: cleanUrl.slice(0, loc.indexOf("?"));
    var path = cleanUrl.slice(cleanUrl.lastIndexOf("curiator.com/") + 13).split("/");
    if (path[path.length - 1] == "") path.pop();
    if (!path.length) path[0] = "welcome";
    if (mode == "last") return path[path.length - 1];
    else if (mode == "path") return path;
    else if (mode == "index") {
        var pagesByIndex = {};
        for (var counter in path) pagesByIndex[path[counter]] = true;
        return pagesByIndex
    } else return path[0]
};
function StickyBar(options) {
    this.currentFeed = options.currentFeed ? options.currentFeed: null;
    this.feeds = options.feeds ? options.feeds: {};
    this.sort = options.sort ? options.sort: null;
    this.onInit = options.onInit ? options.onInit: $.noop;
    this.onFeedChange = options.onFeedChange ? options.onFeedChange: $.noop;
    this.gallerySelector = "#gallery";
    this.init()
}
StickyBar.prototype.init = function() {
    this.initializeDropdowns();
    this.setupNewEntriesTicker();
   /* this.moveStickyOptionsDown();*/
   /* makeStickyBarStick();*/
    this.onInit()
};
StickyBar.prototype.initializeDropdowns = function(feed) {
    this.feedDropDown = new StickyNavDropdown({
        "element": $("#feed-dropdown"),
        "full": true,
        "callback": $.proxy(this.setFeedValue, this)
    });
    this.sortDropDown = new StickyNavDropdown({
        "element": $("#sort-dropdown"),
        "title": "sort",
        "options": this.getSortOptions(this.currentFeed),
        "callback": $.proxy(this.setSortValue, this)
    })
};
StickyBar.prototype.getSortOptions = function(feed) {
    feed = feed ? feed: "_default";
    if (!this.feeds[feed]) return;
    var sortOptions = [];
    for (var value in this.feeds[feed]["sort"]) {
        var option = {
            "value": value,
            "optionName": this.feeds[feed]["sort"][value]
        };
        sortOptions.push(option)
    }
    return sortOptions
};
StickyBar.prototype.setFeedValue = function(feed) {
    feed = feed ? feed: "_default";
    //aLog("#setFeedValue " + this.currentFeed + " / " + feed);
    if (this.currentFeed != feed) {
        this.currentFeed = feed;
        this.showHideSortDropdown();
        $("body").trigger("reload_gallery", {
            "currentFeed": feed,
            "sort": this.sort
        });
        this.setupNewEntriesTicker();
        this.onFeedChange();
        gg("analytics").trackChangeSourceFilter(this.show)
    }
};
StickyBar.prototype.showHideSortDropdown = function() {
    if (!this.feeds[this.currentFeed]["sort"]) {
        this.hideSort();
        this.sort = null
    } else {
        this.showSort();
        this.configureSort(this.currentFeed)
    }
};
StickyBar.prototype.configureSort = function(feed) {
    var sortOptions = this.getSortOptions(feed);
    this.sortDropDown.setValues(sortOptions);
    this.sort = sortOptions[0]["value"]
};
StickyBar.prototype.showSort = function() {
    this.sortDropDown.settings.element.show();
    this.sortDropDown.settings.element.next().show()
};
StickyBar.prototype.hideSort = function() {
    this.sortDropDown.settings.element.hide();
    this.sortDropDown.settings.element.next().hide()
};
StickyBar.prototype.setSortValue = function(sort) {
    if ($("#no-art-yet").is(":visible")) return false;
    if (this.sort != sort) {
        this.sort = sort;
        $("body").trigger("reload_gallery", {
            "sort": this.sort
        })
    }
   /* gg("analytics").trackChangeSortDropdown(this.sort)*/
};
StickyBar.prototype.setupNewEntriesTicker = function() {
    clearTimeout(this.newEntriesTicker);
    if (this.currentFeed == "my-feed" && $("#sticky-bar .new-entries").length) this.newEntriesTicker = setInterval($.proxy(function() {
        $.ajax("/scroll-forever/new_entries").done($.proxy(function(data) {
            if (data && parseInt(data.count) && this.showNewEntriesLabel) this.showNewEntriesLabel(data.count)
        },
        this))
    },
    this), 16E3)
};
StickyBar.prototype.showNewEntriesLabel = function(count) {
    if (!$("#sticky-bar .new-entries").length || count < 2) return;
    $("#sticky-bar .new-entries .msg").html("There are " + count + " new entries");
    this.setTitleCount(count);
    $("#sticky-bar").addClass("refresh")
};
StickyBar.prototype.setTitleCount = function(count) {
    var title = document.title;
    if (document.title.indexOf("(") == 0) {
        var index = document.title.indexOf(")");
        if (index != -1) title = document.title.substr(index + 1)
    }
    document.title = "(" + count + ") " + title
};
StickyBar.prototype.moveStickyOptionsDown = function() {
    s("DragStage").setCallbackDrag(function() {
        if (this.fullscreen) $("#sticky-bar").data("z-index", $("#sticky-bar").css("z-index")).css("z-index", 1)
    });
    s("DragStage").setCallbackReset(function() {
        if (this.fullscreen) $("#sticky-bar").css("z-index", $("#sticky-bar").data("z-index"))
    })
};
