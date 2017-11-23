(function (){
window['CSupplyList'] = {};
init = function (){
	list(0);
	bindEvent();
};
bindEvent = function() {
	$("#SupplySearch .Button_Search").click(function () {list(0); });
	$("#SupplyCommand .Button_Remove").click(remove);
	$("#SupplyCommand .Button_Add").click(function(){openPost(null);});
};
openPost = function (id) {
	CCore.loadModal('../supply/post.htm', 939, 530, function () { CSupplyPost.init(id); });
};
openView = function (id) {
	CCore.loadModal('../supply/view.htm', 939, 530, function () { CSupplyView.init(id); });
};
remove = function () {
	CCore.removeData('supply/removesupplys', CCore.getCheckedValue('chkRow'));
};
list=function (pageIndex) {
	var param = CCore.getFormData('SupplySearch');
	param = CCore.paramPageIndex(pageIndex,param);
	CCore.invoke("supply/getsupplys", param,function(data){
		CCore.processList("SupplyResult","SupplyResultTemplate", data, list);
	});
};
window['CSupplyList']['init']=init;
window['CSupplyList']['list']=list;
})();
