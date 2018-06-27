window.$=HTMLElement.prototype.$=function(selector){
	return (this==window?document:this).querySelectorAll(selector);
}
var tetris={
	RN:20,	//������
	CN:10,	//������
	CSIZE:26,	//ÿ��С���鶼��26px
	OFFSET_X:15,	//ÿ����Ԫ��left��15px
	OFFSET_Y:15,	//ÿ����Ԫ��top��15px
	
	pg:null,	//������Ϸ����
	currShape:null,		//ר�ű��������ƶ���ͼ�����
	nextShape:null,		//ר�ű�����һ��ͼ��
	interval:1000,	//Ĭ��ÿ1���ػ�һ��
	timer:null,

	wall:[],   //��������ֹͣ������·��ķ���
	state:1,	//1����Ϸ���ڼ���,0��GameOver,2����
	STATE_RUNNING:1,
	STATE_GAMEOVER:0,
	STATE_PAUSE:2,
	IMG_GAMEOVER:"image/gameOver.png",
	IMG_PAUSE:"image/pause.png",

	SCORES:[0,10,50,80,200],	//��¼����������Ӧ�ķ�
	score:0,	//��¼�ܷ���
	lines:0,	//����������

	//��Ϸ״̬����ʾ��ͼƬ
	paintState:function(){
		var img=new Image();
		switch(this.state){
			case this.STATE_GAMEOVER:img.src=this.IMG_GAMEOVER;
			break;
			case this.STATE_PAUSE:img.src=this.IMG_PAUSE;
								  img.style.top="60px";
								  img.style.left="90px";
								  break;
		}
		this.pg.appendChild(img);
	},
	
	//�������һ��ͼ��
	randomShape:function(){
		switch(parseInt(Math.random()*7)){
			case 0:return new Red();
			case 1:return new blue();
			case 2:return new brown();
			case 3:return new green();
			case 4:return new purple();
			case 5:return new sky_blue();
			case 6:return new yellow();
		}
	},
	
	//���Ƶ�ǰͼ��
	paintShape:function(){
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			var img=new Image(); //document.createElement("img"); 
			img.src=cells[i].img;
			img.style.left=cells[i].col*this.CSIZE+this.OFFSET_X+"px";
			img.style.top=cells[i].row*this.CSIZE+this.OFFSET_Y+"px";
			this.pg.appendChild(img);
		}	
	},

	//��Ҫ���Ƶ�ȫ��ͼ��
	paint:function(){
		//ÿ�ζ�Ҫɾ��img�������»���
		this.pg.innerHTML=this.pg.innerHTML.replace(/<img(.*?)>/g,"");
		this.paintWall();
		this.paintShape();
		this.paintNext();
		this.paintScore();
		this.paintState();	//���׷�ӵ���������
	},
	
	//������һ��ͼ��,��ʾ����Ϸ��������Ͻ�
	paintNext:function(){
		var cells=this.nextShape.cells;
		for(var i=0;i<cells.length;i++){
			var img=new Image(); //document.createElement("img"); 
			img.src=cells[i].img;
			img.style.left=(cells[i].col+10)*this.CSIZE+this.OFFSET_X+"px";
			img.style.top=(cells[i].row+1)*this.CSIZE+this.OFFSET_Y+"px";
			this.pg.appendChild(img);
		}	
	},

	//��ʼ������
	paintScore:function(){
		//��һ����this.score
		$("span")[0].innerHTML=this.score;
		//�ڶ�����this.lines
		$("span")[1].innerHTML=this.lines;
	},

	//����
	drop:function(){
		if(this.state==this.STATE_RUNNING){
		//�ж��ܷ���
			if(this.canDrop()){
				this.currShape.drop();
			}else{  //���������ʱ��,�ͽ�ͼ���е�ÿ��cel���뵽��Ӧ��wall��
				this.landIntoWall();
				//����,����������������
				var ln=this.deleteLines();
				//�Ƿ�
				this.score+=this.SCORES[ln];
				this.lines+=ln;
				//�����Ϸû�н���
				if(!this.isGameOver()){
					//��������һ����ͼ�η���currshape��
					//���ȴ���ͼ�񻻵�currshape
					this.currShape=this.nextShape;
					this.nextShape=this.randomShape();
				}
				else{
					 clearInterval(this.timer);
					 this.timer=null;
					 this.state=this.STATE_GAMEOVER;
					 this.paint();	//�����Ѿ�������,Ӧ�������ڻ���һ��
				}
			}
		}
	},
	
	//���wall��ÿһ���Ƿ�����
	deleteLines:function(){
		//����wall��ÿһ��,����һ��lines������ű���ɾ��������
		for(var r=0,lines=0;r<this.RN;r++){	//RN �� CN ��Ϊ���Ժ���޸�
			if(this.isFull(r)){
				this.deleteL(r);
				lines++;
			}
		}
		return lines;
	},
	//�жϵ�ǰ���Ƿ��Ѿ�����
	isFull:function(row){
		//����line��ÿ��cells
		for(var c=0;c<this.CN;c++){
			//ֻҪ��ǰcell��Ч,��false  ����˵��ǰ����û��ֵ ���ص���undefined
			if(!this.wall[row][c])
			return false;
		}
		return true;
	},
	//ɾ��
	deleteL:function(row){	//ɾ��ָ����,������֮�ϵ�cell
		this.wall.splice(row,1);		//ɾ��һ��
		this.wall.unshift([]);	//����ѹ���¿���
		//�������е�cell,��row�п�ʼ
		for(var r=row;r>0;r--){
			//����ÿ����,��ÿ��cell��һ
			for(var c=0;c<this.CN;c++){
				if(this.wall[r][c]){	//ֻҪ��Ч,��Ч�Ƿ���undefined��
					this.wall[r][c].row++;
				}
			}
		}
	},
	//��Ϸ����
	isGameOver:function(){
		//��ȡnextShape�е����е�cell,����cells
		var cells=this.nextShape.cells;
		for(var i=0;i<cells.length;i++){
			//���
			if(this.wall[cells[i].row][cells[i].col]){return true;}
		}
		return false;
	},

	//������ķ��鷽��wall������
	landIntoWall:function(){
		//����ÿ��ͼ���еĵ�ǰcell
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			//  ��cell�Ž�wall����ͬrow,colλ����
			if(i<=4){
				this.wall[cells[i].row][cells[i].col]=cells[i];
			}
		}	
	},

	//��ӡ������ص�ǽ�еĸ���
	paintWall:function(){
		//������ǰwallǽ�е�ÿ����
		//��Ч�Ļ��򽫵�ǰͼ����ӵ�ҳ���� 
		for(var r=0;r<this.RN;r++){	//RN �� CN ��Ϊ���Ժ���޸�
			for(var c=0;c<this.CN;c++){
				var cell=this.wall[r][c];
				if(cell){
					var img=new Image(); //document.createElement("img"); 
					img.src=cell.img;
					img.style.left=cell.col*this.CSIZE+this.OFFSET_X+"px";
					img.style.top=cell.row*this.CSIZE+this.OFFSET_Y+"px";
					this.pg.appendChild(img);
				}
			}
		}
	},

	//�ж��Ƿ���Լ�������
	canDrop:function(){
		//����currSharp�е�cells�Ƿ����һ����
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			//�����˾Ͳ����ټ�������
			if(cells[i].row==this.RN-1){return false;}
			//���currShape������һ��cell���·���wall�е�cell
			if(this.wall[cells[i].row+1][cells[i].col]){return false;}
		}
		return true;
	},

	//������Ϸ����
	init:function(){
		this.socre=0;
		this.lines=0;
		this.state=1;
		this.interval=1000;
		this.pg=$(".playground")[0];
		this.nextShape=this.randomShape();
		this.currShape=this.randomShape(); //new Red();//
		//��wall�����ʼ��ΪRN��������
		for(var i=0;i<this.RN;this.wall[i++]=[]);
		//����tetris�Ļ��Ʒ���
		this.paint();
		this.timer=setInterval(function(){
			//����tetris��currShape��drop����
			tetris.drop();  //�����thisָ����window����
			//����tetris�Ļ��Ʒ���
			tetris.paint();
		},this.interval);
		document.onkeydown=function(){
			var e=window.event||arguments[0];
			switch(e.keyCode){
				case 37:tetris.moveL();break;	//��
				case 38:tetris.rotateR();break;	//��
				case 39:tetris.moveR();break;	//��
				case 40:tetris.drop();break;	//��
				case 90:tetris.rotateL();break;	//z

				case 80:tetris.pause();break;  //P ��ͣ
				case 81:tetris.gameOver();break;  //Q ������Ϸ
				case 67:tetris.myContinue();break;   //C ������Ϸ
				case 83:	 //s	���¿�ʼ
					if(this.state==this.STATE_GAMEOVER){
						tetris.init();break;
					}	
			}
		}
	},
	//��ͣ
	pause:function(){
		if(this.state==this.STATE_RUNNING){
			this.state=this.STATE_PAUSE;
		}
	},	
	//����
	myContinue:function(){
		if(this.state==this.STATE_PAUSE){
			this.state=this.STATE_RUNNING;
		}
	},
	//GameOver
	gameOver:function(){
		this.state=this.STATE_GAMEOVER;
		clearInterval(this.timer);
		this.timer=null;
		this.paint();
	},
	//����,������ת
	rotateR:function(){
		if(this.state==this.STATE_RUNNING){
			this.currShape.rotateR();
			if(this.outOfBounds()||this.hit()){
				this.currShape.rotateL();
			}
		}
	},
	//��z��,������ת
	rotateL:function(){
		if(this.state==this.STATE_RUNNING){
			this.currShape.rotateL();
			if(this.outOfBounds()||this.hit()){
				this.currShape.rotateR();
			}
		}
	},
	//��鵱ǰͼ���Ƿ�Խ��
	outOfBounds:function(){
		//��ǰshape������һ����Ԫ���col>0����>=CN
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			if(cells[i].col<0||cells[i].col>=this.CN){return true;}
		}
		return false;
	},
	//�жϵ�ǰͼ���Ƿ�����ײ
	hit:function(){
		//��ǰshape������һ����Ԫ���col>0����>=CN
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			if(this.wall[cells[i].row][cells[i].col]){return true;}
		}
		return false;
	},

	//����
	moveL:function(){
		if(this.state==this.STATE_RUNNING){
			//��ǰͼ������
			this.currShape.moveL();
			if(this.outOfBounds()||this.hit()){
				//������Ʋ�ͨ��,������
				this.currShape.moveR();
			}
		}
	},
	//���ƶ�
	moveR:function(){
		if(this.state==this.STATE_RUNNING){
			this.currShape.moveR();
			if(this.outOfBounds()||this.hit()){
				//������Ʋ�ͨ��,������
				this.currShape.moveL();
			}
		}
	},
}
window.onload=function(){
	tetris.init();
}