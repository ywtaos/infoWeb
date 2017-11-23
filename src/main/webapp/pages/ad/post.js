(function (){
window['CAdPost'] = {};
init = function (id){
	bindEvent();
	if (!CValidator.isNull(id)) {
		var ad = CAdCommon.getAdByID(id);
		console.log(ad);
		CCore.updateForm(ad);
	}
	CCore.label("form_ad_post");
	//CCore.loadEditor("content");

};
bindEvent = function () {
	$("#form_ad_post .Button_Submit").click(save);
	
};
save = function (){
	if (validate()){
		if (CCore.postData('/service/ad/savead', 'form_ad_post')) {
			CAdList.list();
			CCore.close();
		}
	}
};
validate = function () {
	if (CValidator.checkInvalid("form_ad_post")) {
		return false;
	}
	return true;
};
window['CAdPost']['init']=init;
})();