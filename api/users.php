<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		
		if ($_GET["id"] != "") {
			$id = $_GET["id"];
			
			$sql = " SELECT * FROM usuario WHERE IDUsuario = '$id' ";
			$result = $con->query($sql);
			
			$num = $result->num_rows;
			
			if ($num !== 1) {
				echo json_encode(false);
			} else {
				$dados = $result->fetch_assoc();
				$acesso = $dados['permissao'];
				
				if ($acesso == 1) {
					$sql = "SELECT * FROM usuario WHERE IDUsuario != '$id'";
					$result = $con->query($sql);
					while($row=$result->fetch_assoc()){
						$vetor[] = $row;
					}
					echo json_encode($vetor);
				}
			}
		}
		
	} 	
	$con->close();	
?>
