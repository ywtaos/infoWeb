(function() {
	window['CMemberList'] = {};
	init = function() {
		list(0);
		bindEvent();
	};
	bindEvent = function() {

		$("#MemberSearch .Button_Search").click(function() {
			list(0);
		});
		// $("#MemberCommand .Button_Remove").click(remove);
		$("#MemberCommand .Button_Add").click(function() {
			openPost(null);
		});
		$("#MemberCommand a.Button_Add").each(function (index) {
		    if (CCore.isInRole(CDict.MemberAdd)) {
		        $(this).show();
		    }
		});
		$("#airPortName").click(openReachPickLocation);
		CMemberCommon.fillStatus("searchStatusID");
		CMemberCommon.fillGroup("searchGroupID");
	};

	openReachPickLocation = function(){
		CCore.loadModal('../location/pick.htm', 839, 430, function () { CPickLocation.init("airPort","airPortName"); });
	};
	
	openPost = function(id) {

		CCore.loadModal('../member/post.htm', 939, 500, function() {
			CMemberPost.init(id);
		});
	};
	openMemberPost = function(id) {
		CCore.loadModal('../member/post.htm', 939, 500, function() {
			CMemberPost.init(id);
		});
	};
	
	openView = function(id) {
		CCore.loadModal('../member/view.htm', 939, 480, function() {
			CMemberView.init(id);
		});
	};
	
	
	/*
	 * remove=function () { var removedIDs = CCore.getCheckedValue('chkRow');
	 * CCore.removeData('/service/member/removemembers', removedIDs); };
	 */
	list = function(pageIndex) {

		var param = CCore.getFormData('MemberSearch');
		param = CCore.paramPageIndex(pageIndex, param);
		var data = CCore.invoke("/service/member/getmembers", param);
		CCore.processList("MemberResult", "MemberResultTemplate", data, list);
	};
	window['CMemberList']['init'] = init;
	window['CMemberList']['list'] = list;
})();