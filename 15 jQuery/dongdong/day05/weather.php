<?php
// header('Access-Control-Allow-Origin:http://localhost');
$callback=$_REQUEST["callback"];
$weather="阴 15~26";
//echo "document.write('$weather')";//JSONP
echo "$callback('$weather')";
// echo $weather;