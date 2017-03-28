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
					$row['nome'] = $dado['nome'];
					$row['fotoURL'] = $dado['fotoURL'];
					
					$idS = $row['IDSolicitacao'];
					$sql = "SELECT * FROM apoiosolicitacao WHERE IDSolicitacao = '$idS' ";
					$resultado = $con->query($sql);
					
					$ids = array();
					$pushs = array();
					while($l=$resultado->fetch_assoc()){
						$userID = $l['IDUsuario'];
						$ids[] = $userID;
						
						$sql = "SELECT * FROM usuario WHERE IDUsuario = '$userID'";
						$tes = $con->query($sql);
						$dado = $tes->fetch_assoc();
						
						$pushs[] = $dado['Push'];
						
					}

					
					
					$row['ids'] = $ids;
					$row['pushs'] = $pushs;
					
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
					$row['nome'] = $dado['nome'];
					$row['fotoURL'] = $dado['fotoURL'];
					$idS = $row['IDSolicitacao'];
					$sql = " SELECT * FROM apoiosolicitacao WHERE IDSolicitacao = '$idS' ";
					$resultado = $con->query($sql);
					
					$ids = array();
					$pushs = array();
					while($l=$resultado->fetch_assoc()){
						$userID = $l['IDUsuario'];
						$ids[] = $userID;
						
						$sql = "SELECT * FROM usuario WHERE IDUsuario = '$userID'";
						$tes = $con->query($sql);
						$dado = $tes->fetch_assoc();
						
						$pushs[] = $dado['Push'];
						
					}

					
					
					$row['ids'] = $ids;
					$row['pushs'] = $pushs;
					$vetor[] = $row;
				}
			}
			echo json_encode($vetor);
		}
	}
	
	$con->close();
?>
