(function(){
	var divFirst=document.querySelector("#container>div:first-child");
	divFirst.style.zIndex=10
	var as=document.querySelectorAll("#tab>li>[data-taggle=tab]");
	for(var a of as){
		a.onclick=function () {
			var divs=document.querySelectorAll("#container>div");
			for(var div of divs){
				div.style.zIndex=0;
			}
			var id=this.href
			console.log(id)
			var i=id.lastIndexOf("#");
			id=id.slice(i);
			var div=document.querySelector(id);
			div.style.zIndex=10;
        }
	}
})();