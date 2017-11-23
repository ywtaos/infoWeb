(function (){
window['CLogin'] = {};
init = function (page){
	var v = CCore.queryString("v");
	var line = CCore.queryString("line");
	CStore.set("line",line);
    if(!CValidator.isNull(v)){
        CCore.setCurrentLang(v);
    }
	CCore.setLocalResource();
	CCore.enterNext();
	CCore.enterSubmit('password', 'btnSubmit');
	var systemName = CCore.getValue("Common_SystemName");
	page.title = systemName;
	$("#system").html(CCore.getValue("Common_SystemName"));
	//$("#username").parent().prev().html(CCore.getValue("Member_Username"));
	//$("#password").parent().prev().html(CCore.getValue("Member_Password"));
	$("#btnSubmit").val(CCore.getValue("Button_Submit")).click(login);
     debugger
	$("#username").val(CStore.get("username"));
	
	if(CValidator.isNull($("#username").val())){
		$("#username").focus();
	}else{
		$("#password").focus();
	}
};
login = function(){
	CStore.set("username", $("#username").val());
	
	CCore.login('_login');
};
window['CLogin']['init']=init;
})();

$(function(){
	CLogin.init(this);
});