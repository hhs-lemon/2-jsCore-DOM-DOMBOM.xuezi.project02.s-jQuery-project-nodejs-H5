<?php
//data/products/getProductById.php
require_once("../init.php");
@$lid=$_REQUEST["lid"];
$output=[
	"product"=>[],//产品详情
	"pics"=>[],//单个产品的图片组小中大
	"specs"=>[]//规格详情
];
if($lid!=null){
	$sql="SELECT * FROM `xz_laptop` where lid=$lid";
	$result=mysqli_query($conn,$sql);
	$output["product"]=mysqli_fetch_all($result,1)[0];//[0]:拿到对象（一个产品的资料）

	$sql="SELECT * FROM xz_laptop_pic where laptop_id=$lid";
	$result=mysqli_query($conn,$sql);
	$output["pics"]=mysqli_fetch_all($result,1);

	$fid=$output["product"]["family_id"];//
	$sql="SELECT lid,spec FROM `xz_laptop` where family_id=$fid";
	$result=mysqli_query($conn,$sql);
	$output["specs"]=mysqli_fetch_all($result,1);
}
echo json_encode($output);

//接数据——输出架构——如数据非空：查库——放进架构——输出
//查1：一个商品信息
// 查2：该产品图片组（每个图都有小中大）
// 查3：规格的lid和spec 用1的family_id查！