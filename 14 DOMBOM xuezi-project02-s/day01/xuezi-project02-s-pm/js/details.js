//js/details.js
(function(){
	if(location.search.indexOf("lid")!=-1){
		var lid=location.search.split("=")[1];
		ajax({
			type:"get",
			url:"data/products/getProductById.php",
			data:"lid="+lid,
			dataType:"json"
		}).then(function(output){
			var {product,pics,specs}=output;
			var {title, subtitle, price, promise}=product;
			document.querySelector("#show-details>h1")
				.innerHTML=title;
			document.querySelector("#show-details>h3>a")
				.innerHTML=subtitle;
			document.querySelector(
				"#show-details>div.price>div.stu-price>span"
			).innerHTML="¥"+parseFloat(price).toFixed(2);
			document.querySelector(
				"#show-details>div.price>div.promise>b"
			).innerHTML="服务承诺:"+promise;

			var {lname, os, memory, resolution, video_card, cpu, video_memory, category, disk}=product;
			document.querySelector("#param>ul")
				.innerHTML=`<li>
				<a href="javascript:;">商品名称：${lname}</a>
			</li>
			<li>
				<a href="javascript:;">系统：${os}</a>
			</li>
			<li>
				<a href="javascript:;">内存容量：${memory}</a>
			</li>
			<li>
				<a href="javascript:;">分辨率：${resolution}</a>
			</li>
			<li>
				<a href="javascript:;">显卡型号：${video_card}</a>
			</li>
			<li>
				<a href="javascript:;">处理器：${cpu}</a>
			</li>
			<li>
				<a href="javascript:;">显存容量：${video_memory}</a>
			</li>
			<li>
				<a href="javascript:;">分类：${category}</a>
			</li>
			<li>
				<a href="javascript:;">硬盘容量：${disk}</a>
			</li>`;

			var html="";
			for(var {lid, spec} of specs){
				html+=`<a href="product_details.html?lid=${lid}" class=${lid===product.lid?"active":""}>${spec}</a>`
			}
			document.querySelector("#show-details>div.spec>div")
				.innerHTML=html;

			document.getElementById("product-intro")
				.innerHTML=product.details;

			var html="";
			for(var {sm, md, lg} of pics){
				html+=`<li class="i1"><img src="${sm}" data-md="${md}" data-lg="${lg}"></li>`;
			}
			var LIWIDTH=62;
			var ulPics=document.getElementById("icon_list");
			ulPics.innerHTML=html;
			ulPics.style.width=LIWIDTH*pics.length+"px";
			var mImg=document.getElementById("mImg"),
				  lgDiv=document.getElementById("largeDiv");
			mImg.src=pics[0].md;
			lgDiv.style.backgroundImage="url("+pics[0].lg+")";
		})
	}
})();