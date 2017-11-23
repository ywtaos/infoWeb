(function (){
window['CPickLocation'] = {};
controlID = "";
controlText = "";
init = function (cID, cText,isMulti){
	controlID = cID;
	controlText = cText;
	bindEvent();
	listLocation();
	
	if(typeof(isMulti)=="undefined" || !isMulti){
		console.log(111);
		$("#PickLocationResult").on("click","input[type=checkbox]",function(){
			console.log(111);
			CCore.checkOnce(this)
		});
	}
};
bindEvent = function () {
	$("#PickLocationSearch .Button_Search").click(listLocation);
	$("#btnSavePickLocation").click(pick).html(CCore.getValue("Button_OK"));
	$("#btnCancelPickLocation").click(CCore.close).html(CCore.getValue("Button_Close"));
};
pick = function () {
	var locationID = CCore.getCheckedValue('pickRow');
	$("#" + controlID).val(locationID);
	$("#" + controlText).val(CCore.getCheckedText('pickRow'));
	CCore.close();
};
listLocation = function () {
	var param = CCore.getFormData('PickLocationSearch');
	
	param = CCore.paramPageIndex(0,param);
	
	console.log(param);
	
	param[CKey.PageSize] = 100000;
	CCore.invoke("/service/location/getlocations", param,function(data){
		CCore.processList("PickLocationResult","PickLocationTemplate", data);
		CCore.label("PickLocationSearch");
	});
	
};
window['CPickLocation']['init']=init;
})();