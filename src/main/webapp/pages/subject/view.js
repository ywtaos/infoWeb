(function (){
window['CSubjectView'] = {};
init = function (id){
	var subject = CSubjectCommon.getsubjectByID(id);
	CCore.view('form_subject_view', information);
	var url="http://www.liecheng.cn/subject/view/";
	$("#url").attr("href",url+id);
	$("#url").html(url+id);
};
window['CSubjectView']['init']=init;
})();