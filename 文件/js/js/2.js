var game={
	smallW:null,
	start:function(){
		//打开一个新窗口,并设置窗口的大小,随机初始化窗口的位置	
		var maxTop=screen.availHeight-50;
		var rTop=parseInt(Math.random()*(maxTop+1));
		var maxLeft=screen.availWidth-50;
		var rLeft=parseInt(Math.random()*(maxLeft+1));
		var config="top="+rTop+",left="+rLeft+",width=50,height=50,resizable=yes";
		//打开新窗口,并且返回新窗口对象,存在smallW中
		this.smallW=open("about:blank","small",config);
		this.smallW.onmouseover=function(){
			//获得鼠标的x和y坐标
			var e=window.event||arguments[0];
			var x=e.screenX;
			var y=e.screenY;
			//鼠标进入,重新生成位置
			while(true){
				var rTop=parseInt(Math.random()*(maxTop+1));
				var rLeft=parseInt(Math.random()*(maxLeft+1));
				if(!(y>=rTop&&y<=rTop+50)&&(x>=rLeft&&x<=rLeft+50)){
					this.moveTo(rTop,rLeft);
					break;
				}
			}
		}
	}
};