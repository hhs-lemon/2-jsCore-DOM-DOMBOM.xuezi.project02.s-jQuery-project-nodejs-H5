//collsion.js 完成碰撞检测
//1:大鱼碰撞食物  main.js gameloop 调用此函数
function momFruitsCollsion(){
    //1.1创建循环，遍历每一个食物
    for(var i=0;i<fruit.num;i++){
        //1.2:判断当前食物活动
        if(fruit.alive[i]){
            //1.3:计算当前食物与大鱼距离
            var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
            //1.4:如果间距差30像素  900
            if(l<900){
                //1.5:食物消失
                fruit.alive[i] = false;
                //1.6:出现特效光环
                wave.born(fruit.x[i],fruit.y[i]);
                //1.7:判断食物类型 橙色 2
                if(fruit.fruitType[i]=="orange"){
                    data.double = 2;
                }
                //1.8:加分
                data.addScore();
            }
        }
    }
}

//2:大鱼碰撞小鱼
function momBabyCollision(){
    var l = calLength2(mom.x,mom.y,baby.x,baby.y);
    if(l<900){
        baby.babyBodyIndex = 0;
    }
}
