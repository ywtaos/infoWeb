(function (){
window['CFavoriteCommon'] = {};
getFavoriteByID = function (id,callback){
	CCore.invoke('favorite/getfavoritebyid', {'id':id},callback);
};
window['CFavoriteCommon']['getFavoriteByID']=getFavoriteByID;
})();