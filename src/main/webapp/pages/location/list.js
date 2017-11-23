(function (){
window['CLocationList'] = {};
init = function (){
	listLocation(0);
	bindLocationEvent();	
};
bindLocationEvent = function() {
	$("#LocationSearch .Button_Search").click(function () {listLocation(0); });
	$("#LocationCommand .Button_Remove").click(removeLocation);
	$("#LocationCommand .Button_Add").click(function(){openLocationPost(null);});
};
openLocationPost = function (id) {
	CCore.loadModal('../location/post.htm', 939, 530, function () { CLocationPost.init(id); });
};
openLocationView = function (id) {
	CCore.loadModal('../location/view.htm', 939, 530, function () { CLocationView.init(id); });
};
removeLocation = function () {
	CCore.removeData('location/removelocations', CCore.getCheckedValue('chkRow'));
};


listLocation=function (pageIndex) {
	var param = CCore.getFormData('LocationSearch');
	param = CCore.paramPageIndex(pageIndex,param);
	CCore.invoke("location/getlocations", param,function(data){
		console.log(data);
		CCore.processList("LocationResult","LocationResultTemplate", data, listLocation);
	});
};
window['CLocationList']['init']=init;
window['CLocationList']['listLocation']=listLocation;
})();
