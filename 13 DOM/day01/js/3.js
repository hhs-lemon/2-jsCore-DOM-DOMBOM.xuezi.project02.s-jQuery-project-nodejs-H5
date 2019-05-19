(function(){
	var table=document.getElementById("data");
	//1.查找触发事件的元素
	var btns=table.getElementsByTagName("button");
	//2.绑定事件
	for(i=0,len=btns.length;i<len;i++){//for(i=0;i<btns.length;i++) :运行内存浪费i+1找一次btns.length，
		var btn=btns[i];
		btn.onclick=function(){
			//this->当前btn
			var btn=this;
		//3.查找要修改的元素
			var span=btn.parentNode.children[1];
			//console.log(span);
			//            td           span
			var n=parseInt(span.innerHTML);
//			console.log(td);
		//4.修改元素
			if(btn.innerHTML=="+")
				n++;
			else if(n>1)
				n--;
			span.innerHTML=n;
		

		}
	}
	
//
//tbody最后一个td背景：黄色
//tfoot中最后一个td背景：红色
//
})()