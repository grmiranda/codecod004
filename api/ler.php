<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["IDM"]) && isset($_GET["IDU"])){
		if ($_GET["IDM"] != "" && $_GET["IDU"] != ""){
            $idM = $_GET['IDM'];
            $idU = $_GET['IDU'];
            
            $sql = "SELECT * FROM caixadeentrada WHERE IDMensagem = '$idM' AND IDUsuario = '$idU'";
            $result = $con->query($sql);

            $num = $result->num_rows;

            if ($num !== 1){
                echo json_encode(false);
            } else {
                $sql = "UPDATE caixadeentrada SET lido = '1' WHERE IDMensagem = '$idM' AND IDUsuario = '$idU'";
                $con->query($sql);
                echo json_encode(true);
            }

        } else {
            echo json_encode(false);
        }
	} 	
	$con->close();	
?>