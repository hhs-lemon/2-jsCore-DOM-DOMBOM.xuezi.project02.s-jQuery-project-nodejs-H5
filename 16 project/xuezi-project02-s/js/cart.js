$(function(){
	function loadPage(){
		$.ajax({
			type:"get",
			url:"data/users/islogin.php",
			dataType:"json",
			success:function(data){
				if(data.ok==0){
					location.href="login.html?back="+location.href;
				}else{
					$.ajax({
						type:"get",
						url:"data/cart/getCart.php",
						dataType:"json",
						success:function(items){
							var html="";
							var sum=0;
							var total=0;
							for(var item of items){
								var {is_checked, lid, sm, title, spec, price, count, iid}=item;
								if(is_checked==1){
									total+=price*count;
									sum+=parseInt(count);
								}
								html+=`<div class="imfor" data-iid="${iid}">
									<div class="check">
										<img src="img/cart/product_${is_checked==0?'normal':'true'}.png" alt="">
									</div>
									<div class="product">
										<a href="product_details.html?lid=${lid}">
											<img src="${sm}" alt="${title}">
										</a>
										<span class="desc">
											<a href="product_details.html?lid=${lid}">${title}</a>
										</span>
										<p class="col">
											<span>规格：</span><span class="color-desc">${spec}</span>
										</p>
									</div>
									<div class="price">
										<p class="price-desc">阿甲专享价</p>
										<p><b>¥</b>${parseFloat(price).toFixed(2)}</p>
									</div>
									<div class="num">
										<span class="reduce">-</span>
										<input type="text" value="${count}">
										<span class="add">+</span>
									</div>
									<div class="total-price">
										<span>¥</span><span>${(price*count).toFixed(2)}</span>
									</div>
									<div class="del">
										<a href="#">删除</a>
									</div>
								</div>`;
							}
							$("#content-box-body").html(html);
							$(".total,.totalOne").html(sum);
							$(".totalPrices,.foot-price")
								.html(total.toFixed(2));
							$(".check-top>img,#footerCheckAll")
								.attr(
									"src",
									"img/cart/product_"+(
										$("#content-box-body")
											.is(":has([src$=normal.png])")?
												"normal":"true"
									)+".png"
								);
						}
					})
				}
			}
		});
	}
	loadPage();
	$("#content-box-body").on("click",".add,.reduce",function(){
		var $span=$(this);
		var iid=$span.parent().parent().attr("data-iid"),
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
				loadPage();
			}
		})
	}).on("click",".del>a",function(e){
		e.preventDefault();
		var $a=$(this);
		var title=
			$a.parent().siblings(".product").find(".desc>a").html();
		if(confirm("是否删除 "+title+" ?")){
			var iid=$a.parent().parent().attr("data-iid");
			$.ajax({
				type:"get",
				url:"data/cart/deleteCart.php",
				data:{iid},
				success:function(){
					loadPage();
				}
			})
		}
	}).on("click",".check>img",function(){
		var $img=$(this);
		var iid=$img.parent().parent().attr("data-iid"),
			  is_checked=$img.attr("src").endsWith("true.png")?0:1;
		$.ajax({
			type:"get",
			url:"data/cart/checkOne.php",
			data:{iid, is_checked},
			success:function(){
				loadPage();
			}
		})
	});
	$(".check-top>img").click(function(){
		var $img=$(this);
		var is_checked=
			$img.attr("src").endsWith("true.png")?0:1;
		$.ajax({
			type:"get",
			url:"data/cart/checkAll.php",
			data:{is_checked},
			success:function(){
				loadPage();
			}
		})
	});
	$("#footerCheckAll").click(function(){
		$(".check-top>img").click();
	})
})