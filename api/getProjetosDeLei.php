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
					
					$idU = $row['IDUsuario'];
					$sql = "SELECT * FROM usuario WHERE IDUsuario = '$idU' ";
					$resultado = $con->query($sql);
					$dado = $resultado->fetch_assoc();
					$row['nomeUsuario'] = $dado['nome'];
					$row['fotoUsuario'] = $dado['fotoURL'];
					
					$idPL = $row['IDPL'];
					$sql = "SELECT * FROM fotourl WHERE id = '$idPL' AND tipo = 'pl'";
					$resultado = $con->query($sql);
					$fotos = array();

					while ($f=$resultado->fetch_assoc()){
						$fotos[] = $f['fotoURL'];
					}
					$row['fotoURL'] = $fotos;
					
					$info->pl = $row;
										
					$vetor[] = $info;
					
					//ordena o vetor por curtidas
					usort($vetor, function ($a, $b) {
						if ($a->p == $b->p) return 0;
							return (($a->p < $b->p) ? 1 : -1);
						}
					);
					
				}
			}else{
				while($row=$result->fetch_assoc()){
					
					$idU = $row['IDUsuario'];
					$sql = "SELECT * FROM usuario WHERE IDUsuario = '$idU' ";
					$resultado = $con->query($sql);
					$dado = $resultado->fetch_assoc();
					$row['nomeUsuario'] = $dado['nome'];
					$row['fotoUsuario'] = $dado['fotoURL'];
				
					$idPL = $row['IDPL'];
					$sql = "SELECT * FROM fotourl WHERE id = '$idPL' AND tipo = 'pl'";
					$resultado = $con->query($sql);
					$fotos = array();

					while ($f=$resultado->fetch_assoc()){
						$fotos[] = $f;
					}

					$row['fotoURL'] = $fotos;
					$vetor[] = $row;
				}
			}
			
			echo json_encode($vetor);
		}
	}
	
	$con->close();	
?>