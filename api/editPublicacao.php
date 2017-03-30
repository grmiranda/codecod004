<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$IDPublicacao	  = $request->IDPublicacao;
		$fotoURL    	  = $request->fotoURL;
		$titulo    		  = $request->titulo;
		$texto			  = $request->texto;

		$sql = "SELECT * FROM publicacao WHERE IDPublicacao = '$IDPublicacao'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;		
		
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			//atualizando a publicacao
			$sql = "UPDATE publicacao SET titulo = '$titulo', texto = '$texto' WHERE IDPublicacao = '$IDPublicacao'";
			$con->query($sql);
			//deletando todas as fotos relacioandas
			$sql = "DELETE FROM fotourl WHERE id = '$IDPublicacao' AND tipo = 'publicacao'";
			$con->query($sql);
			//inserindo no banco as fotos atualizadas.
			foreach ($fotoURL as $foto){
				$sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$foto', '$IDPublicacao', 'publicacao')";
				$con->query($sql);
			}

			echo json_encode(true);
		}
	}
	
	$con->close();	
?>