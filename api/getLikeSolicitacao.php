<?php 
	
	function getLike($idSolicitacao, $idUsuario, $con){
	
		$info = new stdClass();
		
		$sql = "SELECT IDApoioSolicitacao FROM apoiosolicitacao where tipo = 's' and IDSolicitacao = '$idSolicitacao'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		$info->p = $numrow; //curtidas positivas
		
		$sql = "SELECT IDApoioSolicitacao FROM apoiosolicitacao where tipo = 'n' and IDSolicitacao = '$idSolicitacao'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		$info->n = $numrow; //curtidas negativas
		
		$sql = "SELECT tipo FROM apoiosolicitacao where IDSolicitacao = '$idSolicitacao' and IDUsuario = '$idUsuario'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		if ($numrow > 0){
			$row=$result->fetch_assoc();
			$info->t = $row['tipo']; //tipo da curtida do usuario
		}else{
			$info->t = false;
		}
		
		return($info);
		
	}
	
	function getQuantidadeLike($idSolicitacao, $con){
	
		$info = new stdClass();
		
		$sql = "SELECT IDApoioSolicitacao FROM apoiosolicitacao where tipo = 's' and IDSolicitacao = '$idSolicitacao'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		$info->p = $numrow; //quantidade de curtidas positivas
		
		$sql = "SELECT IDApoioSolicitacao FROM apoiosolicitacao where tipo = 'n' and IDSolicitacao = '$idSolicitacao'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		$info->n = $numrow; //quantidade de curtidas negativas

		return($info);
		
	}

?>