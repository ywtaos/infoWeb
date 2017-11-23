(function (){
window['CSharePost'] = {};

init = function (id){
	var categoryID = $("#searchCategoryID").val();
	$("#categoryID").val(categoryID);
	if(categoryID!=CDict.ShareRead){
		$(".read").hide();
	}
	$("#form_share_post .Button_Submit").click(save);
	//CShareCommon.fillStatus('statusID');
	CShareCommon.fillIsHot('hotID');
	CShareCommon.fillIsTop('isTopID');
	CShareCommon.fillIsFocus('isFocusID');
	if (!CValidator.isNull(id)) {
		var share = CShareCommon.getShareByID(id);
		CCore.updateForm(share);
	}
	CCore.label("form_share_post");
	CCore.loadEditor('content');      
	CCore.datePicker('pubDate');
	CUpload.init("imageIDs", CDict.FileExtension,false, null);
	//bindEvent();
};
/*bindEvent = function () {
	
};*/
save = function (){
	var param = CCore.getFormData('form_share_post');
	if (validate()){
		CCore.postData('share/saveshare', 'form_share_post',function(flag){
			if (flag) {
				CShareList.listShare();
				CCore.close();
			}
		});
	}
};
validate = function () {
	if (CValidator.checkInvalid("form_share_post")) {
		return false;
	}
	return true;
};
window['CSharePost']['init']=init;
})();
