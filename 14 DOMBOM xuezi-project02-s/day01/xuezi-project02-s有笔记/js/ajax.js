/*ajax()用于支持所有情况下的ajax请求发送
     参数：type：请求类型，get/post/delete/put
	        url:请求地址，“...php”
			data:请求参数，要求必须是“可以没有  参数名=值&参数名=值……”
			dataType:返回结果字符串的类型:json或不写*/
function ajax({type,url,data,dataType}){   //*******
		  //1.创建xhr
		  var xhr=new XMLHttpRequest();
		  //2.监听
		  xhr.onreadystatechange=function(){
		    if(xhr.readyState==4&&xhr.status==200){
			  var res=xhr.responseText;
			        if(dataType==="json")  //*******
			           var res=JSON.parse(res);
			  // console.log(users);
			 console.log(res);
			}
		  }
		  if(type==="get"&&data!==undefined){
			url+=?+data;
		  }
		  //3.打开连接
		  xhr.open(type,url,true);
		  //如果是post请求，还需要增加：设置请求头信息
		  if(type==="post"){
			xhr.setRequestHeader(
				"content-Type","application/x-www-form-urlencoded"	
			);
		  }
		  //4.发送请求
		  if(type==="get")
			xhr.send(null);
		  else if(data!==undefined)
			  xhr.send(data);
		}