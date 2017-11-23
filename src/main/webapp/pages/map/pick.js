(function (){
window['CPickMap'] = {};
controlID = "";
var points = [];
var currentMarker;
var map=null;
var isMulti = false;
var enableDrag = true;
init = function (ControlID,IsMulti,Points,canClick,canDrag){	
	controlID =ControlID;
	isMulti = IsMulti;
	if(!CValidator.isNull(canDrag)){
		
		enableDrag = false;
	}
	map = loadMap(canClick);
	OverlayInit(Points);
	bind();
	localSearch();
};
OverlayInit = function(Points){
	
	if(!CValidator.isNull(Points)){
		if(!Points.startWith("[")){
			Points ="["+Points+"]";
		}
		var arrPoints = JSON.parse(Points);
		
		$("#searchKeywordMap").val(arrPoints[0].lng+","+arrPoints[0].lat);
		addMarker(new BMap.Point(arrPoints[0].lng,arrPoints[0].lat));
		
		if(arrPoints.length>1){
			addMarker(new BMap.Point(arrPoints[arrPoints.length-1].lng,arrPoints[arrPoints.length-1].lat));
		}
		
		for(var i = 0; i<arrPoints.length;i++){
			points.push(new BMap.Point(arrPoints[i].lng,arrPoints[i].lat));
			
			ply = polyLine(map,points);
			
			map.setViewport(ply.getPath()); 
		}
	}
}
bind = function(){
	$("#btnSavePickLocation").click(submit).html(CCore.getValue("Button_OK"));
	$("#btnCancelPickLocation").click(CCore.close).html(CCore.getValue("Button_Cancel"));
	$("#btnCleanPickLocation").click(function(){removeOverlay();});
};
submit=function(){
	var strPoint = JSON.stringify(points);
	console.log("111111111111111");
	console.log(strPoint);
	
	

		$("#" + controlID).val(strPoint.replaceAll("\"","'"));
		$("#" + controlID+"Traces").html(strPoint.substring(1,strPoint.length-1));
	
	
	points = [];
	CCore.close();
};

loadMap=function(canClick,riverStyle){
	
		map = new BMap.Map("map",{enableMapClick: false,minZoom:9,maxZoom:25});
		
			map.setMapStyle({
				  styleJson:[
					  {
		                  "featureType": "water",
		                  "elementType": "geometry",
		                  "stylers": {
		                            "color": "#00ffff",
		                            "hue": "#00ffff",
		                            "visibility": "on"
		                  }
		        },
		        {
		                  "featureType": "road",
		                  "elementType": "all",
		                  "stylers": {
		                            "color": "#eeeeee",
		                            "hue": "#eeeeee",
		                            "lightness": 5,
		                            "visibility": "off"
		                  }
		        },
		        {
		            "featureType": "boundary",
		            "elementType": "geometry",
		            "stylers": {
		                      "color": "#444444",
		                      "hue": "#444444",
		                      "weight": "4.5",
		                      "lightness": -29,
		                      "saturation": 1,
		                      "visibility": "on"
		            }
		  },
		        {
		            "featureType": "label",
		            "elementType": "labels.icon",
		            "stylers": {
		                      "color": "#444444",
		                      "hue": "#444444",
		                      "weight": "4.5",
		                      "lightness": -29,
		                      "saturation": 1,
		                      "visibility": "on"
		            }
		  }
					  
				  ]
				});
	
	map.centerAndZoom(CDict.MapCenter, 11);
	map.enableScrollWheelZoom(true);
	
	map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT}));
	map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT})); 


     if(canClick){
		map.addEventListener("click", function(e){
			mapClick(e.point);
		});
     }	
     localSearch();
     addLabel(label);
     
     showBorder(CDict.MapCenter,"#0033ff");
    
	return map;
//	CCore.blurSubmit("search","searchKeyword");
};
removeBDLogo = function(){
	$(".BMap_cpyCtrl").hide();
	$("img[src='http://api0.map.bdimg.com/images/copyright_logo.png']").hide();
}

localSearch = function(){
	var local = new BMap.LocalSearch(map, {
		//renderOptions:{map: map},
		onSearchComplete:function(results){
			if (local.getStatus() == BMAP_STATUS_SUCCESS){
				var poi = results.getPoi(0);
				
				removeOverlay();
				map.centerAndZoom(poi.point, 15);
				mapClick(poi.point);
			}
		}
	});
	$("#searchKeywordMap").blur(function(){
		var strPoint = $(this).val();
		if(strPoint.indexOf(",") > 0){
				var arr = strPoint.split(",");
				var point = new BMap.Point(arr[0],arr[1]);
				removeOverlay();
				map.centerAndZoom(point, 15);
				mapClick(point);
		}else{
			
			local.search($(this).val());
			
		}
	});
	
	if(CValidator.isNull($("#lng").val())&&!CValidator.isNull($("#searchKeywordMap").val())){
		local.search($("#searchKeywordMap").val());
	}
	if($("#lng").val()>0){
		point=new BMap.Point($("#"+lng).val(),$("#"+lat).val());
		map.centerAndZoom(point,12); 
		addMarker(point);
	}

}
showDistrictBorder = function () {
    
    showBorder("潍坊市", "#009ad6");
   /* showBorder("奎文区", "#009ad6");
    showBorder("潍城区", "#009ad6");
    showBorder("寒亭区", "#009ad6");
    showBorder("坊子区", "#009ad6");
    showBorder("临朐县", "#009ad6");
    showBorder("昌乐县", "#009ad6");
    showBorder("青州市", "#009ad6");
    showBorder("诸城市", "#009ad6");
    showBorder("寿光市", "#009ad6");
    showBorder("安丘市", "#009ad6");
    showBorder("高密市", "#009ad6");
    showBorder("昌邑市", "#009ad6");*/
    
};
polyLine = function(map,points){
	
	var polyline =  new BMap.Polyline(points, {strokeColor: "#ff00ff", strokeWeight: 6, strokeOpacity: 0.5});
	 polyline.enableMassClear();
	 map.addOverlay(polyline);
	return polyline;
};

showBorder =function(districtName, boundaryColor) {
	var boundary = new BMap.Boundary();
	
	boundary.get(districtName, function(rs){
		var boundaries = rs.boundaries;
		
		for (var i = 0; i < boundaries.length; i++) {
			 ply = new BMap.Polyline(boundaries[i], {strokeWeight:3, strokeColor: boundaryColor});
			map.addOverlay(ply);
			map.setViewport(ply.getPath()); 
			ply.disableMassClear();
		}
	});
	
};

addMarker=function (point,typeID){
	
	var marker = new BMap.Marker(point);
	if(!CValidator.isNull(typeID)){
		var type=getMarkerTypeByID(typeID);
		var myIcon = new BMap.Icon(type.extension, new BMap.Size(12, 12), {    
			offset: new BMap.Size(10, 25),
			imageOffset: new BMap.Size(0, 0 - 0 * 25)
		});
	}
	marker.enableMassClear();
	
	//marker.addEventListener("dblclick",function(){CPickMap.pick(point);});
	
	if(enableDrag){
		marker.enableDragging();
		 marker.addEventListener("dragend", function (e) {
	          
	           points = [e.point];
	           
	       });
	}
	currentMarker = marker;
	map.addOverlay(marker);
   
	
};
addLabel = function(marker,label,markerClick){
	if(!CValidator.isNull(label)){
		var opts = {
		  position : point,
		  offset   : new BMap.Size(10, -10)
		}
		var label = new BMap.Label(label, opts);
			label.setStyle({
				color : "#149401",
				borderRadius:"3px",
				border:"solid 1px #149401",
				fontSize : "12px",
				height : "20px",
				ineHeight : "20px"
		});
		//label.addEventListener("click",function(){markerClick(id,marker);});
		marker.setLabel(label);
	}
}
mapClick=function(point){
	if(isMulti){
		addMarker(point);
		enableDrag = false;
	    points.push(point);
	   
	    polyLine(map,points);
	}else{
		removeCurrentMarker();
		addMarker(point);
		points=[point];
	}
	
	
};
removeCurrentMarker=function(){
	if(!CValidator.isNull(currentMarker)){
		map.removeOverlay(currentMarker);
	}
};
removeOverlay = function(){
	points = [];
	map.clearOverlays();
};

setMapCenter=function(point){
	map.centerAndZoom(point,17); 
};
getCurrentMarker=function(){
	return currentMarker.getPosition();
};




window['CPickMap']['init']=init;
window['CPickMap']['polyLine']=polyLine;
window['CPickMap']['removeOverlay']=removeOverlay;
window['CPickMap']['loadMap']=loadMap;
})();