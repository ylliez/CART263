<?php
// set upload directory in same root folder
// $upload_dir = "upload/";
$upload_dir = "http://hybrid.concordia.ca/i_planch/CART263/proj02_telomatic/upload/";
// receive URI from ajax POST using key
$img = $_POST['canvasImage'];
// format received URI (replace leader and spaces)
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
// decode URI
$data = base64_decode($img);
// create file for data and save data to file
$file = $upload_dir.mktime().".png";
$success = file_put_contents($file, $data);
// return file URL
echo($file);
?>
