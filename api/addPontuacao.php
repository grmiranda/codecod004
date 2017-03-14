<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$IDUsuario = $request->IDUsuario;
		$tipo      = $request->tipo; //varia a pontuacao de acordo com o tipo
		$pontos = 5; //default como sendo 5
		
		$sql = "SELECT * FROM usuario WHERE IDUsuario = '$IDUsuario'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;		
		
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$row = $result->fetch_assoc();
			$pontos = $row['pontos'] + $pontos;
		
			$sql = "UPDATE usuario SET pontos = '$pontos' WHERE IDUsuario = '$IDUsuario'";
			$con->query($sql);
			echo json_encode(true);
		}
	}
	
	$con->close();	
?>