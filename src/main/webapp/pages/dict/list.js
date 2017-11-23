(function () {
window['CDictList'] = {};
treeDict = null;
init = function (topID) {
	if(CValidator.isNull(topID)){
		topID=0;
	}
	$("#topID").val(topID);
	$("#btnAddTop").click(addTop).html(CCore.getValue("Button_Add") + CCore.getValue("Common_DictTop"));
	$("#btnAddSub").click(addSub).html(CCore.getValue("Button_Add") + CCore.getValue("Common_DictSub"));
	$("#btnEdit").click(edit).html(CCore.getValue("Button_Edit")).hide();
	$("#btnRemove").click(remove).html(CCore.getValue("Button_Remove")).hide();
	list();
	treeDict = getTreeDict();
	if(topID==CDict.BackendMenu||topID==CDict.Group){
		var node = treeDict.getNodeByParam("id",topID);
		treeDict.expandNode(node, true, false, false);
	}
	calHeight();
};
calHeight = function () {
	var height = $(window).height()-220;
	$("#dict").height(height);
};
getTreeDict = function () {
	return $.fn.zTree.getZTreeObj("dict");
};
list = function () {
	var isOpen = false;
	$("#dict").html("");
	var setting = {
		check: { enable: false },
		data: { key: { title: "title" }, simpleData: { enable: true} },
		view: { showIcon: true },
		callback: { onClick: onClick }
	};
	var topID = $("#topID").val();
	var allDicts = CCore.getAllDicts(topID);
	if(topID > 0){
		var top = CCore.getDictByID(topID);
		allDicts.push(top);
		$("#btnAddTop").hide();
		//isOpen = true;
	}
	var nodes = [];
	$.each(allDicts, function (i, dict) {
		if (CDict.Yes != dict.isReadonly) {
			if(dict.ID==topID){
				isOpen=true;
			}else{
				isOpen=false;
			}
			var node = { open:isOpen,id: dict.ID, pId: dict.parentID, name: dict.name, title: "" + dict.ID, extension: dict.extension, code: dict.code };
			nodes.push(node);
		}
	});
	$.fn.zTree.init($("#dict"), setting, nodes);
};
onClick = function (event, treeId, treeNode, clickFlag) {
	if (isEndLevel(treeNode)) {
		$('#btnRemove').show();
	} else {
		$('#btnRemove').hide();
	}
	var firstNode = getFirstNode(treeNode);
	var totalLevel;
	try{
	 totalLevel = firstNode.extension;
	}catch(err){}
	if (CValidator.isNull(totalLevel)) {
		totalLevel = 2;
	}
	if (totalLevel * 4 == treeNode.code.length) {
		$('#btnAddSub').hide();
	} else {
		$('#btnAddSub').show();
	}
	edit();
};
getFirstNode = function (treeNode) {
	if (treeNode.pId == 0 || CValidator.isNull(treeNode.pId)) {
		return treeNode;
	}
	var level = treeNode.code.length / 4;
	for (var i = 0; i < level - 1; i++) {
		try{
			treeNode = treeNode.getParentNode();
		}catch(err){}
	}
	return treeNode;
};
addSub = function () {
	var id = $("#topID").val();
	/*
	if (CValidator.isNull(treeDict.getSelectedNodes()[0])) {
		CCore.alert(CCore.getValue("Common_PleaseSelect", "Common_DictParent"));
		return false;
	}
	*/
	if (!CValidator.isNull(treeDict.getSelectedNodes()[0])) {
		id=treeDict.getSelectedNodes()[0].id;
	}
	CCore.loadPage('dict_post', '../dict/post.htm', function () { CDictPost.init(id, true);if(id==1474||id==1475){$("#form_dict .Common_DictExtension").html("分值");}});
};
addTop = function () {
	treeDict.cancelSelectedNode();
	CCore.loadPage('dict_post', '../dict/post.htm', function () { CDictPost.init(0, true); });
};
edit = function () {
	var id = treeDict.getSelectedNodes()[0].id;
	var pId=treeDict.getSelectedNodes()[0].pId;
	CCore.loadPage('dict_post', '../dict/post.htm', function () { CDictPost.init(id, false);if(pId==1474||pId==1475){$("#form_dict .Common_DictExtension").html("分值");} })
};
isEndLevel = function (node) {
	return (node && !node.isParent);
};
remove = function () {
	var node = treeDict.getSelectedNodes()[0];
	var url = CCore.servicePath('/service/dict/removedict');
	CCore.removeData(url, node.id, function () { removeDo(node); });
};
removeDo = function (node) {
	var nextNode = node.getNextNode();
	treeDict.removeNode(node);
	treeDict.selectNode(nextNode, false);
	$("#dict_post").html("");
};
window['CDictList']['init'] = init;
window['CDictList']['getTreeDict'] = getTreeDict;
window['CDictList']['list'] = list;
})();
