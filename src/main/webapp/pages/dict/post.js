(function (){
isAdd = true;
sequenceNo = 0;
window['CDictPost'] = {};
init = function (id, add){
	CCore.label("form_dict");
	isAdd = add;
	$("#btnSaveDict").click(save);
	var dict = CCore.getDictByID(id);
	if (id != "0") {
		$("#parentName").val(dict.name);
	} else {
		hideParent();
		$("#parentID").val("0");
	}
	
	if (isAdd) {
		$("#form_dict h1").html(CCore.getValue("Common_Add", "Common_DictModuler"));
		$("#parentID").val(id);
		if(id==0){
			$("#extension").val(2);
		}
		var param = {};
		param["parentID"] = id;
		var sequence = CCore.invoke(CCore.servicePath('/service/dict/getmaxsequence'), param);
		$("#sequenceNo").val(sequence);
	} else {
		$("#form_dict h1").html(CCore.getValue("Common_Edit", "Common_DictModuler"));
		CCore.updateForm(dict);
		sequenceNo = dict.sequenceNo;
		if (dict.parentID == 0) {
			$("#parentName").val(CCore.getValue('Common_DictTop'));
			hideParent();
		}
	}
	bindCheckStyle(dict);
	bindDepartmentType(dict);
};
//绩效考核
bindCheckStyle=function(dict){
	if(!CValidator.isNull(dict) && dict.code.startWith("0059") && dict.code.length >= 12){
		$(".Common_Memo,.Common_Status").hide().next().hide();
		$(".Common_DictExtension").html("分数(扣分用负数)");
	}
};
//部门类型
bindDepartmentType=function(dict){
	if(!CValidator.isNull(dict) && dict.code.startWith("00010011")){
		$(".Common_Memo,.Common_DictExtension").hide().next().hide();
		CDictPick.init("statusID", CDict.OrganizationType);
		$("#statusID").hide();
		if($("#statusID").val() == CDict.OrganizationTypeDepartment){
			$("#statusName").val("部门");
		}
		if($("#statusID").val() == CDict.OrganizationTypeDuty){
			$("#statusName").val("职位");
		}
	}
};
hideParent=function(){
	$("#parentName").hide();
	$("#parentName").parent().hide();
	$("#parentName").parent().prev().hide();
};
save = function () {
	var name = $("#name").val();
	var newSequenceNo = $("#sequenceNo").val();
	var treeDict=CDictList.getTreeDict();
	
	if (validate()) {
		if (CCore.postData(CCore.servicePath('/service/dict/savedict'), 'form_dict')) {
			if (isAdd) {
				var parent = treeDict.getSelectedNodes()[0];
				var url = CCore.servicePath('/service/dict/getnewdict');
				var newDict = CCore.invoke(url);
				var newNode = { id: newDict.ID, name: name, pId: newDict.parentID, code: newDict.code };
				treeDict.addNodes(parent, newNode);
			} else {
				var node = treeDict.getSelectedNodes()[0];
				if(newSequenceNo == sequenceNo){
					node.name = name;
					treeDict.updateNode(node);
				}else{
					CDictList.list();
					treeDict.selectNode(node,false);
				}
			}
			$("#dict_post").html('');
		}
	}
};
validate = function () {
	if($("#parentID").val() == "0" && isAdd == true){
		if($("#extension").val()<2){
			CCore.alert(CCore.getValue("Common_DictTotalLevelHint"));
			return false;
		}
	}
	if (CValidator.checkInvalid("form_dict")) {
		return false;
	}
	return true;
};
window['CDictPost']['init']=init;

})();