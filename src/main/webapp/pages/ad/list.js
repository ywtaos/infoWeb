(function() {
	window['CAdList'] = {};
	init = function() {
		
		list();
		
	};

	update = function(key) {	
		var v = $("#"+key).val();
		if (!CValidator.isNull(key) ) {
			var datas= key.split('_');			
			if(datas.length==2){
				var param={};
				param.ID=datas[1];
				param.content = $("#content_" + param.ID).val();
				param.memo = $("#memo_" + param.ID).val();
				param.position = $("#position_" + param.ID).val();
				param.visitUrl = $("#visitUrl_" + param.ID).val();
				param.imageID = $("#imageID_" + param.ID).val();
				CCore.invoke("ad/savead", param);	
			}
		}
	};

	list = function() {
		var data = CCore.invoke("ad/getads");	
		console.log(data);
		CCore.processList("AdResult", "AdResultTemplate", data);
		CCore.label("dashboard");
		CCore.enterNext();
		var inps = $("input[id*='_']:text");
		inps.unbind("blur");
		inps.bind('blur', function(e) {
			var key = $(this).attr("id");
			update(key);
		});
		$("[id^=imageID_]").each(function(i,attachmentids){
			CUpload.init(attachmentids.id, CDict.ImageExtension,true,function(){update(attachmentids.id);},"upload_ad");
		});
	};
	window['CAdList']['init'] = init;
	window['CAdList']['list'] = list;
})();
