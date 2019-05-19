var scores=[1,2,3,5,7];
for(var i=0;i<scores.length;i++){
	console.log(scores[i]);
}

ES5
for(var i in scores){
	var item=scores[i];
	console.log(item);
}

ES6
for(var item of scores){
	console.log(item);
}