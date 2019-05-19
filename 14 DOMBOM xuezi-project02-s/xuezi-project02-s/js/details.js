//js/details.js
(function(){
	if(location.search.indexOf("lid")!=-1){
		var lid=location.search.split("=")[1];//按等号切，要[1]!
		ajax({
			type:"get",
			url:"data/products/getProductById.php",
			data:"lid="+lid,
			dataType:"json"
		}).then(function(output){
			var {product,pics,specs}=output;
			// console.log(product);//检查数据是否拿到
			// console.log(pics);
			// console.log(specs);
	//1.产品信息
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
			</li>
			<li>
				<a href="javascript:;">内存容量：${memory}</a>
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
	//2.规格：涉及class转换：当规格lid=产品id时
			var html="";
			for(var {lid, spec} of specs){
				html+=`<a href="product_details.html?lid=${lid}" class=${lid===product.lid?"active":""}>${spec}</a>`
			}
			document.querySelector("#show-details>div.spec>div")
				.innerHTML=html;

			document.getElementById("product-intro")//导入文案html（数据库直接存html）
				.innerHTML=product.details;
//3.产品图片
			var html="";
			for(var {sm, md, lg} of pics){
				html+=`<li class="i1"><img src="${sm}" data-md="${md}" data-lg="${lg}"></li>`;//小图定义属性存中大图链接
			}
			var LIWIDTH=62;
			var ulPics=document.getElementById("icon_list");
			ulPics.innerHTML=html;
			ulPics.style.width=LIWIDTH*pics.length+"px";//重新设置ul 宽度！横向排列
			var mImg=document.getElementById("mImg"),
				  lgDiv=document.getElementById("largeDiv");
			mImg.src=pics[0].md;
			lgDiv.style.backgroundImage="url("+pics[0].lg+")";//放大图
	//左右按钮
			if(pics.length<=5)
				document.querySelector("#preview>h1>a.forward")
					.className+=" disabled";//禁用
			var moved=0,offset=20;
			var aForward=
				document.querySelector("#preview>h1>a.forward");
			var aBackward=
				document.querySelector("#preview>h1>a.backward");
			aForward.onclick=function(e){
				e.preventDefault();
				var a=this;
				if(a.className.indexOf("disabled")==-1){//如className没有dsisabled！！
					moved++;
					ulPics.style.left=-moved*LIWIDTH+offset+"px";//左移运算
					aBackward.className="backward";
					if(pics.length-moved===5)//图片li个数减移动数等五，取消按钮
						a.className+=" disabled";
				}
			}
			aBackward.onclick=function(e){
				e.preventDefault(); 
				var a=this;
				if(a.className.indexOf("disabled")==-1){//如className没有dsisabled！！
					moved--;
					ulPics.style.left=-moved*LIWIDTH+offset+"px";
					aForward.className="forward";
					if(moved===0)
						a.className+=" disabled";
				}
			}
//小图停靠触发变图
			ulPics.onmouseover=function(e){//冒泡触发事件
				var tar=e.target;
				if(tar.nodeName==="IMG"){
					var {md, lg}=tar.dataset;//取到对象：属性data-md、data=lg的值！！！（对象解构）
					// console.log(tar.dataset);解析：取自定义属性值：ELEM.dataset.自定义属性名
					mImg.src=md;
					lgDiv.style.backgroundImage="url("+lg+")";
				}
			}
	// 放大镜：停靠玻璃，显示背景——背景left、top计算（e）——大图偏移计算：
			var mask=document.getElementById("mask"),//阴影
				  sMask=document.getElementById("superMask");//鼠标样式区
			sMask.onmouseover=function(){ //保护玻璃
				mask.style.display="block";
				lgDiv.style.display="block";
			}
			sMask.onmouseout=function(){
				mask.style.display="none";
				lgDiv.style.display="none";
			}
			var MSIZE=175, SMSIZE=350;
			sMask.onmousemove=function(e){
				var left=e.offsetX-MSIZE/2;//鼠标相对玻璃位置-背景位置=背景的left
				var top=e.offsetY-MSIZE/2;
				if(left<0) 
					left=0; 
				else if(left>SMSIZE-MSIZE)//距离大于玻璃-背景时 left=玻璃-背景
					left=SMSIZE-MSIZE;
				top=top<0?0:top>SMSIZE-MSIZE?SMSIZE-MSIZE:top;//同理，不超出。
				mask.style.left=left+"px";
				mask.style.top=top+"px";
				lgDiv.style.backgroundPosition=//大图position计算：反向（-）：负的大中图片比例+“px”.
					-16/7*left+"px "+ -16/7*top+"px";
			}
		})
	}
})();
//详情页步骤总结：
//拿lid：ajax传lid——then接受
// ——1.解构product——模版/放div——（导入文案html（数据库直接存html））
// ——2.解构spec规格——class转换：当规格lid=产品id时
// ——3.解构图片组——填小图：小图定义属性存中大图链接——重新设置ul 宽度！横向排列——放默认中大图————左右按钮：根据情况改属性、点击事件触发ul的left变动——小图停靠(maopao)触发中大图变动:解构小图自定义属性中的中大图链接——放进中大图
// ——4.放大镜：停靠玻璃绑定事件（背景显示与隐藏）——背景left、to变动公式情（根据鼠标位置变动e.offsetX）——大图偏移计算公式：-中大图比例*left距离（与背景left方向相反）