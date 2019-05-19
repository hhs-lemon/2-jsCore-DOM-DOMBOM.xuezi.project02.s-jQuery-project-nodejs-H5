 var path = "/index";
 if("/index"==path){
 	fnIndex();
 }else if("/search"==path){
 	fnSearch();
 }else if("/login"==path){
 	fnLogin();
 }else{
 	console.log("向客户端输出404");
 }


 var path="/index";
 switch(path){
 	case "/index":fnIndex();break;
 	case "/search":fnSearch();break;
 	case "/search":fnLogin();break;
 	default:console.log("404");
 }