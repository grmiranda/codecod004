<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$id = json_decode($postdata);
		
		$sql = "SELECT * FROM pl WHERE IDPL = '$id'";
		$result = $con->query($sql);
		$row=$result->fetch_assoc();
		$numrow = $result->num_rows;
		
		if($numrow !== 1){
			//caso nao exista solicitacao com o id recebido
			echo json_encode(false);
		}else{
			$sql = "DELETE FROM fotourl WHERE id = '$id' AND tipo = 'pl'";
			$con->query($sql);

			$sql = "DELETE FROM pl WHERE IDPL = '$id'";
			$con->query($sql); 
			
			echo json_encode(true);
		}
	}
	
	$con->close();	
?>