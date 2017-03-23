<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php 
	
	$dia = date('j');
	
	$hora = date('H:i:s');
	
	if ($dia == 1 && $hora == "00:00:00") {
		$sql = " UPDATE usuario SET pontos = '0' ";
		$con->query($sql);
		
		echo json_encode(true);
	}
	
	$con->close();

?>
