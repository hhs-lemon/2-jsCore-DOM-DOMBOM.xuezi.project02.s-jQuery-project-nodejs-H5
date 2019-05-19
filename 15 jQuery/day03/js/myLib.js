if(typeof jQuery!=="function")
	throw new Error("my-query依赖于jQuery,必须提前引入jQuery")
else{
	if(typeof jQuery.fn.sum!=="function"){}
		jQuery.fn.sum=function(){
			var sum=0;
			this.each(
				(i,elem)=>sum+=parseFloat(elem.innerHTML)
			)
		}
	}
}