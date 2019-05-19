//js/index.js
(function(){
	ajax({
		type:"get",
		url:"data/index/getIndexProducts.php",
		dataType:"json"
	}).then(function(products){
		// console.log(products);  输出products数据看一下看有没有
		var html="";
		products.forEach(function(p,i){ //数组遍历API 遍历自动传入elemt i arr
			var {title, details, pic, price, href}=p;//结构elemt中的数据。
			if(i<3){//当遍历前三个product的时候才用一下模版放进html
html+=`<div>
	<div class="desc">
		<p class="name">${title}</p>
		<p class="details">${details}</p>
		<p class="price">¥${parseFloat(price).toFixed(2)}</p>
		<a href="${href}" class="view">查看详情</a>
	</div>
	<img src="${pic}">
</div>`;
			}else{
html+=`<div class="product">
	<img src="${pic}">
	<p class="name">${title}</p>
	<p class="price">¥${parseFloat(price).toFixed(2)}</p>
	<a href="${href}">查看详情</a>
</div>`;	
			}
		})
		document.querySelector("#f1>div.floor-content")
			.innerHTML=html;
		document.querySelector("#f2>div.floor-content")
			.innerHTML=html;
		document.querySelector("#f3>div.floor-content")
			.innerHTML=html;
	})
})();

//步骤：ajax接——then函数——传入:遍历——结构——放进模版——html+=模版放位置