for(var i=2;i<=100;i++){
    for(var j=2;j<i;j++){
        if(i%j==0){
            break;
        }
    }
    //console.log(i+":"+j);
    if(i==j){
        console.log(i)
    }
}