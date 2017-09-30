     var canvas=document.getElementById('canvas');
	 var msg = document.getElementById("msg");//显示信息
	 canvas.width=560;
	 canvas.height=560;
	 var w=35;
	 var h=35;
	 var context=canvas.getContext('2d');
	 var curMan;//小人的方向
	 var Level=0;//关卡数
	 var curarry=copy(levels[Level]);//用来暂时移动的地图
	 
	 //指的是小人的坐标
	 
	 function point(x,y)
	 {
		 this.x=x;
		 this.y=y;
	 }
	 var manPosition = new point(5,5);//给定一个初始坐标
	 //图片相对地址
	 var oImgs = {
		"block" : "images/block.gif",
		"wall" : "images/wall.png",
		"box" : "images/box.png",
		"ball" : "images/ball.png",
		"up" : "images/up.png",
		"down" : "images/down.png",
		"left" : "images/left.png",
		"right" : "images/right.png",
	}
	function imgPreload(srcs,callback)
	{
		var count = 0,imgNum = 0,images = {};

		for(src in srcs)
		{
			imgNum++;
		}
		for(src in srcs )
		{
			images[src] = new Image();
			images[src].onload = function(){
				//判断是否所有的图片都预加载完成
				if (++count >= imgNum)
				{
					callback(images);
				}
			}
			images[src].src = srcs[src];
		}
	}
	var block,wall,box,ball,up,down,left,right;
	imgPreload(oImgs,function(images){
		//console.log(images.block);
		block = images.block;
		wall = images.wall;
		box = images.box;
		ball = images.ball;
		up = images.up;
		down = images.down;
		left = images.left;
		right = images.right;
		init();
	});
	
	//初始化
	
	function init()
	{
		showinfo();
	    curarry=copy(levels[Level]);
		curMan=down;
		initBlock();
		DrawMap(curarry);
	}
	//初始化背景
		function initBlock()
		{
			for (var i=0;i<16 ;i++ )
			{
				for (var j=0;j<16 ;j++ )
				{
					context.drawImage(block,w*j,h*i,w,h);
				}
			}
		}
		
	//画地图
		
		function DrawMap(level)
		{
			
		for (var i=0;i<level.length ;i++ )
		{
			for (var j=0;j<level[i].length ;j++ )
			{
				
				var pic = block;//初始图片
				
				switch (level[i][j])
				{
				case 1://绘制墙壁
					pic = wall;
					break;
				case 2://绘制陷进
					pic = ball;
					break;
				case 3://绘制箱子
					pic = box;
					break;
				case 4://绘制小人
					pic = curMan;//小人有四个方向 具体显示哪个图片需要和上下左右方位值关联
					manPosition.x=i;
					manPosition.y=j;//获取小人的坐标位置
					break;
				case 5://绘制箱子及陷进位置
					pic = box;
					break;
				}
				//每个图片不一样宽 需要在对应地板的中心绘制地图
				context.drawImage(pic,w*j-(pic.width-w)/2,h*i-(pic.height-h),pic.width,pic.height);
			}
		}
		if(checkFinish())
		{
			alert("过关！");
			next();
			
		}
	}
	
	//监测按键事件
	
	document.onkeydown=function(ev)
	{
		var e=window.event||ev||event;//兼容火狐
		var code=0;
		code=e.keyCode||e.which||e.charCode; 
		switch(code)
		{
		case 37:
		  curMan=left;
		  goMan(curMan);
		   break;
		 case 65:
		  curMan=left;
		  goMan(curMan);
		   break;
		 case 38:
		   curMan=up;
		   goMan(curMan);
		   break;
		 case 87:
		   curMan=up;
		   goMan(curMan);
		   break;
		 case 39:
		   curMan=right;
		   goMan(curMan);
			break;
		 case 68:
		   curMan=right;
		   goMan(curMan);
			break;
		 case 40:
		   curMan=down;
		   goMan(curMan);
		   break;
		 case 83:
		   curMan=down;
		   goMan(curMan);
		   break;	
		}
	}
	
 //小人移动事件
 
 function goMan(dir)
 {
	 var p1,p2;//小人前两个位置
	 switch(dir)
	 {
		case up:
			p1=new point(manPosition.x-1,manPosition.y);
			p2=new point(manPosition.x-2,manPosition.y);
		    break;
		case down:
			p1=new point(manPosition.x+1,manPosition.y);
			p2=new point(manPosition.x+2,manPosition.y);
			break;
		case right:
			p1=new point(manPosition.x,manPosition.y+1);
			p2=new point(manPosition.x,manPosition.y+2);
			break;
		case left:
			p1=new point(manPosition.x,manPosition.y-1);
			p2=new point(manPosition.x,manPosition.y-2);
			break;	 
	}
	trymove(p1,p2);
 }
 //尝试是否能够移动
 
 function trymove(p1,p2)
 {
	  if(curarry[p1.x][p1.y]==1)//小人前面是墙不能移动
	   return;
	 if(curarry[p1.x][p1.y]==3||curarry[p1.x][p1.y]==5)//小人前面是箱子
	   {
		   if(curarry[p2.x][p2.y]==3||curarry[p2.x][p2.y]==1)//小人前面的箱子的前面是墙或者箱子不能移动
		   return;
		   else
		   {
			  curarry[p1.x][p1.y]=4;
			  curarry[p2.x][p2.y]=3;
			  if(levels[Level][manPosition.x][manPosition.y]==2||levels[Level][manPosition.x][manPosition.y]==5)
			  curarry[manPosition.x][manPosition.y]=2;
			  else
			  curarry[manPosition.x][manPosition.y]=0;
			  initBlock();
			  DrawMap(curarry); 
			}
		}
	  else
	 {
		  curarry[p1.x][p1.y]=4;
		  if(levels[Level][manPosition.x][manPosition.y]==2||levels[Level][manPosition.x][manPosition.y]==5)
			  curarry[manPosition.x][manPosition.y]=2;
		  else
			  curarry[manPosition.x][manPosition.y]=0;
		  initBlock();
		  DrawMap(curarry); 
	  }
 }
	
 //监测是否过关
 function checkFinish()
 {
		for (var i=0;i<curarry.length ;i++ )
		{
			for (var j=0;j<curarry[i].length ;j++ )
			{
				//当前移动过的地图和初始地图进行比较，若果初始地图上的陷进参数在移动之后不是箱子的话就指代没推成功
				if (levels[Level][i][j] == 2 && curarry[i][j] != 3)
				{
					return false;
				}
				if(levels[Level][i][j] == 5 && curarry[i][j] != 3)
				{
					return false;
				}
			}
		}
		return true;
	}
 	//克隆二维数组
	//目的是不改变原有的数组以保证能够按原有的布局进行初始化
	function copy(arr)
	{
		var b=[];//每次移动更新地图数据都先清空再添加新的地图
		for (var i=0;i<arr.length ;i++ )
		{
			b[i] = arr[i].concat();//链接两个数组
		}
		return b;
	}
//下一关
function next()
{
	Level++;
	init();
}
function before()
{
	Level--;
	init();
}
function now()
{
	init();
}
function showinfo()
{
	msg.innerHTML = "第" + (Level+1) +"关";
}
var showhelp = false;
function help(){
	showhelp = !showhelp;
	if (showhelp)
	{
		msg.innerHTML = "用键盘上的上、下、左、右键移动小人，把箱子全部推到小球的位置即可过关。箱子只可向前推，不能往后拉，并且小人一次只能推动一个箱子。";
	}
	else{
		showinfo();
	}
}