(function(){
	if(typeof jQuery!=="function")
		throw new Error("请先引入jQuery")
	else{
		jQuery.fn.dropdown=function(){
			//this->$("div.dropdown")
			//1.浸入
			this.addClass("dropdown")
				.children().first().attr("data-trigger","dropdown")
				.next().addClass("dropdown-menu fade")
			//2.绑定事件
			this.hover(function(){
				$(this).children(".dropdown-menu")
				.toggleClass("in")
			})
		}
	}
})()