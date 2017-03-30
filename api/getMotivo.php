<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		if ($_GET["id"] != ""){
            $id = $_GET["id"];

            $sql = "SELECT * FROM motivo WHERE IDMotivo = '$id'";
            $result = $con->fetch_assoc();

            $num = $result->num_rows;

            if ($num !== 1){
                echo json_encode(false);
            } else {
                $dados = $result->fetch_assoc();
                echo json_encode($dados);
            }
		}
	} 	
	$con->close();	
?>