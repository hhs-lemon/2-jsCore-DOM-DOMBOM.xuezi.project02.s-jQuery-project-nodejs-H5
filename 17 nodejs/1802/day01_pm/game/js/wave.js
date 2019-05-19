//9:25~9:31
//wave.js 保存大鱼吃食物特效
//1:创建特效类
//  坐标 半径 是否状态
var waveObj = function(){
    //坐标
    this.x = [];
    this.y = [];
    //半径
    this.r = [];
    //状态
    this.alive = [];
}
//2:为特效类添加初始化方法
waveObj.prototype.init = function(){
    for(var i=0;i<this.num;i++){
        this.alive[i] = false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.r[i] = 0;
    }
}
//3:为特效类添加绘制方法
waveObj.prototype.draw = function(){
    //1:保存画笔状态
    ctx1.save();
    //2:
    ctx1.lineWidth = 2;
    ctx1.shadowBlur = 10;
    ctx1.shadowColor = "red";
    //3:创建循环遍历所有光环
    for(var i=0;i<this.num;i++){
        //4:如果当前光环可见
        if(this.alive[i]){
            //修改当前光环半径
            this.r[i] += deltaTime * 0.02;
            ///如果半径超过100
            if(this.r[i]>50){
                //消失/break;
                this.alive[i] = false;
                break;
            }
            //变淡   10:30~10:33
            var alpha = 1 - this.r[i]/50;
            //5:开始新路径
            ctx1.beginPath();
            ctx1.strokeStyle = "rgba(255,255,255,"+alpha+")";
            //6:绘制一个圆拱形
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
            //7:描边
            ctx1.stroke();
        }
    }
    //9:恢复画笔状态
    ctx1.restore();
}
//4:将文件加载index.html
//5:在main.js 创建对象,并且调用相关方法
//6:为特效类添加数量
waveObj.prototype.num = 10;
//7:特效对象出生方法
//x y 特效对象出生位置
waveObj.prototype.born = function(x,y){
   //创建循环
   for(var i=0;i<this.num;i++){
       //获取第一个状态为不活动光环
       if(!this.alive[i]){
           //状态  true
           this.alive[i] = true;
           //半径  5
           this.r[i] = 5;
           //xy
           this.x[i] = x;
           this.y[i] = y;
           return;
           //返回
       }

   }
}




