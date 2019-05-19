<?php
require_once("init.php");
@$uname=$_REQUEST["uname"];
if($uname!=null){
	$sql="select * from xz_user where uname='$uname'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row!=null)
		echo "false";
	else
		echo "true";
}