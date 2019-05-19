//baby.js
//小鱼类中所需所有数据与行为
//1:创建小鱼类
var babyObj = function(){
  //1.1:创建属性保存小鱼坐标与角度
  this.x;
  this.y;
  this.angle;
  //1.2:创建属性保存小鱼眼睛数组
  this.babyEye = [];
  //1.3:创建属性保存小鱼身体数组
  this.babyBody = [];
  //1.4:创建属性保存小鱼尾巴数组
  this.babyTail = [];
  //1.5:创建三个变量控制小鱼眼睛图片切换
  this.babyEyeIndex = 0;
  this.babyEyeStart = 1;
  this.babyEyeEnd = 2000;
  //1.6:创建三个变量控制小鱼身体图片切换
  this.babyBodyIndex = 0;
  this.babyBodyStart = 1;
  this.babyBodyEnd = 3000;
  //1.7:创建三个变量控制小鱼尾巴图片切换
  this.babyTailIndex = 0;
  this.babyTailStart = 1;
  this.babyTailEnd = 60;
}
//2:为小鱼类添加初始化方法
babyObj.prototype.init = function(){
    //1.1：小鱼位置初始化屏幕中心
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    //1.2: 小鱼角度0
    this.angle = 0;
    //1.3: 初始化小鱼眼睛图片 2    0-1
    for(var i=0;i<2;i++){
      this.babyEye[i] = new Image();
      this.babyEye[i].src = "src/babyEye"+i+".png";
    }
    //1.4: 初始化小鱼身体图片 20   0-19
    for(var i=0;i<20;i++){
        this.babyBody[i] = new Image();
        this.babyBody[i].src = "src/babyFade"+i+".png";
    }
    //1.5: 初始化小鱼尾巴图片 8    0-7
    for(var i=0;i<8;i++){
        this.babyTail[i] = new Image();
        this.babyTail[i].src = "src/babyTail"+i+".png";
    }
    //console.log(this.babyEye);
    //console.log(this.babyBody);
    //console.log(this.babyTail);
}
//3:为小鱼类添加绘制方法
babyObj.prototype.draw = function(){
    //1:控制眼睛
      //1.1:加start+=deltaTime;
      //1.2:如果start大于end
      //1.3:下标+1
      //1.4:start = 1
    this.babyEyeStart += deltaTime;
    if(this.babyEyeStart>this.babyEyeEnd){
       this.babyEyeIndex = (this.babyEyeIndex+1)%2;
       this.babyEyeStart = 1;
       if(this.babyEyeIndex==0){
           this.babyEyeEnd = 2000;
       }
        if(this.babyEyeIndex==1){
            this.babyEyeEnd = 200;
        }
    }
    //2:控制身体
    this.babyBodyStart += deltaTime;
    if(this.babyBodyStart > this.babyBodyEnd){
        this.babyBodyIndex = this.babyBodyIndex+1;
        this.babyBodyStart = 1;
        if(this.babyBodyIndex>18){
            this.babyBodyIndex = 18;
            //游戏结束
        }
    }
    //3:控制尾巴
    this.babyTailStart+=deltaTime;
    if(this.babyTailStart > this.babyTailEnd){
      this.babyTailIndex = (this.babyTailIndex+1)%8;
      this.babyTailStart = 1;
    }

    var eye = this.babyEye[this.babyEyeIndex];
    var body = this.babyBody[this.babyBodyIndex];
    var tail = this.babyTail[this.babyTailIndex];

    //10:16:~10:21
    //修改小鱼坐标x,y 让小鱼面向大鱼慢慢游动过去
    this.x = lerpDistance(mom.x,this.x,0.99);
    this.y = lerpDistance(mom.y,this.y,0.98);

    //this.x = lerpDistance(mx,this.x,0.98);
    //this.y = lerpDistance(my,this.y,0.98);


    //修改小鱼游动角度
    //(1)计算大鱼和小鱼坐标差
    var deltaY = mom.y - this.y;
    var deltaX = mom.x - this.x;
    //(2)计算大鱼和小鱼角度差
    var beta = Math.atan2(deltaY,deltaX)+Math.PI;
    //(3)计算小鱼新角度
    this.angle = lerpAngle(beta,this.angle,0.9);

    //9:50~9:55
    //1:保存笔画状态
    ctx1.save();
    //2:平移原点
    ctx1.translate(this.x,this.y);
    //3:旋转角度
    ctx1.rotate(this.angle);
    //4:绘制小鱼身体
    ctx1.drawImage(body,-body.width*0.5,-body.height*0.5)
    //5:绘制小鱼尾巴
    ctx1.drawImage(tail,-tail.width*0.5+23,-tail.height*0.5);
    //6:绘制小鱼眼睛
    ctx1.drawImage(eye,-eye.width*0.5,-eye.height*0.5);
    //9:恢复笔画状态
    ctx1.restore();

}
//4:将baby.js 挂载到 index.html
//5:在main.js 中创建对象并且调用相应的方法