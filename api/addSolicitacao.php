<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request  = json_decode($postdata);
		
		$fotoURL = $request->fotoURL;
		$titulo = $request->titulo;
		$descricao = $request->descricao;
		
		$dataEntrada = date('Y-m-d');
		
		$IDUsuario = $request->IDUsuario;
		
		if (isset($titulo)){
			$sql= "INSERT INTO solicitacao (fotoURL, titulo, descricao, estado, dataEntrada, IDUsuario) VALUES ('$fotoURL', '$titulo', '$descricao', 'sa', '$dataEntrada', '$IDUsuario')";
			$con->query($sql);
			echo json_encode(true);
		}else{
			echo json_encode(false);
		}
	}
	$con->close();
?>