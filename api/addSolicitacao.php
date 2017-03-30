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
			$sql= "INSERT INTO solicitacao (titulo, descricao, estado, dataEntrada, IDUsuario) VALUES ('$titulo', '$descricao', 'sa', '$dataEntrada', '$IDUsuario')";
			$con->query($sql);

			$sql = "SELECT * FROM solicitacao WHERE titulo = '$titulo' AND descricao = '$descricao' AND estado = 'sa' AND dataEntrada = '$dataEntrada' AND IDUsuario = '$IDUsuario'";
			$result = $con->query($sql);

			$id = $result->fetch_assoc();
			$id = $id['IDSolicitacao'];

			foreach ($fotoURL as $foto){
				$sql = "INSERT INTO fotourl (fotoURL, id, tipo) VALUES ('$foto', '$id', 'solicitacao')";
				$con->query($sql);
			}

			echo json_encode(true);
		}else{
			echo json_encode(false);
		}
	}
	$con->close();
?>