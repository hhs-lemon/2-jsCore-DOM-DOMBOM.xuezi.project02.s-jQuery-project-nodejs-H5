(function(){
	var table=document.getElementById("data");
	//查找触发事件的元素
	var btns=table.getElementsByTagName("button");
	//绑定事件
	for(var i=0,len=btns.length;i<len;i++){
		var btn=btns[i];
		btn.onclick=function(){
			//this->当前btn
			var btn=this;
			//查找要修改的元素
			var span=btn.parentNode.children[1];
				             //td       span
			//修改元素
			var n=parseInt(span.innerHTML);
			if(btn.innerHTML=="+")
				n++;
			else if(n>1)
				n--;
			span.innerHTML=n;

			//作业: 计算小计=单价*数量n
			var price=?;
			var sub=price*n;
			?.innerHTML="¥"+sub.toFixed(2);
		}
	}
})()