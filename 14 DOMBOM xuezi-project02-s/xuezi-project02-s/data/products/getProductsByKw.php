<?php
//data/products/getProductsByKw.php
require_once("../init.php");
// 1.拼结构
$output=[
	"count"=>0,//总数
	"pageSize"=>9,//每页9个
	"pageCount"=>0,//总页数=ceil(count/pageSize)
	"pageNo"=>0,//当前第几页
	"products"=>[]//商品列表
]; 
@$kw=$_REQUEST["kw"];
@$pno=$_REQUEST["pno"];//页数：从0开始
if($kw!=null&&$pno!=null){
//字符串按空格切割——遍历加like等——加and连接——等$where
	$kws=explode(" ",$kw);//php中没有split切割，是explode
	for($i=0;$i<count($kws);$i++){//php中没有.length.是count(数组)
		$kws[$i]=" title like '%".$kws[$i]."%' ";//遍历拼字符串放进数组!!
	}
	$where=implode(" and ",$kws);//记得加空格以防黏在一起
	$sql="select * from xz_laptop where $where";
	// var_dump($sql);看sql语句
//在两个sql之间先查一次总数和总页数！传回去用（在分页之前查）
	$result=mysqli_query($conn,$sql);
	$count=count(mysqli_fetch_all($result,1));//用$count（个数）接收count(对象)
	$pageCount=ceil($count/$output["pageSize"]);
	$output["count"]=$count;
	$output["pageCount"]=$pageCount;

	$sql="select *,(select md from xz_laptop_pic where laptop_id=lid limit 1) as md from xz_laptop where $where";//少了一列图片，用子查询方式同时查其他表：，（lid是xz_laptop表中的）as md—— limit 1：子查询必须返回一行，加上limit 1
	$sql.=
" limit ".$pno*$output["pageSize"].",".$output["pageSize"];//分页：limit start,count ——$pno从0开始
	// var_dump($sql);看sql语句，复制语句测一下。
	$output["pageNo"]=$pno;//注意：页码$pon要放进结构传回去
	$result=mysqli_query($conn,$sql);
	$output["products"]=mysqli_fetch_all($result,1);
}
echo json_encode($output);

// 查询综合总结：拼结解构数组:变量参数先写死可以——接收传参关键词kw+页码pno——注意：页码$pon放进结构传回去——如果不为空——用关键词拼sql语句：php切割、遍历拼字符串放进数组、and链接、用$where接收、放进sql语句——查询一次拿到产品总的对象数组——用$count（个数）接收count(对象)——个数除以每页个数上取整得页数$pageCount——个数$count和页数$pageCount放回拼的结构，传回去用——加拼分页sql语句:第几页pno*页个数（$output["pageSize"]）=start,加页个数组成limit——第二次查询取得第几页的产品放进解构——转json