
var list = [98,98,89,100,88];

for(var i=0;i<list.length;i++){
    var item = list[i];
    console.log(i+"=>"+item);
}
console.log("============");
//ES5
for(var i in list){
    var item = list[i];
    console.log(i+"=>"+item);
}
console.log("============");
//ES6
for(var item of list){
    console.log(item);
}
