<?php
//data/cart/getCart.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
$cart=[];
if($uid!=null){
	$sql="select *, (select sm from xz_laptop_pic where laptop_id=lid limit 1) as sm from xz_shoppingcart_item inner join xz_laptop on product_id=lid where user_id=$uid";
	$result=mysqli_query($conn,$sql);
	$cart=mysqli_fetch_all($result,1);
}
echo json_encode($cart);