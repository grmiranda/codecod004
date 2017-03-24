<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php 
	

	$sql = " UPDATE usuario SET pontos = '0' ";
	$con->query($sql);
		
	echo json_encode(true);

	
	$con->close();

?>
