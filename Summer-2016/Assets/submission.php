<?php
$file = fopen("color_survey_data.txt", "a");

$data = $_GET[ishihara1] . ", ";
$data .= $_GET[ishihara9] . ", ";
$data .= $_GET[ishihara23] . ", ";
$data .= $_GET[gender] . ", ";
$data .= $_GET[age] . ", ";
$data .= $_GET[education] . ", ";
$data .= $_GET[country] . ", ";

for($i = 1; $i < 29; $i++) {
  $data .= $_GET['hex' . $i] . ", ";
}
$code = $_SERVER['REMOTE_ADDR'];
$data .=  $code . ", ";
$data .= $_GET[comments];

fwrite($file, $data . "\n");
header("location: ../code.php?code=".$code);
exit;
?>
