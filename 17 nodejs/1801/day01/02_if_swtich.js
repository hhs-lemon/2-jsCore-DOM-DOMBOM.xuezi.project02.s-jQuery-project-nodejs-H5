function fnIndex(){console.log("index")}
function fnLogin(){console.log("login")}
function fnSearch(){console.log("search")}

var path = "/index";
if(path=="/index"){
    fnIndex();
}else if(path=="/search"){
    fnSearch();
}else if(path=="/login"){
    fnLogin();
}else{
    console.log("向客户端输出404页面...");
}
switch (path){
    case "/index":fnIndex();break;
    case "/login":fnLogin();break;
    case "/search":fnSearch();break;
    default:console.log("向客户端输出404页面...");
}
