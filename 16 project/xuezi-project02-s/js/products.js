//js/products.js
$(function(){
	var divPages=document.getElementById("pages");
	var ulShowList=document.getElementById("show-list");
	function loadPage(pno=0){
		var kw=location.search.split("=")[1];
		$.ajax({
			type:"get",
			url:"data/products/getProductsByKw.php",
			data:"pno="+pno+"&kw="+kw,
			dataType:"json",
			success: function(output){
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
							<a href="javascript:;" data-lid="${lid}" class="addCart">加入购物车</a>
						</div>
					</li>`
				}
				
				ulShowList.innerHTML=html;

				var html=
				`<a href="javascript:;" class="previous">上一页</a>`;
				for(var i=0;i<pageCount;i++){
					if(i===pno)
						html+=`<a href="javascript:;" class="current">${i+1}</a>`
					else
						html+=`<a href="javascript:;">${i+1}</a>`
				}
				html+=`<a href="javascript:;" class="next">下一页</a>`
				
				divPages.innerHTML=html;
				var aPrev=document.querySelector("#pages>a.previous"),
						aNext=document.querySelector("#pages>a.next");
				if(pno===0) aPrev.className+=" disabled";
				if(pno===pageCount-1) aNext.className+=" disabled";
			}
		});
	}
	loadPage();
	divPages.onclick=function(e){
		var tar=e.target;
		if(tar.nodeName==="A"
			&&tar.className.indexOf("disabled")==-1
			&&tar.className!=="current"){
			if(tar.className.indexOf("previous")!=-1){
				var curra=
					document.querySelector("#pages>a.current");
				var pno=curra.innerHTML-2;
			}else if(tar.className.indexOf("next")!=-1){
				var curra=
					document.querySelector("#pages>a.current");
				var pno=parseInt(curra.innerHTML);
			}else{
				var pno=tar.innerHTML-1;
			}
			loadPage(pno);
		}
	}
	ulShowList.onclick=function(e){
		var tar=e.target;
		//if(tar.className=="reduce"||tar.className=="add"){
		if(/^(reduce|add)$/i.test(tar.className)){
			var txt=tar.parentNode.children[1];
			var n=txt.value;
			if(tar.className=="add")
				n++;
			else if(n>1)
				n--;
			txt.value=n;
		}
	}
	$("#show-list").on("click",".addCart",function(e){
		e.preventDefault();
		var $a=$(this);
		$.ajax({
			type:"get",
			url:"data/users/islogin.php",
			dataType:"json",
			success:function(data){
				if(data.ok==1){
					var lid=$a.data("lid"),//$a.attr("data-lid"),
						  count=$a.siblings(":text").val();
					$.ajax({
						type:"get",
						url:"data/cart/addCart.php",
						data:{ lid, count },
						success:function(){
							loadCart();
						}
					});
				}else
					location.href="login.html?back="+location.href;
			}
		});
	});
	function loadCart(){
		$.ajax({
			type:"get",
			url:"data/users/islogin.php",
			dataType:"json",
			success:function(data){
				if(data.ok==1){
					$.ajax({
						type:"get",
						url:"data/cart/getCart.php",
						dataType:"json",
						success:function(data){
							var html="";
							var total=0;
							for(var item of data){
								var {title, iid, count, price}=item;
								total+=price*count;
								html+=`<div class="item">
									<span>${title}</span>
									<div data-iid="${iid}">
										<span class="reduce">-</span>
										<input type="text" value="${count}">
										<span class="add">+</span>
									</div>
									<p>
										<span>¥${(price*count).toFixed(2)}</span>	
									</p>
								</div>`;
							}
							$(".cart_content").html(html);
							$("#total").html(total.toFixed(2));
						}
					})
				}
			}
		})
	}
	loadCart();
	$(".cart_content").on("click",".add,.reduce",function(){
		var $span=$(this);
		var iid=$span.parent().attr("data-iid"),
		    count=parseInt($span.siblings(":text").val());
		if($span.html()=="+")
			count++;
		else
			count--;
		$.ajax({
			type:"get",
			url:"data/cart/updateCart.php",
			data:{iid, count},
			success:function(){
				loadCart();
			}
		})
	});
	$(window).scroll(function(){
		var scrollTop=$(window).scrollTop();
		if(scrollTop>=700)
			$("#cart").addClass("fixed");
		else
			$("#cart").removeClass("fixed");
	})
});