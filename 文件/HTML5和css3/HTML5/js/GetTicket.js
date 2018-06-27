//实现抢票逻辑
/*
	-> 创建一个0-100的随机整数
		-> 10%的几率抢到票
*/
var rand=parseInt(Math.random()*100);
if(rand<9){
	//抢到票了
	postMessage(1);
}else{
	//没有
	postMessage(0);
}