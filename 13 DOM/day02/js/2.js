(function () {
    var chbAll = document.querySelector("table>thead>tr>th:first-child>input");

    chbAll.onclick = function () {
        var chbs = document.querySelectorAll("table>tbody>tr>td:first-child>input");
        for (var chb of chbs) {
            chb.checked = chbAll.checked;
        }
    }

    var chbs = document.querySelectorAll("table>tbody>tr>td:first-child>input");
    for (var chb of chbs) {
        chb.onclick = function()
        {
            if (!this.checked) {
                chbAll.checked = false;//令其不选，赋值false
            }
            else {
				var unckecked=document.querySelector("table>tbody>tr>td:first-child>input:not(:checked)");
				console.log(unckecked);
				if(unckecked==null)
				    chbAll.checked=true;
            }
        }
    }
})();


/*
1.问题：全选按钮检查不到全选：就算没有不选中，也会返回空数组而不是null。
 querySelectorAll查出来的是一个类数组对象，不要All出来元素
 */
