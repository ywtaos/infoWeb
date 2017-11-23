(function (){
window['CMemberMax'] = {};
init = function (){
	$("#form_member_max .Button_Submit").click(save);
	$("#form_member_max .Button_Cancel").click(CCore.close);
	var member = CCore.getCurrentMember();
	CCore.updateForm(member);
	CCore.label("form_member_max");
};
save = function () {
	if(validate()){
		if (CCore.postData('/service/member/savereceivemaxordennumber', 'form_member_max')) {
			$("#awoke_online").html($("#receiveMaxOrdenNumber").val());
			CCore.close();
		}
	}
};
validate = function () {
	if (CValidator.checkInvalid('form_member_max')) {
		return false;
	}
	return true;
};
window['CMemberMax']['init']=init;
})();