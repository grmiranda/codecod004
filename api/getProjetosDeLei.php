<?php
	include 'getLikeProjetoDeLei.php';
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["estado"])){
		if ($_GET["estado"] !== ""){
			$estado = $_GET["estado"];
			$id = $_GET["id"];
			$sql = "SELECT * FROM pl WHERE estado = '$estado' ORDER BY IDPL DESC";
			$result = $con->query($sql);
			 
			if($estado == 'ap' || $estado == 'tr'){
				while($row=$result->fetch_assoc()){
					$info = getLike($row['IDPL'], $id, $con);
					$info->pl = $row;

					$idPL = $row['IDPL'];
					$sql = "SELECT * FROM fotourl WHERE id = '$idPL' AND tipo = 'pl'";
					$resultado = $con->query($sql);
					$fotos = array();

					while ($f=$resultado->fetch_assoc()){
						$fotos[] = $f;
					}
					$vetor[] = $info;
					$vetor['fotoURL'] = $fotos;
				}
			}else{
				while($row=$result->fetch_assoc()){

					$idPL = $row['IDPL'];
					$sql = "SELECT * FROM fotourl WHERE id = '$idPL' AND tipo = 'pl'";
					$resultado = $con->query($sql);
					$fotos = array();

					while ($f=$resultado->fetch_assoc()){
						$fotos[] = $f;
					}

					$vetor[] = $row;
					$vetor['fotoURL'] = $fotos;
				}
			}
			
			echo json_encode($vetor);
		}
	}
	
	$con->close();	
?>