(function() {
	window['CMemberCommon'] = {};
	fillStatus = function(controlID) {
		CDictPick.init(controlID, CDict.MemberStatus);
	};
	fillType = function(controlID,parentID) {
		CDictPick.init(controlID, parentID);
	};
		
	fillGroup = function(controlID, parentID, isMulti) {
		if (CValidator.isNull(parentID)) {
			parentID = CDict.Group;
		}
		if (CValidator.isNull(isMulti)) {
			isMulti = false;
		}
		CDictPick.init(controlID, parentID, isMulti, -1, "correct('"
				+ controlID + "')");
	};
	correct = function(controlID) {
		var arrayGroupIDs = $("#" + controlID).val().split(",");
		if (arrayGroupIDs.length < 2) {
			return true;
		} else {
			var groupID = "";
			var groupName = "";
			var organizationType = 0;
			var dict = CCore
					.getDictByID(arrayGroupIDs[arrayGroupIDs.length - 1]);
			if (dict != null) {
				groupID = dict.ID;
				groupName = dict.name;
				dict = CCore.getDictByID(dict.parentID);
				if (dict != null) {
					organizationType = dict.statusID;
				}
			}
			for (var i = 0; i < arrayGroupIDs.length - 1; i++) {
				var d1 = CCore.getDictByID(arrayGroupIDs[i]);
				if (d1 != null) {
					var d2 = CCore.getDictByID(d1.parentID);
					if (d2 != null && d2.statusID != organizationType) {
						groupID = d1.ID + "," + groupID;
						groupName = d1.name + "," + groupName;
					}
				}
			}
			$("#" + controlID).val(groupID);
			$("#groupName").val(groupName);
			gTree.checkAllNodes(false);
			console.log(groupID);
			var groupIDs = groupID.toString().split(",");
			for (var i = 0; i < groupIDs.length; i++) {
				var node = gTree.getNodeByParam("id", groupIDs[i]);
				gTree.checkNode(node, true, false, false);
			}
		}
	};
	
	window['CMemberCommon']['fillStatus'] = fillStatus;
	window['CMemberCommon']['fillGroup'] = fillGroup;
	window['CMemberCommon']['fillType'] = fillType;	
})();
