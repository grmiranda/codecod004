<?php 
	include 'mySQL.php';
	require 'mySQL.php';

	function getIdApoio($idPostagem, $tipoPostagem){
		$retorno = array();
		$ids = array();
		$pushs = array();

		
		if($tipoPostagem == "pl"){
			$sql = "SELECT * FROM pl WHERE IDPL = '$idPostagem'";
			$respl = $con->query($sql);	
			$pl=$respl->fetch_assoc();
			$idUserDono = $pl['IDUsuario'];
			$sql = "SELECT * FROM usuario WHERE IDUsuario = '$idUserDono'";
			$respl = $con->query($sql);	
			$user=$respl->fetch_assoc();
			$ids[] = $user['IDUsuario'];
			if($user['Push'] != ''){
				$pushs[] = $user['Push'];
			}

			$sql = "SELECT * FROM avaliapl WHERE IDPL = '$idPostagem'";
			$respl = $con->query($sql);	
			while($l=$respl->fetch_assoc()){
				if ($l['IDUsuario'] != $meuID){
					$tempID = $l['IDUsuario'];
					$sql = "SELECT * FROM usuario WHERE IDUsuario = '$tempID'";
					$aux = $con->query($sql);
					$aux = $aux->fetch_assoc();
					$ids[] = $tempID;
					if($aux['Push'] != ""){
						$pushs[] = $aux['Push'];
					}
				}
			}
		} else {

			$sql = "SELECT * FROM solicitacao WHERE IDSolicitacao = '$idPostagem'";
			$respl = $con->query($sql);	
			$pl=$respl->fetch_assoc();
			$idUserDono = $pl['IDUsuario'];
			$sql = "SELECT * FROM usuario WHERE IDUsuario = '$idUserDono'";
			$respl = $con->query($sql);	
			$user=$respl->fetch_assoc();
			$ids[] = $user['IDUsuario'];
			if($user['Push'] != ''){
				$pushs[] = $user['Push'];
			}

			$sql = "SELECT * FROM apoiosolicitacao WHERE IDSolicitacao = '$idPostagem'";
			$respl = $con->query($sql);	
			while($l=$respl->fetch_assoc()){
				if ($l['IDUsuario'] != $meuID){
					$tempID = $l['IDUsuario'];
					$sql = "SELECT * FROM usuario WHERE IDUsuario = '$tempID'";
					$aux = $con->query($sql);
					$aux = $aux->fetch_assoc();
					$ids[] = $tempID;
					if($aux['Push'] != ""){
						$pushs[] = $aux['Push'];
					}
				}
			}
		}
		$retorno[] = $ids;
		$retorno[] = $pushs;
		return retorno;
	}

?>