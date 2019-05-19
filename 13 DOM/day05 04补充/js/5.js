var canMove=false;//开关
var offsetX,offsetY;
pop.onmousedown=function(e){
	canMove=true;
	offsetX=e.offsetX,offsetY=e.offsetY;
}
window.onmousemove=function(e){
	if(canMove){
		//e.clientX, e.clientY
		var left=e.clientX-offsetX;
		var top=e.clientY-offsetY;
		pop.style.left=left+"px";
		pop.style.top=top+"px";
	}
}
pop.onmouseup=function(){ canMove=false; }