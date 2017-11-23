(function (){
window['CLocationCommon'] = {};
getLocationByID = function (id,callback){
	CCore.invoke('location/getlocationbyid', {'id':id},callback);
};
window['CLocationCommon']['getLocationByID']=getLocationByID;
})();