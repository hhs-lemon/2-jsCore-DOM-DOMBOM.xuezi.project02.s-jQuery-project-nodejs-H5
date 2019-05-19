if(typeof jQuery!=="function")
	throw new Error("必须先引入jQuery!")
else{
	if(typeof jQuery.fn.sum!=="function"){
		jQuery.fn.sum=function(){
			//this->$(...)
			var $jq=this;
			var sum=0;
			$jq.each(function(i,elem){
				sum+=parseFloat($(elem).html())	
			});
			return sum;
		}
	}
}