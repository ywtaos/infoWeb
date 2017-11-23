(function (){
window['CAttentionCommon'] = {};
getAttentionByID = function (id,callback){
	CCore.invoke('attention/getattentionbyid', {'id':id},callback);
};
window['CAttentionCommon']['getAttentionByID']=getAttentionByID;
})();