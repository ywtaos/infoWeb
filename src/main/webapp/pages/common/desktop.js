(function () {
window['CDesktop'] = {};
init = function () {
	loadCurrentMember();

//	listCarBill();
	//loadInfoStatisticByType("containerBranch","本月表单类型统计图");
	//loadChartPubMember("containerSalesMember","坐席来电分布统计");
	
	
	loadAllStockColumn("containerSalesMember","折线图");
	loadAllStockPie("containerBranch","饼状图");
	
	
	$("#dueWarn").organicTabs();
	$("#notice").organicTabs();
	var param = {};
	param = CCore.paramPageIndex(0, param);
	CCore.invoke("/service/announcement/getannouncements", param, function (data) {
	       CCore.processList("AnnouncementResultDeskTop", "AnnouncementTemplateDeskTop", data.data);
	      $("#AnnouncementResultDeskTop .link").click(function () { openAnnouncementView($(this).parent().attr("id")); });
	      $("#AnnouncementResultDeskTop #moreAnnouncementAdvance").click(function () { loadAnnouncementList(true); });
	});
    CCore.invoke("/service/knowledge/getknowledges", param, function (data) {
        CCore.processList("KnowledgeResultDeskTop", "KnowledgeResultTemplateAdvance", data.data);
        $("#KnowledgeResultDeskTop #moreKnowledgeAdvance").click(function () { loadKnowledgeList(true); });
	});
};
listCarBill=function () {
	var count= CCore.invoke("/service/carbill/getcarbillcounttoday");
	var approvedCount=CCore.invoke("/service/carbill/getcarbillapprovedcounttoday");
	var unAuditing=count-approvedCount;
	var p=1;
	if(count>0){
	p=approvedCount/count;
	}
	percent('bg' ,p ,'#txt' , '#bfebff');
	//$("#alreadyAuditing").html(approvedCount);
	//$("#unAuditing").html(unAuditing);
	
};

loadAllStockColumn = function (container, splineName) {
	var param = CCore.getFormData('StockSearch');
	CCore.invoke("stock/getallstock", param, function (data) {
		CStatistic.loadColumn(container, data, splineName);
	});
};
loadAllStockPie = function (container, splineName) {
	var param = CCore.getFormData('StockSearch');
	CCore.invoke("stock/getallstock", param, function (data) {
		CStatistic.loadPie(container, data, splineName);
	});
};
listAdvanceCarbill=function () {
	var villageGroupID="";
	if (!CCore.isInRole(CDict.MenuDiaryAll)) {
		villageGroupID=CCore.getCurrentMember().groupID;
	}
	var param = {};
	param["searchPaymentTypeID"]=CDict.CarBillPaymentTypeAdvance;
	//param["searchVillageID"]=villageGroupID;
	param = CCore.paramPageIndex(0,param);
	CCore.invoke("/service/carbill/getcarbills", param,function(data){
		CCore.processList("t1","AnnouncementTemplateDeskTop", data);
		$("#moreCarbillAdvance").click(function(){loadCarbillList(false,CDict.CarBillPaymentTypeAdvance)});
	});
	
};
loadAnnouncementList = function (due, paymentTypeID) {
    CCore.loadPage("main", "../announcement/list.htm", function () { CAnnouncementList.init(due, paymentTypeID); });
};
openAnnouncementView = function (id) {
    CCore.loadModal('../announcement/view.htm', 939, 530, function () { CAnnouncementView.init(id); });
};
loadKnowledgeList = function (menuID, due, paymentTypeID) {
    CCore.loadPage("main", "../knowledge/list.htm", function () { CKnowledgeList.init(menuID, due, paymentTypeID); });
};
openKnowledgeView = function (id) {
    CCore.loadModal('../knowledge/view.htm', 939, 530, function () { CKnowledgeView.init(id); });
};

loadCurrentMember = function () {
	var member = CDashboard.getCurrentMember();
	$(".richinfo .nick").html(member.username);
	$(".richinfo #role").html(member.groupName);
	$(".richinfo #logtime span").html(member.lastLoginDate);
};

percent = function(b,n,t,c){
	paper = Raphael(b, 110, 110); 
	var percent = n	, 
		drawPercent = percent >= 1 ? 0.9999 : percent; 

	var r1 = 40, r2 = 52, PI = Math.PI, 
		p1 = { 
			x:54,  
			y:106 
		}, 
		p4 = { 
			x:p1.x, 
			y:p1.y - r2 + r1 
		}, 
		p2 = {  
			x:p1.x + r2 * Math.sin(2 * PI * (1 - drawPercent)), 
			y:p1.y - r2 + r2 * Math.cos(2 * PI * (1 - drawPercent)) 
		}, 
		p3 = { 
			x:p4.x + r1 * Math.sin(2 * PI * (1 - drawPercent)), 
			y:p4.y - r1 + r1 * Math.cos(2 * PI * (1 - drawPercent)) 
		}, 
		path = [ 
			'M', p1.x, ' ', p1.y, 
			'A', r2, ' ', r2, ' 0 ', percent > 0.5 ? 1 : 0, ' 1 ', p2.x, ' ', p2.y, 
			'L', p3.x, ' ', p3.y, 
			'A', r1, ' ', r1, ' 0 ', percent > 0.5 ? 1 : 0, ' 0 ', p4.x, ' ', p4.y, 
			'Z' 
		].join(''); 

	paper.path(path) 

		.attr({"stroke-width":0.5, "stroke":"#d8eef7", "fill":"90-" + c}); 
	
	$(t).text(Math.round(percent * 100) + "%"); 
}
window['CDesktop']['init'] = init;
window['CDesktop']['loadAnnouncementList'] = loadAnnouncementList;
window['CDesktop']['openAnnouncementView'] = openAnnouncementView;
window['CDesktop']['loadKnowledgeList'] = loadKnowledgeList;
window['CDesktop']['openKnowledgeView'] = openKnowledgeView;

})();