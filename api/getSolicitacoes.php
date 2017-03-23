<?php
	include 'mySQL.php';
	include 'getLikeSolicitacao.php';
	require 'mySQL.php';
?>
<?php
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["estado"])){
		if ($_GET["estado"] !== ""){
			$estado = $_GET["estado"];
			$id = $_GET["id"];
			$sql = "SELECT * FROM solicitacao WHERE estado = '$estado' ORDER BY IDSolicitacao DESC";
			$result = $con->query($sql);
			
			if($estado == 'ap'){
				while($row=$result->fetch_assoc()){
					$idU = $row['IDUsuario'];
					$sql = "SELECT * FROM usuario WHERE IDUsuario = '$idU' ";
					$resultado = $con->query($sql);
					$dado = $resultado->fetch_assoc();
					$row['Push'] = $dado['Push'];
					$info = getLike($row['IDSolicitacao'], $id, $con);
					$info->solicitacao = $row;
					$vetor[] = $info;
				}
			}
			else{
				while($row=$result->fetch_assoc()){
					$idU = $row['IDUsuario'];
					$sql = "SELECT * FROM usuario WHERE IDUsuario = '$idU' ";
					$resultado = $con->query($sql);
					$dado = $resultado->fetch_assoc();
					$row['Push'] = $dado['Push'];
					$vetor[] = $row;
				}
			}
			echo json_encode($vetor);
		}
	}
	
	$con->close();
?>
