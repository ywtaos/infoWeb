(function (){
window['CSharePost'] = {};

init = function (id){
	var categoryID = $("#searchCategoryID").val();
	$("#categoryID").val(categoryID);
	if(categoryID!=CDict.ShareRead){
		$(".read").hide();
	}
	if(CCore.getCurrentMember().groupID==CDict.MemberWrite){
		$(".write").hide();
	}
	$("#form_share_post .Button_Submit").click(save);
	$("#locationName").click(openReachPickLocation);

	//CShareCommon.fillStatus('statusID');
	CShareCommon.fillIsHot('hotID');
	CShareCommon.fillIsTop('isTopID');
	CShareCommon.fillIsFocus('isFocusID');
	CShareCommon.fillCategory('typeID');
	if (!CValidator.isNull(id)) {
		var share = CShareCommon.getShareByID(id);
		CCore.updateForm(share);
	}
	CCore.label("form_share_post");
	CCore.loadEditor('content');      
	CCore.datePicker('pubDate');
	//CUpload.init("imageIDs", CDict.FileExtension,false, null);
	//bindEvent();
};
/*bindEvent = function () {
	
};*/

openReachPickLocation = function(){
	CCore.loadModal('../location/pick.htm', 839, 430, function () { CPickLocation.init("locationID","locationName"); });
};


save = function (){
	var param = CCore.getFormData('form_share_post');
	if (validate()){
		CCore.postData('share/saveshare', 'form_share_post',function(flag){
			if (flag) {
				CShareList.listShare();
				CCore.close();
			}
		});
	}
};
validate = function () {
	if (CValidator.checkInvalid("form_share_post")) {
		return false;
	}
	return true;
};
window['CSharePost']['init']=init;
})();
