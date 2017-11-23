
(function () {
window['CBase'] = {};
init = function () {
	var width = screen.width;
	if(width>414){
		width=414;
	}
		
	rootSize = 16*(width/414);
	$("html").css("font-size",rootSize);
};

window['CBase']['init'] = init;
})();

$(function () {
    CBase.init();
});
