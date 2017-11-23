(function (){
window['CLocationView'] = {};
init = function (id){
	CLocationCommon.getLocationByID(id,function(location){
		CCore.view('form_location_view', location);
		CPickMap.init("point",true,location.point,false,false);
	});
};
window['CLocationView']['init']=init;
})();