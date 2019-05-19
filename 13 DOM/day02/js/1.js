(function(){
    var spans=document.querySelectorAll("ul.tree>li>span");
    console.log(spans)
    for(var span of spans){
        span.onclick=function(){
            if(this.className==="open")
                this.className="";//如果开着，关闭自己
            else{
                var openSpan=document.querySelector("ul.tree>li>span.open")
                if(openSpan!=null)
                    openSpan.className="";//找到就关掉！
                this.className="open";
            }
        }
    }
})();

// 遍历所有span  点击绑定  判断自己有没className=open 有：赋值"" 没有：找有的关闭在打开自己（要判断是否找到className=open，找到才关闭）
// 1.querySelectorAll()忘了写All

