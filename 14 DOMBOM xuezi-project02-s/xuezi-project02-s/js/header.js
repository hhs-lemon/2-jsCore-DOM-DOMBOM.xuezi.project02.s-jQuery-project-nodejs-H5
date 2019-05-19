(function(){
	ajax({
		type:"get",
		url:"header.html",
	}).then(function(html){
		var link=document.createElement("link");
		link.rel="stylesheet";
		link.href="css/header.css";
		document.head.appendChild(link);
		document.getElementById("header").innerHTML=html;
	//搜索商品 在ajax加载完之后再干，所以在then里写代码
		var btnSearch=document.querySelector(
			"#top-input>[data-trigger=search]"
		);
		var txtSearch=document.getElementById("txtSearch");
		btnSearch.onclick=function(){
			if(txtSearch.value.trim()!=="")//trim():去掉前后空格
				location.href=//当前页面打开
					"products.html?kw= "+txtSearch.value.trim();//把内容拼接到url
		}
	//键盘事件
		txtSearch.onkeyup=function(e){
			if(e.keyCode===13)
				btnSearch.onclick();
		}
	//新窗口搜索框带有该搜索词(能带到新窗口吗？可以：当前header.js有作用)
		if(location.search.indexOf("kw=")!=-1){
			txtSearch.value=
				decodeURI(location.search.split("=")[1]);
		}
	})
})();

// 查询商品：按钮绑定事件——判断内容是否不为空——链接url+内容（查询字符串）——在当前页面打开该链接（location.href)
//键盘事件
//新窗口搜索框带有该搜索词：如果rul中有”kw=“——剪切rul中的”=“——取[1]——放进value内