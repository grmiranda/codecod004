<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		if ($_GET["id"] == ""){
			$sql = "SELECT * FROM publicacao ORDER BY IDPublicacao DESC";
			$result = $con->query($sql);

			while($row=$result->fetch_assoc()){
				$id = $row['IDPublicacao'];
				$sql = "SELECT * FROM fotourl WHERE id = '$id' AND tipo = 'publicacao'";
				$resultado = $con->query($sql);
				$fotos = array();
				while ($f=$resultado->fetch_assoc()){
					$fotos[] = $f;
				}
				$row['fotoURL'] = $fotos;
				$vetor[] = $row;
			}
			echo json_encode($vetor);
		}
	} 	
	$con->close();	
?>