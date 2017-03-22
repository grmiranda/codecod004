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
		
		$sql = "INSERT INTO depoimento (Texto, IDUsuario, estado) VALUES ('$Texto', '$IDUsuario', 'sa') ";
		$con->query($sql);
		echo json_encode(true);

	}
	$con->close();
?>
