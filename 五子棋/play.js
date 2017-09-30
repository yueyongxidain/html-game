// JavaScript Document
var black=new Image();
var white=new Image();
black.src='2.gif';
white.src='1.gif';
var timer=null;
var i=0;
var  map=[];
for(var j=0;j<14;j++)
{
	map[j]=[];
}
function init()
{
	for(var j=0;j<14;j++)
	{
		for(var k=0;k<14;k++)
		{
			map[j][k]=0;
		}
	}
 var canvas=document.getElementById("canvas");
 canvas.width=600;
 canvas.height=600;
 canvas.style.backgroundColor='#d7c098';
 var  ctx=canvas.getContext('2d');
 ctx.strokeStyle='#fff';
 for(var i=0;i<15;i++)
 {
	 for(var j=0;j<15;j++)
	 {
		   ctx.strokeRect(j*40,i*40,40,40); 
	  }
 }
}

function check_win( m,  n)
{
    var total = 1; 
    var i;
	//横向
    for(i = m-1; i >= 0; i--)//统计同行左侧连续同样棋子个数。
        if(map[i][n] == map[m][n]) total++;
        else break;
    for(i = m+1; i < 14; i ++)//统计同行右侧连续同样棋子个数。
        if(map[i][n] == map[m][n]) total++;
        else break;
    if(total>=5) 
	return 1;//胜利
	total=1;
	//纵向
	 for(i = n-1; i >= 0; i--)//统计同行左侧连续同样棋子个数。
        if(map[m][i] == map[m][n]) total++;
        else break;
    for(i = n+1; i < 14; i ++)//统计同行右侧连续同样棋子个数。
        if(map[m][i] == map[m][n]) total++;
        else break;
    if(total>=5) 
	return 1;//胜利。
	total=1;
	var j=0;
	for(i = m-1,j=n-1; j>=0 &&i >= 0; i--,j--)//统计同行左侧连续同样棋子个数。
        if(map[i][j] == map[m][n]) total++;
        else break;
    for(i = m+1,j=n+1; i < 14&&j<14; i ++,j++)//统计同行右侧连续同样棋子个数。
        if(map[i][j] == map[m][n]) total++;
        else break;
    if(total>=5) 
	return 1;
	
	total=1;
	for(i = m+1,j=n-1; j>=0&&i < 14; i++,j--)//统计同行左侧连续同样棋子个数。
        if(map[i][j] == map[m][n]) total++;
        else break;
    for(i = m-1,j=n+1; i>=0&&j<14; i --,j++)//统计同行右侧连续同样棋子个数。
        if(map[i][j] == map[m][n]) total++;
        else break;
    if(total>=5) 
	return 1;


    return 0; //没有胜利。
}

function getit(ev)
{
	
	var canvas=document.getElementById("canvas");
	var  ctx=canvas.getContext('2d');
	var e=event||ev;
	var x=Math.round((e.clientX-canvas.offsetLeft)/40);
	var y=Math.round(e.clientY/40);
	if(x==0||y==0)
	return;
	if(i%2==0&&map[x-1][y-1]==0)
	{
	   ctx.drawImage(black,x*40-20,y*40-20);
	   map[x-1][y-1]=1;
	   i++;
	}
	if(i%2==1&&map[x-1][y-1]==0)
	{
		ctx.drawImage(white,x*40-20,y*40-20);
		map[x-1][y-1]=2;
		i++;
	}
	
}
function play()
{
	clearInterval(timer);
	init();
	var timer=setInterval(function(){
	for(var i=0;i<14;i++)
	{
		for(var j=0;j<14;j++)
		{
			if(map[i][j]!=0)
			{
				
				if(check_win(i,j))
				{
					if(map[i][j]==1)
					{
						clearInterval(timer);
						var msg = "黑子赢了,是否继续？"; 
						 if (confirm(msg)==true){ 
						   play();
						 }else{ 
						  return; 
						 } 
					}
					if(map[i][j]==2)
					{
						clearInterval(timer);
						var msg = "白子赢了,是否继续？"; 
						 if (confirm(msg)==true){ 
						   play();
						 }else{ 
						  return; 
						 } 
					}
					
				}
			}
		}
	}
	
	},100);
}