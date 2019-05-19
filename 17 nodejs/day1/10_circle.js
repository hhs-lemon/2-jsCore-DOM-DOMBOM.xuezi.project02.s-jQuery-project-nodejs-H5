const PI=3.14;
var getSize=function(r){
	return PI*r*r;
}
var getPerimiter=function(r){
	return 2*PI*r;
}

exports.size=getSize;
exports.perimiter=getPerimiter;
