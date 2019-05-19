function sum(arr){
    var result = 0;
    for(var item of arr){
        result += item;
    }
    return result;
}
function avg(arr){
    return sum(arr)/arr.length;
}
//module.exports.sum = sum;
//module.exports.avg = avg;
module.exports = {sum:sum,avg:avg};





