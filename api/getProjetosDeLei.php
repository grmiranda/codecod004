<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["estado"])){
		if ($_GET["estado"] !== ""){
			$estado = $_GET["estado"];
			$sql = "SELECT * FROM pl WHERE estado = '$estado' ORDER BY IDPL DESC";
			$result = $con->query($sql);
			while($row=$result->fetch_assoc()){
				$vetor[] = $row;
			}
			echo json_encode($vetor);
		}
	}else if (isset($_GET["id"])){
		if ($_GET["id"] == ""){
			$sql = "SELECT * FROM solicitacao ORDER BY IDPL DESC";
			$result = $con->query($sql);
			while($row=$result->fetch_assoc()){
				$vetor[] = $row;
			}
			echo json_encode($vetor);
		}
	} 
	$con->close();	
?>