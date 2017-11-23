(function (){
	window['CMemberView'] = {};
	init = function (id){
		CMemberCommon.fillType("typeID", "1026");		
		$("#airPortName").click(openReachPickLocation);
		
		var member = CCore.getMemberByID(id);
		CCore.view('form_member_view', member);
	};
	
	openReachPickLocation = function(){
		CCore.loadModal('../location/pick.htm', 839, 430, function () { CPickLocation.init("airPort","airPortName"); });
	};
	
	window['CMemberView']['init']=init;
})();