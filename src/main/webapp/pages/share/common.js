(function (){
window['CShareCommon'] = {};
getShareByID = function (id){
	return CCore.invoke('share/getsharebyid', {'id':id});
};
fillStatus = function (controlID) {
	CDictPick.init(controlID, CDict.ShareStatus);
};
fillCategoty = function (controlID) {
	CDictPick.init(controlID, CDict.ShareCategoty);
};
fillIsRecommend = function (controlID) {
	CDictPick.init(controlID, CDict.ShareIsRecommend);
};
fillIsHot = function (controlID) {
	CDictPick.init(controlID, CDict.InformationHot);
};
fillIsTop = function (controlID) {
	CDictPick.init(controlID, CDict.SubjectIsTop);
};
fillIsFocus = function (controlID) {
	CDictPick.init(controlID, CDict.ShareFocus);
};
fillCategory = function (controlID) {
	CDictPick.init(controlID, CDict.ShareRead);
};

window['CShareCommon']['getShareByID']=getShareByID;
/*window['CShareCommon']['fillStatus']=fillStatus;*/
window['CShareCommon']['fillIsFocus']=fillIsFocus;
window['CShareCommon']['fillIsTop']=fillIsTop;
window['CShareCommon']['fillIsHot']=fillIsHot;
window['CShareCommon']['fillCategory']=fillCategory;

})();