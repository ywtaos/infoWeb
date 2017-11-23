var Resources;

String.prototype.endWith = function (s) {
	if (s == null || s == '' || this.length == 0 || s.length > this.length) {
		return false;
	};
	if (this.substring(this.length - s.length) == s) {
		return true;
	}
	else {
		return false;
	};
	return true;
};

String.format = function() {
	if( arguments.length == 0 )
		return null;
	var str = arguments[0]; 
	for(var i=1;i<arguments.length;i++) {
		var re = new RegExp('\\{' + (i-1) + '\\}','gm');
		str = str.replace(re, arguments[i]);
	}
	return str;
};
String.prototype.firstToUpper = function() {
	try{
		var len = this.length;
		var str = "";
		str = this.substring(0,1).toUpperCase() + this.substring(1,len);
	}catch(err){
		return "";
	}
	return str;
};
String.prototype.startWith = function (s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length) {
		return false;
	}
	if (this.substr(0, s.length) == s) {
		return true;
	}
	else {
		return false;
	}
	return true;
};
String.prototype.contain = function(s){
	if (s == null || s == "" || this.length == 0 || s.length > this.length) {
		return false;
	}
	var v = this;
	if(v.indexOf(s) >= 0 ) {
		return true;  
	}  else{
		return false;
	}
};
String.prototype.toValidJson = function () {
	var v = this;
	if (v != undefined && v != null && v != "") {
		v = escape(v);
		v = v.replace(/\+/g,"%2B");
	}
	return v;
};

String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
	if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
	} else {
		return this.replace(reallyDo, replaceWith);
	}
};
String.prototype.delFirstComma = function(){
	if(this.substr(0,1)==','){
		return this.substr(1);
	}
	return this;
};
String.prototype.delLastComma = function(){
	var reg=/,$/gi;
	return this.replace(reg,"");
};
String.prototype.padLeft = function(totalWidth, paddingChar)
{
	if ( paddingChar != null ){
		return this.padHelper(totalWidth, paddingChar, false);
	} else {
		return this.padHelper(totalWidth, ' ', false);
	}
};

String.prototype.padRight = function(totalWidth, paddingChar)
{
	if ( paddingChar != null ){
		return this.padHelper(totalWidth, paddingChar, true);
	} else {
		return this.padHelper(totalWidth, ' ', true);
	}
};

String.prototype.padHelper = function(totalWidth, paddingChar, isRightPadded)
{
 if ( this.length < totalWidth)
 {
  var paddingString = new String();
  for (i = 1; i <= (totalWidth - this.length); i++)
  {
   paddingString += paddingChar;
  }
  if ( isRightPadded )
  {
   return (this + paddingString);
  } else {
   return (paddingString + this);
  }
 } else {
  return this;
 }
};

Array.prototype.contain = function (_val) {
	if (this.length <= 0) return false;
	for (var i = 0; i < this.length; i++) {
		if (this[i] == _val) return true;
	}
	return false;
};

// 清空数组
Array.prototype.clear = function () {
	this.splice(0, this.length);
};
Array.prototype.remove=function(c){
	this.splice($.inArray(c,this),1);
};

Date.prototype.format = function(format) {
	   var date = {
			  "M+": this.getMonth() + 1,
			  "d+": this.getDate(),
			  "h+": this.getHours(),
			  "m+": this.getMinutes(),
			  "s+": this.getSeconds(),
			  "q+": Math.floor((this.getMonth() + 3) / 3),
			  "S+": this.getMilliseconds()
	   };
	   if (/(y+)/i.test(format)) {
			  format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	   }
	   for (var k in date) {
			  if (new RegExp("(" + k + ")").test(format)) {
					 format = format.replace(RegExp.$1, RegExp.$1.length == 1
							? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
			  }
	   }
	   return format;
};
Date.prototype.formatDateTime = function(format) {
	return this.format("yyyy-MM-dd hh:mm:ss");
};
Date.prototype.formatTime = function(format) {
	return this.format("hh:mm");
};
Date.prototype.formatDate = function(format) {
	return this.format("yyyy-MM-dd");
};

(function (){
window['CStore'] = {};
get = function (name){
	return $.jStorage.get(name);
};
set = function (name, value){
	$.jStorage.set(name, value);
};
window['CStore']['get']=get;
window['CStore']['set']=set;
})();

(function (){
	window['CKey'] = {};
	PageIndex = "pageindex";
	PageSize = "pagesize";
	RouteNull = "_n_u_l_l_";
	LocalVersion = "localversion";
	window['CKey']['PageIndex']=PageIndex;
	window['CKey']['PageSize']=PageSize;
	window['CKey']['RouteNull']=RouteNull;
	window['CKey']['LocalVersion']=LocalVersion;
})();

(function (){
window['CCore'] = {};
log = function(str){
	if (window.console && window.console.log && window.console.error) {
		console.log(str);
	}
};
pointToString=function(points){
	var str="";
	for(var i=0;i<points.length;i++){
		if(!CValidator.isNull(str)){
			str+=",";
		}
		str+=points[i].lng+":"+points[i].lat;
	}
	return str;
};
stringToPoint=function(str){
	var points=[];
	var strs=str.split(",");
	for(var j=0;j<strs.length;j++){
		var parts=strs[j].split(":");
		var point=new BMap.Point(parts[0],parts[1]);
		points.push(point);
	}
	return points;
};
toSafeFloat = function(v){
	if(CValidator.isNull(v)){
		return 0.0;
	}else{
		return parseFloat(v);
	}
};
toSafeInt = function(v){
	if(CValidator.isNull(v)){
		return 0;
	}else{
		return parseInt(v);
	}
};
pointToString=function(points){
	var str="";
	for(var i=0;i<points.length;i++){
		if(!CValidator.isNull(str)){
			str+=",";
		}
		str+=points[i].lng+":"+points[i].lat;
	}
	return str;
};
stringToPoint=function(str){
	var points=[];
	var strs=str.split(",");
	for(var j=0;j<strs.length;j++){
		var parts=strs[j].split(":");
		var point=new BMap.Point(parts[0],parts[1]);
		points.push(point);
	}
	return points;
};
isPC = function(){ 
	var userAgentInfo = navigator.userAgent; 
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
	var flag = true; 
	for (var v = 0; v < Agents.length; v++) { 
		if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
	} 
	return flag; 
}
function alert(msg) {
	hint = getValue("Common_Prompt");
	if ($('.tip').length > 0)
		tip(msg);
	else
		$.weeboxs.open(msg, { title: hint, type: 'alert', okBtnName: getValue("Button_OK") });
};
fillBool = function (controlID,v,callback) {
	if(CValidator.isNull(v)){
		v = CDict.Yes;
	}
	CDictPick.init(controlID, CDict.Bool,false,v,callback);
};
fillYear= function (controlID) {
	START = 2012;
	END = 2050;
	select = $("#" + controlID).empty();
	for (var i =START ; i <= END; i++) {
		select.append("<option value='" + i + "'>" + i + "</option>")
	}
	var now = new Date();
	select.find("[value=" + now.getFullYear() + ']').attr('selected', 'selected');
};
fillMonth= function (controlID) {
	START = 1;
	END = 12;
	select = $("#" + controlID).empty();
	for (var i =START ; i <= END; i++) {
		select.append("<option value='" + i + "'>" + i + "</option>")
	}
	var now = new Date();
	select.find("[value=" + (now.getMonth()+1)+ ']').attr('selected', 'selected');
};
fillGender = function (controlID,v) {
	if(CValidator.isNull(v)){
		v = CDict.Male;
	}

	CDictPick.init(controlID, CDict.Gender, false,v );
};
fillChecks = function (divContainer, datas, fieldName, fieldValue, fieldText, initValue) {
	try {
		initValue = initValue == null ? "" : initValue.toLowerCase();
	}
	catch (err) { }
	initValue = "," + initValue + ",";
	var div = $('#' + divContainer);
	div.empty();
	$.each(datas, function (i, data) {
		var value = eval("data." + fieldValue);
		var tempValue = "," + value + ",";
		tempValue = tempValue.toLowerCase();
		var checked = "";
		if (initValue != null && initValue != "" && initValue.indexOf(tempValue) >= 0) {
			checked = "checked='true'";
		}
		var inputCheck = "<label style='cursor:pointer;margin:0px;padding:7px;text-align:left;overflow:hidden;margin-right:10px;'><input style='width:18px;' " + checked + " type='checkbox' name='" + fieldName + "' value='" + value + "'>";
		inputCheck = inputCheck + eval("data." + fieldText) + "</label>";
		div.append(inputCheck);
	});
};
fillOptions = function (select, datas, fieldValue, fieldText, firstHint) {
	var s = $('#' + select).empty();
	if (!CValidator.isNull(firstHint)) {
		var optionFirst = "<option value='-1'>" + firstHint + "</option>";
		s.append(optionFirst);
	};
	$.each(datas, function (i, data) {
		var option = "<option value='" + data[fieldValue] + "'>" + data[fieldText] + "</option>";
		s.append(option);
	});
	s.hide().show();
};
fillRadios = function (container, datas, fieldValue, fieldText, controlID) {
	var s = $('#' + container).empty();
	var checked="";
	$.each(datas, function (i, data) {
		if(i==0){
			 checked="checked";
		}else{
			checked="";
		};
		var option="<input type='radio' name='"+controlID+"' value='"+data[fieldValue]+"' "+checked+"  /><label style='padding:2px;'>"+data[fieldText]+"</label>";
		s.append(option);
	});
	s.hide().show();
};
servicePath = function (path) {
	if(!path.startWith(SERVICE_ROOT)){
		if(!path.startWith("/service/")&& !path.startWith("/upload")){
			path = "/service/" + path;
		}
		path = SERVICE_ROOT + path;
	}
	return path;
};
label = function(container){
	var not = ".list_result,.header,.check,.list_search,.next,.current,.prev,.pagination";
	$("#" + container + " [class]:not("+not+")").each(function(){
		var cls = $(this).attr("class");
		var splits = cls.split(' ');
		for(var i=0;i<splits.length;i++){
			if(!isNull(splits[i])){
				if(splits[i] == "clear"){
					$(this).removeClass("clear");
					$(this).before("<div class='clear'></div>");
				}else{
					if(!isNull(getValue(splits[i]))){
						if(CValidator.isNull($("#" + container +" ." + splits[i]).html())){
							$("#" + container + " ." + splits[i]).html(getValue(splits[i]));
						}
					}
				}
			}
		}
	});
	$(".form_template table td:even").addClass("label");
	$('#' + container + " input,#" +container+ " textarea").each(function(){
		if($(this).attr("required") == "required"){
			$(this).parent().prev().addClass("star");
		}
	});
	enterNext();
	$("#" + container + " .Button_Close").click(CCore.close);
	$("#" + container + " .Button_Cancel").click(CCore.close);
	if($("#" + container + " #ID").length>0 && container.endWith("_post")){
		var tableName = getTableNameByControlID(container);
		var id= $("#" + container + " #ID").val();
		if(CValidator.isNull($("#" + container +" h1").html())){
			if(CValidator.isNull(id)){
			$("#" + container +" h1").html(CCore.getValue("Common_Add", tableName + "_Moduler"));
			}else{
				$("#" + container +" h1").html(CCore.getValue("Common_Edit", tableName + "_Moduler"));
			}
		}
	}
	checkAuth();
};
function close() {
	$.weeboxs.close();
};
delayClose = function () {
	setTimeout("$.weeboxs.close()", 2000);
};
delayShow = function (id,callback) {
	$('#' + id).show();
	if(!CValidator.isNull(callback)){
		setTimeout(function(){callback();}, 7000);
	}else{
		setTimeout("$('#"+id+"').hide()", 7000);
	}
};
function confirm(callback,msg) {
	if(CValidator.isNull(msg)){
		msg = getValue("Common_RemoveConfirm");
	}
	console.log(111111);
	$.weeboxs.open(msg,{
		title: getValue("Common_Prompt"),okBtnName: getValue("Button_OK"),cancelBtnName: getValue("Button_Cancel"),type: 'dialog',
		onok: function () {
			console.log(999);
			close();
			callback();
		},
		oncancel: function(){close();}
	});
};
contain = function (a, b) {
	a = "," + a + ",";
	b = "," + b + ",";
	if (a.indexOf(b) > -1) {
		return true;
	}
	return false;
};
checkOnce = function (current) {
	var checked = current.checked;
	$("input[name='" + current.name + "']").attr("checked", false);
	current.checked = checked;
};
checkAll = function (chkRow, chked) {
	$('[name=' + chkRow + ']').prop("checked", chked);
};
mergeRow = function(tbl,startIndex, total){
	if(total<=0){
		return true;
	}
	$rows = $(tbl).find("tr");
	var i , currentIndex = startIndex, count=1, lst=[];
	var tds = $rows.find('td:eq('+ currentIndex +')');
	var ctrl = $(tds[0]);
	lst.push($rows[0]);
	for (i=1;i<=tds.length;i++){
		if (ctrl.text() ==  $(tds[i]).text()){
			count++;
			$(tds[i]).addClass('deleted');
			lst.push($rows[i]);
		}
		else{
			if (count>1){
				ctrl.attr('rowspan',count);
				mergeRow($(lst),startIndex+1,total-1)
			}
			count=1;
			lst = [];
			ctrl=$(tds[i]);
			lst.push($rows[i]);
		}
	}
	
};
getVideo=function(src,width,height){
	if(CValidator.isNull(width)){
		width = 320;
		height = 240;
	}
	var template = "<object type='application/x-shockwave-flash' data='/scripts/player/player.swf' width='{1}' height='{2}'><param name='movie' value='/scripts/player/player.swf' /><param name='FlashVars' value='flv={0}&width={1}&height={2}&playercolor={3}'/></object>";
	return String.format(template,src,width,height,"085c68");
};
getCheckedValue = function (chkRow) {
	var index = 0;
	var values = new Array();
	$('[name=' + chkRow + ']').each(function () {
		if (this.checked == true) {
			values[index] = this.value;
			index++;
		}
	});
	return values;
};
getCheckedText = function (chkRow,isTwoColumns) {
	var index = 0;
	var values = new Array();
	$('[name=' + chkRow + ']').each(function () {
		if (this.checked == true) {
			values[index] = $(this).parent().next().text();
			if(isTwoColumns){
				values[index] += $(this).parent().next().next().text();
			}
			index++;
		}
	});
	return values;
};
datePicker = function (id, defaultDate, isHHMM, isYYYYMM) {
	var width="84";
	var fmt = 'yyyy-MM-dd';
	var language = getLangByID();
	console.log(language);
	if(language==null){
		var language={language:"cn"};
	}
	console.log(language);
	if(CValidator.isNull(defaultDate)){
		defaultDate=$("#" +id).val();
		if(CValidator.isNull(isHHMM)){
			defaultDate=formatDate(defaultDate);
		}
	}
	if(isHHMM){
		width = "120";
		fmt = 'yyyy-MM-dd HH:mm';
	}
	if(isYYYYMM){
		fmt="yyyy-MM";
	}
	$('#' + id).click(function () { WdatePicker({ dateFmt: fmt  ,lang:language.language}); }).val(defaultDate).css("width", width).css("text-align", "left").css("cursor", "pointer").addClass("Wdate").parent().css("width",width);
};
formatDate = function (d) {
	if (!CValidator.isNull(d)) {
		var newDate = new Date();
		if(typeof(d) =="object"){
			newDate =d;
		}else{
			newDate = new Date(d.replace(/-/g, "/"));
		}
		return newDate.formatDate();
	}
	
	return d;
};
formatDateTime = function (date) {
	if (CValidator.isNull(date)) return "";
	var beginIndex = date.indexOf("(") + 1;
	var endIndex = date.indexOf(")");
	var dateNum = date.substring(beginIndex, endIndex);
	var newDate = new Date(parseInt(dateNum, 10));
	return newDate.formatDateTime();
};
formatTime=function(date){
	if (CValidator.isNull(date)) return "";
	var newDate = new Date(Date.parse(date.replace(/-/g, "/")));
	return newDate.formatTime();
};
getDays =function(start,end){
	start = formatDate(start)
	end = formatDate(end);
	var i=(new Date(end) - new Date(start)) / 1000 / 60 / 60 /24;
	if(i<0){
		i-=1;
	} else {
		i+=1;
	}
	return i;
};
getHours =function(start,end){
	var i=(new Date(end) - new Date(start)) / 1000 / 60 / 60;

	return i;
};
fillOptions = function (select, datas, fieldValue, fieldText, firstHint) {
	var s = $('#' + select);
	s.empty();
	if (!CValidator.isNull(firstHint)) {
		var optionFirst = "<option value='-1'>" + firstHint + "</option>";
		s.append(optionFirst);
	};
	$.each(datas, function (i, data) {
		var option = "<option value='" + data[fieldValue] + "'>" + data[fieldText] + "</option>";
		s.append(option);
	});
	//s.hide().show();
};

getLastYear = function () {
	var date = new Date();
	year = date.getFullYear() - 1;
	month = date.getMonth()+1;
	day = date.getDate();
	return formatDate(year + "-" + month.toString().padLeft(2,'0') + "-" + day.toString().padLeft(2,'0'));
};
getNextYear = function () {
	var date = new Date();
	year = date.getFullYear() +1;
	month = date.getMonth()+1;
	day = date.getDate();
	return formatDate(year + "-" + month.toString().padLeft(2,'0') + "-" + day.toString().padLeft(2,'0'));
};
getDateStr = function (days) {
	var dd = new Date();
	var y = dd.getFullYear();
	dd.setDate(dd.getDate() + days);
	var m = dd.getMonth() + 1; //获取当前月份的日期
	var d = dd.getDate();
	return y + "-" + m + "-" + d;
};
stringToDate = function(string) {
	var f = string.split(' ', 2);
	var d = (f[0] ? f[0] : '').split('-', 3);
	var t = (f[1] ? f[1] : '').split(':', 3);
	return (new Date(parseInt(d[0], 10) || null,(parseInt(d[1], 10) || 1) - 1,parseInt(d[2], 10) || null,parseInt(t[0], 10) || null,parseInt(t[1], 10) || null,parseInt(t[2], 10) || null)).getTime();
};
dateDiff=function(date1, date2) {
	var type1 = typeof date1, type2 = typeof date2;
	if (type1 == 'string')
		date1 = stringToDate(date1);
	else if (date1.getTime)
		date1 = date1.getTime();
	if (type2 == 'string')
		date2 = stringToDate(date2);
	else if (date2.getTime)
		date2 = date2.getTime();
	return (date2 - date1) / (1000 * 60 * 60 * 24) + 1 ; //结果是秒
};
 
getNow = function () {
	return formatDate(new Date());
};
getNowTime = function () {
	return new Date().formatDateTime();
};
getMemberByID = function (id) {
	var param ={};
	param["id"] = id;
	return invoke('member/getmemberbyid', param);
};
getMemberByUsername = function (username) {
	var param ={};
	param["username"] = username;
	return invoke('member/getmemberbyusername', param);
};
getNew = function (callback) {
	invoke('core/getnew','',callback);
};
haveChildDict = function(id){
	return invoke('dict/havechilddict', {"id":id});
};
updateOnlineStatus = function (callback) {
	invoke('member/updateonlinestatus','',callback);
};
getControlNameByID = function(controlID){
	var controlName = "";
	if(controlID.endWith('IDs')){
		controlName = controlID.substring(0,controlID.length-3) + "Names";
	}else if(controlID.endWith('ID')){
		controlName = controlID.substring(0,controlID.length-2) + "Name";
	}else if(controlID.contain("ID_")){
		controlName = controlID.replace("ID_","Name_");
	}else if(controlID.contain("IDs_")){
		controlName = controlID.replace("IDs_","Names_");
	}else{
		controlName = controlID + "Name";
	}
	return controlName;
};
isIDControl = function(controlID){
	if(CValidator.isNull(controlID)){
		return false;
	}
	if(controlID.endWith("ID") || controlID.endWith("IDs")){
		return true;
	}
	return false;
};
disable = function(controlID){
	if(!CValidator.isNull(controlID)){
		$("#" + controlID).attr('readonly', true);
		$("#" + controlID).attr('disabled', true);
		if(isIDControl(controlID)){
			var controlName = getControlNameByID(controlID);
			$("#" + controlName).attr('readonly', true);
			$("#" + controlName).attr('disabled', true);
			$("#" + controlName).unbind();
			$("#" + controlName).removeClass("pick");
		}
	}
};
hideControl = function(controlID){
	if(!CValidator.isNull(controlID)){
		$("#" + controlID).hide();
		
		if(isIDControl(controlID)){
			var controlName = getControlNameByID(controlID);
			$("#" + controlName).hide();
		}
		var pre = $("#" + controlID).parent().hide().prev();
		if(pre.is("label")){
			pre.hide();
		}
	}
};
showControl = function (controlID) {
	if (!CValidator.isNull(controlID)) {
		$("#" + controlID).show();

		if (isIDControl(controlID)) {
			var controlName = getControlNameByID(controlID);
			$("#" + controlName).show();
		}
		var pre = $("#" + controlID).prev();
		if (pre.is("span")) {
			pre.show();
		}
	}
};
enterNext = function () {
	var inps = $("input:text:not([class='pick'])");
	inps.bind('keydown', function (e) {
		var key = e.which;
		if (key == 13) {
			e.preventDefault();
			var idx = inps.index(this) + 1;
			$(":input:text:not([class='pick']):eq(" + idx + ")").focus();
		}
	});
};
enterSubmit = function (pressedId, buttonId) {
	$("#" + pressedId).keydown(
		function (e) {
			if (e.keyCode == 13) {
				$('#' + buttonId).trigger('click');
			}
		}
	);
};
blurSubmit = function (pressedId, buttonId) {
	$("#" + pressedId).keydown(
		function (e) {
			if (e.keyCode == 13) {
				$('#' + buttonId).trigger('blur');
			}
		}
	);
};

getAllCitys = function () {
	return invoke('city/getallcitys');
};
getCurrentMember = function () {
	return invoke('member/getcurrentmember')
};
checkLogin =function(redirect){
	invoke('member/getcurrentmember','',function(member){
		if(CValidator.isNull(member)){
			document.location.href=CCore.getSignOutPlatform()+"&redirect="+redirect;
		}
	});
};
setCurrentMemberMenus = function(member){
	var menuIDs = invoke('groupmenu/getgroupmenus',{"groupid":member.groupID});
	CStore.set("current_member_menuids",menuIDs);
};
getCurrentMemberMenus = function(){
	return CStore.get("current_member_menuids");
};
setCurrentMemberID = function(memberID){
	CStore.set("current_member_id",memberID);
};
getCurrentMemberID = function(){
	var member = getCurrentMember();
	if(!CValidator.isNull(member)){
		return member.ID;	
	}
	return "";
};
setCurrentMemberName = function(memberName){
	CStore.set("current_member_name",memberName);
};
getCurrentMemberName = function(){
	return CStore.get("current_member_name");
};
getDictByID = function (dictID) {
	var param = {};
	param["id"] = dictID;
	return invoke('dict/getdictbyid', param);
};
getDictNamesByIDs = function (dictIDs) {
	var param = {};
	param["ids"] = dictIDs;
	return invoke('dict/getdictnamesbyids', param);
};
getFormData = function (containerID) {
	var result = {};
	var elements = "";
	elements += '#' + containerID + ' textarea,';
	elements += '#' + containerID + ' select,';
	elements += '#' + containerID + ' input';
	$(elements).each(function(){
		if($(this).attr('type') == 'radio' || $(this).attr('type') == 'checkbox') {
			if ($(this)[0].checked==true) {
				appendElement(this,result);
			}
		}
		else {
			appendElement(this,result);
		}
	});
	return result;
};
appendElement = function (element,result) {
	var name = $(element).attr('name');
	if (CValidator.isNull(name)) {
		name = $(element).attr('id');
	}
	if (!CValidator.isNull(name)) {
		var val = $(element).val();
		if(!isArray(val)){
			
			if (!CValidator.isNull(val)) {
				try{
					//val = val.toValidJson();
				}catch(err){}
			}
			if(CValidator.isNull(result[name])){
				result[name] = val;
			}else{
				result[name] += "," + val;
			}
		}
	}
};
appendKeyValue = function (json, key, value) {
	if (CValidator.isNull(key)) {
		alert("key is reqiured");
		return false;
	}
	var base = json;
	if (CValidator.isNull(base)) {
		base = "{'" + key + "':'" + value + "'}";
	} else {
		if (base.startWith("{") && base.endWith("}")) {
			base = base.replaceAll("}", "", true);
			base = base + ",'" + key + "':'" + value + "'}";
		} else {
			alert("json param is error;");
		}
	}
	return base;
};
mapToJson = function (map) {
	var result = "";
	for(var k in map) {
		result = appendKeyValue(result,k,map[k]);
	} 
	return result;
};
getMyPlatform = function () {
	return invoke('member/getmyplatform');
};
getSignOutPlatform = function () {
	var line="";
	if(!CValidator.isNull(CStore.get("line"))){
		line = CStore.get("line");
	}
	return invoke('member/getsignoutplatform')+line;
};
getNextDicts = function (parentID) {
	var param ={};
	param["parentid"] = parentID;
	return invoke('dict/getnextdicts', param);
};
getAllDicts = function (parentID) {
	var param = {};
	param["parentid"] = parentID;
	return invoke('dict/getalldicts', param);
};
getResources = function (callback) {
	return invoke('core/getresources','',callback);
};
getServerVersion = function (){
  return invoke('core/getserverversion', "");
};
getMacAddress = function (){
  return invoke('core/getmacaddress');
};
getValue = function (name1, name2) {
	if (CValidator.isNull(name1)) {
		alert("param is required");
		return false;
	}
	var versionid = getCurrentLang();
	var value1 = getResourceByKey('v_' + versionid + '_' + name1);
	var value2 = "";
	if (!CValidator.isNull(name2)) {
		value2 = getResourceByKey('v_' + versionid + '_' + name2);
		if (!CValidator.isNull(value1)) {
			value1 = value1.replaceAll("%s", value2);
		}
	}
	return value1;
};
getResourceByKey = function(key){
	if(Resources == null || Resources == ""){
		Resources = CStore.get("resources");
	}
	if(Resources == null){
		return "";
	}
	for(var i=0;i<Resources.length;i++){
		if(Resources[i].Key == key){
			return Resources[i].Value;
		}
	}
	return "";
};
getLangs = function () {
	return invoke('core/getlangs');
};
getCurrentLang = function () {
	if (CValidator.isNull(CStore.get("currentlangid"))) {
		setCurrentLang(invoke('core/getcurrentlang'));
	}
	return CStore.get("currentlangid");
};
setCurrentLang = function(langID){
	CStore.set("currentlangid", langID);
};
getLangByID = function () {
	var langs = getLangs();
	for (var i = 0; i < langs.length; i++) {
		if (getCurrentLang() == langs[i].ID) {
			return langs[i];
		}
	}
};
changeLang = function (langID) {
	var datas = invoke('core/changelang', {langid:langID});
	setCurrentLang(langID);
	if (datas == "OK") {
		window.location.reload();
	}
};
singleCheck = function (value) {
	var radio = $("input[value='" + value + "']");
	if (radio.length > 0) {
		radio.prop("checked", "checked");
	}
	else {
		var option = $("option[value='" + value + "']");
		if (option.length > 0) {
			setTimeout(function(){ 
				$("option[value='"+value+"']").attr("selected",true);
			}, 1);
		}
	}
};
invoke = function(url, formData, callback) {
	var isAsync = true;
	if(CValidator.isNull(callback)){
		isAsync = false;
	}
	
	url = servicePath(url);
	var d = "";
	if (CValidator.isNull(formData)) {
		formData = {};
	}
	//var param ={ formData: JSON.stringify(formData) };
	var param =  JSON.stringify(formData) ;
	console.log(param);
	var loading = $(".loading");
	if(loading.length<=0){
		loading = $("body");
	}
	loading.showLoading();
	$.ajax({
		url: url,
		data: param,
		type: "post",
		dataType: "json",
		async: isAsync,
		contentType: "application/json;charset=UTF-8",
		success: function (data, textStatus, jqXHR) {
			loading.hideLoading();
			d = data;
			if(isAsync){
				callback(d);
			}
		},
		error: function (xhr) {
			loading.hideLoading();
			d = xhr.responseText;
			
			if(isAsync){
				callback(d);
			}
		}
	});
	try {
		//d = JSON.parse(d);
	}
	catch (e) { }
	return d;
};
blurSubmit = function (pressedId, buttonId) {
	$("#" + pressedId).keydown(
		function (e) {
			if (e.keyCode == 13) {
				$('#' + buttonId).trigger('blur');
			}
		}
	);
};
isArray = function(obj){
	return Object.prototype.toString.call(obj) === '[object Array]';
};
isInRole = function (id) {
	var menus = getCurrentMemberMenus();
	if (contain(menus, id))
	{
		return true;
	}
	return false;
	//return invoke(servicePath('groupmenu/isinrole'), {id:id});
};
isAdmin = function (username) {
	return invoke('core/isadmin', {"username":username});
};
initPagination = function (container, nCount, getPagingData, pageSize) {
	if(isNull($("#" + container + "Pagination").html())){
		$('#' + container).after("<div id='"+ container +"Pagination'></div>");
		var prev_text = CCore.getValue('Common_Prev');
		var next_text = CCore.getValue('Common_Next');
		var total = CCore.getValue("Common_Total");
		var item_unit = CCore.getValue("Common_ItemUnit");
		var item_per_page = CCore.getValue("Common_ItemPerPage");
		if(isNull(pageSize)){
			pageSize = CDict.PageSize;
		}
		$("#" + container + "Pagination").pagination(nCount, {
			num_edge_entries: 2,
			num_display_entries: 4,
			callback: getPagingData,
			items_per_page: pageSize,
			prev_text: prev_text,
			next_text: next_text,
			link_to:"javascript:void(0)"
		});
	}
};
processList = function (container,containerTemplate, data, getPagingData, pageSize) {
	template.helper('CCore', CCore);
	template.helper('CDict',CDict);
	template.helper('CUpload',CUpload);
	template.helper('CValidator',CValidator);
	template.isEscape = false;
	$('#' + container).html("");
	if (isNull(data.data)) {
		$('#' + container).html(template(containerTemplate, {data:data}));
	}
	else {
		$('#' + container).html(template(containerTemplate, data));
	}
	var result = "";
	try{
		result = $('#' + container).html().replaceAll("null", "", true).replaceAll("00:00:00.0", "", true).replaceAll(" 0:00:00", "", true);
	}catch(e){
	}
	
	$('#' + container).html(result);
	if($("#" + container).data("count") != data.count){
		$("#" + container).data("count",data.count);
		$("#" + container + "Pagination").html('');
	}
	if(!isNull(getPagingData)){
		initPagination(container , data.count, getPagingData, pageSize);
		if(isNull(pageSize)){
			pageSize = CDict.PageSize;
		}
		if(data.count/pageSize > 10){
			$("#" + container + "Pagination .pagination").append("至<input id='"+container+"ToPage' type='text' style='width:20px;text-align:center;'/>页");
			enterNext();
			$("#" + container + "ToPage").blur(function(){
				var page = $(this).val();
				$("#" + container + "Pagination").trigger('setPage', [page-1]);
			}).bind('keydown', function (e) {
				var key = e.which;
				if (key == 13) {
					e.preventDefault();
					var page = $(this).val();
					$("#" + container + "Pagination").trigger('setPage', [page-1]);
				}
			});
		}
	}
	if(!CValidator.isNull(data.statistic)){
		$("#" + container + "Pagination .pagination").append("<span style='float:right;display:inline-block;'>"+ data.statistic + "</span>");
	}
	
	label(container);
	styleList();
	//CCore.label("main");
	CCore.label($("#"+container).parent().attr("id"));
	var currentRowID = CStore.get("current_row_id");
	if(!isNull(currentRowID) && CurrentRowColor){
		$("#"+currentRowID).css("background",CurrentRowColor);
	}
	var moduler = container.replaceAll("Result","",true);
	if($("#" +container+" td .Button_Edit").length>0){
		$("#" +container+" td .Button_Edit").unbind();
		$("#" +container+" td .Button_Edit").click(function(){ eval("open" + moduler + "Post('"+$(this).parent().parent().attr("id")+ "')") });
	}
	if($("#" +container+" .view").length>0){
		$("#" +container+" .view").unbind();
		$("#" +container+" .view").click(function(){ eval("open" + moduler + "View('"+$(this).parent().attr("id")+ "')")});
	}
	
	checkAuth(container);
	try{
		$("#"+ container+" table").tableHeadFixer({"left" : 2});
	}catch(err){}
	var tbs=$("#" +container+" td");
	$.each(tbs,function(i,tb){
		if($(this).html().length<10){
			$(this).css("white-space","nowrap");
		}
	})
};
checkAuth = function (container) {
	var mainID=$("#"+container).parent().attr("id");
	var auths = $("#"+mainID+" a[auth]");
	var hideCount = 0;
	for(var i=0;i<auths.length;i++){
		var auth = $(auths[i]).attr("auth");
		if(auth.endWith("Edit")){
			if (!CCore.isInRole(CDict[auth])) {
				CCore.hide("Button_Edit",mainID);
				hideCount++;
			}
		}else if(auth.endWith("Remove")){
			if (!CCore.isInRole(CDict[auth])) {
				$("#"+mainID+ " .Button_Remove,#"+mainID+" .list_result .check").hide();
				hideCount++;
			}
		}else{
			if (!CCore.isInRole(CDict[auth])) {
				$(auths[i]).hide();
				hideCount++;
			}
		}
	}
	if(hideCount == auths.length){
		//$(auths[0]).parent().hide();
	}
};
playVideo = function(url){
	$("#" + url).css("display","block").css("width","320px").css("height","240px");
	flowplayer(url, "/scripts/player/flowplayer-3.2.16.swf");
};
playAudio = function(url,div,width,height){
	if(CValidator.isNull(width)){
		width=1;
	}
	if(CValidator.isNull(height)){
		height=1;
	}
	var player="";
	if (!navigator.userAgent.match(/msie/i) ){
		var control = "";
		if(height>1){
			control = "controls"
		}
		player = "<audio src='"+url+"' "+control+" autoplay='autoplay' ></audio>";
	}else{
		player = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' width='"+width+"' height='"+height+"'><param name='movie' value='/scripts/audio/player.swf?file=" + url + "&autoStart=true&repeatPlay=false&songVolume=3' /><embed wmode='transparent' width='1' height='1' src='/scripts/audio/player.swf?file=" + url + "&autoStart=true&repeatPlay=false&songVolume=3' type='application/x-shockwave-flash'/></object>";
	}
	$("#" + div).html(player);
};
showImg = function(divid,attachmentID,width,height){
	var dom  = "<img src='../../img/"+attachmentID;
	if(width>0){
		dom += "/" + width;
	}
	if(height>0){
		dom += "/" + height;
	}
	dom += "'/>";
	$("#" + divid).html(dom);
};
styleList = function () {
	$(".list_result tr").click(function () {
		$(".list_result tr").css("background","");
		if(CValidator.isNull(CurrentRowColor)){
			CurrentRowColor = "#fbf8e9";
		}
		$(this).css("background",CurrentRowColor);
		CStore.set("current_row_id", $(this).attr("id"));
	})
};
login = function (divId, callback, currentContainerId) {
	if (CValidator.checkInvalid(divId)) {

	}
	if (CValidator.isNull($('#username').val())) {
		tip(getValue('Common_Required', 'Member_Username'));
		return false;
	}
	if (CValidator.isNull($('#password').val())) {
		tip(getValue('Common_Required', 'Member_Password'));
		return false;
	}
	if ( $("#captcha").length > 0 ) { 
		if (CValidator.isNull($('#captcha').val())) {
			tip(getValue('Common_Required', 'Member_Captcha'));
			return false;
		}
	} 
	var url = 'member/login';
	if(postData(url, divId)){
		CStore.set("username", $("#username").val());
		var member = getCurrentMember();
		setCurrentMemberID(member.ID);
		setCurrentMemberName(member.username);
		setCurrentMemberMenus(member);
		if(!CValidator.isNull(currentContainerId)){
			$("#" +currentContainerId).val(member.ID);
		}
		if(!CValidator.isNull(callback)){
			callback();
			CCore.close();
		}else{
			document.location.href = getMyPlatform();
		}
	}
};
loadPage = function (container, url, init) {
	$('#' + container).html('');
	$('#' + container).load(url, init);
};
loadModal = function (src, width, height, initEvent) {
	if (width <= 0 || width == undefined) {
		width = 750;
	}
	if (height <= 0 || height == undefined) {
		height = $(window).height()-100;
	}
	if (src.endWith(".htm") || src.endWith(".html")) {
		if (CValidator.isNull(initEvent)) {
			$.weeboxs.open(src, { contentType: 'ajax', width: width, height: height, showButton: false });
		} else {
			$.weeboxs.open(src, { contentType: 'ajax', onopen: initEvent, width: width, height: height, showButton: false });
		}
	} else {
		$.weeboxs.open("#" + src, { width: width, height: height, showButton: false });
	}
};

loadEditor = function (textarea) {
	var container = textarea+ "_container";
	$("#" + textarea).hide().before("<div id='"+container+"'></div>");
	var isSimple = false;
	var height = 320;
	var setHeight = $("#" + textarea).attr("height");
	if(!CValidator.isNull(setHeight)){
		height = setHeight;
	}
	var setWidth = $("#" + textarea).attr("width");
	if(!CValidator.isNull(setWidth)){
		$("#" + textarea).parent().css("width",setWidth);
	}
	var language = getLangByID();
	var lang = "cn";
	if(language != null){
		lang = language.language;
	}
	var toolbars = [["undo","redo",'Bold','underline','ForeColor','backcolor','InsertUnorderedList','FontSize','InsertTable']];
	toolbars[0].push('upload');
	toolbars[0].push('link');
	toolbars[0].push('unlink');
	toolbars[0].push('justifyleft');
	toolbars[0].push('justifycenter');
	toolbars[0].push('justifyright');
	toolbars[0].push('imageleft');
	toolbars[0].push('imagecenter');
	toolbars[0].push('imageright');
	toolbars[0].push('removeformat');
	toolbars[0].push('source');

	var editor = new UE.ui.Editor({textarea:textarea,toolbars:toolbars,lang:lang,initialFrameWidth:'100%',initialFrameHeight:height,autoClearinitialContent:false});
	editor.render(container);
	UE.getEditor(container).ready(function() {
		this.setContent($("#" + textarea).val());
		$("#" + textarea).val('');
	});
	
	UE.registerUI("上传", function(editor, uiName) {
		var btn = new UE.ui.Button({
			name: uiName,
			title: uiName,
			cssRules: 'background-position: -726px -77px;',
			onclick: function() {
				CCore.loadModal('../common/upload.htm', 320, 120, function () { CEditorUpload.init(editor); });
			}
		});
		return btn;
	},[0]);
};
postData = function (url, form, callback) {
	var flag = false;
	var formData = getFormData(form);
	if(CValidator.isNull(callback)){
		var data = invoke(url, formData);
		if (!CValidator.isNull(data)) {
			if(data.ID && (data.ID.length == 32 ||  data.ID>0 )){
				flag = true;
			}else if (data.toUpperCase() == "OK") {
				flag = true;
			}
			else {
				tip(data);
			}
		} else {
			tip(data);
		}
		return flag;
	}else{
		invoke(url, formData,function(data){
			if (!CValidator.isNull(data)) {
				if(data.ID && (data.ID.length == 32 ||  data.ID>0 )){
					flag = true;
				}else if (data.toUpperCase() == "OK") {
					flag = true;
				}
				else {
					tip(data);
				}
			} else {
				tip(data);
			}
			callback(flag);
		});
		
	}
	
};
tip=function(data){
	if($(".tip").length>0){
		$(".tip").html(data);
		setTimeout(function(){
			$(".tip").html("");
		},3000);
	}else{
		alert(data);
	}
};
postRow = function (url, tableID) {
	var flag = false;
	var formData = getFormData(tableID + " #last");
	var data = invoke(url, formData);
	if (!CValidator.isNull(data)) {
		if (data.length == 32) {
			var tr = $("#" + tableID + " table tr:last").eq(0).clone().attr("id",data);
			tr.find("td:last").html("<a class='Button_Remove'>"+CCore.getValue("Button_Remove")+"</a>");
			tr.insertBefore("#"+tableID+" table tr:last");
			$("#" + data + " input").each(function(i,val){
				val.id=val.id + "_" + data;
			});

			$("#" + tableID + " table tr:last input").val("");
			$("#" + tableID + " table tr:last input:first").focus();
			CCore.enterNext();
		}else {
			alert(data);
		}
	}
	return flag;
};
paramPageIndex = function(pageIndex, param){
	if(CValidator.isNull(pageIndex)){
		pageIndex = CStore.get(CKey.PageIndex);
	}
	if(CValidator.isNull(param)){
		param = {};
	}
	param[CKey.PageIndex] = pageIndex;
	CStore.set(CKey.PageIndex,pageIndex);
	return param;
};
removeData = function (url, removedIDs, callback, notice) {
	console.log(removedIDs);
	if (CValidator.isNull(removedIDs)) {
		console.log(333);
		alert(getValue('Common_PleaseSelect', 'Common_ForRemoved'));
		return false;
		
	}
	console.log(444);
	confirm(function(){removeRemote(url, removedIDs, callback);},notice);
};
hide=function(cls,mainID){
	$("#"+ mainID+" ." + cls).hide();
	$("#"+ mainID+" ." + cls).parent().each(function(){
		if($(this).get(0).tagName.toUpperCase() == "TD"){
			$(this).hide();
		}
	});
};
show=function(cls){
	$("." + cls).show();
	$("." + cls).parent().each(function(){
		if($(this).get(0).tagName.toUpperCase() == "TD"){
			$(this).show();
		}
	});
};
removeRemote = function (url, removedIDs, callback) {
	var param ={};
	param["removedIDs"] = removedIDs.toString();
	var data = invoke(url, param);
	if (data == "OK") {
		if(!CValidator.isNull(callback)){
			callback(removedIDs);
		}else{
			for (var i = 0; i < removedIDs.length; i++) {
				$('#row' + removedIDs[i]).remove();
				$('.row' + removedIDs[i]).remove();
				$('#' + removedIDs[i]).remove();
			}
		}
	}else {
		CCore.close();
		window.alert(data);
	}
};
reset = function(div){
	$('#' + div)[0].reset()
};
signOut = function () {
	var tip = getValue('Common_ExitConfirm');
	if(CValidator.isNull(tip)){
		tip = "您确定要退出系统吗？";
	}
	confirm(signOutRemote,tip);
};

signOutRemote = function () {
	var data = invoke('member/signout');
	if (!CValidator.isNull(data)) {
		if (data.toUpperCase() == "OK") {
			setCurrentMemberID("");
			document.location.href = getSignOutPlatform();//"../common/login.htm";
		}
	}
};

setLocalResource = function (){
	var serverVersion = getServerVersion();
	var localVersion = CStore.get(CKey.LocalVersion);
	if (CValidator.isNull(localVersion) || localVersion < serverVersion) {
		getResources(function(keyValues){
			CStore.set("resources", keyValues);
			CStore.set(CKey.LocalVersion, serverVersion);
		});
	}
};
clearLocalResource = function(){
	CStore.set(CKey.LocalVersion,"");
};
updateForm = function(data,c) {
	if(CValidator.isNull(data)){
		return ;
	}
	$.each(data,function(fieldName,fieldValue) {
		fieldValue = convertDateValue(fieldValue);
		if(!CValidator.isNull(fieldValue)){
			fieldValue = unescape(fieldValue);
		}else{
			fieldValue = "";
		}
		
		var $field = $('#'+fieldName);
		if(!CValidator.isNull(c)){
			$field = $('#' + c + " #" +fieldName);
		}
		if ($field.length < 1) {
			$field = $('input,select,textarea').filter('[name="'+fieldName+'"]');
		}
		if ($field.eq(0).is('input')) {
			var type = $field.attr('type');
			switch (type) {
			case 'checkbox':
			if ($field.length > 1) {
					var fieldValue = fieldValue.split(','); 
					$field.each(function() {
						var value = $(this).val();
						try{ 
							if ($.inArray(value,fieldValue) != -1) {
							$(this).prop('checked','true');
							$(this)[0].prop('checked','true');
							} else {
							//$(this).attr('checked','');
							}
						}
						catch(e){}
					});
				} else {
					if ($field.val() == fieldValue) {
						$field.prop('checked','true');
					} else {
						//$field.attr('checked','');
					}
				}
				break;
			case 'radio':
				$field.each(function() {
				var value = $(this).val();
				if (value == fieldValue) {
					$(this).prop('checked','true');
				} else {
					//$(this).attr('checked','');
				}
				});
				break;
			default:
				$field.val(fieldValue);
				break;
			}
		} else if ($field.is('select')) {
			var $options = $('option',$field);
			var multiple = $field.attr('multiple');
			$options.each(function() {
				var value = $(this).val() || $(this).html();
				switch (multiple) {
					case true:
						if ($.inArray(value,fieldValue) != -1) {
							
							$(this).prop('selected','true');
						} else {
							$(this).prop('selected','');
						}
						break;
					default:
						if (value == fieldValue) {
							try{
							  $(this).prop('selected','true');
							}catch(e){} 
						} else {
							//$(this).attr('selected','');
						}
						break;
				}
			});
		}else{
			$field.text(fieldValue);
		}
	});
	label($(".form_template").attr("id"));
};

utf8ToGb2312 = function (str1) {
	str1 = unescape(str1.replace(/\\u/g, '%u').replace(/;/g, ''));
	return str1;
};

getViewElements = function (viewID) {
	return $("#" + viewID + " [id]");
};
view = function (viewID, obj) {
	var elements = getViewElements(viewID);
	$.each(obj, function (name, value) {
		if ($.inArray($("#" + viewID +" #"+name)[0], elements) >= 0) {
			$("#" +viewID +" #"+ name).html("");
			if (!CValidator.isNull(value)) {
				value = convertDateValue(value);
				if(!CValidator.isNull(value) && typeof(value) == "string"){
					value = value.replace(/(?:\r\n|\r|\n)/g, '<br />');
				}
				$("#" + viewID +" #"+name).html(unescape(value));
			}
		}
	});
	CCore.label(viewID);
	var tableName = getTableNameByControlID(viewID);
	if(!CValidator.isNull(tableName)){
		if(CValidator.isNull($("#" + viewID + " h1").html())){
			$("#" + viewID + " h1").html(CCore.getValue("Common_View", tableName + "_Moduler"));
		}
	}
	$("#" + viewID + " .Button_Close").click(CCore.close);
};
getTableNameByControlID=function(controlID){
	var parts = controlID.split('_');
	if(parts.length>1){
		var tableName = parts[1];
		if(!CValidator.isNull(tableName)){
			var first = tableName.substr(0,1);
			var end = "";
			if(tableName.length>1){
				end = tableName.substr(1,tableName.length -1);
			}
			first = first.toUpperCase();
			tableName = first + end;
			return tableName;
		}
	}
	return "";
};
convertDateValue = function(value){
	try {
		if (value != null && value.toString().length == 13 && !isNaN(value)) {
			value = formatDate(value);
		}
		if (value != null && value.toString().toLowerCase().substring(0, 6) == "/date(") {
			value = formatDate(value);
		}
		value = value.replaceAll("00:00:00","",true);
		value = value.replaceAll("00:00","",true);
	} catch (err) { }
	return value;
};
queryString = function(val){
	var uri = window.location.search;
	var re = new RegExp("" +val+ "=([^&?]*)", "ig");
	return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):null);
};
getSelectTxt = function(val){
	var selectTxt;
	if(window.getSelection){
		selectTxt=window.getSelection();
	}else if(document.selection){
		selectTxt=document.selection.createRange().text;
	}
	return selectTxt;
};
cropImg = function(image,w){
	
	var img = $(image);
	 var img_width=image.naturalWidth;
	 var img_height = image.naturalHeight;
	
	if(img_height>img_width){
		
		img.height(w);
		img.css({"margin": "auto"});	
		img.css({"display": "block"});
		img_width =img_width*w/img_height;
		
		img.width(img_width);
		img.css({"margin-left":(w-img_width)/2+"px"});
	}
	else{
		img.width(w);
		img_height=img.height();
		img.css({"margin-top":(w-img_height)/2+"px"});	
	} 
 };
zoomImg = function (maxWidth, maxHeight,containerID) {
	var img = "img";
	if(!CValidator.isNull(containerID)){
		img = "#" + containerID + " img";
	}
	$(img).each(function () {
		var img = new Image();
		img.src = $(this).attr("src");
		var image = $(this);
		img.onload = function(){
			var ratio = 0;
			var width = img.width;
			var height = img.height;
			if (width > maxWidth){
				ratio = maxWidth / width;
				image.css("width", maxWidth);
				height = height * ratio;
				image.css("height", height);
			}
			if (height > maxHeight) {
				ratio = maxHeight / height;
				image.css("height", maxHeight);
				width = width * ratio;
				image.css("width", width);
			}
		}
	});
};
window['CCore']['cropImg'] = cropImg;
window['CCore']['log'] = log;
window['CCore']['alert'] = alert;
window['CCore']['getSignOutPlatform'] = getSignOutPlatform;
window['CCore']['toSafeInt'] = toSafeInt;
window['CCore']['toSafeFloat'] = toSafeFloat;
window['CCore']['tip'] = tip;
window['CCore']['confirm']=confirm;
window['CCore']['contain']=contain;
window['CCore']['isPC']=isPC;
window['CCore']['checkOnce']=checkOnce;
window['CCore']['checkAll']=checkAll;
window['CCore']['close']=close;
window['CCore']['checkLogin']=checkLogin;
window['CCore']['delayClose']=delayClose;
window['CCore']['delayShow']=delayShow;
window['CCore']['changeLang']=changeLang;
window['CCore']['datePicker']=datePicker;
window['CCore']['dateDiff']=dateDiff;
window['CCore']['disable']=disable;
window['CCore']['hideControl'] = hideControl;
window['CCore']['showControl'] = showControl;
window['CCore']['enterNext']=enterNext;
window['CCore']['enterSubmit']=enterSubmit;
window['CCore']['blurSubmit']=blurSubmit;
window['CCore']['fillBool']=fillBool;
window['CCore']['fillYear']=fillYear;
window['CCore']['fillMonth']=fillMonth;
window['CCore']['fillGender']=fillGender;
window['CCore']['fillChecks']=fillChecks;
window['CCore']['formatDate']=formatDate;
window['CCore']['isArray']=isArray;
window['CCore']['formatDateTime']=formatDateTime;
window['CCore']['formatTime']=formatTime;
window['CCore']['getDays']=getDays;
window['CCore']['getHours']=getHours;

window['CCore']['fillOptions']=fillOptions;
window['CCore']['fillRadios']=fillRadios;
window['CCore']['getValue']=getValue;
window['CCore']['getLangs']=getLangs;
window['CCore']['getCurrentLang']=getCurrentLang;
window['CCore']['setCurrentLang']=setCurrentLang;
window['CCore']['getNow']=getNow;
window['CCore']['getNowTime']=getNowTime;
window['CCore']['getNextYear']=getNextYear;
window['CCore']['getDictByID']=getDictByID;
window['CCore']['getDictNamesByIDs']=getDictNamesByIDs;
window['CCore']['getFormData']=getFormData;
window['CCore']['getCurrentMember'] = getCurrentMember;
window['CCore']['mergeRow '] = mergeRow;
window['CCore']['getCheckedValue']=getCheckedValue;
window['CCore']['getCheckedText']=getCheckedText;
window['CCore']['getLastYear']=getLastYear;
window['CCore']['getMacAddress']=getMacAddress;
window['CCore']['getAllDicts']=getAllDicts;
window['CCore']['getNextDicts']=getNextDicts;
window['CCore']['getAllCitys']=getAllCitys;
window['CCore']['getMemberByID']=getMemberByID;
window['CCore']['getMemberByUsername']=getMemberByUsername;
window['CCore']['getCurrentMemberID']=getCurrentMemberID;
window['CCore']['getCurrentMemberName']=getCurrentMemberName;
window['CCore']['getCurrentMemberMenus']=getCurrentMemberMenus;
window['CCore']['getControlNameByID']=getControlNameByID;
window['CCore']['getLangByID']=getLangByID;
window['CCore']['getNew']=getNew;
window['CCore']['hide']=hide;
window['CCore']['show']=show;
window['CCore']['updateOnlineStatus']=updateOnlineStatus;
window['CCore']['isIDControl']=isIDControl;
window['CCore']['invoke']=invoke;
window['CCore']['isInRole']=isInRole;
window['CCore']['isAdmin']=isAdmin;
window['CCore']['label']=label;
window['CCore']['loadPage']=loadPage;
window['CCore']['loadModal']=loadModal;
window['CCore']['loadEditor']=loadEditor;
window['CCore']['login']=login;
window['CCore']['mergeRow']=mergeRow;
window['CCore']['getMyPlatform']=getMyPlatform;
window['CCore']['haveChildDict']=haveChildDict;
window['CCore']['processList']=processList;
window['CCore']['postData']=postData;
window['CCore']['postRow']=postRow;
window['CCore']['paramPageIndex']=paramPageIndex;
window['CCore']['playVideo']=playVideo;
window['CCore']['playAudio']=playAudio;
window['CCore']['removeData']=removeData;
window['CCore']['reset']=reset;
window['CCore']['queryString']=queryString;
window['CCore']['signOut']=signOut;
window['CCore']['setLocalResource']=setLocalResource;
window['CCore']['clearLocalResource']=clearLocalResource;
window['CCore']['servicePath']=servicePath;
window['CCore']['setCurrentMemberID']=setCurrentMemberID;
window['CCore']['setCurrentMemberName']=setCurrentMemberName;

window['CCore']['setCurrentMemberMenus']=setCurrentMemberMenus;

window['CCore']['styleList']=styleList;
window['CCore']['singleCheck']=singleCheck;
window['CCore']['showImg']=showImg;

window['CCore']['updateForm']=updateForm;

window['CCore']['view']=view;
window['CCore']['zoomImg']=zoomImg;
window['CCore']['pointToString']=pointToString;
window['CCore']['stringToPoint']=stringToPoint;

})();

(function (){
window['CValidator'] = {};
isNull = function (val){
	if (!isNaN(val)) {
		if (val == "0") {
			return false;
		}
	}
	if (val == undefined || val == null || val == "" || val == '' || val == "undefined" || val == "null" || val == "NULL" || val == CKey.RouteNull) {
		return true;
	}
	return false;
};
checkInvalid = function(container){
	if (checkNull(container)) {
		return true;
	}
	if (checkNumber(container)) {
		return true;
	}
	if (checkMin(container)) {
		return true;
	}
	if (checkMax(container)) {
		return true;
	}
	if (checkEmail(container)) {
		return true;
	}
	if (checkIDCard(container)) {
		return true;
	}
	if (checkMobile(container)) {
		return true;
	}
	return false;
};
checkReceiverNull = function(){
	if(!CValidator.isNull($("#nextFlowNodeID").val())){
		var receivers = CCore.getCheckedValue("nextMemberIDs");
		if(CValidator.isNull(receivers) || receivers.length<=0){
			CCore.alert("请选择适合的接收人，若接收人不存在，请联系管理员设置权限");
			return true;
		}
	}
	return false;
};
checkNull = function (container) {
	var bFlag = false;
	$('#' + container + " input,#" + container + " textarea").each(function(){
		if(!isNull($(this).attr("required"))){
			var controlID = $(this).attr("id");
			var controlName = "";
			if(CCore.isIDControl(controlID)){
				controlName = CCore.getControlNameByID(controlID);
				$("#" + controlName).removeClass("invalid").removeClass("pick");
			}else{
				$(this).removeClass("invalid");
			}
			var value = $(this).val();
			if (isNull(value)) {
				bFlag = true;
				if(CCore.isIDControl(controlID)){
					$("#" + controlName).addClass("invalid").blur(function(){$(this).removeClass("invalid").addClass("pick");});
				}else{
					$(this).addClass("invalid").blur(function(){$(this).removeClass("invalid");});
				}
			}
		}
	});
	if (bFlag == true) {
		CCore.alert("必填项必须填写");
	}
	return bFlag;
};
checkMin = function (container) {
	var bFlag = false;
	$('#' + container + " input").each(function(){
		$(this).removeClass("invalid");
		var value = $(this).val();
		var min = $(this).attr("min");
		if (!isNull(value) && !isNull(min)) {
			if(isNaN(value) || parseFloat(value)< parseFloat(min) ){
				bFlag = true;
				$(this).addClass("invalid").blur(function(){$(this).removeClass("invalid");});
			}
		}
	});
	if (bFlag == true) {
		CCore.alert(CCore.getValue("Common_Invalid", "Common_Data"));
	}
	return bFlag;
};
checkMax = function (container) {
	var bFlag = false;
	$('#' + container + " input").each(function(){
		$(this).removeClass("invalid");
		var value = $(this).val();
		var max = $(this).attr("max");
		if (!isNull(value) && !isNull(max)) {
			if(isNaN(value) || parseFloat(value)>parseFloat(max)){
				bFlag = true;
				$(this).addClass("invalid").blur(function(){$(this).removeClass("invalid");});
			}
		}
	});
	if (bFlag == true) {
		CCore.alert(CCore.getValue("Common_Invalid", "Common_Data"));
	}
	return bFlag;
};
checkEmail = function (container) {
	var bFlag = false;
	$('#' + container + " input").each(function(){
		$(this).removeClass("invalid");
		var value = $(this).val();
		var rule = $(this).attr("email");
		if (!isNull(value) && !isNull(rule)) {
			var reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if(!reg.test(value)){
				bFlag = true;
				$(this).addClass("invalid").blur(function(){$(this).removeClass("invalid");});
			}
		}
	});
	if (bFlag == true) {
		CCore.alert(CCore.getValue("Common_Invalid", "Common_Email"));
	}
	return bFlag;
};
checkMobile = function (container) {
	var bFlag = false;
	$('#' + container + " input").each(function(){
		$(this).removeClass("invalid");
		var value = $(this).val();
		var rule = $(this).attr("mobile");
		if (!isNull(value) && !isNull(rule)) {
			var reg = /^((\(\d{3}\))|(\d{3}\-))?13\d{9}|17\d{8}|14[57]\d{8}|15\d{9}|18\d{9}$/ ;
			if(value.length!=11||!value.match(reg) ) {	 
				bFlag = true;
				$(this).addClass("invalid").blur(function(){$(this).removeClass("invalid");});
			 }
		}
	});
	if (bFlag == true) {
		CCore.alert("手机号无效");
	}
	return bFlag;
};
/*checkMobile = function (container) {
	var bFlag = false;
	$('#' + container + " input").each(function(){
		$(this).removeClass("invalid");
		var value = $(this).val();
		var rule = $(this).attr("mobile");
	
		if (!isNull(value) && !isNull(rule)) {
			
			if(value.length!=11) {	 
				bFlag = true;
				$(this).addClass("invalid").blur(function(){$(this).removeClass("invalid");});
			 }
		}
	});
	if (bFlag == true) {
		CCore.alert("输入数据无效");
	}
	return bFlag;
};*/

var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];	// 加权因子   
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];			// 身份证验证位值.10代表X   
checkIDCard = function (container) {
	var bFlag = false;
	$('#' + container + " input").each(function(){
		$(this).removeClass("invalid");
		var value = $(this).val();
		var rule = $(this).attr("idcard");
		if (!isNull(value) && !isNull(rule)) {
			 idCard = trim(value.replace(/ /g, ""));			   //去掉字符串头尾空格					 
			if (idCard.length == 15) {   
				if(! isValidityBrithBy15IdCard(idCard)){
					bFlag = true; 
				}
			} 
			if (idCard.length == 18) {   
				if(!isValidityBrithBy18IdCard(idCard)){   //进行18位身份证的基本验证和第18位的验证
					bFlag = true; 
				}
				var a_idCard = idCard.split("");				// 得到身份证数组   
				if(!isTrueValidateCodeBy18IdCard(a_idCard)){
					bFlag = true;
				}
			}
			if(idCard.length != 18 && idCard.length != 15){
				bFlag = true;
			}
			if(bFlag){
				$(this).addClass("invalid").blur(function(){$(this).removeClass("invalid");});
			}
		}
	});
	if (bFlag == true) {
		CCore.alert(CCore.getValue("Common_Invalid", "Common_IDCard"));
	}
	return bFlag;
};
checkCardID = function (value) {
	var bFlag = false;
	if (!isNull(value)) {
		var idCard = trim(value.replace(/ /g, ""));			   //去掉字符串头尾空格					 
		if (idCard.length == 15) {   
			if(! isValidityBrithBy15IdCard(idCard)){
				bFlag = true; 
			}
		} 
		if (idCard.length == 18) {   
			if(!isValidityBrithBy18IdCard(idCard)){   //进行18位身份证的基本验证和第18位的验证
				bFlag = true; 
			}
			var a_idCard = idCard.split("");				// 得到身份证数组   
			if(!isTrueValidateCodeBy18IdCard(a_idCard)){
				bFlag = true;
			}
		}
		if(idCard.length != 18 && idCard.length != 15){
			bFlag = true;
		}
	}
	if (bFlag == true) {
		CCore.alert("请输入合法的身份证号");
	}
	return bFlag;
};
isTrueValidateCodeBy18IdCard=function(a_idCard) {   
	var sum = 0;							 // 声明加权求和变量   
	if (a_idCard[17].toLowerCase() == 'x') {   
		a_idCard[17] = 10;					// 将最后位为x的验证码替换为10方便后续操作   
	}   
	for ( var i = 0; i < 17; i++) {   
		sum += Wi[i] * a_idCard[i];			// 加权求和   
	}   
	valCodePosition = sum % 11;				// 得到验证码所位置
	if (a_idCard[17] == ValideCode[valCodePosition]) {
		return true;
	} else {
		return false; 
	} 
} ;
isValidityBrithBy18IdCard=function(idCard18){   
	var year =  idCard18.substring(6,10);   
	var month = idCard18.substring(10,12); 
	var day = idCard18.substring(12,14);   
	var temp_date = getDateByIDCard18(idCard18);
	if(temp_date.getFullYear()!=parseFloat(year)   
		  ||temp_date.getMonth()!=parseFloat(month)-1   
		  ||temp_date.getDate()!=parseFloat(day)){
			return false; 
	}else{   
		return true; 
	} 
};
getDateByIDCard18=function(idCard18){
	var year =  idCard18.substring(6,10);   
	var month = idCard18.substring(10,12);   
	var day = idCard18.substring(12,14);   
	var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));  
	return temp_date;
};
getDateByIDCard=function(idCard18){
	var year =  idCard18.substring(6,10);   
	var month = idCard18.substring(10,12); 
	var day = idCard18.substring(12,14);   
	return year + "-" + month +"-" + day;
};
isValidityBrithBy15IdCard=function(idCard15){   
	  var year =  idCard15.substring(6,8);   
	  var month = idCard15.substring(8,10);   
	  var day = idCard15.substring(10,12);   
	  var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
	  if(temp_date.getYear()!=parseFloat(year)   
			  ||temp_date.getMonth()!=parseFloat(month)-1   
			  ||temp_date.getDate()!=parseFloat(day)){   
				return false;   
		}else{
			return true;   
		}
};
trim=function(str) {   
	return str.replace(/(^\s*)|(\s*$)/g, "");   
};
getGenderByIDCard=function(idCard){   
	idCard = trim(idCard.replace(/ /g, ""));		// 对身份证号码做处理。包括字符间有空格。   
	if(idCard.length==15){   
		if(idCard.substring(14,15)%2==0){   
			return CDict.Female;   
		}else{   
			return CDict.Male;   
		}   
	}else if(idCard.length ==18){   
		if(idCard.substring(14,17)%2==0){   
			return CDict.Female;   
		}else{   
			return CDict.Male;   
		}   
	}else{   
		return -1;   
	}   
}   
checkNumber = function (container) {
	var bFlag = false;
	$('#' + container + " input").each(function(){
		$(this).removeClass("invalid");
		var value = $(this).val();
		var rule = $(this).attr("number");
		if (!isNull(value) && !isNull(rule)) {
			if(isNaN(value)){
				bFlag = true;
				$(this).addClass("invalid").blur(function(){$(this).removeClass("invalid");});
			}
		}
	});
	if (bFlag == true) {
		CCore.alert(CCore.getValue("Common_Invalid", "Common_Data"));
	}
	return bFlag;
};

window['CValidator']['isNull']=isNull;
window['CValidator']['checkInvalid']=checkInvalid;
window['CValidator']['checkIDCard']=checkIDCard;
window['CValidator']['checkCardID']=checkCardID;
window['CValidator']['checkMobile']=checkMobile;
window['CValidator']['checkReceiverNull']=checkReceiverNull;
window['CValidator']['getGenderByIDCard']=getGenderByIDCard;
window['CValidator']['getDateByIDCard']=getDateByIDCard;
})();

(function (){
window['CUpload'] = {};
init = function (controlID, types, isOutResult, callback, backCss){
	var dom = ""
		+"<span class='fileinput-button "+backCss+"'>"
			+"<input id='fileupload"+controlID+"' type='file' name='files[]' style='width:100%;height:100%;' multiple title='上传'>"
		+"</span>"
		+"<div id='uploading"+controlID+"' class='bar hide'></div>";
	if(!isOutResult){
		dom += "<ul id='files"+controlID+"' class='files'></ul>";
	}
	$("#" + controlID).next().remove();
	$("#" + controlID).next().remove();
	$("#" + controlID).next().remove();
	$("#" + controlID).after(dom);
	$("#" + controlID).attr("nums","0");
	var attachmentIDs = $("#" + controlID).val();
	if (!CValidator.isNull(attachmentIDs)) {
		var attachments = getAttachmentByIDs(attachmentIDs);
		if (!CValidator.isNull(attachments)) {
			$.each(attachments, function (i, attachment) {
				if(isOutResult){
					createFileImg(attachment,controlID);
				}else{
					createFileName(attachment,controlID);
				}
			});
		}
		
	};
	var url = CCore.servicePath("file/upload");
	$('#fileupload'+controlID).fileupload({
		url: url,
		dataType: 'json',
		done: function (e, data) {
			var attachment = data.result;
			console.log(222222+attachment.ID);
			console.log(attachment);
			if(isOutResult){
				putFileID(attachment,controlID);
				createFileImg(attachment,controlID);
			}else{
				appendFileID(attachment,controlID);
				createFileName(attachment,controlID);
			}
			var nums = $("#" + controlID).attr("nums");
			nums--;
			$("#" + controlID).attr("nums",nums);
			if(nums == 0){
				if(!CValidator.isNull(callback)){
					callback(controlID);
				}
			}
			$("#uploading" + controlID).hide();
		},
		formData:{"id":$("#" + controlID).val()},
		add: function (e, data) {
			if(data.files[0].size>4000000){
				CCore.alert("附件不能超过4M");
				return false;
			}
			var ext = getExtName(data.files[0].name);
			if(CCore.contain(types,ext)){
				$("#uploading" + controlID).html("正在上传...");
				$("#uploading" + controlID).show();
				data.submit();
				var nums = $("#" + controlID).attr("nums");
				nums++;
				$("#" + controlID).attr("nums",nums);
			}
			else{
				$("#uploading" + controlID).html("不允许上传"+ext+"文件");
				$("#uploading" + controlID).show();
			}
		}
	});
};
isVideo = function(fileName){
	var ext = getExtName(fileName);
	if(ext == "flv"){
		return true;
	}
	return false;
};
isImage = function(fileName){
	var ext = getExtName(fileName);
	if(CCore.contain("gif,bmp,jpg,jpeg,png",ext))
	{
		return true;
	}
	return false;
};
isAttachment = function(fileName){
	if(!isVideo(fileName) && !isImage(fileName)){
		return true;
	}
	return false;
};
getExtName = function(fileName){
	return fileName.substr(fileName.lastIndexOf('.')+1).toLowerCase();
};
createFileName = function(attachment,controlID,callback){
	var url = CCore.servicePath("/upload/" + attachment.fileNameInDisk);
	var str=" ondrop='drop(event,this)' ondragover='allowDrop(event)' draggable='true' ondragstart='drag(event, this)' ";
	if(isImage(attachment.fileName)){
		var imgUrl="/img/"+attachment.id+"/200";
		$("#files" + controlID).append("<li attachmentID='"+attachment.ID+"'  Style='margin-right:5px;' "+str+"><div Style='width:252px;'><img src='"+imgUrl+"'><a href='"+url+"' target='_blank' >"+attachment.fileName+"</a><a class='remove-file' Style='display:none;' onclick=\"CUpload.removeFile('"+attachment.ID+"','"+attachment.fileNameInDisk+"','"+controlID+"',this)\"></div></li>");
	}else{
		$("#files" + controlID).append("<li attachmentID='"+attachment.ID+"'  "+str+"><a href='"+url+"' target='_blank'>"+attachment.fileName+"</a><a class='remove-file' Style='display:inline-block;' onclick=\"CUpload.removeFile('"+attachment.ID+"','"+attachment.fileNameInDisk+"','"+controlID+"',this)\"></li>");
	}
	if(!CValidator.isNull(callback)){
		callback(controlID);
	}
};
allowDrop=function (ev)
{
	ev.preventDefault();
}

var srcdiv = null;
drag=function(ev,divdom)
{
	srcdiv=divdom;
	ev.dataTransfer.setData("text/html",divdom.innerHTML);
}

drop=function(ev,divdom)
{
	ev.preventDefault();
	if(srcdiv != divdom){
		srcdiv.remove();
		$(divdom).before(srcdiv);
		var lis= $(divdom).parent().find("li");
		var attachmentIDs="";
		$.each(lis,function(i,li){
			if(!CValidator.isNull(attachmentIDs)){
				attachmentIDs+=",";
			}
			attachmentIDs+=$(li).attr("attachmentID");
		});
		$("#"+$(divdom).parent().attr("id").replace("files","")).val(attachmentIDs);
	}
}
createFileCount = function(controlID,callback){
	var controlCount = controlID.replaceAll("_id_","_count_",true);
	var values = $("#" + controlID).val();
	var count = values.split(',');
	$("#" + controlCount).html(count.length + " 份");
	if(!CValidator.isNull(callback)){
		callback(controlID);
	}
};
createFileImg = function(attachment,controlID){
	$("#fileupload" + controlID).parent().css("background","url('/img/"+attachment.ID+"/160') no-repeat left center");
};
appendFileID = function(attachment, controlID){
	if(!CValidator.isNull($("#" + controlID).val())){
		$("#" + controlID).val($("#" + controlID).val() + "," + attachment.ID);
	}else{
		$("#" + controlID).val(attachment.ID);
	}
};
putFileID = function(attachment, controlID){
	$("#" + controlID).val(attachment.ID);
};
getAttachmentByIDs = function (IDs) {
	var attachment = CCore.invoke('file/getattachmentbyids', {IDs:IDs});
	return attachment;
};
getAttachmentUrl = function (attachment) {
	return "/upload/" + attachment.fileNameInDisk;
};
removeFile = function(attachmentID,file,controlID,current){
	CCore.invoke(CCore.servicePath('file/removeattachment'), {ID:attachmentID,File:file});
	//$(current).prev().remove();
	//$(current).remove();
	$(current).parent().remove();
	var attachmentIDs = $("#" + controlID).val().split(',');
	attachmentIDs.remove(attachmentID);
	$("#" + controlID).val(attachmentIDs.toString());

};
bindRowAttachment = function(c){
	$("#"+c+" .attachment").each(function(i,attachmentids){
		if(attachmentids.id.length>32){
			CUpload.init(attachmentids.id, CDict.FileExtension, false, function(){update(attachmentids.id);});
		}else{
			CUpload.init(attachmentids.id, CDict.FileExtension, false);
		}
	});
};
window['CUpload']['init']=init;
window['CUpload']['removeFile']=removeFile;
window['CUpload']['getAttachmentByIDs']=getAttachmentByIDs;
window['CUpload']['getAttachmentUrl']=getAttachmentUrl;
window['CUpload']['isAttachment']=isAttachment;
window['CUpload']['isImage']=isImage;
window['CUpload']['isVideo']=isVideo;
window['CUpload']['getVideo']=getVideo;
window['CUpload']['bindRowAttachment']=bindRowAttachment;
})();

(function (){
window['CDictPick'] = {};
gControlID = null;
gTree = null;
init = function (controlID, parentID, isMulti, initDictID, callback, isOnlyNextLevel,isAllCheck){
	var controlName = CCore.getControlNameByID(controlID);
	var strName = "";
	if(!CValidator.isNull(initDictID)){
		var dict = CCore.getDictByID(initDictID);
		if(!CValidator.isNull(dict)){
			strName = dict.name;
			$("#" + controlID).val(dict.ID);
		}
	}
	if($("#" +controlName).length>0){
		$("#" +controlName).remove();
	}
	$("#" + controlID).after("<input readonly='readonly' class='pick' id='"+controlName+"' type='text' value='"+strName+"'/>");
	$("#" + controlID).data("parentid",parentID);
	$("#" + controlID).data("ismulti",isMulti);
	$("#" + controlID).data("controlid",controlID);
	$("#" + controlID).data("controlname",controlName);
	$("#" + controlID).data("callback",callback);
	$("#" + controlID).data("isonlynextlevel",isOnlyNextLevel);
	$("#" + controlID).data("isAllCheck",isAllCheck);
	$("#" + controlName).click(function(){showMenu(controlID);});
};
showMenu = function (controlID) {
	gControlID = controlID;
	var parentValue = $("#" + controlID).attr("parentValue");
	if(!CValidator.isNull(parentValue)){
		if(CValidator.isNull($("#"+parentValue).val())){
			var cls = $("#"+parentValue).parent().prev().attr("class");
			if(CValidator.isNull(cls)){
				cls = $("#"+parentValue).prev().attr("class");
			}
			cls = cls.replaceAll("label","");
			cls = cls.replaceAll("star","");
			cls = cls.trim();
			CCore.alert(CCore.getValue("Common_PleaseSelect",cls));
			return false;
		}
	}
	var parentField = $("#" + controlID).attr("parentField");
	if(CValidator.isNull(parentField)){
		parentField = "memo";
	}
	
	$("#" + controlID).after("<ul id='dict_pick_" + controlID + "' class='ztree dict_pick'></ul>");
	var isMulti = $("#" + controlID).data("ismulti");
	var check = {enable: true,chkStyle: "radio",radioType: "all"};
	if (isMulti == true) {
		check = {enable: true,chkboxType: { "Y": "", "N": "" }};
	}
	var setting = {
		check:check,view:{dblClickExpand: false,showIcon: false},data:{simpleData: {enable: true}},callback:{onClick: onClick,onCheck: onCheck}
	};
	var parentID = $("#" + controlID).data("parentid");
	var isOnlyNext = $("#" + controlID).data("isonlynextlevel");
	var dicts;
	if(isOnlyNext){
		dicts = CCore.getNextDicts(parentID);
	}else{
		dicts = CCore.getAllDicts(parentID);
	}
	if(parentID == -2){
		dicts = CCore.getAllCitys();
	}
	var isOpen = true;
	if(dicts.length>20){
		isOpen = false;
	}
	var nodes = [];
	$.each(dicts, function (i, dict) {
		var checked = false;
		if (CCore.contain($("#" + controlID).val(), dict.ID)) {
			checked = true;
		}
		var nocheck = false;
		var isAllCheck = $("#" + controlID).data("isAllCheck");
		if (isAllCheck == true) {
			nocheck = false;
		}else if(isParent(dicts,dict) && parentID != CDict.Group ){
			nocheck = true;	
		}
		/*
		if(parentID == CDict.Group){
			if(dict.statusID == CDict.OrganizationTypeDepartment && isOnlyNext != true){
				nocheck = true;
			}
		}
*/
		
		var node = { id: dict.ID, pId: dict.parentID, name: dict.name, open: isOpen, checked: checked ,nocheck:nocheck};
		if(!CValidator.isNull(parentValue)){
			if(dict[parentField] == $("#" + parentValue).val()){
				nodes.push(node);
			}
		}else{
			nodes.push(node);
		}
	});
	$.fn.zTree.init($("#dict_pick_" + controlID), setting, nodes);
	var rows = 15;
	if(!CValidator.isNull(nodes) && nodes.length>0 && nodes.length<rows){
		rows = nodes.length;
	}
	gTree = $.fn.zTree.getZTreeObj("dict_pick_" + controlID );
	var controlName = $("#" + controlID).data("controlname");
	var position = $("#" +controlName).position();
	if(nodes.length>15){
		$(".dict_pick").css("overflow-x", "hidden");
		$(".dict_pick").css("overflow-y", "auto");
		$(".dict_pick li").css("color", "#4d6878");
		$("#dict_pick_" + controlID).css("height", 18*rows);
	}else{
		$(".dict_pick").css("overflow-y", "hidden");
	}
	
	$("#dict_pick_" + controlID).css({ 'left': position.left + "px", 'top': position.top + 2 + $("#" + controlName).outerHeight() + "px" }).slideDown("slow");
	
	$("body").bind("mousedown", onMouseDown);
};
isParent = function(dicts,c){
	for(var i=0;i<dicts.length;i++){
		if(dicts[i].parentID == c.ID){
			return true;
		}
	}
	return false;
};
onMouseDown = function (evt) {
	evt = evt ? evt : (window.event ? window.event : null);
	var target = (typeof evt.target == 'undefined' ? evt.srcElement : evt.target);
	if (!($(target).parents("#dict_pick_" + gControlID).length > 0 || target.id == gControlID || target.id == "dict_pick_" + gControlID )) {
		hideMenu();
	}
};
hideMenu = function () {
	$("#dict_pick_" + gControlID ).fadeOut("fast");
	$("#dict_pick_" + gControlID ).remove();
	$("body").unbind("mousedown", onMouseDown);
};
onClick = function (e, treeId, treeNode) {
	gTree.checkNode(treeNode, !treeNode.checked, null, true);
	return false;
};
onCheck = function (e, treeId, treeNode) {
	var isMulti = $("#" + gControlID).data("ismulti");
	var controlName = $("#" + gControlID).data("controlname");
	var ids="";
	var names="";
	if(isMulti){
		if(treeNode.checked){
			names =$("#" + controlName).val(); 
			ids = $("#" + gControlID).val();
			if(!CValidator.isNull(names)){
				names+=",";
			}
			names+=treeNode.name;
			if(!CValidator.isNull(ids)){
				ids+=",";
			}
			ids+=treeNode.id;
		}else{
			var nodes = gTree.getCheckedNodes(true);
			for (var i = 0;i<nodes.length; i++) {
				names += nodes[i].name + ",";
				ids += nodes[i].id + ",";
			}
			if (names.length > 0) names = names.substring(0, names.length - 1);
			if (ids.length > 0) ids = ids.substring(0, ids.length - 1);
		}	
	}else{
		var nodes = gTree.getCheckedNodes(true);
		for (var i = 0;i<nodes.length; i++) {
			names += nodes[i].name + ",";
			ids += nodes[i].id + ",";
		}
		if (names.length > 0) names = names.substring(0, names.length - 1);
		if (ids.length > 0) ids = ids.substring(0, ids.length - 1);
	}
	$("#" + controlName).val(names);
	$("#" + gControlID).val(ids);
	var callback = $("#" + gControlID).data("callback");
	if (!CValidator.isNull(callback)) {
		eval(callback);
	}
};
window['CDictPick']['init']=init;
})();

(function (){
window['CMemberPick'] = {};
controlID = "";
controlName = "";
groupID=-1;
isMultiple = true;
init = function (ctlID, isMulti, grpID, isNeedContact,callback){
	//controlID = ctlID;
	//groupID = grpID;
	if(isMulti != false){
		isMulti = true;
	}
	var ctlName = CCore.getControlNameByID(ctlID);
	$("#" + ctlName).remove();
	var v = "";
	if(!CValidator.isNull($("#"+ctlID).val())){
		var member= CCore.getMemberByID($("#"+ctlID).val());
		if(!CValidator.isNull(member)){
			v = member.name;
		}
	}
	$("#" + ctlID).after("<input readonly='readonly' class='pick' id='"+ctlName+"' type='text'  value='"+v+"'/>");
	$("#" + ctlID).data("groupid",grpID);
	$("#" + ctlID).data("ismulti",isMulti);
	$("#" + ctlID).data("controlid",ctlID);
	$("#" + ctlID).data("controlname",ctlName);
	$("#" + ctlID).data("isNeedContact",isNeedContact);
	$("#" + ctlID).data("callback", callback);
	$("#" + ctlName).unbind("click");
	$("#" + ctlName).click(function(){loadModal('../member/pick.htm', 630, 450, function(){load(ctlID);});});
};
load = function(ctlID){
	controlID = ctlID;
	isMultiple = $("#" + controlID).data("ismulti");
	groupID = $("#" + controlID).data("groupid");
	controlName = $("#" + controlID).data("controlname");
	isNeedContact = $("#" + controlID).data("isNeedContact");
	CMemberCommon.fillGroup("searchGroupID",groupID);
	if (!CValidator.isNull(groupID)) {
		$("#searchGroupID").hide();
		$("#searchGroupID").val(groupID);
		var group = CCore.getDictByID(groupID);
		$("#searchGroupName").val(group.name);
	}
	var selectValues = $("#" + controlID).val();
	var selectTexts = $("#" + controlName).val();
	if (!CValidator.isNull(selectValues)) {
		Values = selectValues.split(',');
		Texts = selectTexts.split(',');
		var domOption = "";
		for (var i = 0; i < Values.length; i++) {
			domOption += "<option value='" + Values[i] + "'>" + Texts[i] + "</option>"
		}
		$("#select_right").append(domOption);
	}
	if (isMultiple) {
		$("#select_left").attr("multiple", "multiple");
		$("#select_right").attr("multiple", "multiple");
	} else {
		$("#options_right_all,#options_left_all").hide();
	}
	listData(controlID,isNeedContact);
	
	$("#btnMemberPickSearch").click(listData);
	$("#btnPickMember").click(picks);
	$("#btnCancelPickMember").click(CCore.close);

	var options = {
		button_select: "#options_right",
		button_deselect: "#options_left",
		button_select_all: "#options_right_all",
		button_deselect_all: "#options_left_all",
		beforeMove: beforeMove
	};
	$("#select_left").multiSelect("#select_right", options);
	CCore.enterSubmit('searchKeyword', 'btnMemberPickSearch');
	$("#btnMemberPickSearch").html(CCore.getValue("Button_Search"));
	$("#btnPickMember").html(CCore.getValue("Button_OK"));
	$("#btnCancelPickMember").html(CCore.getValue("Button_Cancel"));
	CCore.label("MemberPickSearch");
};
listData = function (controlID) {
	var param = CCore.getFormData('MemberPickSearch');
	var url = "member/getpickmembers";
	var data = CCore.invoke(url, param);
	CCore.fillOptions('select_left', data, "ID", "name");
	var selectValues = $("#" +controlID).val();
	if (!CValidator.isNull(selectValues)) {
		var Values = selectValues.split(',');
		$.each(Values, function (i, value) {
			$("#select_left option[value='" + value + "']").remove();
		});
	}
};
picks = function () {
	var values = "";
	var texts = "";
	var options = $("#select_right").find("option");
	$.each(options, function (i, option) {
		values += option.value + ",";
		texts += option.text + ",";
	});
	if (values.endWith(",")) {
		values = values.substring(0, values.length - 1);
	}
	if (texts.endWith(",")) {
		texts = texts.substring(0, texts.length - 1);
	}
	$("#" + controlID).val(values);
	$("#" + controlName).val(texts);
	var callback = $("#" + controlID).data("callback"); 
	if (!CValidator.isNull(callback)) {
		eval(callback);
	}
	CCore.close();
};
beforeMove = function () {
	if (isMultiple) {
		var selectLeft = $("#select_left").find("option:selected");
		$.each(selectLeft, function (i, item) {
			$("#select_right option[value='" + item.value + "']").remove();
		});
	} else {
		var selectLeft = $("#select_left").find("option:selected");
		var selectRight = $("#select_right").find("option");
		$.each(selectRight, function (i, item) {
			$("#select_left").append("<option value='" + item.value + "'>" + item.text + "</option>");
			$("#select_right option[value='" + item.value + "']").remove();
		});
	}
	return true;
};
window['CMemberPick']['init']=init;
})();


(function (){
window['CPick'] = {};
var table;
var Width;
var Height;
init = function (ctlID,width,height){
	if(CValidator.isNull(width)){
		Width = 800;
	}else{
		Width = width;
	}
	if(CValidator.isNull(height)){
		Height = 500;
	}else{
		Height = height;
	}
	var ctlIDNoSearch=ctlID.replaceAll("search","",true);
	table = ctlID.substring(0,ctlIDNoSearch.length-2);
	
	var ctlName = CCore.getControlNameByID(ctlID);
	$("#" + ctlName).remove();
	$("#" + ctlID).after("<input readonly='readonly' class='pick' id='"+ctlName+"' type='text' />");
	$("#" + ctlName).unbind("click");
	$("#" + ctlName).click(loadPick);
};
loadPick = function(){
	var upperTable = table.firstToUpper();
	loadModal('../'+table+'/pick.htm', Width, Height, function(){eval("CPick"+upperTable+ ".init('" + table + "ID','" + table + "Name')")});
};

window['CPick']['init']=init;
})();


(function (){
window['CFlow'] = {};
var nextNodes = null;
var itemID = null;
selectNextNodeMember = function (container, fromNodeID, formItemID) {
	itemID = formItemID;
	nextNodes = CCore.invoke("flow/getnextnodes", {"fromNodeID": fromNodeID,"formItemID":formItemID});//必须多人全部审核才能通过的，还有未审核的，反回null
	if (!CValidator.isNull(nextNodes)) {
		var dom = "<label class='Common_Receivers'></label><select id='nextFlowNodeID' onchange='CFlow.getNextMembers()'></select><div id='nextMembers'></div>";
		$("#" + container).html(dom);
		CCore.fillOptions('nextFlowNodeID', nextNodes, "ID", "name", "");
		getNextMembers();
		if(nextNodes.length == 1){
			$("#nextFlowNodeID").hide();
		}
	}
};
getNodeByID = function(nodeID){
	for(var i=0;i<nextNodes.length;i++){
		if(nextNodes[i].ID == nodeID){
			return nextNodes[i];
		}
	}
};
getNextMembers = function () {
	var nodeID = $("#nextFlowNodeID").val();
	var node = getNodeByID(nodeID);
	var nextMembers = CCore.invoke("flow/getnextmembers", {"nodeID" : nodeID,"itemID":itemID});
	CCore.fillChecks('nextMembers', nextMembers, "nextMemberIDs", "ID", "username");
	
	
	if(node.automationID == CDict.FlowNodeAutomationAuto){
		$("#nextMembers input").attr("disabled","true");
		$("#nextMembers input").attr("checked","true");
	}
	if(!CValidator.isNull(nextMembers) && nextMembers.length == 1){
		$("#nextMembers input").attr("disabled","true");
		$("#nextMembers input").attr("checked","true");
	}
	if(!CValidator.isNull(nextMembers) && node.isCheckReceiver == CDict.Yes){
		$("#nextMembers input").attr("checked","true");
	}
};

getFlowTraceByID = function (id) {
	return CCore.invoke('flow/getflowtracebyid', {"id": id});
};

getCurrentFlowTrace = function(formItemID){
	return CCore.invoke('flow/getcurrentflowtrace', {"formItemID": formItemID});
};

getFormNameByFormItemID = function (formItemID) {
	return CCore.invoke('flow/getformnamebyformitemid', {"formItemID": formItemID});
};

getFlowTracesByFormItemID = function (formItemID) {
	return CCore.invoke('flow/getflowtracesbyformitemid', {"formItemID": formItemID});
};
getFlowByCategory = function (categoryID) {
	return CCore.invoke('flow/getflowbycategory', {"categoryID": categoryID});
};
loadTraces = function(c, itemID){
	if(!CValidator.isNull(itemID)){
		CCore.loadPage(c,'../flow/trace.htm',function () { CFlowTrace.init(itemID); });
	}
};
window['CFlow']['selectNextNodeMember']=selectNextNodeMember;
window['CFlow']['getNextMembers']=getNextMembers;
window['CFlow']['getFlowTraceByID']=getFlowTraceByID;
window['CFlow']['getCurrentFlowTrace']=getCurrentFlowTrace;
window['CFlow']['getFlowTracesByFormItemID']=getFlowTracesByFormItemID;
window['CFlow']['getFormNameByFormItemID']=getFormNameByFormItemID;
window['CFlow']['getFlowByCategory']=getFlowByCategory;
window['CFlow']['loadTraces']=loadTraces;

})();



(function (){
window['CStatistic'] = {};
loadPie = function (container, data, pieName) {
	var serviceData = new Array();
	for (i = 0; i < data.length; i++) {
		serviceData[i] = [data[i].name, data[i].count];
	}
	$('#' + container).highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: pieName
		},
		tooltip: {
			pointFormat: '{point.percentage:.1f}%'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: true,
					color: '#000000',
					connectorColor: '#000000',
					format: '<b>{point.name}</b>: {point.percentage:.1f} %  {point.y}个'
				}
			}
		},
		series: [{
			type: 'pie',
			name: "",
			data: serviceData
		}]
	});
};
loadColumn = function (container, data, columnName) {
	var serviceData = new Array();
	for (i = 0; i < data.length; i++) {
		serviceData[i] = [data[i].name, data[i].count];
	}
	$('#' + container).highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
		},
		title: {
			text: columnName
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			title: {
				text: ''
			}
		},
		tooltip: {
			pointFormat: '{point.y}'
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y}'
				}
			}
		},
		series: [{
			type: 'column',
			name: columnName,
			data: serviceData
		}]
	});
};
loadSpline = function (container, data, splineName) {
	var serviceData = new Array();
	for (i = 0; i < data.length; i++) {
		serviceData[i] = [data[i].name, data[i].count];
	}
	$('#' + container).highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false
        },
        title: {
            text: splineName
        },

        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
            	allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                enabled: true,
                },
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            type: 'spline',
			name: '来电次数',
			data: serviceData
        }]
	});
};
window['CStatistic']['loadPie']=loadPie;
window['CStatistic']['loadColumn']=loadColumn;
window['CStatistic']['loadSpline']=loadSpline;
})();



(function(a){
	a.fn.hoverClass=function(b){
		var a=this;
		a.each(function(c){
			a.eq(c).hover(function(){
				$(this).addClass(b);
			},function(){
				$(this).removeClass(b);
			})
		});
		return a;
	};
})(jQuery);