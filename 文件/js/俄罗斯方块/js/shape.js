function Cell(row,col,img){  //���еķ��������
	this.row=row;
	this.col=col;
	this.img=img;
	//�½�,���ǰ�ÿ�������row�½�1
	if(!Cell.prototype.drop){
		Cell.prototype.drop=function(){
			this.row++;
		}
	}
	if(!Cell.prototype.moveR){
		Cell.prototype.moveR=function(){
			this.col++;
		}
	}
	if(!Cell.prototype.moveL){
		Cell.prototype.moveL=function(){
			this.col--;
		}
	}
}
//���з���İְ�
function Shape(img,orgi){	//orgi:���ո���±�
	this.img=img;
	this.orgi=orgi;	//���ո� ��cells�е��±�
	this.states=[];		//����ÿ��ͼ��ͬ״̬������
	this.statei=0;		//Ĭ������ͼ������״̬
	if(!Shape.prototype.drop){
		Shape.prototype.drop=function(){
			//������ǰcells�е�ÿ��cell����
			//���õ�ǰ�����drop����
			for(var i=0;i<this.cells.length;i++){
				this.cells[i].drop();
			}
		}
	}
	if(!Shape.prototype.moveR){
		Shape.prototype.moveR=function(){
			//������ǰcells�е�ÿ��cell����
			//���õ�ǰ�����drop����
			for(var i=0;i<this.cells.length;i++){
				this.cells[i].moveR();
			}
		}
	}
	if(!Shape.prototype.moveL){
		Shape.prototype.moveL=function(){
			//������ǰcells�е�ÿ��cell����
			//���õ�ǰ�����drop����
			for(var i=0;i<this.cells.length;i++){
				this.cells[i].moveL();
			}
		}
	}	
	if(!Shape.prototype.rotateR){
		Shape.prototype.rotateR=function(){
			//if(Object.getPrototypeOf(this)!Red.prototype){	//��ǰ���󲻵���o
			  if(this.constructor!=Red){	//��ǰ���󲻵���o
				this.statei++;
				if(this.statei>=this.states.length){	//ת�س�ʼ״̬
					this.statei=0;
				}
				var state=this.states[this.statei];	//��õ�ǰ�������һ��״̬
				var orgr=this.cells[orgi].row;
				var orgc=this.cells[orgi].col;
				//������ǰͼ���е�ÿ��cell
				//��state��ƫ����,����ÿ��cell����ֵ
				for(var i=0;i<this.cells.length;i++){
					//this.cells[i].row=orgi+state.r0;
					this.cells[i].row=orgr+state["r"+i];
					this.cells[i].col=orgc+state["c"+i];
				}
			}
		}
	}
	if(!Shape.prototype.rotateL){
		Shape.prototype.rotateL=function(){
			//if(Object.getPrototypeOf(this)!Red.prototype){	//��ǰ���󲻵���o
			  if(this.constructor!=Red){	//��ǰ���󲻵���o
				this.statei--;
				this.statei<0&&(this.statei=this.states.length-1);
				var state=this.states[this.statei];	//��õ�ǰ�������һ��״̬
				var orgr=this.cells[orgi].row;
				var orgc=this.cells[orgi].col;
				//������ǰͼ���е�ÿ��cell
				//��state��ƫ����,����ÿ��cell����ֵ
				for(var i=0;i<this.cells.length;i++){
					//this.cells[i].row=orgi+state.r0;
					this.cells[i].row=orgr+state["r"+i];
					this.cells[i].col=orgc+state["c"+i];
				}
			}
		}
	}
}
//��ת�ķ���
function State(r0,c0,r1,c1,r2,c2,r3,c3){
	//��0��cell����ڲ���cell��ƫ����
	this.r0=r0;
	this.c0=c0;

	this.r1=r1;
	this.c1=c1;

	this.r2=r2;
	this.c2=c2;

	this.r3=r3;
	this.c3=c3;	
}
//��ʼ����һ�ָ�����
function Red(){	//04 05 14 15
	Shape.call(this,"image/red.png",0);
	//�̳�
	//�����ǰ��������ڲ���Shape,�����ΪShape
	if(!Shape.prototype.isPrototypeOf(Red.prototype)){
		Object.setPrototypeOf(Red.prototype,Shape.prototype);
	}
	//��ʼ��ͼ��
	this.cells=[
		new	Cell(0,4,this.img),
		new	Cell(0,5,this.img),
		new	Cell(1,4,this.img),
		new	Cell(1,5,this.img)
	];
}
//2
function blue(){	//03 04 05 14
	Shape.call(this,"image/blue.png",1);
	if(!Shape.prototype.isPrototypeOf(blue.prototype)){
		Object.setPrototypeOf(blue.prototype,Shape.prototype);
	}
	this.cells=[
		new	Cell(0,3,this.img),
		new	Cell(0,4,this.img),	//���ո�
		new	Cell(0,5,this.img),
		new	Cell(1,4,this.img)
	];
	this.states[0]=new State(0,-1,0,0,0,1,1,0);
	this.states[1]=new State(-1,0,0,0,1,0,0,-1);
	this.states[2]=new State(0,1,0,0,0,-1,-1,0);
	this.states[3]=new State(1,0,0,0,-1,0,0,1);
}
//3
function brown(){	//03 04 05 06
	Shape.call(this,"image/brown.png",1);
	if(!Shape.prototype.isPrototypeOf(brown.prototype)){
		Object.setPrototypeOf(brown.prototype,Shape.prototype);
	}
	this.cells=[
		new	Cell(0,3,this.img),
		new	Cell(0,4,this.img),
		new	Cell(0,5,this.img),
		new	Cell(0,6,this.img)
	];
	this.states[0]=new State(0,-1,0,0,0,1,0,2);
	this.states[1]=new State(-1,0,0,0,1,0,2,0);
}
//4
function green(){	//04 05 13 14
	Shape.call(this,"image/green.png",3);
	if(!Shape.prototype.isPrototypeOf(green.prototype)){
		Object.setPrototypeOf(green.prototype,Shape.prototype);
	}
	this.cells=[
		new	Cell(0,4,this.img),
		new	Cell(0,5,this.img),	
		new	Cell(1,3,this.img),	
		new	Cell(1,4,this.img)	//���ո�
	];
	this.states[1]=new State(0,-1,1,-1,-1,0,0,0);
	this.states[0]=new State(0,1,-1,0,-1,-1,0,0);
}
//5
function purple(){	//03 04 14 15
	Shape.call(this,"image/purple.png",2);
	if(!Shape.prototype.isPrototypeOf(purple.prototype)){
		Object.setPrototypeOf(purple.prototype,Shape.prototype);
	}
	this.cells=[
		new	Cell(0,3,this.img),
		new	Cell(0,4,this.img),	
		new	Cell(1,4,this.img),	//���ո�
		new	Cell(1,5,this.img)
	];
	this.states[0]=new State(0,-1,-1,1,0,0,-1,0);
	this.states[1]=new State(-1,-1,0,-1,0,0,1,0);
	
}
//6
function sky_blue(){  //03 04 05 13
	Shape.call(this,"image/sky_blue.png",1);
	if(!Shape.prototype.isPrototypeOf(sky_blue.prototype)){
		Object.setPrototypeOf(sky_blue.prototype,Shape.prototype);
	}
	this.cells=[
		new	Cell(0,3,this.img),
		new	Cell(0,4,this.img),	//���ո�
		new	Cell(0,5,this.img),
		new	Cell(1,3,this.img)
	];
	this.states[3]=new State(-1,0,0,0,1,0,-1,1);
	this.states[0]=new State(0,-1,0,0,0,1,-1,1);
	this.states[1]=new State(1,0,0,0,-1,0,1,1);
	this.states[2]=new State(0,1,0,0,0,-1,1,1);
}
//7
function yellow(){	//03 04 05 15
	Shape.call(this,"image/yellow.png",1);
	if(!Shape.prototype.isPrototypeOf(yellow.prototype)){
		Object.setPrototypeOf(yellow.prototype,Shape.prototype);
	}
	this.cells=[
		new	Cell(0,3,this.img),
		new	Cell(0,4,this.img),	//���ո�
		new	Cell(0,5,this.img),
		new	Cell(1,5,this.img)
	];
	this.states[3]=new State(-1,0,0,0,1,0,1,1);
	this.states[0]=new State(0,-1,0,0,0,1,-1,1);
	this.states[1]=new State(1,0,0,0,-1,0,-1,-1);
	this.states[2]=new State(0,1,0,0,0,-1,1,-1);
}
//gameOVer
