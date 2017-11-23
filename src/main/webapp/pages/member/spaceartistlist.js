(function() {
	window['CSpaceArtistList'] = {};
	var spaceID = "";
	init = function(id) {
		spaceID = id;
		list(0, id);
		bindEvent(id);
	};
	bindEvent = function(id) {

		$("#SpaceArtistSearch .Button_Search").click(function() {
			list(0, id);
		});
		$("#SpaceArtistCommand .Button_Add").click(function() {
			openSpacePost(id);
		});
		$("#SpaceArtistCommand .Button_Remove").click(removeSpaceArtist);
		CMemberCommon.fillStatus("searchSpaceArtistStatusID");
		CMemberCommon.fillGroup("searchSpaceArtistGroupID");
		CCore.label('SpaceArtistSearch');
	};

	openSpaceArtistView = function(id) {
	 CCore.loadModal('../member/view.htm', 939, 480, function() {
	 CMemberView.init(id);
	   });
    };
    openSpacePost = function(id) {
		CCore.loadModal('../member/spaceartistpost.htm', 939, 480, function() {
			CSpaceArtistPost.init(id);
		});
	};
	
   removeSpaceArtist=function () {
	 console.log(2626262626262626);
	 console.log(spaceID);
	 var removedNames = CCore.getCheckedValue('chkspaceRow');
	 console.log(5656565655656);
	 console.log(removedNames);
	 CCore.invoke('/service/member/removespaceartist', {
		 removedNames : removedNames,
		 id : spaceID
	 },function(data){
		 if(data){
			 console.log(5959595959);
			 list(0,spaceID);
		 }
	 }); 
	 };
			 	 
	 list = function(pageIndex, id) {					 
		var param = CCore.getFormData('SpaceArtistSearch');				
		param = CCore.paramPageIndex(pageIndex, param);	
		param.searchMemberID = id;	//memberid 当参数
		CCore.invoke("/service/member/getmemberartistsbyid", {
			id:id
		},function(data){			
			CCore.processList("SpaceArtistResult", "SpaceArtistResultTemplate",data, list);
		});
			
	 };	
	window['CSpaceArtistList']['init'] = init;
	window['CSpaceArtistList']['list'] = list;
})();