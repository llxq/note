function cacl(){	//���㵱ǰʱ��,����Ŀ��ʱ��ĵ���ʱ
	//hh:mm:ss
	var target=new Date("2018/4/12 20:00:00");
	var now=new Date();
	var ms=target-now;  //���ʱ���,���غ���
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
//ֹͣ��ʱ��������
function stop(btn){
	if(btn.innerHTML=="ֹͣ"){
		btn.innerHTML="����";
		/*clearInterval(timer);*/
		clearTimeout(timer);
		timer=null;
		//��ֹֹͣ��ʱ����ʱ��,:��ʧ��
		var span=document.querySelector("span");
		span.innerHTML=span.innerHTML.replace(/&nbsp;/g,":");
	}else {
		cacl();
		btn.innerHTML="ֹͣ";
		/*timer=setInterval(cacl,500);*/
	}
	
}