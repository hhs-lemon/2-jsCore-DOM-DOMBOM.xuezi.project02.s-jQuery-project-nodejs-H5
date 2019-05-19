//js/index.js
$(function(){
	var $ul=$(".banner-img");
	var $ulIds=$(".indicators");
	var LIWIDTH=960,interval=500,wait=3000,moved=0,timer=null;
	$.ajax({
		type:"get",
		url:"data/index/getCarousel.php",
		dataType:"json",
		success:function(data){
			var html="";
			for(var c of data){
				var {img, href, title}=c;
				html+=`<li>
					<a href="${href}" title="${title}">
						<img src="${img}">
					</a>
				</li>`;
			}
			var {img, href, title}=data[0];
			html+=`<li>
				<a href="${href}" title="${title}">
					<img src="${img}">
				</a>
			</li>`;
			$ul.html(html).css("width",LIWIDTH*(data.length+1));
			$ulIds.html("<li></li>".repeat(data.length))
				.children(":first").addClass("hover");
			autoMove();
		}
	});
	function autoMove(){
		timer=setInterval(function(){
			move();
		},wait);
	}
	function move(){
		moved++;
		$ul.animate({
			left:-moved*LIWIDTH
		},interval,function(){
			if(moved==$ul.children().length-1){
				$ul.css("left",0);
				moved=0;
			}
			$ulIds.children(":eq("+moved+")").addClass("hover")
				.siblings().removeClass("hover");
		})
	}
	$("#banner").mouseenter(function(){
		clearInterval(timer);
		timer=null;
	}).mouseleave(function(){
		autoMove();
	});
	$ulIds.on("click","li",function(){
		var $li=$(this);
		var i=$li.index();
		moved=i;
		$ul.stop(true).animate({
			left:-moved*LIWIDTH
		},interval,function(){
			$ulIds.children(":eq("+moved+")").addClass("hover")
				.siblings().removeClass("hover");
		})
	});
	var $aLeft=$(".ck-left"),
		  $aRight=$(".ck-right");
	$aRight.click(function(){
		if(!$ul.is(":animated")){
			move();
		}
	});
	$aLeft.click(function(){
		if(!$ul.is(":animated")){
			if(moved==0){
				moved=$ul.children().length-1;
				$ul.css("left",-moved*LIWIDTH);
			}
			moved--; 
			$ul.animate({
				left:-moved*LIWIDTH
			},interval,function(){
				$ulIds.children(":eq("+moved+")").addClass("hover")
					.siblings().removeClass("hover");
			})
		}
	})
});
$(function(){
	$.ajax({
		type:"get",
		url:"data/index/getIndexProducts.php",
		dataType:"json"
	}).then(function(products){
		var html="";
		products.forEach(function(p,i){
			var {title, details, pic, price, href}=p;
			if(i<3){
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

		var $divLift=$("#lift"),
			  $floors=$(".floor");
		$(window).scroll(function(){
			var scrollTop=$(window).scrollTop();
			if(scrollTop>=200){
				$divLift.show();
				$floors.each(function(i,f){
					var $f=$(f);
					var offsetTop=$f.offset().top;
					if(offsetTop<=scrollTop+innerHeight/2)
					$divLift.find(".lift_item:eq("+i+")")
						.addClass("lift_item_on")
						.siblings().removeClass("lift_item_on");
				})
			}else
				$divLift.hide();
		});
		$divLift.children("ul").on("click","li",function(){
			var $li=$(this);
			var i=$li.index();
			var offsetTop=$($floors[i]).offset().top;
			$("html,body").stop(true).animate({
				scrollTop: offsetTop
			},500);
		})
	});
});