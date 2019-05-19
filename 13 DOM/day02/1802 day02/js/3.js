(function(){
	var divFirst=document.querySelector(
		"#container>div:first-child"
	);
	divFirst.style.zIndex=10;
	//查找触发事件的元素
	var as=document.querySelectorAll(
		"#tab>li>[data-toggle=tab]"
	);
	//绑定事件
	for(var a of as){
		a.onclick=function(){
			//this->acontainer
			var a=this;
			//查找要修改的元素
			var divs=document.querySelectorAll(
				"#container>div"
			);
			for(var div of divs){
				//修改元素
				div.style.zIndex="";
			}
			var id=a.href;//http://......xx.html#content1
			var i=id.lastIndexOf("#");
			id=id.slice(i);//#content1
			console.log(id);
			var div=document.querySelector(id);
			div.style.zIndex=10;
		}
	}
})()

/*
1.第一个显示 zIndex=10
2.遍历点击 遍历清空zIndex
3.给对应加zIndex:点击的查找#下标，剪切属性，按查找ID加zIndex
* */
