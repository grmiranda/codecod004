<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		if ($_GET["id"] != ""){
            $id = $_GET['id'];
            
            $sql = "SELECT * FROM caixadeentrada WHERE IDCaixaDeEntrada = '$id'";
            $result = $con->query($sql);

            $num = $result->num_rows;

            if ($num !== 1){
                echo json_encode(false);
            } else {
                $sql = "UPDATE caixadeentrada SET lido = '1' WHERE IDCaixaDeEntrada = '$id'";
                $con->query($sql);
                echo json_encode(true);
            }

        } else {
            echo json_encode(false);
        }
	} 	
	$con->close();	
?>