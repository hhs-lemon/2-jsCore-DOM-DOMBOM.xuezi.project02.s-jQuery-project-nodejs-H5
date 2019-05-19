	(function(){
	//查找触发事件的元素
	var spans=document.querySelectorAll(
		"ul.tree>li>span"         //1.找span(非动态集合)
	);
	console.log(spans);
	//绑定事件
	for(var span of spans){      //2.遍历数组元素
		span.onclick=function(){ //3.事件绑定
			//this->当前span
			//查找要修改的元素
			var span=this;
			//修改元素
			//如果当前span是开着的
			if(span.className==="open")//4.span.className:span的class！********
				span.className="";//就关闭自己
			else{//如果当前span是关着的
				//尝试查找另一个开着的span
				var openSpan=document.querySelector(   //5.找span.open是否有
					"ul.tree>li>span.open"
				);
				console.log(openSpan);
				if(openSpan!=null)//如果找到
					openSpan.className="";//6.就关掉它 {元素属性转换：找到的span.open=>集合的元素.className=...}
				span.className="open";//7.再将自己打开
			}
		}
	}
	})()
//	1---7