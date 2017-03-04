<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>
<?php 
	$vetor   = array();
	$the_request = &$_GET;
	if (isset($_GET["id"])){
		if ($_GET["id"] == ""){

            $sql = "SELECT * FROM caixadesaida";
            $result = $con->query($sql);

            while($row=$result->fetch_assoc()){
                $id = $row['IDMensagem'];
            }
        } 
	} 	
	$con->close();	
?>