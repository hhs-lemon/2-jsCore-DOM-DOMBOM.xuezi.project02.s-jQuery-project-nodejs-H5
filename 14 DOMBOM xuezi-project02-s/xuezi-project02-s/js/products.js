//js/products.js
(function(){
	var divPages=document.getElementById("pages");
	var ulShowList=document.getElementById("show-list");
	function loadPage(pno=0){//pno先默认=0加载一次
		var kw=location.search.split("=")[1];//从地址栏拿到关键词。
		ajax({
			type:"get",
			url:"data/products/getProductsByKw.php",
			data:"pno="+pno+"&kw="+kw,
			dataType:"json"
		}).then(function(output){
			var {products, pageCount}=output;
			var html="";
			for(var p of products){
				var {lid, md, price, title}=p;
				html+=`<li>
					<a href="product_details.html?lid=${lid}">
						<img src="${md}" alt="">
					</a>
					<p>
						<span class="price">¥${parseFloat(price).toFixed(2)}</span>
						<a href="product_details.html?lid=${lid}">${title}</a>
					</p>
					<div>
						<span class="reduce">-</span>
						<input type="text" value="1">
						<span class="add">+</span>
						<a href="javascript:;" class="addCart">加入购物车</a>
					</div>
				</li>`
			}
			
			ulShowList.innerHTML=html;
	//填充页码
			var html=
			`<a href="javascript:;" class="previous">上一页</a>`;//上一页的class先不要加disable
			for(var i=0;i<pageCount;i++){//2.遍历页数、如果i=页码——插入a（当前页class）
				if(i===pno)//i也是从零开始
					html+=`<a href="javascript:;" class="current">${i+1}</a>`
				else//3.i不等于页码，插入a链接即可
					html+=`<a href="javascript:;">${i+1}</a>`
			}
			html+=`<a href="javascript:;" class="next">下一页</a>`//4.下一页插入——class先不带disable
			divPages.innerHTML=html;//5.放进html

			var aPrev=document.querySelector("#pages>a.previous"),
					aNext=document.querySelector("#pages>a.next");
			if(pno===0) aPrev.className+=" disabled";//6.判断页码是0——上一页class加等于disable
			if(pno===pageCount-1) aNext.className+=" disabled";//.判断页码不是最后一页pno=pageCount——下一页class加等于disable
		});
	}
	loadPage();

//点击——改pno——带pno调用一次函数
	divPages.onclick=function(e){
		var tar=e.target;
		if(tar.nodeName==="A"
			&&tar.className.indexOf("disabled")==-1
			&&tar.className!=="current"){
			if(tar.className.indexOf("previous")!=-1){
				var curra=
					document.querySelector("#pages>a.current");
				var pno=curra.innerHTML-2;//点上一页：pno=当前页数字-2
			}else if(tar.className.indexOf("next")!=-1){
				var curra=
					document.querySelector("#pages>a.current");
				var pno=parseInt(curra.innerHTML);//点下一页：pno=当前页数字——注意pno要是数字！！上面不改是因为：”2“+1=21但”2“-1还是等于数字类型1；
			}else{
				var pno=tar.innerHTML-1;//点页数：pno=当前页数字-1
			}
			loadPage(pno);//点击页码后——再带pno加载一次页面
		}
	}
//冒泡绑定页面button 放进购物车加减数
	ulShowList.onclick=function(e){
		var tar=e.target;
		//if(tar.className=="reduce"||tar.className=="add"){
		if(/reduce|add/i.test(tar.className)){ //（需求：如果className有xx或者xx）时髦判定写法，短很多！！！
			var txt=tar.parentNode.children[1];
			var n=txt.value;
			if(tar.className=="add")
				n++;
			else if(n>1)
				n--;
			txt.value=n;
		}
	}
})();

//1.pno先默认等0加载一次函数——ajax：get、url(php)、data(kw):地址栏剪切取：拼："pno="+pno"&kw="+kw （函数传入pno=0）、数据类型json——解构output中的product和pageCount——遍历product、解构product中的lid, md, price, title放进模板
//——pageCount用于遍历填充页码：上一页html——加遍历页码html（i+1）（如果遍历时i===pno，加上class属性current）——html再加下一页html——注意如果条件设置上下页class+=disable
//2.点击点击页码时再传参页码的pno从新加载一次函数：页码绑事件冒泡——改pno值——传参pno再次加载页面函数：如果点击目标属性有previous,pno=当前页码innerHTML数字-2——如果目标属性有next,pno=当前页码innerHTML数字（不用减：pno比实际页数小1）——其它：pno-1——（注意：innerHTML提取到的都是字符串，要加parseInt转数字！）
//3.点击绑定加减按钮（加购物车数）：绑事件——冒泡，判断目标元素——找目标.parentNode.children[1]的内容——如果点击的目标是add，内容加1——reduce，减1——放回value

// 问题：pno=0？怎么将不是0传进来 ：步骤规律：先将pno默认等0加载一次函数，在点击页码时再传参页码的pno从新加载一次函数。