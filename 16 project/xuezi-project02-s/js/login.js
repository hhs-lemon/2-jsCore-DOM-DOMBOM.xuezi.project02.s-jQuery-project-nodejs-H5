$(function(){
	$("#login>:button").click(function(){
		var $btn=$(this);
		$.ajax({
			type:"post",
			url:"data/users/signin.php",
			data:$btn.parent().serialize(),
			success:function(msg){
				alert(msg);
				if(msg==="登录成功!"){
					//?back=http://xxx/products.html?kw=i5
					var i=location.search.indexOf("=");
					location.href=location.search.slice(i+1);
				}
			}
		})
	})
})