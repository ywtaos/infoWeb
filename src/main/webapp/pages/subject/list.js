(function (){
window['CSubjectList'] = {};
var strID;
init = function (id){
	list(id);
	strID=id;
	bindShareEvent();
	
};
bindShareEvent = function() {
	$("#SubjectSearch .Button_Search").click(function () {list(0); });
	$("#SubjectCommand .Button_Remove").click(removeSubject);
	$("#SubjectCommand .Button_Add").click(function(){openSubjectPost(null);});
	$("#SubjectCommand .Button_Close").click(closeSubject);
	$("#SubjectCommand .Button_Open").click(openSubject);
	
};

closeSubject = function () {
	CCore.invoke('subject/closesubjects',{removedIDs:CCore.getCheckedValue('chkRow').toString()});
	list(strID,0);
	CCore.alert("关闭置顶");
};

openSubject = function () {
	CCore.invoke('subject/opensubjects',{removedIDs:CCore.getCheckedValue('chkRow').toString()});
	list(strID,0);
	CCore.alert("置顶成功");
};
openSubjectPost = function (id) {
	CCore.loadModal('../subject/post.htm', 939, 530, function () { CSubjectPost.init(id); });
};
openSubjectView = function (id) {
	CCore.loadModal('../subject/slist.htm', 939, 530, function () { CSubjectSlist.init(995,id); });
};

removeSubject=function () {
	var removedIDs = CCore.getCheckedValue('chkRow');
	CCore.removeData('subject/removesubjects', removedIDs);
};

update = function(key) {	
	var v = $("#"+key).val();
	if (!CValidator.isNull(key) ) {
		var datas= key.split('_');			
		if(datas.length==2){
			var param={};
			param.ID=datas[1];
			//param.content = $("#content_" + param.ID).val();
			//param.memo = $("#memo_" + param.ID).val();
			//param.position = $("#position_" + param.ID).val();
			//param.visitUrl = $("#visitUrl_" + param.ID).val();
			param.imageID = $("#imageID_" + param.ID).val();
			CCore.invoke("subject/savesubject", param);	
		}
	}
};


list = function(id,pageIndex) {
	
	var param = CCore.getFormData('SubjectSearch');

	param = CCore.paramPageIndex(pageIndex,param);
	//param["searchTypeID"]=CDict.ShareTypeInformation;
	var data = CCore.invoke("/service/subject/getsubjects", param);
	console.log(data)
	CCore.processList("SubjectResult","SubjectResultTemplate", data, list);
//	$("[id^=imageID_]").each(function(i,attachmentids){
//		CUpload.init(attachmentids.id, CDict.ImageExtension,false,function(){update(attachmentids.id);},"upload_subject");
//	})
	//checkAccess();
};

window['CSubjectList']['init']=init;
window['CSubjectList']['list']=list;
})();
