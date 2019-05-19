//1:创建海葵类
var aneObj = function(){
    //start point,controls point,end point
    //1:起始点,只需要x坐标,y固定值 600
    this.rootx = [];
    //2:控制点,不要需要单独创建变量,可以依据起点x y
    //  控制点x = 起始点x;
    //  控制点y = 600 - 100;
    //3:终点:需要x,需要y
    this.headx = [];
    this.heady = [];
    this.amp = [];  //(-1~1)
    this.alpha = 0; //正弦函数的角度
}
//2:为海葵类添加初始化方法
aneObj.prototype.init = function(){
    //每个海葵，生长的位置随机，比较像自然生长
    for(var i=0;i<this.num;i++){
        //起点初始化坐标
        this.rootx[i] = i * 16 + Math.random()*20;
        //终点初始化坐标:中间位置开始
        this.headx[i] = this.rootx[i];
        this.heady[i] = canHeight - 240 + Math.random()*50;
        //初始化
        this.amp[i] = Math.random() * 50 + 50;
    }
}
//3:为海葵类添加绘制方法
aneObj.prototype.draw = function(){
    //1:海葵是随着时间变量变化的
    this.alpha  += deltaTime * 0.0008;
    var l = Math.sin(this.alpha);
    //2:保存画笔状态
    ctx2.save();
    //3:画笔描边的样式/透明度/圆角/宽度
    ctx2.strokeStyle = "#3b154e";
    ctx2.globalAlpha = 0.6;
    ctx2.lineCap = "round";
    ctx2.lineWidth = 20;
    //4:创建循环
    for(var i=0;i<this.num;i++){
        //5:开始路径/移动起始点/计算终点/
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i];
        //6:绘制/ 控制/终点
        ctx2.quadraticCurveTo(
            this.rootx[i],canHeight-100,
            this.headx[i],this.heady[i]);
        //7:描边
        ctx2.stroke();
    }
    //10:恢复画笔状态
    ctx2.restore();
}
//4:为海葵类添加数量
aneObj.prototype.num =  50;





//ane.js 保存所有海葵所需数据与行为
//海葵版本一:静止
//海葵版本二:摆动
//#:海葵50条,从画布底端向上绘制直线路径
//#:紫色,半透明
//1:创建海葵类
// var aneObj = function(){
//     this.x = [];   //海葵x坐标
//     this.len = []; //海葵高度
// }
// //2:创建海葵数量
// aneObj.prototype.num = 50;
// //3:创建海葵初始化方法
// aneObj.prototype.init = function(){
//    for(var i=0;i<this.num;i++){
//        //每个海葵，生长随机，比较像自然生长
//        this.x[i] = i * 16 + Math.random()*20;
//        //每个海葵高度，有基准值(200),再加随机数据
//        this.len[i] = 200 + Math.random()*50;
//    }
// }
// //4:创建绘制海葵方法
// aneObj.prototype.draw = function(){
//   //1:保存画笔状态
//   ctx2.save();
//   //2:设置描边样式，透明度，圆角，宽度
//   ctx2.strokeStyle = "#3b154e";
//   ctx2.globalAlpha = 0.6;  //透明度
//   ctx2.lineCap = "round";  //圆角
//   ctx2.lineWidth = 20;     //线宽度
//   //5:创建循环绘制路径
//   for(var i=0;i<this.num;i++){
//       //6:开始新路径->移动画布底端->向上画一条直线->描边
//       ctx2.beginPath();
//       ctx2.moveTo(this.x[i],canHeight);
//       ctx2.lineTo(this.x[i],canHeight-this.len[i]);
//       ctx2.stroke();
//   }
//   //7:恢复画笔状态
//   ctx2.restore();
// }
//5:将ane.js 加载index.html文件中
//6:在main.js 相应位置创建海葵对象并且调方法
