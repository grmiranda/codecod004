<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		if ($_GET["id"] !== ""){ //busca da pontuacao de um usuario especifico
			$IDUsuario = $_GET["id"];
			$sql = "SELECT pontos FROM usuario WHERE IDUsuario = '$IDUsuario'";
			$result = $con->query($sql);
			$numrow = $result->num_rows;
			if($numrow !== 1){
				echo json_encode(false);
			}else{
				echo json_encode($result->fetch_assoc()['pontos']); //retorna apenas a pontuacao do usuario
			}
		}
	}else if(isset($_GET["rank"])){
		$vetor = array();
		if($_GET["rank"] == ""){
			$sql = "SELECT nome, pontos FROM usuario ORDER BY pontos DESC";
			$result = $con->query($sql);
			while($row=$result->fetch_assoc()){
					$vetor[] = $row;
			}
			echo json_encode($vetor); //retorna uma lista de usuarios ordenada pela pontuacao
		}else{
			$quantidade = $_GET["rank"];
			$sql = "SELECT nome, pontos FROM usuario ORDER BY pontos DESC LIMIT $quantidade";
			$result = $con->query($sql);
			while($row=$result->fetch_assoc()){
					$vetor[] = $row;
			}
			echo json_encode($vetor); //retorna uma lista de usuarios ordenada pela pontuacao e com a quantidade requerida
		}
		
	}			
?>