<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$IDRequerimento	  = $request->IDRequerimento;
		$fotoURL    	  = $request->fotoURL;

		$sql = "SELECT * FROM requerimento WHERE IDRequerimento = '$IDRequerimento'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;		
		
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			//deletando todas as fotos relacioandas
			$sql = "DELETE FROM fotourl WHERE id = '$IDRequerimento' AND tipo = 'requerimento'";
			$con->query($sql);
			//inserindo no banco as fotos atualizadas.
			foreach ($fotoURL as $foto){
				$sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$foto', '$IDRequerimento', 'requerimento')";
				$con->query($sql);
			}

			echo json_encode(true);
		}
	}
	
	$con->close();	
?>