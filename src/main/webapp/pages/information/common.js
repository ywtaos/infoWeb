(function (){
window['CInformationCommon'] = {};
getInformationByID = function (id){
	return CCore.invoke('information/getinformationbyid', {'id':id});
};

fillCategory = function (controlID) {
	CDictPick.init(controlID, CDict.InformationCategory);
};
fillHot = function(controlID){
	CDictPick.init(controlID,CDict.InformationHot);
};
fillCate = function (controlID) {
	CDictPick.init(controlID, CDict.InformationCate);
};

fillInformationStatus = function(controlID){
	CDictPick.init(controlID,CDict.InformationStatus);
};


window['CInformationCommon']['getInformationByID']=getInformationByID;
window['CInformationCommon']['fillCategory']=fillCategory;
window['CInformationCommon']['fillHot']=fillHot;
window['CInformationCommon']['fillInformationStatus']=fillInformationStatus;

})();