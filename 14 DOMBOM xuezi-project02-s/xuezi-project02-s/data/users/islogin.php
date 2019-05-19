<?php
//data/users/islogin.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid!=null){
//拿uname
	$sql="select uname from xz_user where uid=$uid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	//输出状态、uanme
	echo json_encode(["ok"=>1, "uname"=>$row[0]]);
}else{
	echo json_encode(["ok"=>0]);
}