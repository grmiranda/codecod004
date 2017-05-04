<?php
	include 'getLikeProjetoDeLei.php';
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		
		$id = $_GET["id"];
		$sql = "SELECT * FROM pl WHERE IDPL = '$id'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		$row=$result->fetch_assoc();
		$info = getLike($row['IDPL'], $id, $con);
		
		if($numrow == 1){
			
			$sql = "SELECT * FROM fotourl WHERE id = '$id' AND tipo = 'pl'";
			$resultado = $con->query($sql);
			$fotos = array();
			while ($f=$resultado->fetch_assoc()){
				$fotos[] = $f['fotoURL'];
			}
			$row['fotoURL'] = $fotos;
		}
		$idU = $row['IDUsuario'];
		$sql = "SELECT * FROM usuario WHERE IDUsuario = '$idU' ";
		$resultado = $con->query($sql);
		$dado = $resultado->fetch_assoc();
		$row['nomeUsuario'] = $dado['nome'];
		$row['fotoUsuario'] = $dado['fotoURL'];
		$info->pl = $row;
		echo json_encode($info);
	} 	
	$con->close();	
?>