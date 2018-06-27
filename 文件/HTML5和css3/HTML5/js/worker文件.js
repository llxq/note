//worker文件就是一个js文件
var time=0;
function addTime(){
	/*
		-> 将计算结果,传递给HTML页面中的worker对象
			-> postMessage()方法
				-> 在worker文件,全局对象就是worker对象
				-> 在worker文件中,使用worker对象的方法(直接使用)
				-> 当执行postMessage()方法时,会触发onmessage事件
	*/
	postMessage(time);
	time++;
	setTimeout(addTime,1000);
}
addTime();