(function (){
window['CProductPost'] = {};
init = function (id){
	$("#btuSubmitProduct").click(save);
	//$("#btuSubmitProduct").click(saveProduct);
	CProductCommon.fillCategory('categoryID');
	CProductCommon.fillStatus('statusID');
	
	CUpload.init('imageIDs', CDict.ImageExtension, true, null,"upload_photo");
	
	if (!CValidator.isNull(id)) {
		CProductCommon.getProductByID(id,function(product){
			CCore.updateForm(product);
		});
	}
	CCore.label("myModalFabu");
	loadProductColors();
	//颜色单选
    $(document).on("click",".ysp",function(){
    	
    	
    	 var length = $(".colorsSel").length;
			
			
			if($(this).hasClass("colorsSel")){
					$(this).removeClass("colorsSel");
					$("#colorIDs").val($(this).attr("id"));
			}else{
				if(length<1){
					$(this).addClass("colorsSel");
					$("#colorIDs").val($(this).attr("id"));
				}
			}
    });
};


save = function (){
	if (validate()){
		CCore.postData('product/saveproduct', 'myModalFabu',function(flag){
			$(".close-reveal-modal").click();
			if (flag) {
				CProductList.list(0);
				CCore.close();
			}
		});
	}
};
loadProductColors = function() {	
	console.log(888888888);
	var parentid = CDict.ProductColors;
	CCore.invoke("dict/getnextdicts", {
		parentid : parentid
	}, function(data) {
		console.log(data);
		for(var i=0;i<data.length;i++){
			$("#ys_scdna_box  ul").append("<li style=background-color:"+data[i].extension+">"+"<a class='ysp' id='"+data[i].ID+"' href='#'>"+"</a>"+"</li>")	
		}
	});
};

/*saveProduct = function () {		
	if (CCore.postData('/service/product/saveproduct', 'myModalFabu')) {
			
		$(".close-reveal-modal").click();
		window.location.reload();	
	}		
};*/

validate = function () {
	if (CValidator.checkInvalid("form_product_post")) {
		return false;
	}
	return true;
};
window['CProductPost']['init']=init;
})();
