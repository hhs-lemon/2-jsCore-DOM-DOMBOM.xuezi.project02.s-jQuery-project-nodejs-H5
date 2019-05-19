(function () {
    //查找触发事件的元素
    var txtName =
        document.getElementsByName("username")[0];
    var txtPwd = document.getElementsByName("pwd")[0];
    //绑定事件
    txtName.onfocus = txtPwd.onfocus = function () {
        //this->txtName
        //查找修改的元素
        this.className = "txt_focus";
        var div = this.parentElement//td
            .nextElementSibling//下一个td
            .firstElementChild;//div
        //修改元素
        div.className = "";
    }
    txtName.onblur = function () {
        vali(this, /^\w{1,10}$/)
    }
    function vali(txt, reg) {
        txt.className = "";
        var div = txt.parentNode//td
            .nextElementSibling//下一个td
            .firstElementChild;//div
        if (reg.test(txt.value))
            div.className = "vali_success";
        else
            div.className = "vali_fail";
    }

    txtPwd.onblur = function () {
        vali(this, /^\d{6}$/);
    }
})();