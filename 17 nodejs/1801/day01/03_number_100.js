//计算100以内质数 只能1和自身整除尽
for(var i=2;i<=100;i++){
    for(var j=2;j<i;j++){
        if(i%j==0){
            break;
        }
    }
    //console.log(i+"_"+j);
    if(i==j){console.log(i);}
}
