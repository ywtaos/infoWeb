(function (){
window['CSubjectCommon'] = {};

getSubjectByID = function (id){
	return CCore.invoke('subject/getsubjectbyid', {'id':id});
};
fillIsTop = function (controlID) {
	CDictPick.init(controlID, CDict.SubjectIsTop);
};
window['CSubjectCommon']['getSubjectByID']=getSubjectByID;
window['CSubjectCommon']['fillIsTop']=fillIsTop;
})();