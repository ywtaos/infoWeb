(function (){
window['CShareLogList'] = {};
init = function (){
	listShareLog(0);
	bindShareLogEvent();
};
bindShareLogEvent = function() {
	$("#ShareLogSearch .Button_Search").click(function () {listShareLog(0); });
	$("#ShareLogCommand .Button_Remove").click(removeShareLog);
	$("#ShareLogCommand .Button_Add").click(function(){openShareLogPost(null);});
	CShareLogCommon.fillShareLogCategory('searchShareLogCategoryID');
	CShareLogCommon.fillShareLogTarget('searchShareLogTargetID');
};
openShareLogPost = function (id) {
	CCore.loadModal('../sharelog/post.htm', 939, 530, function () { CShareLogPost.init(id); });
};
openShareLogView = function (id) {
	CCore.loadModal('../sharelog/view.htm', 939, 530, function () { CShareLogView.init(id); });
};
removeShareLog = function () {
	CCore.removeData('sharelog/removesharelogs', CCore.getCheckedValue('chkRow'));
};
listShareLog=function (pageIndex) {
	var param = CCore.getFormData('ShareLogSearch');
	param = CCore.paramPageIndex(pageIndex,param);
	CCore.invoke("sharelog/getsharelogs", param,function(data){
		CCore.processList("ShareLogResult","ShareLogResultTemplate", data, listShareLog);

	});
};
window['CShareLogList']['init']=init;
window['CShareLogList']['listShareLog']=listShareLog;
})();
