(function (){
window['CShareLogCommon'] = {};
getShareLogByID = function (id,callback){
	CCore.invoke('sharelog/getsharelogbyid', {'id':id},callback);
};
fillShareLogCategory = function (controlID) {
	CDictPick.init(controlID, CDict.ShareLogShareLogCategory);
};
fillShareLogTarget = function (controlID) {
	CDictPick.init(controlID, CDict.ShareLogShareLogTarget);
};
window['CShareLogCommon']['getShareLogByID']=getShareLogByID;
window['CShareLogCommon']['fillShareLogCategory']=fillShareLogCategory;
window['CShareLogCommon']['fillShareLogTarget']=fillShareLogTarget;
})();