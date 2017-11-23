(function (){
window['CAttachment'] = {};
init = function (attachmentIDs){
	listAttachment(attachmentIDs);
	CCore.zoomImg(1200,900,"Book");
};
listAttachment=function (attachmentIDs) {
	var files = CUpload.getAttachmentByIDs(attachmentIDs);
	CCore.processList("Book","BookTemplate", files);
};

window['CAttachment']['init']=init;
window['CAttachment']['listAttachment']=listAttachment;
})();
