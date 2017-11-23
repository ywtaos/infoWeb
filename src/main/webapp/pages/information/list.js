(function (){
window['CInformationList'] = {};
var strID;
init = function (id){
	list(id);
	strID=id;
	bindShareEvent();
	
};
bindShareEvent = function() {
	$("#InformationSearch .Button_Search").click(function () {list(0); });
	$("#InformationCommand .Button_Remove").click(removeInformation);
	$("#InformationCommand .Button_Add").click(function(){openInformationPost(null);});
	$("#InformationCommand .Button_Close").click(closeInformation);
	$("#InformationCommand .Button_Open").click(openInformation);
	
};

closeInformation = function () {
	CCore.invoke('information/closeinformations',{removedIDs:CCore.getCheckedValue('chkRow').toString()});
	list(strID,0);
	CCore.alert("关闭完成");
};

openInformation = function () {
	CCore.invoke('information/openinformations',{removedIDs:CCore.getCheckedValue('chkRow').toString()});
	list(strID,0);
	CCore.alert("开通成功");
};
openInformationPost = function (id) {
	CCore.loadModal('../information/post.htm', 939, 530, function () { CInformationPost.init(id); });
};
openInformationView = function (id) {
	CCore.loadModal('../information/view.htm', 939, 530, function () { CInformationView.init(id); });
};


removeInformation=function () {
	var removedIDs = CCore.getCheckedValue('chkRow');
	CCore.removeData('information/removeinformations', removedIDs);
};

list = function(id,pageIndex) {
	
	var param = CCore.getFormData('InformationSearch');

	/*param = CCore.paramPageIndex(pageIndex, param);
	param.searchCategoryID=id;
	
	
	
	var data = CCore.invoke("/service/share/getshares", param);
	CCore.processList("InformationResult", "InformationTemplate", data, list);*/

	param = CCore.paramPageIndex(pageIndex,param);
	var data = CCore.invoke("/service/information/getinformations", param);
	CCore.processList("InformationResult","InformationResultTemplate", data, list);
	//checkAccess();
};

window['CInformationList']['init']=init;
window['CInformationList']['list']=list;
})();
