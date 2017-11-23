(function (){
window['CInformationPost'] = {};
init = function (id){
	$("#form_information_post .Button_Submit").click(save);
	if (!CValidator.isNull(id)) {
		var information = CInformationCommon.getInformationByID(id);
		CCore.updateForm(information);
	}
	CCore.label("form_information_post");
	CCore.loadEditor("content");
	CCore.datePicker('pubDate');
	
	CInformationCommon.fillCategory("categoryID");
	CInformationCommon.fillHot("hotID");
	CCore.fillBool("isFocusID");

};
save = function (){
	if (validate()){
		CCore.postData('information/saveinformation', 'form_information_post',function(flag){
			if (flag) {
				CInformationList.list();
				CCore.close();
			}
		});
	}
};
validate = function () {
	if (CValidator.checkInvalid("form_information_post")) {
		return false;
	}
	return true;
};
window['CInformationPost']['init']=init;
})();
