//Step1:为name为username和pwd的文本框绑定获得焦点事件
var txtName=document.querySelector(
  "[name=username]"
);
var txtPwd= document.querySelector(
  "[name=pwd]"
);
txtName.onfocus=getFocus;
txtPwd.onfocus=getFocus;
function getFocus(){
  //this->当前文本框
  //当前文本框边框加粗
  this.className="txt_focus";
  //清除旁边div的class
  var div=this.parentNode
      .nextElementSibling
      .firstElementChild;
  div.className="";
}
txtName.onblur=function(){
  vali(this,/^\w{1,10}$/);
}
function vali(txt,reg){
  //清除当前文本框的class
  txt.className="";
  //获取旁边div
  var div=txt.parentNode
    .nextElementSibling
    .firstElementChild;
  //用reg测试当前文本框的内容
  //如果通过,就修改div的class为vali_success
  if(reg.test(txt.value))
    div.className="vali_success";
  //否则修改div的class为vali_fail
  else
    div.className="vali_fail";
}
txtPwd.onblur=function(){
  vali(this,/^\d{6}$/);
}