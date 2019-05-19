//分数
//11:20~11:23
//1:创建分数类
var dataObj = function(){
    this.score = 0;     //分数
    this.double = 1;    //[1兰色,2橙色]
    this.gameover = false;  //判断游戏是否结束
    this.alpha = 0;
}
//2:添加分数初始化方法
dataObj.prototype.init = function(){}
//3:添加分数绘制方法
dataObj.prototype.draw = function(){
    //1:保存画笔状态
    ctx1.save();
    ctx1.fillStyle = "#fff";
    ctx1.font = "35px Verdana";
    ctx1.textAlign = "center";
    //2:在画布中央绘制分数
    ctx1.fillText("SCORE:"+this.score,canWidth*0.5,canHeight-80);

    //如果当前游戏己经结束
    //显示GAME OVER     //淡入
    if(this.gameover){
        this.alpha += deltaTime * 0.0003;
        this.alpha = this.alpha > 1 ? 1:this.alpha;
        ctx1.fillStyle = "rgba(255,255,255,"+this.alpha+")";
        ctx1.font = "55px Verdana";
        ctx1.fillText("GAME OVER",canWidth*0.5,canHeight*0.5);
    }
    //3:恢复画笔状态
    ctx1.restore();
}
//4:挂载index.html 中
//5:在main.js 创建对象并且调用其相关方法
//6:为分数类添加方法,加分
dataObj.prototype.addScore = function(){
    this.score += this.double * 100;
    this.double = 1;
}