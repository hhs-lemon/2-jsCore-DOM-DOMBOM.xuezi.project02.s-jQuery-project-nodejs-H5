(function(){
	$("#header").load("header.html",function(){//14 project 的ajax演变过来
		var link=document.createElement("link");
		link.rel="stylesheet";
		link.href="css/header.css";
		document.head.appendChild(link);
		var btnSearch=document.querySelector(
			"#top-input>[data-trigger=search]"
		);
		var txtSearch=document.getElementById("txtSearch");
		btnSearch.onclick=function(){
			if(txtSearch.value.trim()!=="")
				location.href=
					"products.html?kw="+txtSearch.value.trim();
		}
		txtSearch.onkeyup=function(e){
			if(e.keyCode===13)
				btnSearch.onclick();
		}
		if(location.search.indexOf("kw=")!=-1){
			txtSearch.value=
				decodeURI(location.search.split("=")[1]);
		}

		$.ajax({
			type:"get",
			url:"data/users/islogin.php",
			dataType:"json",
			success:function(data){
				if(data.ok==0){
					$("#loginList").show().next().hide();
				}else{
					var {uname}=data;
					$("#loginList").hide().next().show()
						.find("#uname").html(uname);
				}
			}
		});
		$("#btnLogin").click(function(e){
			e.preventDefault();
			location.href="login.html?back="+location.href;
		});
		$("#btnSignout").click(function(e){
			e.preventDefault();
			$.ajax({
				type:"get",
				url:"data/users/signout.php",
				success:function(){
					location.reload(true);
				}
			})
		});

		$(window).scroll(function(){
			var scrollTop=$(window).scrollTop();
			if(scrollTop>=200){
				$("#header-top").addClass("fixed_nav");
				$(".header-main").css("height",99);
			}else
				$("#header-top").removeClass("fixed_nav");
		});

		var $txtSearch=$("#txtSearch"),
			  $shelper=$("#shelper");
		$txtSearch.keyup(function(e){
			if(e.keyCode!=13){
				if(e.keyCode==40){
					if(!$shelper.is(":has(.focus)")){
						$shelper.children(":first").addClass("focus");
					}else{
						var $next=
							$shelper.children(".focus").removeClass("focus")
								.next();
						if($next.length>0)
							$next.addClass("focus");
						else
							$shelper.children(":first").addClass("focus");
					}
				}else if(e.keyCode==38){
					if(!$shelper.is(":has(.focus)")){
						$shelper.children(":first").addClass("focus");
					}else{
						var $prev=
							$shelper.children(".focus").removeClass("focus")
								.prev();
						if($prev.length>0)
							$prev.addClass("focus");
						else
							$shelper.children(":last").addClass("focus");
					}
				}else{
					if($txtSearch.val().trim()!==""){
						$shelper.show();
						$.ajax({
							type:"get",
							url:"data/products/shelper.php",
							data:{kw:$txtSearch.val()},
							dataType:"json",
							success:function(data){
								if(data.length>0){
									var html="";
									for(var item of data){
										var {title,sold_count}=item
										html+=`<li title="${title}">
											<div class="search-item" title="${title}">${title}</div>
											<i>销量: ${sold_count}</i>
										</li>`;
									}
									$shelper.html(html);
								}else{
									$shelper.html(`<li title="未找到">
										<div class="search-item" title="未找到">未找到</div>
									</li>`);
								}
							}
						})
					}else{
						$shelper.hide();	
					}
				}
			}
		}).blur(function(){
			$shelper.hide();
		}).focus(function(){
			$txtSearch.keyup();
		})
	})
})();