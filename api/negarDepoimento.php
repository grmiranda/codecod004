<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		
		if ($_GET["id"] != "") {
			$id = $_GET["id"];
			
			$sql = " SELECT * FROM depoimento WHERE IDDepoimento = '$id' ";
			$result = $con->query($sql);
			
			$num = $result->num_rows;
			
			if ($num !== 1) {
				echo json_encode(false);
			}  else {
				$sql = " DELETE FROM depoimento WHERE IDDepoimento = '$id' ";
				$con->query($sql);
				echo json_encode(true);
			}
		}
	} 	
	$con->close();	
?>
