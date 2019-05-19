if(typeof jQuery !== "function")
	throw new Error("必须先引入jQuery！");
else{
	/**************** dropdown ****************/
	$("[data-trigger=dropdown]").parent().hover(function(){
		$(this).children(".dropdown-menu")
						.toggleClass("in")
	})

	/*************** tabs *****************/
	$("[data-toggle=tab]").parent().parent()
		.on("click","[data-toggle=tab]",function(e){
		e.preventDefault();
		var $tar=$(this);
		if(!$tar.parent().is(".active")){
			$tar.parent().addClass("active")
				.siblings().removeClass("active");
			var id=$tar.attr("href");//拿href名：#content1
			$(id).addClass("active")
				.siblings().removeClass("active");
		}
	})
}