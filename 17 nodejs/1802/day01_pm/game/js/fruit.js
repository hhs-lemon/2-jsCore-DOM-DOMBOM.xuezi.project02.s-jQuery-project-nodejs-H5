//fruit.js 该文件保存所有食物
//1:食物二种颜色 蓝色 橙色
// src/blue.png   src/fruit.png
//2:食物30个食物  15个可见 15不可见
//                15       -1
//3:食物生长 (海葵头顶)由小变大 向上漂浮
//4:食物漂浮出画布，变为不可见
//  食物被大鱼吃掉，变为不可见
//1:创建食物类
var fruitObj = function(){
    this.alive = [];            //是否可见
    this.orange = new Image(); //橙色图片
    this.blue = new Image();   //蓝色图片
    this.x = [];                //食物位置
    this.y = [];
    this.l = [];                //食物长度(由小变大)
    this.spd = [];              //食物速度
    this.fruitType = [] ;       //食物类型
    this.aneNo = [];            //哪一个海葵
}
//2:创建食物数量
fruitObj.prototype.num = 30;
//3:创建食物初始化方法
fruitObj.prototype.init = function(){
    for(var i=0;i<this.num;i++){
        this.alive[i] =  false;
        this.x[i] = 0;
        this.y[i] = 0;
        this.l[i] = 0;
        this.spd[i] = Math.random()*0.017+0.003;
        this.fruitType[i] = "";

    }
    this.orange.src = "src/fruit.png";
    this.blue.src = "src/blue.png";
}
//4:创建食物绘制方法
fruitObj.prototype.draw = function(){
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            //由小变大
            if(this.l[i]<14){
                 this.l[i]+=this.spd[i] * deltaTime;
            }else{
                 this.y[i]-=this.spd[i] * 3 * deltaTime;//向上漂浮
            }
            if(this.fruitType[i] == "blue"){
                var pic = this.blue;
            }else{
                var pic = this.orange;
            }
            ctx2.drawImage(
                pic,
                this.x[i]-this.l[i]*0.5, //食物出生中间
                this.y[i]-this.l[i]*0.5,
                this.l[i],
                this.l[i]);

            //如果漂浮出画布
            if(this.y[i]<10){
                this.alive[i] = false;
            }
        }
    }
}
//5:挂载index.html 中并且main.js创建对象调用相应方法

//监听画布中活动状态果实数量,如果不足15个就创建一个活动食物
function fruitMonitor(){
    var num = 0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i])num++;
    }
    //console.log(num);
    if(num<15){ //如果活动状态食物小于15个
        sendFruit();
        return;
    }
}
//从状态为不活动食物中挑一个出生
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){ //发现第一个不活动食物
           fruit.born(i);    //让其出生
           return;
        }
    }
}
//食物出生
fruitObj.prototype.born = function(i){
    //随机获取海葵下标
    var aneID = Math.floor(Math.random()*ane.num);
    //获取海葵x坐标给食物
    this.x[i] = ane.headx[aneID];
    //获取海葵高度计算食物y
    this.y[i] = ane.heady[aneID];
    //修改状态 true
    this.alive[i] = true;
    this.fruitType[i] =  Math.random() < 0.9 ?
        "blue": "orange";
}
//食物状态改变不活动
fruitObj.prototype.dead = function(i){}




//################################
// var fruitObj = function(){
//     this.alive = [];            //是否可见
//     this.orange = new Image(); //橙色图片
//     this.blue = new Image();   //蓝色图片
//     this.x = [];                //食物位置
//     this.y = [];
//     this.l = [];                //食物长度(由小变大)
//     this.spd = [];              //食物速度
//     this.fruitType = [] ;       //食物类型
// }
// //2:创建食物数量
// fruitObj.prototype.num = 30;
// //3:创建食物初始化方法
// fruitObj.prototype.init = function(){
//     for(var i=0;i<this.num;i++){
//         this.alive[i] =  true;
//         this.x[i] = i * 16 + Math.random()*20;
//         this.y[i] = canHeight-Math.random()*100;
//         this.l[i] = 0;
//         this.spd[i] = Math.random()*0.17 + 0.003;
//         this.fruitType[i] = Math.random() < 0.9 ?
//             "blue": "orange";
//     }
//     this.orange.src = "src/fruit.png";
//     this.blue.src = "src/blue.png";
// }
// //4:创建食物绘制方法
// fruitObj.prototype.draw = function(){
//     for(var i=0;i<this.num;i++){
//         if(this.alive[i]){
//             if(this.l[i]<14){
//                 this.l[i]+=this.spd[i]; //由小变大
//             }else{
//                 this.y[i]-=this.spd[i] * 5;//向上漂浮
//             }
//             if(this.fruitType[i] == "blue"){
//                 var pic = this.blue;
//             }else{
//                 var pic = this.orange;
//             }
//             ctx2.drawImage(pic,this.x[i],this.y[i],
//                 this.l[i],this.l[i]);
//         }
//     }
// }