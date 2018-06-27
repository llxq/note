window.$=HTMLElement.prototype.$=function(selector){
	return (this==window?document:this).querySelectorAll(selector);
}
var tetris={
	RN:20,	//总行数
	CN:10,	//总列数
	CSIZE:26,	//每个小方块都是26px
	OFFSET_X:15,	//每个单元格left加15px
	OFFSET_Y:15,	//每个单元格top加15px
	
	pg:null,	//保存游戏界面
	currShape:null,		//专门保存正在移动的图像对象
	nextShape:null,		//专门保存下一个图像
	interval:1000,	//默认每1秒重绘一次
	timer:null,

	wall:[],   //保存所有停止下落的下方的方块
	state:1,	//1是游戏正在继续,0是GameOver,2是暂
	STATE_RUNNING:1,
	STATE_GAMEOVER:0,
	STATE_PAUSE:2,
	IMG_GAMEOVER:"image/gameOver.png",
	IMG_PAUSE:"image/pause.png",

	SCORES:[0,10,50,80,200],	//记录消的行所对应的分
	score:0,	//记录总分数
	lines:0,	//消的总行数

	//游戏状态所显示的图片
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
	
	//随机生成一个图形
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
	
	//绘制当前图形
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

	//需要绘制的全部图像
	paint:function(){
		//每次都要删除img并且重新绘制
		this.pg.innerHTML=this.pg.innerHTML.replace(/<img(.*?)>/g,"");
		this.paintWall();
		this.paintShape();
		this.paintNext();
		this.paintScore();
		this.paintState();	//最后追加的在最上面
	},
	
	//绘制下一个图形,显示在游戏界面的右上角
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

	//初始化分数
	paintScore:function(){
		//第一个放this.score
		$("span")[0].innerHTML=this.score;
		//第二个放this.lines
		$("span")[1].innerHTML=this.lines;
	},

	//下落
	drop:function(){
		if(this.state==this.STATE_RUNNING){
		//判断能否降落
			if(this.canDrop()){
				this.currShape.drop();
			}else{  //不能下落的时候,就将图形中的每个cel放入到对应的wall中
				this.landIntoWall();
				//消行,并返回消除的行数
				var ln=this.deleteLines();
				//记分
				this.score+=this.SCORES[ln];
				this.lines+=ln;
				//如果游戏没有结束
				if(!this.isGameOver()){
					//重新生成一个新图形放入currshape中
					//将等待的图像换到currshape
					this.currShape=this.nextShape;
					this.nextShape=this.randomShape();
				}
				else{
					 clearInterval(this.timer);
					 this.timer=null;
					 this.state=this.STATE_GAMEOVER;
					 this.paint();	//动画已经结束了,应该重新在绘制一下
				}
			}
		}
	},
	
	//检查wall中每一行是否消除
	deleteLines:function(){
		//遍历wall中每一行,定义一个lines变量存放本次删除的行数
		for(var r=0,lines=0;r<this.RN;r++){	//RN 和 CN 是为了以后好修改
			if(this.isFull(r)){
				this.deleteL(r);
				lines++;
			}
		}
		return lines;
	},
	//判断当前行是否已经满了
	isFull:function(row){
		//遍历line中每个cells
		for(var c=0;c<this.CN;c++){
			//只要当前cell无效,则false  就是说当前对象没有值 返回的是undefined
			if(!this.wall[row][c])
			return false;
		}
		return true;
	},
	//删除
	deleteL:function(row){	//删除指定行,并下移之上的cell
		this.wall.splice(row,1);		//删除一个
		this.wall.unshift([]);	//顶部压如新空行
		//遍历所有的cell,从row行开始
		for(var r=row;r>0;r--){
			//遍历每个格,将每个cell加一
			for(var c=0;c<this.CN;c++){
				if(this.wall[r][c]){	//只要有效,无效是返回undefined的
					this.wall[r][c].row++;
				}
			}
		}
	},
	//游戏结束
	isGameOver:function(){
		//获取nextShape中的所有的cell,存在cells
		var cells=this.nextShape.cells;
		for(var i=0;i<cells.length;i++){
			//如果
			if(this.wall[cells[i].row][cells[i].col]){return true;}
		}
		return false;
	},

	//将下落的方块方法wall数组中
	landIntoWall:function(){
		//遍历每个图像中的当前cell
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			//  将cell放进wall中相同row,col位置中
			if(i<=4){
				this.wall[cells[i].row][cells[i].col]=cells[i];
			}
		}	
	},

	//打印所有落地的墙中的格子
	paintWall:function(){
		//遍历当前wall墙中的每个格
		//有效的话则将当前图像添加到页面上 
		for(var r=0;r<this.RN;r++){	//RN 和 CN 是为了以后好修改
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

	//判断是否可以继续降落
	canDrop:function(){
		//遍历currSharp中的cells是否到最后一行了
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			//到底了就不能再继续减了
			if(cells[i].row==this.RN-1){return false;}
			//如果currShape中任意一个cell的下方有wall中的cell
			if(this.wall[cells[i].row+1][cells[i].col]){return false;}
		}
		return true;
	},

	//加载游戏界面
	init:function(){
		this.socre=0;
		this.lines=0;
		this.state=1;
		this.interval=1000;
		this.pg=$(".playground")[0];
		this.nextShape=this.randomShape();
		this.currShape=this.randomShape(); //new Red();//
		//将wall数组初始化为RN个空数组
		for(var i=0;i<this.RN;this.wall[i++]=[]);
		//调用tetris的绘制方法
		this.paint();
		this.timer=setInterval(function(){
			//调用tetris的currShape的drop方法
			tetris.drop();  //如果用this指的是window对象
			//调用tetris的绘制方法
			tetris.paint();
		},this.interval);
		document.onkeydown=function(){
			var e=window.event||arguments[0];
			switch(e.keyCode){
				case 37:tetris.moveL();break;	//左
				case 38:tetris.rotateR();break;	//上
				case 39:tetris.moveR();break;	//右
				case 40:tetris.drop();break;	//下
				case 90:tetris.rotateL();break;	//z

				case 80:tetris.pause();break;  //P 暂停
				case 81:tetris.gameOver();break;  //Q 结束游戏
				case 67:tetris.myContinue();break;   //C 继续游戏
				case 83:	 //s	重新开始
					if(this.state==this.STATE_GAMEOVER){
						tetris.init();break;
					}	
			}
		}
	},
	//暂停
	pause:function(){
		if(this.state==this.STATE_RUNNING){
			this.state=this.STATE_PAUSE;
		}
	},	
	//继续
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
	//按上,向右旋转
	rotateR:function(){
		if(this.state==this.STATE_RUNNING){
			this.currShape.rotateR();
			if(this.outOfBounds()||this.hit()){
				this.currShape.rotateL();
			}
		}
	},
	//按z键,向左旋转
	rotateL:function(){
		if(this.state==this.STATE_RUNNING){
			this.currShape.rotateL();
			if(this.outOfBounds()||this.hit()){
				this.currShape.rotateR();
			}
		}
	},
	//检查当前图形是否越界
	outOfBounds:function(){
		//当前shape中任意一个单元格的col>0或者>=CN
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			if(cells[i].col<0||cells[i].col>=this.CN){return true;}
		}
		return false;
	},
	//判断当前图形是否发生碰撞
	hit:function(){
		//当前shape中任意一个单元格的col>0或者>=CN
		var cells=this.currShape.cells;
		for(var i=0;i<cells.length;i++){
			if(this.wall[cells[i].row][cells[i].col]){return true;}
		}
		return false;
	},

	//左移
	moveL:function(){
		if(this.state==this.STATE_RUNNING){
			//当前图像左移
			this.currShape.moveL();
			if(this.outOfBounds()||this.hit()){
				//如果左移不通过,则右移
				this.currShape.moveR();
			}
		}
	},
	//右移动
	moveR:function(){
		if(this.state==this.STATE_RUNNING){
			this.currShape.moveR();
			if(this.outOfBounds()||this.hit()){
				//如果左移不通过,则右移
				this.currShape.moveL();
			}
		}
	},
}
window.onload=function(){
	tetris.init();
}