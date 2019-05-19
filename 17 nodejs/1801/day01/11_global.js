//console.log(global);

console.time("time1");     //计时开始 time1
var sum = 0;
for(var i=0;i<999999999;i++){
    sum +=i;
}
console.timeEnd("time1");  //计时结束 time1