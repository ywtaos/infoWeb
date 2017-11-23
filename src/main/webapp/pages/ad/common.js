(function (){
window['CAdCommon'] = {};
getAdByID = function (id){
	return CCore.invoke(CCore.servicePath('/service/ad/getadbyid'), {id:id});
};
window['CAdCommon']['getAdByID']=getAdByID;
})();