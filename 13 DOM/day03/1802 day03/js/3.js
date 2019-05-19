var form=document.forms[0];//拿到form
var txtName=form.username;//找到username文本框
	//form.elements["username"];
var txtPwd=form.pwd;
	//form.elements["pwd"];
txtName.onfocus=txtPwd.onfocus=function(){
  this.className="txt_focus";
  var div=this.parentNode
      .nextElementSibling
      .firstElementChild;
  div.className="";
}
txtName.onblur=function(){
  vali(this,/^\w{1,10}$/);
}
function vali(txt,reg){
  txt.className="";
  var div=txt.parentNode
    .nextElementSibling
    .firstElementChild;
  if(reg.test(txt.value)){
    div.className="vali_success";
		return true;//当验证成功，返回true给下面点击button时走下去直至提交的条件
  }else{
    div.className="vali_fail";
		return false;//当验证失败，返回false给下面点击button时走下去直至提交的条件得到中断！
	}
}
txtPwd.onblur=function(){
  vali(this,/^\d{6}$/);
}

//拿到button。在form数组中的倒数第二处
// var btn=form.elements[i];
//var btn=form.elements[数组.lenght-2] 在数组中访问倒数第二个。用.length-2
var btn=form.elements[form.length-2];
btn.onclick=function(){          //给button绑定事件
//	var rName=vali(txtName,/^\w{1,10}$/);
//	var rPwd=vali(txtPwd,/^\d{6}$/);
//	if(rName&&rPwd)
//		form.submit();
	if(!vali(txtName,/^\w{1,10}$/))
		txtName.focus();   //鼠标光标落在这里
	else if(!vali(txtPwd,/^\d{6}$/))
		txtPwd.focus();    //鼠标光标落在这里
	else
		form.submit();
}