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
			var span=btn.parentNode.children[1];//类数组
				             //td       span
			//修改元素
			var n=parseInt(span.innerHTML);
			if(btn.innerHTML=="+")
				n++;
			else if(n>1)
				n--;
			span.innerHTML=n;

			//作业: 计算小计=单价*数量n
			// var price=?;
			// var sub=price*n;
			// ?.innerHTML="¥"+sub.toFixed(2);
			var price=btn.parentNode.previousElementSibling.innerHTML.slice(1);
			var sub=price*n;
			btn.parentNode
			.nextElementSibling
			.innerHTML="¥"+sub.toFixed(2);

			//total
			//拿小计
			var tbody=table.getElementsByTagName("tbody")[0];
			var trs=tbody.children;
			total=0;
			for(var i=0;i<trs.length;i++){
				var td=trs[i].lastElementChild;
				total+=parseFloat(td.innerHTML.slice(1));
			}	
			var tfoot=table.getElementsByTagName("tfoot")[0];
			var td=tfoot.firstElementChild.lastElementChild;
			td.innerHTML="￥"+total.toFixed(2);
		}
	}
})()


/*
*先定位元素，在改元素内容
1.getElementsByTagName  查找到的是一个类数组！！！取元素要加下标取
2.getElementsByTagName  带s
*/

//按选择器查找！！改下面代码
(function(){
	var table=document.getElementById("data");
	//查找触发事件的元素
	// var btns=table.getElementsByTagName("button");
	var btns=table.querySelectorAll("button");
	//绑定事件
	for(var btn of btns){
		btn.onclick=function(){
			//this->当前btn
			//查找要修改的元素
			var span=this.parentNode.children[1];//类数组
				             //td       span
			//修改元素
			var n=parseInt(span.innerHTML);
			if(this.innerHTML=="+")
				n++;
			else if(n>1)
				n--;
			span.innerHTML=n;

			//作业: 计算小计=单价*数量n
			// var price=?;
			// var sub=price*n;
			// ?.innerHTML="¥"+sub.toFixed(2);
			var price=this.parentNode.previousElementSibling.innerHTML.slice(1);
			var sub=price*n;
			this.parentNode
			.nextElementSibling
			.innerHTML="¥"+sub.toFixed(2);

			//total
			//拿小计
			var tds=table.querySelectorAll("tbody>tr>td:last-Child");
			total=0;
			for(var td of tds){
				total+=parseFloat(td.innerHTML.slice(1));
			}	
			var td=table.querySelector("tfoot>tr>td:last-Child");
			td.innerHTML="￥"+total.toFixed(2);
		}
	}
})()

/*
事件BOM里面要引用该元素时，要用this代替！！！