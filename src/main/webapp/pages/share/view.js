(function (){
	window['CShareView'] = {};
	init = function (id){
		CShareCommon.getShareByID(id,function(share){
			CCore.view('form_share_view', share);
		});
	};
	window['CShareView']['init']=init;
	})();
