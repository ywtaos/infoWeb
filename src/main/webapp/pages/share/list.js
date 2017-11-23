(function (){
window['CShareList'] = {};
init = function (categoryID){
	
	console.log(categoryID);
	$("#searchCategoryID").val(categoryID);
	listShare(0);
	bindShareEvent();
	CCore.label("ShareSearch");	
	CCore.label("ShareCommand");
};
bindShareEvent = function() {
	CCore.datePicker('fromDate', "", false, false);
	CCore.datePicker('toDate', "", false, false);
	$("#ShareSearch .Button_Search").click(function () {listShare(0,0); });
	$("#ShareSearch .Button_Buzz").click(function () {listShare(0,1); });
	$("#ShareSearch .Button_Time").click(function () {listShare(0,0); });
	$("#ShareCommand .Button_Remove").click(removeShare);
	$("#ShareCommand .Button_Add").click(function(){openSharePost(null);});
	//CShareCommon.fillIsTop('searchHotID');
	$("#ShareCommand .Button_Open").click(function(){
		changeOpenStatus(CDict.ShareOpenStatus);
	});
	$("#ShareCommand .Button_Close").click(function(){
		changeCloseStatus(CDict.ShareCloseStatus);
	});
	$("#ShareCommand .Button_Recommend").click(function(){
		changeShareRecommend(CDict.ShareRecommend);
	});
	$("#ShareCommand .Button_Chosen").click(function(){
		changeShareRecommend(CDict.ShareHot);
	});
	$("#ShareCommand a.Button_Add").each(function (index) {
	    if (CCore.isInRole(CDict.ShareAdd)) {
	        $(this).show();
	    }
	});
	$("#ShareCommand a.Button_Remove").each(function (index) {
	    if (CCore.isInRole(CDict.ShareRemove)) {
	        $(this).show();
	    }
	});
	$("#ShareCommand a.Button_Open").each(function (index) {
	    if (CCore.isInRole(CDict.ShareOpen)) {
	        $(this).show();
	    }
	});
	$("#ShareCommand a.Button_Close").each(function (index) {
	    if (CCore.isInRole(CDict.ShareClose)) {
	        $(this).show();
	    }
	});
	$("#ShareCommand a.Button_Chosen").each(function (index) {
	    if (CCore.isInRole(CDict.ShareHot)) {
	        $(this).show();
	    }
	});
	$("#ShareCommand a.Button_Recommend").each(function (index) {
	    if (CCore.isInRole(CDict.ShareRecommend)) {
	        $(this).show();
	    }
	});
	
};
openSharePost = function (id) {
	CCore.loadModal('../share/post.htm', 939, 530, function () { CSharePost.init(id); });
};
openShareView = function (id) {
	CCore.loadModal('../share/view.htm', 939, 530, function () { CShareView.init(id); });
};
removeShare = function () {
	CCore.removeData('share/removeshares', CCore.getCheckedValue('chkRow'));
};
openShare = function () {
	CCore.invoke('share/openshares', CCore.getCheckedValue('chkRow'));
};
closeShare = function () {
	CCore.invoke('share/closeshares', CCore.getCheckedValue('chkRow'));
};
changeOpenStatus = function(statusID){
	var changeIDs = CCore.getCheckedValue('chkRow').toString();	
	CCore.invoke("/service/share/changesharestatus",{changeIDs:changeIDs,statusID:statusID},function(data){
		if(data == "OK"){
			tip("审核通过");
			listShare();
		}else{
			tip(data);
		}
	});
};
changeCloseStatus = function(statusID){
	var changeIDs = CCore.getCheckedValue('chkRow').toString();	
	CCore.invoke("/service/share/changesharestatus",{changeIDs:changeIDs,statusID:statusID},function(data){
		if(data == "OK"){
			tip("审核未通过");
			listShare();
		}else{
			tip(data);
		}
	});
};
changeShareRecommend = function(recommendID){
	var changeIDs = CCore.getCheckedValue('chkRow').toString();	
	CCore.invoke("/service/share/changesharerecommend",{changeIDs:changeIDs,recommendID:recommendID},function(data){
		if(data == "OK"){
			tip("成功");
			listShare();
		}else{
			tip(data);
		}
	});
};

listShare=function (pageIndex,heat) {
	var param = CCore.getFormData('ShareSearch');
	param = CCore.paramPageIndex(pageIndex,param);
	if(heat==1){
		param.heat = 1;
	}
	CCore.invoke("share/getmyshares", param,function(data){		
		console.log(data);		
		CCore.processList("ShareResult","ShareResultTemplate", data, listShare);
		var categoryID = $("#searchCategoryID").val();
		if(categoryID!=CDict.ShareRead){
			$(".read").hide();
		}
		if(categoryID==CDict.ShareRead){
			$(".infor").hide();
		}
		if(categoryID==CDict.ShareRead){
			$(".baol").hide();
		}		
	});
};
window['CShareList']['init']=init;
window['CShareList']['listShare']=listShare;
})();
