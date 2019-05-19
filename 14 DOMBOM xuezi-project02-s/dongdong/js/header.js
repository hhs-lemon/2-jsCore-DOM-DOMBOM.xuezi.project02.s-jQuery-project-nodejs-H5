(function(){
	ajax({
		type:"get",
		url:"header.html",
	}).then(function(html){
		var link=document.createElement("link");
		link.rel="stylesheet";
		link.href="css/header.css";
		document.head.appendChild(link);
		document.getElementById("header").innerHTML=html;
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
	})
})();