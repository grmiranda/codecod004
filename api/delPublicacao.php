<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$id = json_decode($postdata);
		
		$sql = "SELECT * FROM publicacao WHERE IDPublicacao = '$id'";
		$result = $con->query($sql);
		$row=$result->fetch_assoc();
		$numrow = $result->num_rows;
		
		if($numrow !== 1){
			//caso nao exista publicacao com o id recebido
			echo json_encode(false);
		}else{
			//deletando todas as fotos relacionada a publicacao
			$sql = "DELETE FROM fotourl WHERE id = '$id' AND tipo = 'publicacao'";
			$con->query($sql);
			//removendo a publicacao
			$sql = "DELETE FROM publicacao WHERE IDPublicacao = '$id'";
			$con->query($sql);
			
			echo json_encode(true);
		}
	}
	
	$con->close();	
?>