<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$IDEvento     = $request->IDEvento;
		$Titulo       = $request->Titulo;
		$Descricao    = $request->Descricao;
		$DataInico    = $request->DataInicio;
		$DataFim      = $resquest->DataFim;
		$AllDay       = $request->AllDay;
		$EventoDiario = $request->EventoDiario;
		$IDUsuario    = $request->IDUsuario;
		$Local        = $request->Local;

		$sql = "SELECT * FROM evento WHERE IDEvento = '$IDEvento'";

		$result = $con->query($sql);

		$num = $result->num_rows;

		if ($num !== 1){
			echo json_encode(false);
		} else {
			$sql = "UPDATE evento SET DataInicio = '$DataInico', DataTermino = '$DataFim', Titulo = '$Titulo', Descricao = '$Descricao', Local = '$Local', IDUsuario = '$IDUsuario', EventoDiario = '$EventoDiario' WHERE IDEvento = '$IDEvento'";
			$con->query($sql);

			echo json_encode(true);
		}

	}
	
	$con->close();	
?>