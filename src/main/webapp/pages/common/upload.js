(function (){
window['CEditorUpload'] = {};
var Editor = "";
init = function (editor){
	Editor = editor;
	CUpload.init('_attachmentIDs', CDict.FileExtension, true, pick);
};
pick = function(){

	var attachments = CUpload.getAttachmentByIDs($("#_attachmentIDs").val());
	var dom = "";
	for(var i=0;i<attachments.length;i++){
		var url = CUpload.getAttachmentUrl(attachments[i]);
		if(CUpload.isVideo(url)){
			dom += CCore.getVideo(url);
		}
		if(CUpload.isImage(url)){
			dom += String.format("<img src='{0}' alt='{1}'/>",url,attachments[i].fileName);
		}
		if(CUpload.isAttachment(url)){
			dom += String.format("<a href='{0}' target='_blank'>{1}</a>",url,attachments[i].fileName);
		}
	}
	Editor.execCommand('insertHtml', dom);
	CCore.close();
};
window['CEditorUpload']['init']=init;
})();
