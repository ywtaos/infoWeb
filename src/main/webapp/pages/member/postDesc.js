(function() {
	window['CMemberDescPost'] = {};
	init = function(id) {
		
		if (!CValidator.isNull(id)) {
			var member = CCore.getMemberByID(id);
			CCore.updateForm(member);
			CCore.disable("username");
			if (CCore.isAdmin(member.username)) {
				CCore.disable("groupName");
			}
		}
		CCore.label("form_member_desc_post");
	};
	save = function() {
		if (validate()) {
			if (CCore
					.postData('/service/member/savememberdesc', 'form_member_desc_post')) {
				CMemberList.list(0);
				CCore.close();
			}
		}
	};

	window['CMemberDescPost']['init'] = init;
})();