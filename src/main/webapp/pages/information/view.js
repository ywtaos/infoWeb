(function (){
window['CInformationView'] = {};
init = function (id){
	var information = CInformationCommon.getInformationByID(id);
	CCore.view('form_information_view', information);
	var url="http://www.liecheng.cn/information/view/";
	$("#url").attr("href",url+id);
	$("#url").html(url+id);
};
window['CInformationView']['init']=init;
})();