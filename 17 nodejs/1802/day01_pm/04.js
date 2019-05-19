var path = "/index";
if("/index" == path){
    fnIndex();
}else if("/login" == path){
    fnLogin();
}else if("/search" == path){
    fnSearch();
}else{
    console.log("向客户端输出 404");
}
switch (path){
    case "/index":fnIndex();break;
    case "/login":fnLogin();break;
    case "/search":fnSearch();break;
    default:console.log("404");
}








function fnLogin(){console.log("login")}
function fnIndex(){console.log("index")}
function fnSearch(){console.log("search")}
