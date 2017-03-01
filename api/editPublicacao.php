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
			$sql = "UPDATE publicacao SET fotoURL = '$fotoURL', titulo = '$titulo', texto = '$texto' WHERE IDPublicacao = '$IDPublicacao'";
			$con->query($sql);
			echo json_encode(true);
		}
	}
	
	$con->close();	
?>