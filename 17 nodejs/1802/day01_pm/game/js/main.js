//游戏入口程序
//1:挂载index.html文件中
//2:声明游戏中使用变量
//2.1:创建二个变量保存画布
var can1;
var can2;
//2.2:创建二个变量保存画笔
var ctx1;
var ctx2;
//2.3:创建一个变量保存背景图片
var bgPic = new Image();
//2.4:创建二个变量保存画布宽度和高度
var canWidth = 0;
var canHeight = 0;
//2.5:创建一个变量保存海葵对象
var ane;
//2.6:创建一个变量保存食物对象
var fruit;
///2.7:创建二个变量保存上一帧执行时间和二帧间隔时间差
var lastTime;
var deltaTime;
//2.8:创建一个变量保存大鱼对象
var mom;
//2.9:创建二个变量保存鼠标位置
var mx = 0;
var my = 0;
//2.10:创建一个变量保存小鱼对象
var baby;
//2.11:创建一个变量保存特效对象
var wave;
//2.12: 创建变量保存分数对象
var data;
//3:创建函数game-->启动函数
function game(){
    init();
    lastTime = Date.now();  //上一帧时间
    deltaTime = 0;
    gameloop();
}
//4:创建函数init,初始化函数，初始化变量和对象值
function init(){
    //4.1 初始二个画布
    can1 = document.getElementById("canvas1");
    can2 = document.getElementById("canvas2");
    //4.2:初始二个画笔
    ctx1 = can1.getContext("2d");
    ctx2 = can2.getContext("2d");
    //4.3:下载背景图片
    bgPic.src = "src/background.jpg";
    //4.4:初始画布宽度和高度
    canWidth = can1.width;
    canHeight = can1.height;
    //console.log(bgPic);
    //console.log(canWidth+"_"+canHeight);
    //4.5：创建海葵对象并且调用初始化方法
    ane = new aneObj();
    ane.init();
    //4.6: 创建食物对象并且调用初始化方法
    fruit = new fruitObj();
    fruit.init();
    //4.7:创建大鱼对象并且调用初始化方法
    mom = new momObj();
    mom.init();
    //4.8:为画布一绑定鼠标移动事件
    can1.addEventListener("mousemove",onMouseMove,false);
    //4.9:创建小鱼对象并且调用初始化方法
    baby = new babyObj();
    baby.init();
    //4.10:创建特效对象并且调用初始化方法
    wave = new waveObj();
    wave.init();
    //4.11 创建分数对象并且调用初始化方法
    data = new dataObj();
    data.init();
}
//5:创建函数gameloop  通过智能定时器调用绘制游戏中不同角色功能
function gameloop(){
    //5.1 创建智能定时器调用 gameloop
    requestAnimFrame(gameloop);
    //5.11 二帧之间时间差
    var now = Date.now();        //当前时间
    deltaTime = now - lastTime; //二帧之差
    lastTime = now;              //更新上一帧时间
    if(deltaTime>40){
        deltaTime = 40;
    }
    //console.log(deltaTime);
    //5.2:绘制背景图片
    drawBackground();
    //5.3:监听画布上的食物数量
    //5.31 调用碰撞检测函数
    momFruitsCollsion();
    //5.32 调用碰撞检测函数 大鱼喂小鱼
    momBabyCollision();
    //5.4:清除画布1上的所有元素
    ctx1.clearRect(0,0,canWidth,canHeight);
    fruitMonitor();
    //5.8:绘制海葵
    ane.draw();
    //5.9:绘制食物
    fruit.draw();
    //5.10:绘制大鱼
    mom.draw();
    //5.11:绘制小鱼
    baby.draw();
    //5.12:绘制特效对象
    wave.draw();
    //5.13:绘制分数
    data.draw();
}
//6:页面加载成功后调用game函数
document.body.onload =  game;


//7:获取鼠标位置(画布)
function onMouseMove(e){
    if(e.offsetX || e.layerX){
        mx = e.offsetX == undefined?e.layerX:e.offsetX;
    }
    if(e.offsetY || e.layerY){
        my = e.offsetY == undefined?e.layerY:e.offsetY;
    }
    //console.log(mx+"_"+my);
}


