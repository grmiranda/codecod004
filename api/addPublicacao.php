<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request  = json_decode($postdata);
		
		$titulo = $request->titulo;
		$texto = $request->texto;
		$fotoURL = $request->fotoURL;
		$video = $request->video;
		
		$data = date('Y-m-d');
		
		if (isset($titulo)){
			$sql= "INSERT INTO publicacao (titulo, texto, data, video) VALUES ('$titulo', '$texto', '$data', '$video')";
			$con->query($sql);
			
			//Selecionando a tabela adicionada para obter o id
			$sql = "SELECT * FROM publicacao WHERE titulo = '$titulo' AND texto = '$texto' AND data = '$data' AND video = '$video'";
			$result = $con->query($sql);
			//Obtendo o id da publicacao
			$id = $result->fetch_assoc();
			$id = $id['IDPublicacao'];

			//adicionando todas as fotos relacionadas a publicacao
			foreach ($fotoURL as $foto){
				$sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$foto', '$id', 'publicacao')";
				$con->query($sql);
			}

			echo json_encode(true);
		}else{
			echo json_encode(false);
		}
	}
	$con->close();
?>