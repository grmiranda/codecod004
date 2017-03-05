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
		$ementa = $request->ementa;
		$fotoURL = $request->fotoURL;
		$IDUsuario = $request->IDUsuario;
		$estado = 'sa';
		
		if (isset($titulo)){
			$sql= "INSERT INTO pl (titulo, ementa, fotoURL, IDUsuario, estado) VALUES ('$titulo', '$ementa', '$fotoURL', '$IDUsuario', '$estado')";
			$con->query($sql);
			echo json_encode(true);
		}else{
			echo json_encode(false);
		}
	}
	$con->close();
?>