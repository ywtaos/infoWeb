(function (){
window['CSupplyPost'] = {};
init = function (id){
	bindEvent();
	if (!CValidator.isNull(id)) {
		CSupplyCommon.getSupplyByID(id,function(supply){
			CCore.updateForm(supply);
		});
	}
	CCore.label("form_supply_post");

};
bindEvent = function () {
	$("#form_supply_post .Button_Submit").click(save);
};
save = function (){
	if (validate()){
		CCore.postData('supply/savesupply', 'form_supply_post',function(flag){
			if (flag) {
				CSupplyList.list();
				CCore.close();
			}
		});
	}
};
validate = function () {
	if (CValidator.checkInvalid("form_supply_post")) {
		return false;
	}
	return true;
};
window['CSupplyPost']['init']=init;
})();
