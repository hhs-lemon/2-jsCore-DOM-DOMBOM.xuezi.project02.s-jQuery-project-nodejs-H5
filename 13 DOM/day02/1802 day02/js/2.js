(function(){
	//查找触发事件的元素
	var chbAll=document.querySelector(
		"table>thead>tr>th:first-child>input"	
	);
	//绑定事件
	chbAll.onclick=function(){
		//查找要修改的元素
		var chbs=document.querySelectorAll(
			"table>tbody>tr>td:first-child>input"
		);
		for(var chb of chbs){
			//修改元素
			chb.checked=chbAll.checked;
		}
	}

	//查找触发事件的元素
	var chbs=document.querySelectorAll(
		"table>tbody>tr>td:first-child>input"
	);	
	for(var chb of chbs){//绑定事件
		chb.onclick=function(){
			var chb=this;
			//查找要修改的元素: 前面已找到chbAll
			//修改元素
			if(!chb.checked)//如果自己没选中
				chbAll.checked=false;//则chbAll一定不选
			else{//如果自己选中
				//尝试查找未选中的chb
				var unchecked=document.querySelector(
					"table>tbody>tr>td:first-child>input:not(:checked)"
				);
				if(unchecked==null)//如果没找到，说明都选了
					chbAll.checked=true;//chbAll选中
			}
		}
	}
})();
/*
 1.问题：全选按钮检查不到全选：就算没有不选中，也会返回空数组而不是null。
 querySelectorAll查出来的是一个类数组对象，不要All出来元素
 */
