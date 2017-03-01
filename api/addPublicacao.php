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
		$data = $request->data;
		$fotoURL = $request->fotoURL;
		
		$sql= "INSERT INTO publicacao (titulo, texto, data, fotoURL) VALUES ('$titulo', '$texto', '$data', '$fotoURL')";
		$con->query($sql);
		
		echo json_encode(true);
	}
	
	$con->close();
?>