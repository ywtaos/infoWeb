(function (){
window['CGroupMenu'] = {};
var treeGroup=null;
var status="View";
init = function (){
	bindLabel();
	$("#btnSaveGroupMenu").click(saveGroupMenu);
	$("#btnEdit").click(edit);
	$("#btnView").click(view);
	fillGroups();
	treeGroup=getTreeDict();
	fillMenus(-1);
	view();
	calHeight();
};
calHeight = function () {
	var height = $(window).height()-200;
	$("#group,#menus").height(height);
};
getTreeDict = function () {
	return $.fn.zTree.getZTreeObj("group");
};

fillGroups = function(){
	var setting = {
		check:{
			enable: true, chkboxType: { "Y": "s", "N": "" }
		},
		view: {
			dblClickExpand: false
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			onClick: onGroupClick
		}
	};
	var nodes = [];
	var datas = CCore.getAllDicts(CDict.Group);
	$.each(datas, function (i, data) {
		var isOpen = false;
		if(data.code.length<=20){
			//isOpen = true;
		}
		if(data.parentID==CDict.Group){
			isOpen=true;
		}	
		var node = {open:isOpen, id: data.ID, pId: data.parentID, name: data.name, open: isOpen };
		nodes.push(node);
	});
	$.fn.zTree.init($("#group"), setting, nodes);
	var nodeGroups = $.fn.zTree.getZTreeObj("group").getNodes();
	if (nodeGroups.length > 0) {
		$.fn.zTree.getZTreeObj("group").selectNode(nodeGroups[0]);
		fillMenus(nodeGroups[0].id);
	}
};
fillMenus = function (groupid) {
	$("#menus").html("");
	var setting = {
		check:{
			enable: true, chkboxType: { "Y": "ps", "N": "s" }
		},
		data: {
			key: { title: "title" }, simpleData: { enable: true }
		},
		view: {showIcon: true},
		callback:{onClick: onMenuClick}
	};
	var allMenus = CCore.invoke('/service/groupmenu/getallmenus');
	var param = {};
	param["groupid"] = groupid;console.log(param);
	var groupMenus = CCore.invoke('/service/groupmenu/getgroupmenus', param);
	var nodes = [];
	for (var i = 0; i < allMenus.length; i++) {
		var checked = false;
		if (CCore.contain(groupMenus, allMenus[i].ID.toString())) {
			checked = true;
		}
		var isOpen=false;
		if(allMenus[i].parentID==CDict.BackendMenu){
			isOpen=true;
		}
		var node = {open: isOpen, id: allMenus[i].ID, pId: allMenus[i].parentID, name: allMenus[i].name, checked: checked, title: allMenus[i].name };
		nodes.push(node);
	}
	$.fn.zTree.init($("#menus"), setting, nodes);
};
bindLabel = function () {
	$("#lblGroup").html(CCore.getValue("Member_Group"));
	$("#lblFunction").html(CCore.getValue("Common_Function"));
	$("#btnSaveGroupMenu").html(CCore.getValue("Button_Submit"));
};
saveGroupMenu = function () {
	var param = {};
	param["groupIDs"] = getCheckedNodes("group");
	param["menus"] = getCheckedNodes("menus");
	if(CValidator.isNull(param["groupIDs"])){
		CCore.alert("请选择职务");
		return false;
	}
	if(CValidator.isNull(param["menus"])){
		CCore.alert("请选择功能");
		return false;
	}
	CCore.invoke(CCore.servicePath('/service/groupmenu/savegroupmenu'), param);
	CCore.alert(CCore.getValue("Common_SaveSuccess"));
	checkAllFalse();
	view();
};
checkAllFalse = function(){
	$.fn.zTree.getZTreeObj("group").checkAllNodes(false);
	$.fn.zTree.getZTreeObj("menus").checkAllNodes(false);
};
getCheckedNodes=function(treeID){
	var checkedNodeIDs = "";
	$.each($.fn.zTree.getZTreeObj(treeID).getCheckedNodes(true), function (i, node) {
		checkedNodeIDs += node.id + ",";
	});
	if (checkedNodeIDs.endWith(",")) {
		checkedNodeIDs = checkedNodeIDs.substring(0, checkedNodeIDs.length - 1);
	}
	return checkedNodeIDs;
};
onMenuClick = function (event, treeId, treeNode, clickFlag) {
	$.fn.zTree.getZTreeObj("menus").expandNode(treeNode);
};
onGroupClick = function (e, treeId, treeNode) {
	//$.fn.zTree.getZTreeObj("group").checkNode(treeNode, !treeNode.checked, null, true);
	if(status=="View"){
		fillMenus(treeNode.id);
		changeChkEditable("menus",true);
	}
};
edit=function(){
	$("#btnView,#btnSaveGroupMenu").show();
	$("#btnEdit").hide();
	checkAllFalse();
	changeChkEditable("group",false);
	changeChkEditable("menus",false);
	status="Edit";
	
	
};
view=function(){
	$("#btnView,#btnSaveGroupMenu").hide();
	$("#btnEdit").show();
	checkAllFalse();
	changeChkEditable("group",true);
	changeChkEditable("menus",true);
	status="View";
	
};
changeChkEditable=function(treeID,edit){
	var treeObj = $.fn.zTree.getZTreeObj(treeID);
	var nodes = treeObj.transformToArray(treeObj.getNodes());
	for (var i=0; i <nodes.length; i++) {
		treeObj.setChkDisabled(nodes[i], edit);
	}
};
window['CGroupMenu']['init']=init;
window['CGroupMenu']['getTreeDict'] = getTreeDict;

})();
