(function (){
window['CLocationPost'] = {};
init = function (id){
	bindEvent();
	if (!CValidator.isNull(id)) {
		CLocationCommon.getLocationByID(id,function(location){
			CCore.updateForm(location);
			$("#pointTraces").html($("#point").val().substring(1,$("#point").val().length-1));			
			$("#point").val($("#point").val().replaceAll("\"","'"));
		});
	}
	CCore.label("form_location_post");

};
bindEvent = function () {
	$("#form_location_post .Button_Submit").click(save);
	$("#pointTraces").click(openPickMap);
	$("#btnCleanPickLocation").click(function(){
		CPickMap.removeOverlay();
	});
};
save = function (){
	if (validate()){
		CCore.postData('location/savelocation', 'form_location_post',function(flag){
			if (flag) {
				CLocationList.listLocation();
				CCore.close();
			}
		});
	}
};
openPickMap = function(){	
	CCore.loadModal('../map/pick.htm', 935, 525, function () { CPickMap.init("point",false,$("#pointTraces").html(),true);});
};
validate = function () {
	if (CValidator.checkInvalid("form_location_post")) {
		return false;
	}
	return true;
};
window['CLocationPost']['init']=init;
})();
