function cacl(){	//计算当前时间,距离目标时间的倒计时
	//hh:mm:ss
	var target=new Date("2018/4/12 20:00:00");
	var now=new Date();
	var ms=target-now;  //获得时间差,返回毫秒
	/*if(ms<1000){
		clearInterval(timer);
		timer=null;
		document.querySelector("span").innerHTML="00:00:00"
		return false;
	}*/
	var h=parseInt(ms/1000/3600);
	h<10&&(h="0"+h);
	var m=parseInt((ms-h*3600*1000)/1000/60);
	m<10&&(m="0"+m);
	var s=parseInt((ms-h*3600*1000-m*1000*60)/1000);
	s<10&&(s="0"+s);
document.querySelector("span").innerHTML=document.querySelector("span").innerHTML.indexOf(":")==-1?h+":"+m+":"+s:h+"&nbsp;"+m+"&nbsp;"+s;
	if(ms>=1000){
		timer=setTimeout(cacl,500);
	}else{
		timer=null;
		document.querySelector("span").innerHTML="00:00:00"
	}
}
var timer=null;
onload=function(){
	cacl();
	/*timer=setInterval(cacl,500);*/
}
//停止定时器方法：
function stop(btn){
	if(btn.innerHTML=="停止"){
		btn.innerHTML="启动";
		/*clearInterval(timer);*/
		clearTimeout(timer);
		timer=null;
		//防止停止定时器的时候,:消失了
		var span=document.querySelector("span");
		span.innerHTML=span.innerHTML.replace(/&nbsp;/g,":");
	}else {
		cacl();
		btn.innerHTML="停止";
		/*timer=setInterval(cacl,500);*/
	}
	
}