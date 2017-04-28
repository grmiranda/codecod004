<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		
		$id = $_GET["id"];
		$sql = "SELECT * FROM solicitacao WHERE IDSolicitacao = '$id'";
		$result = $con->query($sql);
		$row=$result->fetch_assoc();
		$sql = "SELECT * FROM fotourl WHERE id = '$id' AND tipo = 'solicitacao'";
		$resultado = $con->query($sql);
		$fotos = array();
		while ($f=$resultado->fetch_assoc()){
			$fotos[] = $f['fotoURL'];
		}
		$row['fotoURL'] = $fotos;
		
		$sql = "SELECT * FROM apoiosolicitacao WHERE IDSolicitacao = '$id' ";
		$resultado = $con->query($sql);
		
		echo json_encode($row);
	} 	
	$con->close();	
?>