<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request  = json_decode($postdata);
		
		$Texto         = $request->Texto;
		$IDUsuario = $request->IDUsuario;
		$estado       = $request->estado;
		$nome         = $request->nome;
		$fotoURL    = $request->fotoURL;
	}
	$con->close();
?>
