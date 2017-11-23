(function (){
window['CCommentList'] = {};
init = function (){
	list(0);
	bindEvent();
};
bindEvent = function() {
	
	$("#CommentCommand .Button_Remove").click(function(){remove();});
	
	//$("#InformationResult .Button_Edit").click(function(){openPost(id);});
	//CInformationCommon.fillCategory('searchCategoryID');
	
	//$(".creatPDF").click(creatPDF);
};


remove = function () {
	console.log(111111);
	CCore.removeData('/service/comment/removecomments', CCore.getCheckedValue('chkRow'));
};

list=function (pageIndex) {
	console.log(111);
	var param = CCore.getFormData('CommentSearch');
	param = CCore.paramPageIndex(pageIndex,param);
	console.log(param);
	var data = CCore.invoke("/service/comment/getcomments", param);
	console.log(data);
	CCore.processList("CommentResult","CommentResultTemplate", data, list);
	//checkAccess();
};
window['CCommentList']['init']=init;
window['CCommentList']['list']=list;
})();
