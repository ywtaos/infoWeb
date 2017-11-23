(function() {
	window['CMemberPost'] = {};
	init = function(id) {
		$("#form_member_post .Button_Submit").click(save);
		$("#form_member_post .Button_Cancel").click(CCore.close);
		$("#airPortName").click(openReachPickLocation);
		
		$("#username").blur(checkUser);
		CMemberCommon.fillGroup("groupID", "", true);
		CMemberCommon.fillType("typeID", "1026");
		CMemberCommon.fillStatus("statusID");

		
		if (!CValidator.isNull(id)) {
			var member = CCore.getMemberByID(id);
			CCore.updateForm(member);
			$("#verifyPassword").val(member.password);
			CCore.disable("username");
			if (CCore.isAdmin(member.username)) {
				CCore.disable("groupID");
			}
		}
		CUpload.init('imageID', CDict.ImageExtension,false,null);//附件上传
		CCore.label("form_member_post");
	};
	openReachPickLocation = function(){
		CCore.loadModal('../location/pick.htm', 839, 430, function () { CPickLocation.init("airPort","airPortName"); });
	};
	save = function() {
		if (validate()) {
			if (CCore.postData('/service/member/savemember', 'form_member_post')) {
				CMemberList.list(0);
				CCore.close();
			}
		}
	};
	validate = function() {
		if (CValidator.checkInvalid('form_member_post')) {
			return false;
		}
		if ($("#password").val() != $("#verifyPassword").val()) {
			CCore.alert(CCore.getValue("Member_PasswordNotMatch"));
			return false;
		}
		if (checkUser()) {
			return false;
		}

		return true;
	};
	checkGroup = function() {
		var result = true;
		var arrayGroupIDs = $("#groupID").val().split(",");
		for (var i = 0; i < arrayGroupIDs.length; i++) {
			var d1 = CCore.getDictByID(arrayGroupIDs[i]);
			if (d1 != null) {
				if (d1.statusID == CDict.OrganizationTypeDepartment) {
					result = false;
				} else {
					var d2 = CCore.getDictByID(d1.parentID);
					if (d2 != null
							&& d2.statusID == CDict.OrganizationTypeDepartment) {
						result = false;
					}
				}
			}
		}
		return result;
	};
	checkUser = function() {
		if (CValidator.isNull($("#ID").val())) {
			var param = {};
			param["username"] = $("#username").val();
			var member = CCore.invoke(CCore
					.servicePath('/service/member/getmemberbyusername'), param);
			if (!CValidator.isNull(member)) {
				$("#message").html(CCore.getValue("Member_UsernameNotUnique"));
				setTimeout(function() {
					$("#message").empty();
				}, 3000);
				return true;
			}
			return false;
		}
	};
	CMemberCommon.fillStatus('statusID');
	window['CMemberPost']['init'] = init;
})();