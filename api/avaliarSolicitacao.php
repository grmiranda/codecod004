<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$IDSolicitacao	= $request->IDPublicacao;
		$estado 		= $request->estado;		

		$sql = "SELECT * FROM solicitacao WHERE IDSolicitacao = '$IDSolicitacao'";
		$result = $con->query($sql);
		$numrow = $result->num_rows;		
		
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$sql = "UPDATE solicitacao SET estado = '$estado' WHERE IDPublicacao = '$IDPublicacao'";
			$con->query($sql);
			echo json_encode(true);
		}
	}
	
	$con->close();	
?>