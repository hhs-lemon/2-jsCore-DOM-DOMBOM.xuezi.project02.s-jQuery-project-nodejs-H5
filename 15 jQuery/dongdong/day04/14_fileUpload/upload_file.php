<?php
sleep(5);
$file=$_FILES["file"];//拿到文件
// var_dump($file);数组
$fname=$file["name"];//只是文件名
$tmp_name=$file["tmp_name"];//完整路径+名
move_uploaded_file($tmp_name, "upload/$fname");//移动格式：（以前的位置+名，后来的位置+名）
echo "保存成功!";


