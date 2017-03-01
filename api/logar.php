<?php 
    include 'mySQL.php';
    require 'mySQL.php';     
?>

<?php
	$the_request = &$_POST;
	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request  = json_decode($postdata);
		
        $socialID = $request->token;

        $sql = "SELECT * FROM usuario WHERE socialID = '$socialID'";
        $result = $con->query($sql);

        $num = $result->num_rows;

        if ($num !== 1) {
            echo json_encode("cadastro");
        } else {
            $dados  = $result->fetch_assoc();
            $banido = $dados['banido'];

            if ($banido == 1) {
                echo json_encode("banido");
            } else {
                echo json_encode($dados);
            }
        }      
	}

    $con->close();
?>