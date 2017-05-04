<?php
	include 'mySQL.php';
	require 'mySQL.php';
	include 'getIdPush.php';
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
		
		$idU = $row['IDUsuario'];
		$sql = "SELECT * FROM usuario WHERE IDUsuario = '$idU' ";
		$resultado = $con->query($sql);
		$dado = $resultado->fetch_assoc();
		$row['nomeUsuario'] = $dado['nome'];
		$row['fotoUsuario'] = $dado['fotoURL'];
		
		echo json_encode($row);
	} 	
	$con->close();	
?>