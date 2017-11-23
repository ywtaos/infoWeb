(function (){
window['CPickMaster'] = {};
var OrdenID = "";
init = function (ordenID){
	$(".dialog-title").html("请选择一个师傅分配任务");
	OrdenID = ordenID;
	list();
};
select =function(id){
	var param ={};
	param.ordenID = OrdenID;
	param.masterID = $(this).parent().parent().attr("id");
	param.masterName = $(this).parent().parent().attr("name");
	CCore.invoke("/service/orden/servicecompanyassignmaster",param);
	COrdenList.list(0);
	CCore.close();
};
list=function () {
	var locations = CCore.invoke("/service/location/getservicelocationmasters");
	CCore.processList("MasterResult","MasterResultTemplate", locations);
	$("#MasterResult .Button_Select").click(select);
};
window['CPickMaster']['init']=init;
})();