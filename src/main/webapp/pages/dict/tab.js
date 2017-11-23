(function (){
window['CDictTab'] = {};
init = function (id){
	calHeight();
	if(CValidator.isNull(id)){
		id=0;
	}
	listDictTab(id);

};
listDictTab=function(id){
	var dicts=CCore.getNextDicts(id);
	CCore.processList("dict_tab","DictResultTemplate", dicts);
	$("#dict_tab").organicTabs();
	$("#dict_tab .nav a").click(function(){loadDict($(this).attr("ulID"),$(this).attr("dictID"))});
	loadDict(dicts[0].code,dicts[0].ID);
	$("#dict_tab .nav a").removeClass("current");
	$("#dict_tab .nav a").first().addClass("current");
	$("#dict_tab .list-wrap ul").first().attr("style","display:block");
};
loadDict = function (container, topID) {
	$("#dict_tab .list-wrap ul").html("");
	CCore.loadPage(container, "../dict/list.htm", function () {  CDictList.init(topID); });
};
calHeight = function () {
    var height = $(window).height()-106;
    $("#dict_tab").height(height);
};
clearPie = function (container) {
    $("div.list-wrap ul:not([id='"+container+"'])").empty();
}
window['CDictTab']['init']=init;
})();