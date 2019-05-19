if(typeof jQuery!=="function")
	throw new Error("请先引入jQuery!");
else{
	/***************** dropdown ******************/
	jQuery.fn.dropdown=function(){
		//this->$("div.dropdown")
		//1. 侵入
		this.addClass("dropdown")
			.children().first().attr("data-trigger","dropdown")
			.next().addClass("dropdown-menu fade");
		//2. 绑定事件
		this.hover(function(){
			$(this).children(".dropdown-menu")
							.toggleClass("in")
		})
	}

	/**************** accordion *****************/
	jQuery.fn.accordion=function(){
		//this->$("#my-accordion")
		//1. 侵入: 
		this.addClass("accordion")
			.children(":even").addClass("title")
			.next().addClass("content fade")
			.first().addClass("in");
		//2. 事件绑定: 
		this.on("click",".title",e=>
      $(e.target).next(".content").toggleClass("in")
        .siblings(".content").removeClass("in")
    );
	}
}
