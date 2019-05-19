(function(){
	//查找触发事件的元素
	var spans=document.querySelectorAll(
		"ul.tree>li>span"
	);
	//绑定事件
	for(var span of spans){
		span.onclick=function(){
			//this->当前span
			//查找要修改的元素
			var span=this;
			//修改元素
			//如果当前span是开着的
			if(span.className==="open")
				span.className="";//就关闭自己
			else{//如果当前span是关着的
				//尝试查找另一个开着的span
				var openSpan=document.querySelector(
					"ul.tree>li>span.open"
				);
				if(openSpan!=null)//如果找到
					openSpan.className="";//就关掉它
				span.className="open";//再将自己打开
			}
		}
	}
})()