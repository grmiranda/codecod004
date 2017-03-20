<?php 
	
	function getLike($idProjeto, $idUsuario, $con){
	
		$info = new stdClass();
		
		$sql = "SELECT IDAvaliaPL FROM avaliapl where apoio = 's' and IDPL = '$idProjeto'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		$info->p = $numrow; //curtidas positivas
		
		$sql = "SELECT IDAvaliaPL FROM avaliapl where apoio = 'n' and IDPL = '$idProjeto'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		$info->n = $numrow; //curtidas negativas
		
		$sql = "SELECT apoio FROM avaliapl where IDPL = '$idProjeto' and IDUsuario = '$idUsuario'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		if ($numrow > 0){
			$row=$result->fetch_assoc();
			$info->t = $row['apoio']; //apoio da curtida do usuario
		}else{
			$info->t = false;
		}
		
		return($info);
		
	}
	
	function getQuantidadeLike($idProjeto, $con){
	
		$info = new stdClass();
		
		$sql = "SELECT IDAvaliaPL FROM avaliapl where apoio = 's' and IDPL = '$idProjeto'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		$info->p = $numrow; //quantidade de curtidas positivas
		
		$sql = "SELECT IDAvaliaPL FROM avaliapl where apoio = 'n' and IDPL = '$idProjeto'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		$info->n = $numrow; //quantidade de curtidas negativas

		return($info);
		
	}

?>