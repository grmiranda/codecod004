<?php
	include 'mySQL.php';
	require 'mySQL.php';
	include 'apagaImagem.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$publicacao = json_decode($postdata);
		$fotos = $publicacao->fotoURL;
		$id = $publicacao->IDPublicacao;
		
		$sql = "SELECT * FROM publicacao WHERE IDPublicacao = '$id'";
		$result = $con->query($sql);
		$row=$result->fetch_assoc();
		$numrow = $result->num_rows;
		
		if($numrow !== 1){
			//caso nao exista publicacao com o id recebido
			echo json_encode(false);
		}else{
			//removendo a publicacao
			$sql = "DELETE FROM publicacao WHERE IDPublicacao = '$id'";
			$con->query($sql);
			
			echo json_encode(true);
			
			//deletando todas as fotos relacionada a publicacao
			$sql = "DELETE FROM fotourl WHERE id = '$id' AND tipo = 'publicacao'";
			$con->query($sql);
			
			//apagando as fotos do servidor
			foreach ($fotos as $foto) {
				apagarImagem($foto, 'imagens/noticias/');
			}
		}
	}
	
	$con->close();	
?>