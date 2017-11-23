(function () {
window['CDashboard'] = {};
var curMenu = null;
var Menus = null;
var currentMember
WEB_SOCKET_SWF_LOCATION = "/scripts/websocket/WebSocketMain.swf";
WEB_SOCKET_DEBUG = true;
var ws;
init = function (page) {
	CCore.setLocalResource();
	Menus = CCore.invoke('/service/groupmenu/getauthoritymenus');
	var systemName = CCore.getValue("Common_SystemName");

	page.title = systemName;
	currentMember = CCore.getCurrentMember();
	$("#current_username").html(currentMember.username);

	$("#setting_menu,#user").click(function () { $("#lang_down").hide(); $("#setting_down").slideToggle("fast"); });
	$("#setting_down").mouseleave(function () { $(this).slideUp(50); });

	$("#lang_menu").click(function () { $("#setting_down").hide(); $("#lang_down").slideToggle("fast"); });
	$("#lang_down").mouseleave(function () { $(this).slideUp(50); });

	$("#signOut,#exit").html(CCore.getValue("Button_Exit")).click(CCore.signOut);
	$("#changepassword").html(CCore.getValue("Button_ChangePassword")).click(loadChangePassword);
	$("#profile").click(function () { openMemberView(currentMember.ID) });
	$("#help").click(loadHelp);
	
	loadMenus();
	
	//loadCurrentMember();

	websocket();
	//loadDesktop();
	calHeight();
	$(window).resize(calHeight);
	$("#nav").hoverClass("current");
	//initCallcenter();
	//getMsgWeixin();
	//getMsgTask();

	getNewAnnouncement();
};
openAnnouncementView=function(id){
	CCore.loadModal('../announcement/view.htm', 939, 530, function () { CAnnouncementView.init(id); });
}

onToolbarClick = function () {
	$(this).siblings().removeClass("current");
	$(this).addClass("current");
	var id = $(this).attr("id");
	loadToolbar(id);
};
openAwokeOnline = function () {
	$("#path").html("导航>在线用户");
	CCore.loadPage('main', '../member/online.htm', function () { COnline.init(); });
};

calHeight = function () {
	var height = $(window).height();
	$("#left,#right").height(height);
};
openMemberView = function (id) {
	CCore.loadModal('../member/view.htm', 939, 480, function () { CMemberView.init(id); });
};
getCurrentMember = function(){
	return currentMember;
};
loadCurrentMember = function () {
	var member = CCore.getCurrentMember();
	CCore.setCurrentMemberID(member.ID);
	CCore.setCurrentMemberName(member.name);
	var datas = CCore.invoke('/service/groupmenu/getgroupmenus', { "groupid": member.groupID });
	CCore.setCurrentMemberMenus(datas);
};
loadChangePassword = function () {
	CCore.loadModal("../common/changepassword.htm", 500, 240, function () { CChangePassword.init(); });
};
loadMsgWeiwin = function () {
	CDashboard.getMsgWeixin();
	CCore.loadModal("../weixinmsg/view.htm", 931, 650, function () { CWeixinMsgView.init(); CDashboard.getMsgWeixin();});
};
loadDesktop = function () {
	CCore.loadPage('main', '../common/desktop.htm', function () { CDesktop.init(); });
};
loadHelp = function () {
	CCore.loadModal('../common/help.htm', 500, 240, function () { CHelp.init(); });
};

loadToolbar = function (pID) {
	var menus = getMenusByParentID(pID);
	var htmldom = "";
	$.each(menus, function (i, data) {
		var memo = data.memo;
		if (CValidator.isNull(data.memo)) {
			memo = "''";
		}
		htmldom += "<li id='m" + data.ID + "' onclick=CDashboard.changeColor(this);$('#path').html('');CDashboard.loadPath(" + data.ID + ");CCore.loadPage('main','" + data.extension + "',function(){" + memo + "})>" + data.name + "</li>"
	});
	$("#toolbar").html(htmldom);
	if($("#toolbar li")[0]){
		$("#toolbar li")[0].click();
	}
	

};
getMenus = function () {
	var menus = [];
	for (var i = 0; i < Menus.length; i++) {
		if (Menus[i].parentID == CDict.BackendMenu) {
			menus.push(Menus[i]);
		}
	}
	return menus;
};
getMenuByID = function (menuID) {
	for (var i = 0; i < Menus.length; i++) {
		if (Menus[i].ID == menuID) {
			return Menus[i];
		}
	}
};
getMenusByParentID = function (pID) {
	var menus = [];
	var p = getMenuByID(pID);
	for (var i = 0; i < Menus.length; i++) {
		if (Menus[i].code.startWith(p.code) && Menus[i].ID != pID) {
			menus.push(Menus[i]);
		}
	}
	return menus;
};
loadMenus = function () {
	var menus = getMenus();
	var dom = "";
	for (var i = 0; i < menus.length; i++) {
		dom += "<a class='m" + menus[i].ID + "'  id='" + menus[i].ID + "'>" + menus[i].name + "</a>";
	}
	$("#menu").html(dom);
	$("#menu a").click(onToolbarClick);
	if (menus.length > 0) {
		loadToolbar(menus[0].ID);
	}
};
loadPath = function (id) {
	var dict = CCore.getDictByID(id);
	if (CValidator.isNull($("#path").html())) {
		$("#path").html(dict.name);
	} else {
		$("#path").html(dict.name + " > " + $("#path").html());
	}
	if (dict.parentID != "0") {
		loadPath(dict.parentID);
	}
};
getDepartments = function () {
	var depts = CCore.getAllDicts(CDict.Group);
	var fliteredDept = [];
	for (var i = 0; i < depts.length; i++) {
		if (depts[i].statusID == CDict.OrganizationTypeDepartment) {
			fliteredDept.push(depts[i]);
		}
	}
	return fliteredDept;
};
getCompanys = function () {
	return CCore.getNextDicts(CDict.Group);
};
loadDepartments = function (controlID, callback) {
	CDictPick.init(controlID, CDict.Group, false, -1, callback, true);
};
fillCompany = function (controlID) {
	CDictPick.init(controlID, CDict.Group, false, -1, null, true);
};
changeColor = function(dom){
	var siblings = $(dom).siblings();
	siblings.removeClass();
	for(var i=0;i<siblings.length;i++){
		$(siblings[i]).addClass($(siblings[i]).attr("id"));
	}
	var id= $(dom).attr("id");
	$(dom).addClass("selected" + id);
};
websocket = function () {
	ws = new WebSocket("ws://" + window.location.hostname + ":8089");
	ws.onopen = function (){};
	ws.onmessage = function (e) {
		var msg = JSON.parse(e.data);
		showMsg(msg);
	};
	ws.onclose = function (){};
	ws.onerror = function (){};
};
showMsg = function (msg) {
	if (msg.modulerID == CDict.SocketModulerWeixinMsg) {
		try {
			CWeixinMsgView.loadInfo(msg.msg);
		} catch (e) {
			getMsgWeixin();
		}
	}

	if (msg.modulerID == CDict.SocketModulerTask) {
		getMsgTask();
	}

};
getMsgWeixin = function () {
    CCore.invoke("/service/weixinmsg/getnewweixinmsgs", '', function (data) {
        if (data > 0) {
            $("#msg_weixin li span").html(data);
            $("#msg_weixin").unbind().click(loadMsgWeiwin);
            $("#msg_weixin").show();
        }else{
        	$("#msg_weixin").hide();
        }
    });
};
getMsgTask=function(){
  CCore.invoke("/service/taskreceiver/getnewtaskreceivers", '', function (data) {
        if (data > 0) {
            $("#msg_task li span").html(data);
            $("#msg_task").unbind().click(function(){$("#"+CDict.MenuTask).click();});
            $("#msg_task").show();
        }else{
        	$("#msg_task").hide();
        }
    });
};
getNewAnnouncement=function(){
	CCore.invoke("/service/announcement/getnewannouncements", "", function (data) {
		var newannouncement="";                                
		for(i=0;i<data.length;i++){
			newannouncement+="<a onclick=openAnnouncementView('"+data[i].ID+"')>"+data[i].announcementTitle+"</a>";
		}
		$("#newannouncement").html(newannouncement);
	});
};
window['CDashboard']['init'] = init;
window['CDashboard']['loadPath'] = loadPath;
window['CDashboard']['changeColor'] = changeColor;
window['CDashboard']['loadToolbar'] = loadToolbar;
window['CDashboard']['getDepartments'] = getDepartments;
window['CDashboard']['getCompanys'] = getCompanys;
window['CDashboard']['loadDepartments'] = loadDepartments;
window['CDashboard']['fillCompany'] = fillCompany;
window['CDashboard']['getCurrentMember'] = getCurrentMember;
window['CDashboard']['getMsgWeixin'] = getMsgWeixin;
window['CDashboard']['getMsgTask'] = getMsgTask;

})();

$(function () {
	CDashboard.init(this);
});