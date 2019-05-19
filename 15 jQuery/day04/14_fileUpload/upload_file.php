<?php
$file=$_FILES["file"];
$fname=$file["name"];
$tmp_name=$file["tmp_name"];
move_uploaded_file($tmp_name, "upload/$fname");
echo "保存成功！"
