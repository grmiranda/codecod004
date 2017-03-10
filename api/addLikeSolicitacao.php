<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request  = json_decode($postdata);
		
		$tipo = $request->tipo;
		$IDSolicitacao = $request->IDSolicitacao;
		$IDUsuario = $request->IDUsuario;
		
		if (isset($tipo)){
			//busca se o usuario ja curtiu aquela solicitacao
			$sql = "SELECT * FROM apoiosolicitacao WHERE IDSolicitacao = '$IDSolicitacao' AND IDUsuario = '$IDUsuario'";
			$result = $con->query($sql);
			$numrow = $result->num_rows;	

			if($numrow == 1){
				$row = $result->fetch_assoc();
				
				if($row['tipo'] == $tipo){
					//se já curtiu retorna false
					$sql = "DELETE FROM apoiosolicitacao WHERE IDSolicitacao = '$IDSolicitacao' AND IDUsuario = '$IDUsuario' AND tipo = '$tipo'";
					$con->query($sql);
					echo json_encode(false);
				}else {
					//se for diferente, atualiza
					$sql = "UPDATE apoiosolicitacao SET tipo = '$tipo' WHERE IDSolicitacao = '$IDSolicitacao' AND IDUsuario = '$IDUsuario'";
					$con->query($sql);
					echo json_encode(true);
				}
			}else{
				//da um like/dislike na solicitacao
				$sql= "INSERT INTO apoiosolicitacao (tipo, IDSolicitacao, IDUsuario) VALUES ('$tipo', '$IDSolicitacao', '$IDUsuario')";
				$con->query($sql);
				echo json_encode(true);
			}			
		}
	}
	$con->close();
?>