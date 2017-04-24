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
		$numrow = $result->num_rows;
		if($numrow == 1){
			$row=$result->fetch_assoc();
			$sql = "SELECT * FROM fotourl WHERE id = '$id' AND tipo = 'solicitacao'";
			$resultado = $con->query($sql);
			$fotos = array();
			while ($f=$resultado->fetch_assoc()){
				$fotos[] = $f['fotoURL'];
			}
			$row['fotoURL'] = $fotos;
		}
		echo json_encode($row);
	} 	
	$con->close();	
?>