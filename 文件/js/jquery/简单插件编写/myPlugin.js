/*-> 定义自定义jquery插件
	-> 对象方法插件
	-> $.fn.extend(object)
		-> object	js对象 
			{
				属性 ：值,
				方法名 ：function
			}
*/
$.fn.extend({
	text:function(){
		console.log($(this).val());
	}
})