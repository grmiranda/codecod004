<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request  = json_decode($postdata);
		
		$id = $request->IDSolicitacao;
		$texto = $request->Motivo;
		$fotoURL = $request->fotoURL;
		$IDSolicitacao = $request->IDSolicitacao;
		$idUsuarioSolicitacao = $request->idUsuarioSolicitacao;
		$data = date('Y-m-d');
		
		
		if (isset($texto)){
			
            $sql = "INSERT INTO motivo (IDSolicitacao, texto) VALUES ('$id' , '$texto')";
            $con->query($sql);

			echo json_encode(true);
		}else{
			echo json_encode(false);
		}
	}
	$con->close();
?>