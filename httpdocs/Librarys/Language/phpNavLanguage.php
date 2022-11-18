<?php
$Name = $_REQUEST['Name'];
$keywordList = $_REQUEST['Keyword'];
$list = explode('||', $keywordList, -1);

$file = $Name;
$txt = fopen($file, "w") or die("Unable to open file!");

   fwrite($txt, $keywordList);
fclose($txt);
readfile($file);

?>