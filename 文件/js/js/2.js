var game={
	smallW:null,
	start:function(){
		//��һ���´���,�����ô��ڵĴ�С,�����ʼ�����ڵ�λ��	
		var maxTop=screen.availHeight-50;
		var rTop=parseInt(Math.random()*(maxTop+1));
		var maxLeft=screen.availWidth-50;
		var rLeft=parseInt(Math.random()*(maxLeft+1));
		var config="top="+rTop+",left="+rLeft+",width=50,height=50,resizable=yes";
		//���´���,���ҷ����´��ڶ���,����smallW��
		this.smallW=open("about:blank","small",config);
		this.smallW.onmouseover=function(){
			//�������x��y����
			var e=window.event||arguments[0];
			var x=e.screenX;
			var y=e.screenY;
			//������,��������λ��
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