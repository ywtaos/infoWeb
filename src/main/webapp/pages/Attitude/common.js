(function (){
window['CAttitudeCommon'] = {};
getAttitudeByID = function (id,callback){
	CCore.invoke('attitude/getattitudebyid', {'id':id},callback);
};
fillCategoty = function (controlID) {
	CDictPick.init(controlID, CDict.AttitudeCategoty);
};
window['CAttitudeCommon']['getAttitudeByID']=getAttitudeByID;
window['CAttitudeCommon']['fillCategoty']=fillCategoty;
})();