<?php 
	
	function getLike($idSolicitacao, $idUsuario, $con){
	
		$vetor = array();
		
		$sql = "SELECT IDApoioSolicitacao FROM apoiosolicitacao where tipo = 's' and IDSolicitacao = '$idSolicitacao'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		$vetor[] = $numrow; //curtidas positivas
		
		$sql = "SELECT IDApoioSolicitacao FROM apoiosolicitacao where tipo = 'n' and IDSolicitacao = '$idSolicitacao'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		$vetor[] = $numrow; //curtidas negativas
		
		$sql = "SELECT tipo FROM apoiosolicitacao where IDSolicitacao = '$idSolicitacao' and IDUsuario = '$idUsuario'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		if ($numrow > 0){
			$row=$result->fetch_assoc();
			$vetor[] = $row['tipo']; //curtida do usuario
		}else{
			$vetor[] = false;
		}
		
		return($vetor);
		
	}

?>