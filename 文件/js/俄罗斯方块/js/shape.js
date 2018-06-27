function Cell(row,col,img){  //所有的方块的类型
	this.row=row;
	this.col=col;
	this.img=img;
	//下降,就是把每个方块的row下降1
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
//所有方块的爸爸
function Shape(img,orgi){	//orgi:参照格的下标
	this.img=img;
	this.orgi=orgi;	//参照格 在cells中的下标
	this.states=[];		//保存每种图像不同状态的数组
	this.statei=0;		//默认所有图像的最初状态
	if(!Shape.prototype.drop){
		Shape.prototype.drop=function(){
			//遍历当前cells中的每个cell对象
			//调用当前对象的drop方法
			for(var i=0;i<this.cells.length;i++){
				this.cells[i].drop();
			}
		}
	}
	if(!Shape.prototype.moveR){
		Shape.prototype.moveR=function(){
			//遍历当前cells中的每个cell对象
			//调用当前对象的drop方法
			for(var i=0;i<this.cells.length;i++){
				this.cells[i].moveR();
			}
		}
	}
	if(!Shape.prototype.moveL){
		Shape.prototype.moveL=function(){
			//遍历当前cells中的每个cell对象
			//调用当前对象的drop方法
			for(var i=0;i<this.cells.length;i++){
				this.cells[i].moveL();
			}
		}
	}	
	if(!Shape.prototype.rotateR){
		Shape.prototype.rotateR=function(){
			//if(Object.getPrototypeOf(this)!Red.prototype){	//当前对象不等于o
			  if(this.constructor!=Red){	//当前对象不等于o
				this.statei++;
				if(this.statei>=this.states.length){	//转回初始状态
					this.statei=0;
				}
				var state=this.states[this.statei];	//获得当前对象的下一个状态
				var orgr=this.cells[orgi].row;
				var orgc=this.cells[orgi].col;
				//遍历当前图形中的每个cell
				//按state中偏移量,设置每个cell的新值
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
			//if(Object.getPrototypeOf(this)!Red.prototype){	//当前对象不等于o
			  if(this.constructor!=Red){	//当前对象不等于o
				this.statei--;
				this.statei<0&&(this.statei=this.states.length-1);
				var state=this.states[this.statei];	//获得当前对象的下一个状态
				var orgr=this.cells[orgi].row;
				var orgc=this.cells[orgi].col;
				//遍历当前图形中的每个cell
				//按state中偏移量,设置每个cell的新值
				for(var i=0;i<this.cells.length;i++){
					//this.cells[i].row=orgi+state.r0;
					this.cells[i].row=orgr+state["r"+i];
					this.cells[i].col=orgc+state["c"+i];
				}
			}
		}
	}
}
//旋转的方法
function State(r0,c0,r1,c1,r2,c2,r3,c3){
	//第0个cell相对于参照cell的偏移量
	this.r0=r0;
	this.c0=c0;

	this.r1=r1;
	this.c1=c1;

	this.r2=r2;
	this.c2=c2;

	this.r3=r3;
	this.c3=c3;	
}
//初始化第一种个方块
function Red(){	//04 05 14 15
	Shape.call(this,"image/red.png",0);
	//继承
	//如果当前对象的祖宗不是Shape,将其改为Shape
	if(!Shape.prototype.isPrototypeOf(Red.prototype)){
		Object.setPrototypeOf(Red.prototype,Shape.prototype);
	}
	//初始化图形
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
		new	Cell(0,4,this.img),	//参照格
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
		new	Cell(1,4,this.img)	//参照格
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
		new	Cell(1,4,this.img),	//参照格
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
		new	Cell(0,4,this.img),	//参照格
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
		new	Cell(0,4,this.img),	//参照格
		new	Cell(0,5,this.img),
		new	Cell(1,5,this.img)
	];
	this.states[3]=new State(-1,0,0,0,1,0,1,1);
	this.states[0]=new State(0,-1,0,0,0,1,-1,1);
	this.states[1]=new State(1,0,0,0,-1,0,-1,-1);
	this.states[2]=new State(0,1,0,0,0,-1,1,-1);
}
//gameOVer
