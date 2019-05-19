
var scoreList = [89,90,74,91,100];

//分别使用三种for循环打印元素内容
//第一种依靠下标循环内容
for(var i=0;i<scoreList.length;i++){
    var item = scoreList[i];
    console.log(i+"=>"+item);
}
console.log("---------------");
//第二种依靠下标循环内容 ES5 for in
for(var i in scoreList){
    var item = scoreList[i];
    console.log(i+"=>"+item);
}
console.log("---------------");
//第三种循环获取元素 ES6 for of
for(var item of scoreList){
   console.log(item);
}