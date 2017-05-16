<?php
	include 'mySQL.php';
	require 'mySQL.php';
	include 'salvaImagem.php';
	include 'apagaImagem.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$IDPublicacao = $request->IDPublicacao;
		$fotoURL = $request->fotoURL;
		$titulo = $request->titulo;
		$texto = $request->texto;
		$video = $request->video;

		$sql = "SELECT * FROM publicacao WHERE IDPublicacao = '$IDPublicacao'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;
		
		$sql = "SELECT * FROM fotourl WHERE id = '$IDPublicacao' AND tipo = 'publicacao'";
		$fotosAntigas = array();
		$result = $con->query($sql);
		
		while($row=$result->fetch_assoc()){
			$fotosAntigas[] = $row['fotoURL'];
		}
		
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			//atualizando a publicacao
			$sql = "UPDATE publicacao SET titulo = '$titulo', texto = '$texto', video = '$video' WHERE IDPublicacao = '$IDPublicacao'";
			$con->query($sql);
			//deletando todas as fotos relacioandas
			$sql = "DELETE FROM fotourl WHERE id = '$IDPublicacao' AND tipo = 'publicacao'";
			$con->query($sql);
			//inserindo no banco as fotos atualizadas.
			
			$i = 0;
			foreach ($fotoURL as $foto){
				if (strpos($foto, 'base')){
					$arquivo = 'imagens/noticias/'.time().$i.'.jpeg'; //nome do arquivo que será gerado
					$url = 'http://www.dsoutlet.com.br/apiLuiz/'.$arquivo; //url que leva até a imagem
					$i++;
					base64_to_jpeg($foto, $arquivo); //converte a foto base64 em jpeg
				}else{
					$url = $foto;
				}
				$sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$url', '$IDPublicacao', 'publicacao')";
				$con->query($sql);
			}

			echo json_encode(true);
		}
		
		//apagando fotos da publicacao antiga
		//verifica se a foto antiga esta na lista de fotos novas
		foreach ($fotosAntigas as $foto){
			if(!in_array($foto, $fotoURL)){
				apagarImagem($foto, 'imagens/noticias/');
			}
		}	
		
	}
	
	$con->close();	
?>

