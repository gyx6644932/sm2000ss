;(function(){
	window.verify = {
		nullStr : "不能为空！",
		formatError :"格式错误！",
		deviceManageEditAdd : function(m, y){
			if(verifyFun.isNull(m.parentId) || m.parentId === "1"){
				y.ngAlert('区域' + this.nullStr, "warning")
				return false;
			}
			if(verifyFun.isNull(m.name)){
				y.ngAlert('网元名称' + this.nullStr, "warning")
				return false;
			}
			if(verifyFun.isNull(m.ip)){
				y.ngAlert('网元IP' + this.nullStr, "warning")
				return false;
			}
			if(!verifyFun.isIp(m.ip)){
				y.ngAlert('网元IP' + this.formatError, "warning")
				return false;
			}
			if(verifyFun.isNull(m.description)){
				y.ngAlert('网元描述' + this.nullStr, "warning")
				return false;
			}
			return true;
		},
		areaManageAdd : function(m, y){
			if(verifyFun.isNull(m)){
				y.ngAlert('区域' + this.nullStr, "warning")
				return false;
			}
			return true;
		},
		alarmFilterEditAdd : function(m, y){
			if(verifyFun.isNull(m.activeAlarmId)){
				y.ngAlert('告警编号' + this.nullStr, "warning")
				return false;
			}
			if(verifyFun.isNull(m.activeAlarmModule)){
				y.ngAlert('告警源' + this.nullStr, "warning")
				return false;
			}
			if(verifyFun.isNull(m.activeAlarmLevel)){
				y.ngAlert('告警等级' + this.nullStr, "warning")
				return false;
			}
			if(verifyFun.isNull(m.isEnable)){
				y.ngAlert('邮件' + this.nullStr, "warning")
				return false;
			}
			
			return true;
		},
		alarmRuleEditAdd : function(m, y){
			if(verifyFun.isNull(m.activeAlarmId)){
				y.ngAlert('告警编号' + this.nullStr, "warning")
				return false;
			}
			if(verifyFun.isNull(m.activeAlarmModule)){
				y.ngAlert('告警源' + this.nullStr, "warning")
				return false;
			}
			if(verifyFun.isNull(m.activeAlarmLevel)){
				y.ngAlert('告警等级' + this.nullStr, "warning")
				return false;
			}
			if(verifyFun.isNull(m.emailFlag)){
				y.ngAlert('邮件' + this.nullStr, "warning")
				return false;
			}
			
			return true;
		}
	}
	window.verifyFun = { 
		isIp : function(s){
			var y = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/ ;
			return y.test(s) ? true : false ;
		},
		isMac : function(s){
			var y=/^[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}$/; 
			return y.test(s) ? true : false ;
		},
		isNull : function(a){
			return (a === "" || a === null || a === undefined ? true : false);
		},
		isNumber : function(a){
			return !this.isNull(a) && !isNaN(a) ? true : false;
		},
		between : function(a, b, c){ 
			return (!this.isNull(a) && !this.isNull(b) && !this.isNull(c) && this.isNumber(a) && this.isNumber(b) && this.isNumber(c) && b <= a && c >= a) ? true : false;
		}
	}

    window.$ = function (s){
    	if(typeof s === 'undefined') s = "";
        return document.getElementById(s);
    }
    window.$q = function (s){
    	if(typeof s === 'undefined') s = "";
        return document.querySelectorAll(s);
    }
    Array.prototype.unique = function() {
        var res = [],
            json = {};
        for (var i = 0; i < this.length; i++) {
            if (!json[this[i]]) {
                res.push(this[i]);
                json[this[i]] = 1;
            }
        }
        return res;
    }
})();
