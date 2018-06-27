/*
	-> 定义自定义的jquery插件文件
		-> $.extend(object)
*/
$.extend({
	maxValue:function(a,b){
		return a>b?a:b;
	},
	minValue:function(a,b){
		return a<b?a:b;
	}
});