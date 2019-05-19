//mom.js
//保存大鱼相关的数据与行为
//1:创建大鱼类
var momObj = function(){
   this.x;     //大鱼位置 x
   this.y;     //大鱼位置 y
   this.angle; //大鱼角度 angle
   this.bigEye = [];   //大鱼眼睛
   this.bigBody = [];  //大鱼身体
   this.bigTail = [];  //大鱼尾巴

    //大鱼尾巴图片切换 0 1 2 3 4 5 6 7
    this.bigTailIndex = 0;   //保存当前尾巴图片下标
    this.bigTailStart = 1;   //当前图片切换计时开始
    this.bigTailEnd = 100;  //当前图片切换计时结束-切换图片
    //大鱼眼睛图片切换  0 睁眼睛 1 闭眼睛
    this.bigEyeIndex = 0;  //保存当前眼睛图片下标
    this.bigEyeStart = 1;  //眼睛图片计时开始
    this.bigEyeEnd = 2000; //眼睛图片计时结束

}
//2:为大鱼类添加初始化方法
momObj.prototype.init = function(){
    this.x = canWidth * 0.5;    //大鱼初始化在屏幕中心
    this.y = canHeight * 0.5;

    this.angle = 0;              //大鱼初始化角度0
    for(var i=0;i<2;i++){
        this.bigEye[i] = new Image();
        this.bigEye[i].src = "src/bigEye"+i+".png";
    }
    for(var i=0;i<8;i++){
        this.bigBody[i] = new Image();
        this.bigBody[i].src = "src/bigSwim"+i+".png";
    }
    for(var i=0;i<8;i++){
        this.bigTail[i] = new Image();
        this.bigTail[i].src = "src/bigTail"+i+".png";
    }
}
//3:为大鱼类添加绘制方法
momObj.prototype.draw = function(){
    //1:保存画笔状态
    //1.1:修改坐标:让大鱼面向鼠标慢慢游动过去
    this.x = lerpDistance(mx,this.x,0.99);
    this.y = lerpDistance(my,this.y,0.98);
    //1.2:修改角度
    //(1)计算坐标差
    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    //(2)计算大鱼和鼠标角度差+Math.PI
    var beta =  Math.atan2(deltaY,deltaX)+Math.PI;
    //(3)调用函数
    this.angle = lerpAngle(beta,this.angle,0.9);

    //切换大鱼尾巴图片
    this.bigTailStart+=deltaTime;
    if(this.bigTailStart>this.bigTailEnd){
        this.bigTailIndex = (this.bigTailIndex+1)%8;
        this.bigTailStart = 1;
    }
    this.bigEyeStart += deltaTime;
    if(this.bigEyeStart>this.bigEyeEnd){
        this.bigEyeIndex = (this.bigEyeIndex+1)%2;
        this.bigEyeStart = 1;
        if(this.bigEyeIndex==0){
            this.bigEyeEnd = 2000;
        }
        if(this.bigEyeIndex==1){
            this.bigEyeEnd = 200;
        }
    }
    ctx1.save();
    //2:平移原点
    ctx1.translate(this.x,this.y);
    //3:设备旋转角度
    ctx1.rotate(this.angle);
    //4:绘制身体    以下三个图形需要按照顺序绘制
    var body = this.bigBody[0];
    var tail = this.bigTail[this.bigTailIndex];
    var eye = this.bigEye[this.bigEyeIndex];
    ctx1.drawImage(body,-body.width*0.5,-body.height*0.5);
    //5:绘制尾巴
    ctx1.drawImage(tail,-tail.width*0.5+30,-tail.height*0.5);
    //6:绘制眼睛
    ctx1.drawImage(eye,-eye.width*0.5,-eye.height*0.5);
    //9:恢复画笔状态
    ctx1.restore();

}
//4:挂载index.html文件中
//5:在main.js创建大鱼对象并且调用相关方法