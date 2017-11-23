(function (){
window['CMapView'] = {};

init = function (id,flag){
	var orden = COrdenCommon.getOrdenByID(id);
	var point;
	var address;
	CMapCommon.loadMap();
	if(flag == 1){
		point = new BMap.Point(orden.lng,orden.lat);
		address = orden.address;
	}
	if(flag == 2){
		point = new BMap.Point(orden.finishLng,orden.finishLat);
		address="完成坐标";
	}
	CMapCommon.addMarker(point,"",address,"","",true);
	CMapCommon.setMapCenter(point);
};

window['CMapView']['init']=init;
})();