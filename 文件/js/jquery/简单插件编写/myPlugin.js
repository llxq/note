/*-> �����Զ���jquery���
	-> ���󷽷����
	-> $.fn.extend(object)
		-> object	js���� 
			{
				���� ��ֵ,
				������ ��function
			}
*/
$.fn.extend({
	text:function(){
		console.log($(this).val());
	}
})