(function (){
window['CSubjectPost'] = {};
init = function (id){
	
	
	if (!CValidator.isNull(id)) {
		var subject = CSubjectCommon.getSubjectByID(id);
		CCore.updateForm(subject);
	}
	CCore.label("form_subject_post");
	CUpload.init("imageAttachmentIDs", CDict.FileExtension,false, null);
	bindEvent();
};
bindEvent = function () {
	$("#form_subject_post .Button_Submit").click(save);
	CSubjectCommon.fillIsTop('isTopID');
};
save = function (){	
	var param = CCore.getFormData('form_subject_post');
	$("#title").val("#"+param.title+"#");
	if (validate()){
		CCore.postData('/service/subject/savesubject', 'form_subject_post',function(flag){
			if (flag) {
				CSubjectList.list();
				CCore.close();
			}
		});
	}
};
validate = function () {
	if (CValidator.checkInvalid("form_subject_post")) {
		return false;
	}
	return true;
};
window['CSubjectPost']['init']=init;
})();
