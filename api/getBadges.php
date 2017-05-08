<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		
		$id = $_GET["id"];
		$sql = "SELECT * FROM caixadeentrada WHERE IDUsuario = '$id' AND lido = '0'";
		$resultM = $con->query($sql);
		$valores->mensagens = $resultM->num_rows;

		$sql = "SELECT * FROM pl WHERE estado = 'sa'";
		$resultP = $con->query($sql);
		$valores->pl = $resultP->num_rows;

		$sql = "SELECT * FROM pl WHERE estado = 'sa'";
		$resultP = $con->query($sql);
		$valores->pl = $resultP->num_rows;

		$sql = "SELECT * FROM solicitacao WHERE estado = 'sa'";
		$resultS = $con->query($sql);
		$valores->solicitacao = $resultS->num_rows;

		$sql = "SELECT * FROM depoimento WHERE estado = 'sa'";
		$resultD = $con->query($sql);
		$valores->depoimento = $resultD->num_rows;

		echo json_encode($valores);
	} 	
	$con->close();	
?>