<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
        $socialID = json_decode($postdata);
        
        $sql = "SELECT * FROM usuario WHERE socialID = '$socialID'";
        $result = $con->query($sql);

        $num = $result->num_rows;

        if ($num !== 1){
            echo json_encode(false);
        } else {
            $sql = "UPDATE usuario SET Push = '' WHERE socialID = '$socialID'";
            $con->query($sql);
            echo json_encode(true);
        }
	}

    $con->close();
?>