(function (){
window['CSpaceArtistPost'] = {};
var spaceId = 0;
init = function (id){
    console.log(id);
	/*if (!CValidator.isNull(id)) {
		SpaceArtistCommand.getMemberByID(id,function(member){
			CCore.updateForm(member);
		});
	}*/
    spaceId = id;
	CCore.label("form_spaceartist_post");
	$("#form_spaceartist_post .Button_Submit").click(save);
};

save = function (){
	var artistname = $("#artistName").val();
		CCore.invoke('member/savespaceartist', {
			id:spaceId,
			artistname:artistname
		},function(flag){
			console.log(flag);
			if (flag) {
				CSpaceArtistList.list(0,spaceId);
				CCore.close();
			}
		});
};
/*validate = function () {
	if (CValidator.checkInvalid("form_spaceartist_post")) {
		return false;
	}
	return true;
};*/
window['CSpaceArtistPost']['init']=init;
})();
